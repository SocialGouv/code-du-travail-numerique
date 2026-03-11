import { expect, Page } from "@playwright/test";

function stripQuery(url: string): string {
  return url.split("?")[0];
}

function resolveWithBaseUrl(page: Page, path: string): string {
  const baseURL = process.env.TEST_BASEURL ?? "http://localhost:3000";
  return new URL(path, baseURL).toString();
}

export async function expectUrlEqual(page: Page, path: string): Promise<void> {
  expect(stripQuery(page.url())).toBe(
    stripQuery(resolveWithBaseUrl(page, path))
  );
}

export async function expectTitleAndMetaDescriptionEqual(
  page: Page,
  title: string,
  description: string
): Promise<void> {
  await expect(page).toHaveTitle(title);
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    "content",
    description
  );
}

export async function expectCanonicalUrlEqual(
  page: Page,
  path: string
): Promise<void> {
  const canonical = page.locator('link[rel="canonical"]');
  await expect(canonical).toHaveCount(1);

  const href = await canonical.getAttribute("href");
  expect(href).not.toBeNull();
  expect(stripQuery(href as string)).toBe(
    stripQuery(resolveWithBaseUrl(page, path))
  );
}

export async function expectNoIndex(page: Page): Promise<void> {
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    "content",
    "noindex,nofollow"
  );
}

export async function expectIndexable(page: Page): Promise<void> {
  await expect(page.locator('meta[name="robots"]')).toHaveCount(0);
}
