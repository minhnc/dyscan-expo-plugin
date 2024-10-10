import type { ConfigPlugin } from 'expo/config-plugins';
import { withDangerousMod } from 'expo/config-plugins';
import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

const withDyScanPod: ConfigPlugin = (config) => {
  return withDangerousMod(config, [
    'ios',
    (cfg) => {
      const { platformProjectRoot } = cfg.modRequest;
      const podfile = resolve(platformProjectRoot, 'Podfile');
      let contents = readFileSync(podfile, 'utf-8');

      const regUseExpo = /(\buse_native_modules!)/;
      contents = contents.replace(
        regUseExpo,
        `$1\n
  # Start-Adding DyScan.podspec
  pod 'DyScan', :podspec => '../node_modules/@dyneti/react-native-dyscan/specs/DyScan.podspec'
  # End-Adding DyScan.podspec`
      );

      const regPostInstall = /(\bpost_install do \|installer\|)/;
      contents = contents.replace(
        regPostInstall,
        `$1
    # Start-Stripping bitcode in DyScan
    bitcode_strip_path = \`xcrun --find bitcode_strip\`.chop!
    def strip_bitcode_from_framework(bitcode_strip_path, framework_relative_path)
      framework_path = File.join(Dir.pwd, framework_relative_path)
      command = "#{bitcode_strip_path} #{framework_path} -r -o #{framework_path}"
      puts "Stripping bitcode: #{command}"
      system(command)
    end

    framework_paths = [
      "Pods/DyScan/Universal/DyScan.xcframework/ios-arm64/DyScan.framework/DyScan",
    ]

    framework_paths.each do |framework_relative_path|
      strip_bitcode_from_framework(bitcode_strip_path, framework_relative_path)
    end
    # End-Stripping bitcode in DyScan\n`
      );

      writeFileSync(podfile, contents);

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
