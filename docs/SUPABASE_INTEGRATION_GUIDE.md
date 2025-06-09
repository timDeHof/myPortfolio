# Complete Supabase Integration Guide

## Table of Contents
1. [Initial Setup & Installation](#initial-setup--installation)
2. [Environment Configuration](#environment-configuration)
3. [Database Setup](#database-setup)
4. [Authentication Configuration](#authentication-configuration)
5. [Basic CRUD Operations](#basic-crud-operations)
6. [TypeScript Integration](#typescript-integration)
7. [TanStack Query Integration](#tanstack-query-integration)
8. [Security Best Practices](#security-best-practices)
9. [Performance Optimization](#performance-optimization)
10. [Common Pitfalls & Solutions](#common-pitfalls--solutions)
11. [Testing & Debugging](#testing--debugging)

---

## Initial Setup & Installation

### 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/sign in
2. Click "New Project"
3. Fill in your project details:
   - **Name**: `portfolio-app` (or your preferred name)
   - **Database Password**: Use a strong password (save this!)
   - **Region**: Choose closest to your users
4. Click "Create new project"
5. Wait 2-3 minutes for project initialization

### 2. Install Required Dependencies

```bash
# Core Supabase client
npm install @supabase/supabase-js

# TypeScript types (if not using TypeScript, skip this)
npm install --save-dev supabase

# Optional: Authentication helpers for React
npm install @supabase/auth-helpers-react @supabase/auth-helpers-shared
```

### 3. Project Structure

Your project should have this structure after setup:

```
src/
├── lib/
│   ├── supabase.ts          # Supabase client configuration
│   └── supabase-types.ts    # Generated TypeScript types
├── hooks/
│   ├── useAuth.ts           # Authentication hook
│   └── useSupabase.ts       # General Supabase hooks
├── services/
│   └── api/
│       ├── auth.ts          # Authentication API calls
│       ├── database.ts      # Database operations
│       └── storage.ts       # File storage operations
├── types/
│   └── database.ts          # Database type definitions
└── utils/
    └── supabase-helpers.ts  # Utility functions
```

---

## Environment Configuration

### 1. Get Your Supabase Credentials

In your Supabase dashboard:
1. Go to **Settings** → **API**
2. Copy these values:
   - **Project URL** (something like `https://your-project-id.supabase.co`)
   - **Anon public key** (starts with `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9`)
   - **Service role key** (only for server-side operations)

### 2. Update Environment Variables

Add to your `.env` file:

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# Optional: For development
VITE_SUPABASE_DATABASE_URL=postgresql://postgres:[password]@db.your-project-id.supabase.co:5432/postgres
```

### 3. Update `.env.example`

```env
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

### 4. Create Supabase Client

Create `src/lib/supabase.ts`:

```typescript
import { createClient } from '@supabase/supabase-js'
import { Database } from './supabase-types'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient<Database>(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})

// Helper function to check if we have a valid session
export const getCurrentUser = async () => {
  const { data: { session } } = await supabase.auth.getSession()
  return session?.user ?? null
}

// Helper function to get the current session
export const getCurrentSession = async () => {
  const { data: { session } } = await supabase.auth.getSession()
  return session
}
```

---

## Database Setup

### 1. Enable Row Level Security (RLS)

In your Supabase dashboard:
1. Go to **Authentication** → **Settings**
2. Ensure "Enable email confirmations" is **OFF** (for development)
3. Go to **Database** → **Tables**

### 2. Create Your First Table

Let's create a `profiles` table as an example:

```sql
-- Create profiles table
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  website TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Public profiles are viewable by everyone" 
ON profiles FOR SELECT 
USING (true);

CREATE POLICY "Users can insert their own profile" 
ON profiles FOR INSERT 
WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
ON profiles FOR UPDATE 
USING (auth.uid() = id);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';

CREATE TRIGGER update_profiles_updated_at 
    BEFORE UPDATE ON profiles
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();
```

### 3. Generate TypeScript Types

Install the Supabase CLI:

```bash
npm install -g supabase
```

Generate types:

```bash
# Login to Supabase
supabase login

# Generate types
supabase gen types typescript --project-id "your-project-id" --schema public > src/lib/supabase-types.ts
```

---

## Authentication Configuration

### 1. Create Authentication Hook

Create `src/hooks/useAuth.ts`:

```typescript
import { useState, useEffect } from 'react'
import { User, Session, AuthError } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'

interface AuthState {
  user: User | null
  session: Session | null
  loading: boolean
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    session: null,
    loading: true
  })

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setAuthState({
        user: session?.user ?? null,
        session,
        loading: false
      })
    }

    getInitialSession()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setAuthState({
          user: session?.user ?? null,
          session,
          loading: false
        })
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  // Sign up with email and password
  const signUp = async (email: string, password: string, metadata?: Record<string, any>) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata
      }
    })
    return { data, error }
  }

  // Sign in with email and password
  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    return { data, error }
  }

  // Sign out
  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    return { error }
  }

  // Reset password
  const resetPassword = async (email: string) => {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`
    })
    return { data, error }
  }

  // Update password
  const updatePassword = async (password: string) => {
    const { data, error } = await supabase.auth.updateUser({ password })
    return { data, error }
  }

  return {
    ...authState,
    signUp,
    signIn,
    signOut,
    resetPassword,
    updatePassword
  }
}
```

### 2. Create Authentication Service

Create `src/services/api/auth.ts`:

```typescript
import { supabase } from '../../lib/supabase'

export interface SignUpData {
  email: string
  password: string
  fullName?: string
  username?: string
}

export interface SignInData {
  email: string
  password: string
}

export const authAPI = {
  // Sign up new user
  signUp: async ({ email, password, fullName, username }: SignUpData) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          username: username
        }
      }
    })

    if (error) throw error
    return data
  },

  // Sign in existing user
  signIn: async ({ email, password }: SignInData) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) throw error
    return data
  },

  // Sign out
  signOut: async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  },

  // Get current session
  getSession: async () => {
    const { data: { session }, error } = await supabase.auth.getSession()
    if (error) throw error
    return session
  },

  // Reset password
  resetPassword: async (email: string) => {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email)
    if (error) throw error
    return data
  },

  // Update user profile
  updateProfile: async (updates: Record<string, any>) => {
    const { data, error } = await supabase.auth.updateUser({
      data: updates
    })
    if (error) throw error
    return data
  }
}
```

---

## Basic CRUD Operations

### 1. Create Database Service

Create `src/services/api/database.ts`:

```typescript
import { supabase } from '../../lib/supabase'
import { Database } from '../../lib/supabase-types'

