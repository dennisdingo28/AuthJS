/* *An array of routes that are accessbile to the public
    Theste routes do not require authentication
*/
export const publicRoutes = [
    "/",
    "/auth/new-verification",
];
/* *An array of routes that are used for authentication
*/
export const authRoutes = [
    "/auth/login",
    "/auth/register",
    "/auth/error",
    "/auth/reset",
    "/auth/new-password",
];

/* *The prefix for API authentication routes
*/
export const apiAuthPrefix = "/api/auth";

/* The default redirect path after logging in */
export const DEFAULT_LOGIN_REDIRECT = "/settings";