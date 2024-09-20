import type { ConfigPlugin } from "@expo/config-plugins";
import { withDangerousMod } from "@expo/config-plugins";
import * as eol from "eol";
import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";

const withDyScanPod: ConfigPlugin = (config) => {
  return withDangerousMod(config, [
    "ios",
    (cfg) => {
      const { platformProjectRoot } = cfg.modRequest;
      const podfile = resolve(platformProjectRoot, "Podfile");
      const contents = readFileSync(podfile, "utf-8");

      const lines = eol.split(contents);
      const index = lines.findIndex((line: string) =>
        /\s+use_expo_modules!/.test(line),
      );

      writeFileSync(
        podfile,
        [
          ...lines.slice(0, index + 2),
          `  pod 'DyScan', :podspec => '../node_modules/@dyneti/react-native-dyscan/specs/DyScan.podspec'`,
          ...lines.slice(index + 2),
        ].join("\n"),
      );

      return cfg;
    },
  ]);
};

const withDyScanIOS: ConfigPlugin = (config) => {
  // Mods for ios: https://docs.dyneti.com/react-native-integration-guide#linking-for-ios
  config = withDyScanPod(config);

  return config;
};

export default withDyScanIOS;