type Profile = Database['public']['Tables']['profiles']['Row']
type ProfileInsert = Database['public']['Tables']['profiles']['Insert']
type ProfileUpdate = Database['public']['Tables']['profiles']['Update']

export const databaseAPI = {
  // Profiles
  profiles: {
    // Get all profiles
    getAll: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      return data
    },

    // Get profile by ID
    getById: async (id: string) => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', id)
        .single()

      if (error) throw error
      return data
    },

    // Get profile by username
    getByUsername: async (username: string) => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('username', username)
        .single()

      if (error) throw error
      return data
    },

    // Create new profile
    create: async (profile: ProfileInsert) => {
      const { data, error } = await supabase
        .from('profiles')
        .insert(profile)
        .select()
        .single()

      if (error) throw error
      return data
    },

    // Update profile
    update: async (id: string, updates: ProfileUpdate) => {
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      return data
    },

    // Delete profile
    delete: async (id: string) => {
      const { error } = await supabase
        .from('profiles')
        .delete()
        .eq('id', id)

      if (error) throw error
    },

    // Search profiles
    search: async (query: string) => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .or(`username.ilike.%${query}%,full_name.ilike.%${query}%`)
        .order('created_at', { ascending: false })

      if (error) throw error
      return data
    }
  },

  // Real-time subscriptions
  subscriptions: {
    // Subscribe to profiles changes
    profiles: (callback: (payload: any) => void) => {
      const subscription = supabase
        .channel('profiles-changes')
        .on('postgres_changes', { 
          event: '*', 
          schema: 'public', 
          table: 'profiles' 
        }, callback)
        .subscribe()

      return () => subscription.unsubscribe()
    }
  }
}
```

### 2. Example CRUD Component

Create `src/components/ProfileManager.tsx`:

```typescript
import React, { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { databaseAPI } from '../services/api/database'

export const ProfileManager: React.FC = () => {
  const { user, loading } = useAuth()
  const [profile, setProfile] = useState(null)
  const [formData, setFormData] = useState({
    username: '',
    full_name: '',
    bio: '',
    website: ''
  })

  // Load user profile
  const loadProfile = async () => {
    if (!user) return
    
    try {
      const data = await databaseAPI.profiles.getById(user.id)
      setProfile(data)
      setFormData({
        username: data.username || '',
        full_name: data.full_name || '',
        bio: data.bio || '',
        website: data.website || ''
      })
    } catch (error) {
      console.error('Error loading profile:', error)
    }
  }

  // Create or update profile
  const saveProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    try {
      if (profile) {
        // Update existing profile
        const updated = await databaseAPI.profiles.update(user.id, formData)
        setProfile(updated)
      } else {
        // Create new profile
        const created = await databaseAPI.profiles.create({
          id: user.id,
          ...formData
        })
        setProfile(created)
      }
      alert('Profile saved successfully!')
    } catch (error) {
      console.error('Error saving profile:', error)
      alert('Error saving profile')
    }
  }

  if (loading) return <div>Loading...</div>
  if (!user) return <div>Please sign in</div>

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Profile Management</h2>
      
      <form onSubmit={saveProfile} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Username</label>
          <input
            type="text"
            value={formData.username}
            onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Full Name</label>
          <input
            type="text"
            value={formData.full_name}
            onChange={(e) => setFormData(prev => ({ ...prev, full_name: e.target.value }))}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Bio</label>
          <textarea
            value={formData.bio}
            onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
            className="w-full p-2 border rounded-md"
            rows={3}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Website</label>
          <input
            type="url"
            value={formData.website}
            onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
        >
          {profile ? 'Update Profile' : 'Create Profile'}
        </button>
      </form>

      <button
        onClick={loadProfile}
        className="w-full mt-2 bg-gray-600 text-white py-2 rounded-md hover:bg-gray-700"
      >
        Load Profile
      </button>
    </div>
  )
}
```

---

## TypeScript Integration

### 1. Generate and Update Types

```bash
# Generate types from your database
supabase gen types typescript --project-id "your-project-id" > src/lib/supabase-types.ts
```

### 2. Create Type Definitions

Create `src/types/database.ts`:

```typescript
import { Database } from '../lib/supabase-types'

