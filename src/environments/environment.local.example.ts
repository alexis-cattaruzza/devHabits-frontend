// Template for local development configuration
// Copy this file to environment.local.ts and set your actual values
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api',
  backendUrl: 'http://localhost:8080',
  frontendUrl: 'http://localhost:4200',
  tokenKey: 'devhabits_access_token',
  refreshTokenKey: 'devhabits_refresh_token',
  // Get your GitHub OAuth App credentials from: https://github.com/settings/developers
  // Create a new OAuth App with:
  // - Application name: DevHabits Development
  // - Homepage URL: http://localhost:4200
  // - Authorization callback URL: http://localhost:8080/login/oauth2/code/github
  githubClientId: 'YOUR_GITHUB_DEV_CLIENT_ID_HERE',
  githubRedirectUri: 'http://localhost:8080/login/oauth2/code/github'
};
