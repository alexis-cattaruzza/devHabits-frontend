// src/environments/environment.ts
// Development environment configuration
// SECURITY: Never commit sensitive values. Use environment.local.ts for local overrides.
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api',
  backendUrl: 'http://localhost:8080',
  frontendUrl: 'http://localhost:4200',
  tokenKey: 'devhabits_access_token',
  refreshTokenKey: 'devhabits_refresh_token',
  // GitHub OAuth - Set your dev client ID here or override in environment.local.ts
  githubClientId: 'YOUR_GITHUB_DEV_CLIENT_ID',
  githubRedirectUri: 'http://localhost:8080/login/oauth2/code/github'
};