// Table types
export type Profile = Database['public']['Tables']['profiles']['Row']
export type ProfileInsert = Database['public']['Tables']['profiles']['Insert']
export type ProfileUpdate = Database['public']['Tables']['profiles']['Update']

// Custom types
export interface UserWithProfile {
  id: string
  email: string
  profile: Profile | null
}

export interface AuthUser {
  id: string
  email: string
  created_at: string
  updated_at: string
}

// API Response types
export interface APIResponse<T> {
  data: T | null
  error: string | null
  success: boolean
}

// Pagination types
export interface PaginationParams {
  page: number
  limit: number
  orderBy?: string
  orderDirection?: 'asc' | 'desc'
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}
```

### 3. Type-Safe Queries

Create `src/hooks/useSupabaseQuery.ts`:

```typescript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { databaseAPI } from '../services/api/database'
import { Profile, ProfileUpdate } from '../types/database'

// Query keys
export const queryKeys = {
  profiles: {
    all: ['profiles'] as const,
    byId: (id: string) => ['profiles', id] as const,
    byUsername: (username: string) => ['profiles', 'username', username] as const
  }
}

// Profile queries
export const useProfiles = () => {
  return useQuery({
    queryKey: queryKeys.profiles.all,
    queryFn: databaseAPI.profiles.getAll
  })
}

