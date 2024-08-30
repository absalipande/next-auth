/**
 * An array of routes that are accessible to the public
 * These routes do not require authentication
 * @type {string[]}
 */
export const publicRoutes = ['/', '/auth/new-verification'];

/**
 * An array of routes that are used for authentication
 * These routes will redirect logged in users to /settings
 * @type {string[]}
 */
export const authRoutes = ['/auth/login', '/auth/register', '/auth/error'];

/**
 * The prefix for the API authentication routes
 * Routes that start with this rpefix are used for API auth purposes
 * @type {string}
 */
export const apiAuthPrefix = '/api/auth';

/**
 * The default redirect path for users after loggin in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = '/settings';
