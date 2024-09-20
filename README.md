# Expo plugin for @dyneti/react-native-dyscan

This plugin allows you to use @dyneti/react-native-dyscan in Expo mobile app.

For additional context and details about this plugin, check out this [post](https://medium.com/@minhnc/dyscan-credit-card-scanner-in-expo-7d20742bd51b).

### Add the package to your npm dependencies

```
npx expo install dyscan-expo-plugin
```

### Configuration in app.json/app.config.js
https://docs.dyneti.com/react-native-integration-guide#linking-for-android

```
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