export const useProfile = (id: string) => {
  return useQuery({
    queryKey: queryKeys.profiles.byId(id),
    queryFn: () => databaseAPI.profiles.getById(id),
    enabled: !!id
  })
}

export const useProfileByUsername = (username: string) => {
  return useQuery({
    queryKey: queryKeys.profiles.byUsername(username),
    queryFn: () => databaseAPI.profiles.getByUsername(username),
    enabled: !!username
  })
}

// Profile mutations
export const useUpdateProfile = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: ProfileUpdate }) =>
      databaseAPI.profiles.update(id, updates),
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: queryKeys.profiles.all })
      queryClient.setQueryData(queryKeys.profiles.byId(data.id), data)
    }
  })
}

export const useCreateProfile = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: databaseAPI.profiles.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.profiles.all })
    }
  })
}
```

---

## TanStack Query Integration

### 1. Setup Query Client for Supabase

Update `src/lib/queryClient.ts`:

```typescript
import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
      retry: (failureCount, error) => {
        // Don't retry on authentication errors
        if (error instanceof Error && error.message.includes('JWT')) {
          return false
        }
        return failureCount < 3
      },
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 1,
    },
  },
})
```

### 2. Create Supabase Query Hooks

Create `src/hooks/useSupabase.ts`:

```typescript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '../lib/supabase'
import { useAuth } from './useAuth'

// Generic Supabase query hook
export const useSupabaseQuery = <T>(
  key: string[],
  queryFn: () => Promise<T>,
  options?: {
    enabled?: boolean
    staleTime?: number
    refetchInterval?: number
  }
) => {
  return useQuery({
    queryKey: key,
    queryFn,
    ...options
  })
}

// Generic Supabase mutation hook
export const useSupabaseMutation = <TData, TVariables>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options?: {
    onSuccess?: (data: TData) => void
    onError?: (error: Error) => void
    invalidateKeys?: string[][]
  }
) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn,
    onSuccess: (data) => {
      // Invalidate specified queries
      options?.invalidateKeys?.forEach(key => {
        queryClient.invalidateQueries({ queryKey: key })
      })
      options?.onSuccess?.(data)
    },
    onError: options?.onError
  })
}

// Real-time subscription hook
export const useSupabaseSubscription = <T>(
  table: string,
  callback: (payload: any) => void,
  options?: {
    event?: 'INSERT' | 'UPDATE' | 'DELETE' | '*'
    filter?: string
  }
) => {
  const { user } = useAuth()

  useEffect(() => {
    if (!user) return

    const subscription = supabase
      .channel(`${table}-changes`)
      .on('postgres_changes', {
        event: options?.event || '*',
        schema: 'public',
        table,
        filter: options?.filter
      }, callback)
      .subscribe()

    return () => subscription.unsubscribe()
  }, [user, table, callback, options?.event, options?.filter])
}
```

---

## Security Best Practices

### 1. Row Level Security (RLS) Policies

```sql
-- Example: User can only access their own data
CREATE POLICY "Users can only access their own profile"
ON profiles
FOR ALL
USING (auth.uid() = id);

-- Example: Public read access, private write access
CREATE POLICY "Profiles are publicly readable"
ON profiles
FOR SELECT
USING (true);

CREATE POLICY "Users can only update their own profile"
ON profiles
FOR UPDATE
USING (auth.uid() = id);

-- Example: Role-based access
CREATE POLICY "Admins can access all profiles"
ON profiles
FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid()
    AND role = 'admin'
  )
);
```

### 2. Secure Environment Variables

```typescript
// src/lib/config.ts
const requiredEnvVars = [
  'VITE_SUPABASE_URL',
  'VITE_SUPABASE_ANON_KEY'
] as const

// Validate environment variables
const validateEnv = () => {
  const missing = requiredEnvVars.filter(
    key => !import.meta.env[key]
  )
  
  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(', ')}`
    )
  }
}

validateEnv()

export const config = {
  supabase: {
    url: import.meta.env.VITE_SUPABASE_URL,
    anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY,
  }
}
```

