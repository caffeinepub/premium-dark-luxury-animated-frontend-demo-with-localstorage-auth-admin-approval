// LocalStorage-backed analytics utility for tracking user activity

export interface AnalyticsData {
  successfulLogins: number;
  pageVisits: {
    home: number;
    videos: number;
    portfolio: number;
    admin: number;
  };
  lastUpdated: string;
}

const ANALYTICS_KEY = 'app_analytics';
const ANALYTICS_EVENT = 'analytics-updated';

function getAnalytics(): AnalyticsData {
  try {
    const data = localStorage.getItem(ANALYTICS_KEY);
    if (data) {
      return JSON.parse(data);
    }
  } catch {
    // Fall through to default
  }
  
  return {
    successfulLogins: 0,
    pageVisits: {
      home: 0,
      videos: 0,
      portfolio: 0,
      admin: 0,
    },
    lastUpdated: new Date().toISOString(),
  };
}

function setAnalytics(data: AnalyticsData): void {
  data.lastUpdated = new Date().toISOString();
  localStorage.setItem(ANALYTICS_KEY, JSON.stringify(data));
  
  // Dispatch custom event for real-time updates
  window.dispatchEvent(new CustomEvent(ANALYTICS_EVENT));
}

export function recordLogin(): void {
  const analytics = getAnalytics();
  analytics.successfulLogins += 1;
  setAnalytics(analytics);
}

export function recordPageVisit(page: 'home' | 'videos' | 'portfolio' | 'admin'): void {
  const analytics = getAnalytics();
  analytics.pageVisits[page] += 1;
  setAnalytics(analytics);
}

export function getAnalyticsData(): AnalyticsData {
  return getAnalytics();
}

export function resetAnalytics(): void {
  const fresh: AnalyticsData = {
    successfulLogins: 0,
    pageVisits: {
      home: 0,
      videos: 0,
      portfolio: 0,
      admin: 0,
    },
    lastUpdated: new Date().toISOString(),
  };
  setAnalytics(fresh);
}

export function subscribeToAnalyticsUpdates(callback: () => void): () => void {
  const handler = () => callback();
  window.addEventListener(ANALYTICS_EVENT, handler);
  return () => window.removeEventListener(ANALYTICS_EVENT, handler);
}
