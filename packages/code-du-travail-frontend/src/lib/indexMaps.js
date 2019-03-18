// cf tests to understand the output

const buildIndexMap = (node, index) => {
  if (node.children) {
    const children = {};
    node.children.forEach(
      (child, childIdx) =>
        (children[child.data.id] = buildIndexMap(child, childIdx))
    );
    if (index != undefined) {
      return { index, children };
    } else {
      return { children };
    }
  } else {
    return { index };
  }
};

const getIndexesFromIds = (idList, indexMap) => {
  let currentNode = indexMap;
  const indexes = [];
  idList.forEach(id => {
    currentNode = currentNode.children[id];
    indexes.push(currentNode.index);
  });
  return indexes;
};

const buildNestedAccessor = (value, indexes) => {
  const indexesCopy = [...indexes];
  const currentIdx = indexesCopy.shift();
  if (indexesCopy.length > 0) {
    return {
      children: { [currentIdx]: buildNestedAccessor(value, indexesCopy) }
    };
  } else {
    return { children: { [currentIdx]: value } };
  }
};

export { buildIndexMap, getIndexesFromIds, buildNestedAccessor };
