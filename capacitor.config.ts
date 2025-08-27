import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.lacocinadeanita507.app',
  appName: 'LaCocinadeAnita507',
  webDir: 'out', // ← Para Next.js es 'out'
  server: {
    androidScheme: 'https'
  }
};

export default config;