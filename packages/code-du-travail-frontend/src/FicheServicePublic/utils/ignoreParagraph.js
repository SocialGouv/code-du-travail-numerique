const ignoreParagraph = children =>
  children.map(child => {
    if (child.name === "Paragraphe") {
      return child.$;
    }
    return child;
  });

export default ignoreParagraph;