### 3. Input Validation and Sanitization

```typescript
// src/utils/validation.ts
import { z } from 'zod'

export const profileSchema = z.object({
  username: z.string()
    .min(3, 'Username must be at least 3 characters')
    .max(30, 'Username must be less than 30 characters')
    .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),
  full_name: z.string()
    .max(100, 'Full name must be less than 100 characters')
    .optional(),
  bio: z.string()
    .max(500, 'Bio must be less than 500 characters')
    .optional(),
  website: z.string()
    .url('Must be a valid URL')
    .optional()
    .or(z.literal(''))
})

export const validateProfile = (data: unknown) => {
  return profileSchema.parse(data)
}
```

### 4. Error Handling

```typescript
// src/utils/error-handler.ts
import { PostgrestError, AuthError } from '@supabase/supabase-js'

export class SupabaseError extends Error {
  constructor(
    message: string,
    public code?: string,
    public details?: string
  ) {
    super(message)
    this.name = 'SupabaseError'
  }
}

export const handleSupabaseError = (error: PostgrestError | AuthError | Error) => {
  console.error('Supabase error:', error)

  if ('code' in error) {
    switch (error.code) {
      case 'PGRST301':
        throw new SupabaseError('Record not found', error.code)
      case '23505':
        throw new SupabaseError('Record already exists', error.code)
      case 'invalid_credentials':
        throw new SupabaseError('Invalid email or password', error.code)
      case 'email_not_confirmed':
        throw new SupabaseError('Please confirm your email address', error.code)
      default:
        throw new SupabaseError(error.message, error.code)
    }
  }

  throw new SupabaseError(error.message)
}
```

---

## Performance Optimization

### 1. Query Optimization

```typescript
// Use select to only fetch needed columns
const { data } = await supabase
  .from('profiles')
  .select('id, username, avatar_url') // Only select needed fields
  .limit(10)

// Use indexes for faster queries
// In SQL Editor:
-- CREATE INDEX idx_profiles_username ON profiles(username);
-- CREATE INDEX idx_profiles_created_at ON profiles(created_at DESC);

// Use pagination for large datasets
const fetchProfilesPage = async (page: number, limit: number = 20) => {
  const { data, error, count } = await supabase
    .from('profiles')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(page * limit, (page + 1) * limit - 1)

  if (error) throw error
  return { data, count }
}
```

### 2. Caching Strategies

```typescript
// src/hooks/useOptimizedQuery.ts
import { useQuery } from '@tanstack/react-query'

export const useOptimizedProfilesQuery = () => {
  return useQuery({
    queryKey: ['profiles'],
    queryFn: () => databaseAPI.profiles.getAll(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
    refetchOnMount: false
  })
}

// Prefetch related data
export const usePrefetchProfile = () => {
  const queryClient = useQueryClient()

  const prefetchProfile = (id: string) => {
    queryClient.prefetchQuery({
      queryKey: ['profiles', id],
      queryFn: () => databaseAPI.profiles.getById(id),
      staleTime: 5 * 60 * 1000
    })
  }

  return { prefetchProfile }
}
```

### 3. Real-time Optimization

```typescript
// Selective real-time subscriptions
export const useOptimizedSubscription = (userId: string) => {
  useEffect(() => {
    if (!userId) return

    // Only subscribe to current user's profile changes
    const subscription = supabase
      .channel(`profile-${userId}`)
      .on('postgres_changes', {
        event: 'UPDATE',
        schema: 'public',
        table: 'profiles',
        filter: `id=eq.${userId}`
      }, (payload) => {
        // Update React Query cache
        queryClient.setQueryData(['profiles', userId], payload.new)
      })
      .subscribe()

    return () => subscription.unsubscribe()
  }, [userId])
}
```

---

## Common Pitfalls & Solutions

### 1. Authentication State Management

**❌ Problem**: Authentication state not persisting across page refreshes

```typescript
// Wrong way - doesn't handle initial load
const { user } = useAuth()
if (!user) return <div>Not authenticated</div>
```

