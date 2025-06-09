// Enhanced GitHub Stats API service
import { githubAPI, GitHubRepository } from './github';

export interface GitHubStats {
  profile: {
    login: string;
    name: string;
    bio: string;
    public_repos: number;
    followers: number;
    following: number;
    created_at: string;
    updated_at: string;
    location?: string;
    blog?: string;
    twitter_username?: string;
    company?: string;
  };
  repositories: {
    total: number;
    languages: LanguageStats[];
    topics: TopicStats[];
    stars: number;
    forks: number;
    personal: number;
    contributions: number;
  };
  activity: {
    totalCommits: number;
    currentStreak: number;
    longestStreak: number;
    contributionYears: string[];
  };
}

export interface LanguageStats {
  name: string;
  percentage: number;
  bytes: number;
  color: string;
}

export interface TopicStats {
  name: string;
  count: number;
}

export interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface ContributionWeek {
  days: ContributionDay[];
}

// Language colors mapping (GitHub's color scheme)
const LANGUAGE_COLORS: { [key: string]: string } = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Python: '#3572A5',
  Java: '#b07219',
  'C++': '#f34b7d',
  C: '#555555',
  'C#': '#239120',
  PHP: '#4F5D95',
  Ruby: '#701516',
  Go: '#00ADD8',
  Rust: '#dea584',
  Swift: '#fa7343',
  Kotlin: '#A97BFF',
  Dart: '#00B4AB',
  HTML: '#e34c26',
  CSS: '#1572B6',
  Vue: '#4FC08D',
  React: '#61DAFB',
  Angular: '#DD0031',
  Shell: '#89e051',
  PowerShell: '#012456',
  Dockerfile: '#384d54',
  YAML: '#cb171e',
  JSON: '#292929',
  Markdown: '#083fa1',
};

const getLanguageColor = (language: string): string => {
  return LANGUAGE_COLORS[language] || '#858585';
};

export const githubStatsAPI = {
  // Fetch comprehensive GitHub stats
  fetchGitHubStats: async (): Promise<GitHubStats> => {
    console.log('📊 Fetching comprehensive GitHub stats...');
    
    // Fetch user profile and repositories in parallel
    const [profile, repositories] = await Promise.all([
      githubAPI.fetchUser(),
      githubAPI.fetchRepositories()
    ]);

    // Calculate repository statistics
    const repoStats = await githubStatsAPI.calculateRepositoryStats(repositories);
    
    // Calculate activity stats (simplified - in real app you'd need commits API)
    const activityStats = githubStatsAPI.calculateActivityStats(repositories);

    const stats: GitHubStats = {
      profile,
      repositories: repoStats,
      activity: activityStats
    };

    console.log('✅ GitHub stats compiled:', stats);
    return stats;
  },

  // Calculate detailed repository statistics
  calculateRepositoryStats: async (repositories: GitHubRepository[]) => {
    console.log('📈 Calculating repository statistics...');
    
    // Categorize repositories
    const personal = repositories.filter(repo => !repo.fork);
    const contributions = repositories.filter(repo => repo.fork);
    
    // Calculate totals
    const totalStars = repositories.reduce((sum, repo) => sum + repo.stargazers_count, 0);
    const totalForks = repositories.reduce((sum, repo) => sum + repo.forks_count, 0);
    
    // Collect all languages from repositories
    const languagePromises = repositories
      .filter(repo => repo.languages_url)
      .map(repo => 
        githubAPI.fetchRepositoryLanguages(repo.languages_url)
          .catch(() => ({})) // Return empty object on error
      );
    
    const languageResults = await Promise.all(languagePromises);
    
    // Aggregate language statistics
    const languageBytes: { [key: string]: number } = {};
    languageResults.forEach(languages => {
      Object.entries(languages).forEach(([lang, bytes]) => {
        languageBytes[lang] = (languageBytes[lang] || 0) + bytes;
      });
    });
    
    // Calculate language percentages
    const totalBytes = Object.values(languageBytes).reduce((sum, bytes) => sum + bytes, 0);
    const languages: LanguageStats[] = Object.entries(languageBytes)
      .map(([name, bytes]) => ({
        name,
        bytes,
        percentage: totalBytes > 0 ? (bytes / totalBytes) * 100 : 0,
        color: getLanguageColor(name)
      }))
      .sort((a, b) => b.percentage - a.percentage)
      .slice(0, 10); // Top 10 languages

    // Collect topics
    const topicCounts: { [key: string]: number } = {};
    repositories.forEach(repo => {
      repo.topics?.forEach(topic => {
        topicCounts[topic] = (topicCounts[topic] || 0) + 1;
      });
    });
    
    const topics: TopicStats[] = Object.entries(topicCounts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 15); // Top 15 topics

    return {
      total: repositories.length,
      languages,
      topics,
      stars: totalStars,
      forks: totalForks,
      personal: personal.length,
      contributions: contributions.length
    };
  },

  // Calculate activity statistics (simplified version)
  calculateActivityStats: (repositories: GitHubRepository[]) => {
    console.log('📅 Calculating activity statistics...');
    
    // Get unique years from repository creation/update dates
    const years = new Set<string>();
    repositories.forEach(repo => {
      years.add(new Date(repo.created_at).getFullYear().toString());
      years.add(new Date(repo.updated_at).getFullYear().toString());
    });
    
    // Simplified activity calculation based on repository updates
    const recentActivity = repositories.filter(repo => {
      const lastUpdate = new Date(repo.updated_at);
      const sixMonthsAgo = new Date();
      sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
      return lastUpdate > sixMonthsAgo;
    });

    return {
      totalCommits: repositories.length * 10, // Estimated
      currentStreak: Math.min(recentActivity.length, 30), // Simplified streak
      longestStreak: Math.min(repositories.length, 100), // Estimated
      contributionYears: Array.from(years).sort().reverse()
    };
  },

  // Generate mock contribution calendar data
  generateContributionCalendar: (): ContributionWeek[] => {
    const weeks: ContributionWeek[] = [];
    const today = new Date();
    const startDate = new Date(today.getFullYear(), 0, 1); // Start of year
    
    // Generate 52 weeks of data
    for (let week = 0; week < 52; week++) {
      const days: ContributionDay[] = [];
      
      for (let day = 0; day < 7; day++) {
        const date = new Date(startDate);
        date.setDate(startDate.getDate() + (week * 7) + day);
        
        if (date <= today) {
          // Generate realistic contribution pattern
          const dayOfWeek = date.getDay();
          const baseActivity = dayOfWeek === 0 || dayOfWeek === 6 ? 0.3 : 0.7; // Less activity on weekends
          const randomFactor = Math.random();
          const count = Math.floor(baseActivity * randomFactor * 15);
          
          let level: 0 | 1 | 2 | 3 | 4 = 0;
          if (count > 10) level = 4;
          else if (count > 7) level = 3;
          else if (count > 4) level = 2;
          else if (count > 1) level = 1;
          
          days.push({
            date: date.toISOString().split('T')[0],
            count,
            level
          });
        }
      }
      
      if (days.length > 0) {
        weeks.push({ days });
      }
    }
    
    return weeks;
  }
};

// Query keys for GitHub stats
export const githubStatsKeys = {
  all: ['githubStats'] as const,
  stats: () => [...githubStatsKeys.all, 'stats'] as const,
  contributions: () => [...githubStatsKeys.all, 'contributions'] as const,
};