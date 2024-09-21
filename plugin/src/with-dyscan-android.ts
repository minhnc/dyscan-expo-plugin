import type { ConfigPlugin } from "@expo/config-plugins";
import { withProjectBuildGradle } from "@expo/config-plugins";

import { appendContentsToConfig } from "./utils";

const GRADLE_APPEND_ID = "dyscan-expo-plugin";
const generateGradle = (username: string, password: string) => {
  return `
// start-${GRADLE_APPEND_ID}
allprojects {
    repositories {
        maven {
            credentials  {
                username = "${username}"
                password = "${password}"
            }
            url "https://nexus.dyneti.com/repository/maven-releases/"
            authentication {
                basic(BasicAuthentication)
            }
        }
    }
}
// end-${GRADLE_APPEND_ID}
`;
};

const withDyScanAndroid: ConfigPlugin<{
  username: string;
  password: string;
}> = (config, { username, password }) => {
  // Mods for android: https://docs.dyneti.com/react-native-integration-guide#linking-for-android
  config = withProjectBuildGradle(config, (newConfig) => {
    return appendContentsToConfig(
      newConfig,
      GRADLE_APPEND_ID,
      generateGradle(username, password),
    );
  });

  return config;
};

export default withDyScanAndroid;
