export function slugify(text: string) {
  const a =
    "àáäâãåăæąçćčđďèéěėëêęğǵḧìíïîįłḿǹńňñòóöôøṕŕřßşśšșťțùúüûǘůűūųẃẍÿýźžż·/_:;()";
  const b =
    "aaaaaaaaacccddeeeeeeegghiiiiilmnnnnoooooprrsssssttuuuuuuuuuwxyyzzz-------";
  const p = new RegExp(`[${a}]`, "g");

  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(p, (c) => b.charAt(a.indexOf(c))) // Replace special characters
    .replace(/\./g, "-") // Replace . with '-'
    .replace(/&/g, "-et-") // Replace & with ''
    .replace(/œ/g, "oe") // Replace & with 'and'
    .replace(/[^\w-]+/g, "") // Remove all non-word characters
    .replace(/--+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
}
