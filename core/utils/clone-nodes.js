export default function cloneNodes(nodes) {
  const clones = [];

  for(let index = 0; index < nodes.length; index++) {
    if(nodes[index]) {
      clones.push(nodes[index].cloneNode(true));
    } else {
      clones.push(nodes[index]);
    }
  }

  return clones;
};