/* *An array of routes that are accessbile to the public
    Theste routes do not require authentication
*/
export const publicRoutes = [
    "/",
];
/* *An array of routes that requires authentication
*/
export const authRoutes = [
    "/auth/login",
    "/auth/register",
    "/auth/error",
];

/* *The prefix for API authentication routes
*/
export const apiAuthPrefix = "/api/auth";

/* The default redirect path after logging in */
export const DEFAULT_LOGIN_REDIRECT = "/settings";