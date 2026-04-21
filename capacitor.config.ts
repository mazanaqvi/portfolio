import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.xrossapps.portfolio',
  appName: 'Ali Portfolio',
  webDir: 'dist',
  ios: {
    contentInset: 'automatic',
  },
  server: {
    iosScheme: 'capacitor',
    androidScheme: 'https',
  },
};

export default config;