**✅ Solution**: Handle loading state properly

```typescript
// Correct way - handle loading state
const { user, loading } = useAuth()

if (loading) return <div>Loading...</div>
if (!user) return <div>Not authenticated</div>
```

### 2. RLS Policy Mistakes

**❌ Problem**: Forgetting to enable RLS

```sql
-- Wrong - missing RLS
CREATE TABLE posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  content TEXT
);
-- No RLS policies = no access for users
```

**✅ Solution**: Always enable RLS and create policies

```sql
-- Correct - with RLS and policies
CREATE TABLE posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  content TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own posts"
ON posts FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create posts"
ON posts FOR INSERT
WITH CHECK (auth.uid() = user_id);
```

### 3. Error Handling

**❌ Problem**: Not handling Supabase errors properly

```typescript
// Wrong - generic error handling
try {
  const { data } = await supabase.from('profiles').select('*')
} catch (error) {
  console.log('Error:', error)
}
```

**✅ Solution**: Specific error handling

```typescript
// Correct - specific error handling
try {
  const { data, error } = await supabase.from('profiles').select('*')
  if (error) throw error
  return data
} catch (error) {
  if (error.code === 'PGRST116') {
    throw new Error('No profiles found')
  }
  throw new Error(`Database error: ${error.message}`)
}
```

### 4. Memory Leaks with Subscriptions

**❌ Problem**: Not cleaning up subscriptions

```typescript
// Wrong - creates memory leak
useEffect(() => {
  const subscription = supabase
    .channel('profiles')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'profiles' }, callback)
    .subscribe()
  // Missing cleanup!
}, [])
```

**✅ Solution**: Always clean up subscriptions

```typescript
// Correct - proper cleanup
useEffect(() => {
  const subscription = supabase
    .channel('profiles')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'profiles' }, callback)
    .subscribe()

  return () => subscription.unsubscribe() // Cleanup
}, [])
```

### 5. TypeScript Type Issues

**❌ Problem**: Not using generated types

```typescript
// Wrong - using any types
const createProfile = async (profile: any) => {
  const { data } = await supabase.from('profiles').insert(profile)
  return data
}
```

**✅ Solution**: Use generated types

```typescript
// Correct - using proper types
import { Database } from '../lib/supabase-types'

type ProfileInsert = Database['public']['Tables']['profiles']['Insert']

const createProfile = async (profile: ProfileInsert) => {
  const { data, error } = await supabase
    .from('profiles')
    .insert(profile)
    .select()
    .single()
  
  if (error) throw error
  return data
}
```

---

## Testing & Debugging

### 1. Testing Setup

```typescript
// src/test/setup.ts
import { beforeAll, afterAll, afterEach } from 'vitest'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'http://localhost:54321' // Local Supabase
const supabaseKey = 'your-test-anon-key'

export const testSupabase = createClient(supabaseUrl, supabaseKey)

beforeAll(async () => {
  // Setup test database
})

afterEach(async () => {
  // Clean up test data
  await testSupabase.from('profiles').delete().neq('id', '00000000-0000-0000-0000-000000000000')
})

afterAll(async () => {
  // Cleanup
})
```

### 2. Unit Testing Examples

```typescript
// src/services/__tests__/database.test.ts
import { describe, it, expect } from 'vitest'
import { databaseAPI } from '../api/database'
import { testSupabase } from '../test/setup'

describe('Database API', () => {
  it('should create a profile', async () => {
    const profileData = {
      id: 'test-user-id',
      username: 'testuser',
      full_name: 'Test User'
    }

    const profile = await databaseAPI.profiles.create(profileData)
    
    expect(profile.username).toBe('testuser')
    expect(profile.full_name).toBe('Test User')
  })

  it('should fetch profile by id', async () => {
    // Setup
    const testProfile = await databaseAPI.profiles.create({
      id: 'test-user-2',
      username: 'testuser2'
    })

    // Test
    const profile = await databaseAPI.profiles.getById('test-user-2')
    
    expect(profile.username).toBe('testuser2')
  })
})
```

