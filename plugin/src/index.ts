import type { ConfigPlugin } from "@expo/config-plugins";
import { createRunOncePlugin } from "@expo/config-plugins";

import withDyScanAndroid from "./with-dyscan-android";
import withDyScanIOS from "./with-dyscan-ios";

const pkg = require("../../package.json");

const withDyScan: ConfigPlugin<{ username: string; password: string }> = (
  config,
  { username, password },
) => {
  config = withDyScanIOS(config);
  config = withDyScanAndroid(config, { username, password });
  return config;
};

export default createRunOncePlugin(withDyScan, pkg.name, pkg.version);
