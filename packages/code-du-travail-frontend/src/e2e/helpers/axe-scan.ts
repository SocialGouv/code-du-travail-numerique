import AxeBuilder from "@axe-core/playwright";
import type { Page } from "@playwright/test";

/** Axe-core violation result for a single page. */
export type PageAuditResult = {
  url: string;
  label: string;
  violations: Array<{
    id: string;
    impact: string;
    description: string;
    helpUrl: string;
    wcagTags: string[];
    nodes: Array<{
      target: string[];
      failureSummary: string;
    }>;
  }>;
  passesCount: number;
  incompleteCount: number;
};

type AxeAnalyzeResult = Awaited<ReturnType<AxeBuilder["analyze"]>>;

/** Run axe-core WCAG 2.1 AA audit on the current page. */
export async function scanPage(
  page: Page,
  label: string
): Promise<PageAuditResult> {
  const results: AxeAnalyzeResult = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "best-practice"])
    .analyze();

  return {
    url: page.url(),
    label,
    violations: results.violations.map((v) => ({
      id: v.id,
      impact: v.impact ?? "unknown",
      description: v.description,
      helpUrl: v.helpUrl,
      wcagTags: v.tags.filter((t) => t.startsWith("wcag")),
      nodes: v.nodes.map((n) => ({
        target: n.target.map(String),
        failureSummary: n.failureSummary ?? "",
      })),
    })),
    passesCount: results.passes.length,
    incompleteCount: results.incomplete.length,
  };
}
