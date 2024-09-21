# Expo plugin for @dyneti/react-native-dyscan

This plugin allows you to use @dyneti/react-native-dyscan in Expo mobile app.

For additional context and details about this plugin, check out this [post](https://medium.com/@minhnc/dyscan-credit-card-scanner-in-expo-7d20742bd51b).

### Add the package to your npm dependencies

```
npx expo install dyscan-expo-plugin
```

### Configuration in app.json/app.config.js
https://docs.dyneti.com/react-native-integration-guide#linking-for-android

``` json
{
  "expo": {
    "plugins": [
      [
        "dyscan-expo-plugin",
        {
          "username": "nexusUsername",
          "password": "nexusPassword"
        }
      ]
    ]
  }
}
```

### Example

``` typescript

import { DyScan, DyScanModule } from '@dyneti/react-native-dyscan';
import { Env } from '@env';
import { useEffect } from 'react';


export const useScanCard = () => {
  useEffect(() => {
    DyScan.init({
      apiKey: Env.DYSCAN_API_KEY,
    });
  }, []);

  const scanCard = async () => {
    const isSupported = await DyScan.isDeviceSupported();

    if (!isSupported) {
      console.log('DyScan - device does not support');
      return null;
    }

    try {
      const card = await DyScanModule.scanCard({
        showDynetiLogo: false,
        helperTextFontFamily: 'inter',
        helperTextString: 'Your card will be scanned automatically',
        helperTextSize: 14,
        helperTextColor: '#F5F5F7',
        bgColor: '#2D2D2D',
        bgOpacity: 0.8,
        cornerInactiveColor: '#FFFFFF',
        cornerCompletedColor: '#F5F5F7',
        lightTorchWhenDark: false,
        vibrateOnCompletion: true,
      });

      return card;
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  return scanCard;
};
```
