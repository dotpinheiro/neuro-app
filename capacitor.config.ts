import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.neuroapp.io',
  appName: 'neuro-app',
  webDir: 'www',
  plugins: {
    LocalNotification: {
      "sound": "sound.mp3"
    },
    PushNotifications: {
      presentationOptions: ["badge", "sound", "alert"]
    },
    CapacitorCookies: {
      "enabled": true
    },
    CapacitorHttp: {
      "enabled": true
    },
  }
};

export default config;
