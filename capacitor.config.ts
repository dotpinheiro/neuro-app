import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.mycareassist.io',
  appName: 'MyCareAssist',
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
