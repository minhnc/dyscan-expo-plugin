import type {
  AndroidConfig,
  ExportedConfigWithProps,
} from "@expo/config-plugins";

export const appendContentsToConfig = (
  newConfig: ExportedConfigWithProps<AndroidConfig.Paths.GradleProjectFile>,
  appendId: string,
  newContents: string,
) => {
  let { contents } = newConfig.modResults;
  // Don't add this twice
  if (!contents.includes(appendId)) {
    contents += newContents;
    newConfig.modResults.contents = contents;
  }
  return newConfig;
};
