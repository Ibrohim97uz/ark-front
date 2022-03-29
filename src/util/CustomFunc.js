export function arrayToTree(array, getId, getParentId, subItemFiled) {
  let nodesById = {}, roots = [];
  if (array && array.length !== 0) {
    array.forEach(function (n) {
      nodesById[n[getId]] = {...n, [subItemFiled]: []};
      if (n[getParentId] === null) {
        roots.push(nodesById[n[getId]]);
      }
    });

    array.forEach(function (n) {
      let node = nodesById[n[getId]];
      if (n[getParentId] === null) {
        return;
      }
      let parent = nodesById[n[getParentId]];

      parent[subItemFiled].push(node);
    });

    array.forEach(function (n) {
      if (nodesById[n[getId]][subItemFiled].length === 0) {
        delete nodesById[n[getId]][subItemFiled];
      }
    });
  }
  return roots;
}




export function validatingJSON (json) {
  let checkedjson =false
  try {
    checkedjson = JSON.parse(json)
  } catch (e) {
  }
  return checkedjson
}

