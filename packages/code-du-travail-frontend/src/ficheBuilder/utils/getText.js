export default function getText(element = { text: "" }, joint = " ") {
  if (element.type === "text") {
    return element.$.trim();
  }
  if (element.$) {
    return element.$.map(child => getText(child, joint)).join(joint);
  }
  return "";
}
