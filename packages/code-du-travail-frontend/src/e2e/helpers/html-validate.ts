import { HtmlValidate, type ConfigData } from "html-validate";
import type { Page } from "@playwright/test";

export const htmlValidateConfig: ConfigData = {
  rules: {
    "heading-level": "error",
    "require-sri": "off",
    "valid-id": "off",
    "no-dup-id": "off",
    "prefer-native-element": "off",
    "no-implicit-button-type": "off",
    "aria-label-misuse": "off",
    "long-title": "off",
    "script-type": "off",
    "wcag/h63": "off",
    "no-redundant-role": "off",
    "no-missing-references": "off",
  },
};

export async function validateHtml(
  page: Page,
  config: ConfigData = htmlValidateConfig
): Promise<void> {
  const html = await page.content();
  const htmlValidate = new HtmlValidate(config);
  const report = await htmlValidate.validateString(html);

  if (!report.valid) {
    const errors = report.results
      .flatMap((r) => r.messages)
      .filter((m) => m.severity >= 2)
      .map((m) => `  [${m.ruleId}] ${m.message} (line ${m.line})`)
      .join("\n");

    if (errors) {
      throw new Error(
        `HTML validation failed for ${page.url()}:\n${errors}`
      );
    }
  }
}
