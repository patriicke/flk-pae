import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  nodeEnv: process.env.NODE_ENV,
  name: process.env.APP_NAME,
  workingDirectory: process.env.PWD,
  backendDomain: process.env.BACKEND_DOMAIN,
  port: parseInt(process.env.APP_PORT, 10) || 3000,
  apiPrefix: process.env.API_PREFIX || 'api/v1',
  appVersion: process.env.APP_VERSION || '1.0.0'
}));
