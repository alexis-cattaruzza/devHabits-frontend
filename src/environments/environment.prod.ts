// Production environment configuration
// SECURITY: Set actual production values before deployment
export const environment = {
  production: true,
  apiUrl: 'http://devhabits-app.eba-sic2zhmq.eu-central-1.elasticbeanstalk.com/api',
  backendUrl: 'http://devhabits-app.eba-sic2zhmq.eu-central-1.elasticbeanstalk.com',
  frontendUrl: 'http://devhabits-frontend-app.s3-website.eu-central-1.amazonaws.com',
  tokenKey: 'devhabits_access_token',
  refreshTokenKey: 'devhabits_refresh_token',
  // GitHub OAuth Production credentials
  githubClientId: 'Ov23lisyI8RfWwVTkopv',
  githubRedirectUri: 'http://devhabits-frontend-app.s3-website.eu-central-1.amazonaws.com/github/callback'
};