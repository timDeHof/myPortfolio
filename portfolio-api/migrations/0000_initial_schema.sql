-- Migration: Initial Schema
-- Created: 2026-02-08

-- Blog Posts
CREATE TABLE IF NOT EXISTS posts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content TEXT NOT NULL,
  excerpt TEXT,
  metadata TEXT, -- JSON string for tags, reading time, etc.
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Tech Stack (Skills)
CREATE TABLE IF NOT EXISTS skills (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  category TEXT NOT NULL, -- e.g., 'frontend', 'backend', 'tools'
  name TEXT NOT NULL,
  proficiency INTEGER DEFAULT 0, -- 0-100
  icon_key TEXT, -- Reference to R2 object
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Services
CREATE TABLE IF NOT EXISTS services (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon_key TEXT, -- Reference to R2 object
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Certifications
CREATE TABLE IF NOT EXISTS certifications (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  issuer TEXT NOT NULL,
  issue_date TEXT,
  url TEXT,
  icon_key TEXT, -- Reference to R2 object
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_posts_slug ON posts(slug);
CREATE INDEX IF NOT EXISTS idx_skills_category ON skills(category);
