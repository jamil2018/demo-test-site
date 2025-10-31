/**
 * Session management utility using localStorage
 * Provides functions to manage user session state
 */

export interface SessionData {
  isLoggedIn: boolean;
  userEmail: string;
  loginTime: number;
}

const SESSION_KEY = "userSession";
const SESSION_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds

/**
 * Save session data to localStorage
 */
export const saveSession = (email: string): void => {
  const sessionData: SessionData = {
    isLoggedIn: true,
    userEmail: email,
    loginTime: Date.now(),
  };

  try {
    localStorage.setItem(SESSION_KEY, JSON.stringify(sessionData));
  } catch (error) {
    console.error("Failed to save session to localStorage:", error);
  }
};

/**
 * Get session data from localStorage
 */
export const getSession = (): SessionData | null => {
  try {
    const sessionStr = localStorage.getItem(SESSION_KEY);
    if (!sessionStr) {
      return null;
    }

    const sessionData: SessionData = JSON.parse(sessionStr);

    // Check if session has expired
    const now = Date.now();
    const sessionAge = now - sessionData.loginTime;

    if (sessionAge > SESSION_DURATION) {
      // Session expired, remove it
      clearSession();
      return null;
    }

    return sessionData;
  } catch (error) {
    console.error("Failed to get session from localStorage:", error);
    return null;
  }
};

/**
 * Check if user is currently logged in
 */
export const isLoggedIn = (): boolean => {
  const session = getSession();
  return session?.isLoggedIn === true;
};

/**
 * Get the logged-in user's email
 */
export const getUserEmail = (): string | null => {
  const session = getSession();
  return session?.userEmail || null;
};

/**
 * Clear session data from localStorage
 */
export const clearSession = (): void => {
  try {
    localStorage.removeItem(SESSION_KEY);
  } catch (error) {
    console.error("Failed to clear session from localStorage:", error);
  }
};

/**
 * Check session validity and refresh if needed
 */
export const refreshSession = (): boolean => {
  const session = getSession();
  if (!session || !session.isLoggedIn) {
    return false;
  }

  // Update login time to extend session
  const updatedSession: SessionData = {
    ...session,
    loginTime: Date.now(),
  };

  try {
    localStorage.setItem(SESSION_KEY, JSON.stringify(updatedSession));
    return true;
  } catch (error) {
    console.error("Failed to refresh session:", error);
    return false;
  }
};

