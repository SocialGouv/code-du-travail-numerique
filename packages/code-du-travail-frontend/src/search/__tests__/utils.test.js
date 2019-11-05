import { SOURCES } from "@cdt/sources";
import { groupBySource, groupByDisplayCategory } from "../utils";

const initialData = [
  { _source: { source: SOURCES.THEMES } },
  { _source: { source: SOURCES.THEMES } },
  { _source: { source: SOURCES.CDT } },
  { _source: { source: SOURCES.SHEET_MT } },
  { _source: { source: SOURCES.SHEET_SP } },
  { _source: { source: SOURCES.CDT } },
  { _source: { source: SOURCES.EXTERNALS } },
  { _source: { source: SOURCES.CDT } },
  { _source: { source: SOURCES.TOOLS } },
  { _source: { source: SOURCES.SHEET_MT } }
];

describe("search utils", () => {
  it("groups by source", () => {
    const result = groupBySource(initialData);
    expect(result[SOURCES.THEMES].length).toBe(2);
    expect(result[SOURCES.CDT].length).toBe(3);
    expect(result[SOURCES.SHEET_MT].length).toBe(2);
    expect(result[SOURCES.SHEET_SP].length).toBe(1);
    expect(result[SOURCES.TOOLS].length).toBe(1);
    expect(result[SOURCES.EXTERNALS].length).toBe(1);
  });
  it("groups by display category", () => {
    const result = groupByDisplayCategory(initialData);
    expect(result.matches.length).toBe(5);
    expect(result.law.length).toBe(3);
    expect(result.themes.length).toBe(2);
  });
});