### 3. Debugging Tools

```typescript
// src/utils/debug.ts
export const debugSupabase = {
  // Log all queries
  logQuery: (query: string, params?: any) => {
    if (import.meta.env.DEV) {
      console.group('🔍 Supabase Query')
      console.log('Query:', query)
      if (params) console.log('Params:', params)
      console.groupEnd()
    }
  },

  // Log authentication state
  logAuth: async () => {
    if (import.meta.env.DEV) {
      const { data: { session } } = await supabase.auth.getSession()
      console.group('🔐 Auth State')
      console.log('User:', session?.user)
      console.log('Session:', session)
      console.groupEnd()
    }
  },

  // Test database connection
  testConnection: async () => {
    try {
      const { data, error } = await supabase.from('profiles').select('count')
      if (error) throw error
      console.log('✅ Database connection successful')
      return true
    } catch (error) {
      console.error('❌ Database connection failed:', error)
      return false
    }
  }
}
```

---

## Advanced Topics

### 1. File Storage

```typescript
// src/services/api/storage.ts
export const storageAPI = {
  // Upload file
  uploadFile: async (bucket: string, path: string, file: File) => {
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(path, file, {
        cacheControl: '3600',
        upsert: false
      })

    if (error) throw error
    return data
  },

  // Get public URL
  getPublicUrl: (bucket: string, path: string) => {
    const { data } = supabase.storage
      .from(bucket)
      .getPublicUrl(path)

    return data.publicUrl
  },

  // Delete file
  deleteFile: async (bucket: string, paths: string[]) => {
    const { data, error } = await supabase.storage
      .from(bucket)
      .remove(paths)

    if (error) throw error
    return data
  }
}
```

### 2. Database Functions

```sql
-- Create a custom function
CREATE OR REPLACE FUNCTION get_user_stats(user_id UUID)
RETURNS JSON AS $$
DECLARE
    result JSON;
BEGIN
    SELECT json_build_object(
        'total_posts', (SELECT COUNT(*) FROM posts WHERE user_id = get_user_stats.user_id),
        'total_likes', (SELECT COUNT(*) FROM likes WHERE user_id = get_user_stats.user_id),
        'joined_date', (SELECT created_at FROM profiles WHERE id = get_user_stats.user_id)
    ) INTO result;
    
    RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

```typescript
// Call custom function
const getUserStats = async (userId: string) => {
  const { data, error } = await supabase
    .rpc('get_user_stats', { user_id: userId })

  if (error) throw error
  return data
}
```

### 3. Edge Functions

```typescript
// supabase/functions/hello/index.ts
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    )

    // Your function logic here
    const { data } = await supabaseClient.from('profiles').select('*')

    return new Response(
      JSON.stringify({ data }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
    )
  }
})
```

---

## Migration & Deployment

### 1. Database Migrations

```sql
-- migrations/001_initial_schema.sql
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles are viewable by everyone"
ON profiles FOR SELECT
USING (true);
```

### 2. Environment-Specific Configuration

```typescript
// src/lib/config.ts
const configs = {
  development: {
    supabase: {
      url: 'http://localhost:54321',
      anonKey: 'your-local-anon-key'
    }
  },
  production: {
    supabase: {
      url: import.meta.env.VITE_SUPABASE_URL,
      anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY
    }
  }
}

const env = import.meta.env.MODE as keyof typeof configs
export const config = configs[env] || configs.development
```

### 3. Deployment Checklist

- [ ] Environment variables configured
- [ ] RLS enabled on all tables
- [ ] Policies tested and working
- [ ] Database migrations applied
- [ ] Email templates configured (if using auth)
- [ ] Storage buckets created (if using storage)
- [ ] Edge functions deployed (if any)
- [ ] SSL/TLS certificates valid
- [ ] Monitoring and logging set up

---

This guide provides a comprehensive foundation for integrating Supabase into your React/TypeScript project. Remember to always test your implementation thoroughly and follow security best practices when handling user data.

For more advanced topics and updates, refer to the [official Supabase documentation](https://supabase.com/docs).