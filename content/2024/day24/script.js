function isTreesSynchronized(tree1, tree2) {
  if (!tree1 && !tree2) return [true, null]
  if (!tree1 || !tree2 || tree1.value !== tree2.value) {
    return [false, tree1 ? tree1.value : null]
  }

  const [leftRightSync] = isTreesSynchronized(tree1.left, tree2.right)
  const [rightLeftSync] = isTreesSynchronized(tree1.right, tree2.left)

  return [leftRightSync && rightLeftSync, tree1.value]
}

isTreesSynchronized(
  { value: 'a', left: { value: 'b', left: null, right: null }, right: { value: 'c', left: null, right: null } },
  { value: 'a', left: { value: 'c', left: null, right: null }, right: { value: 'b', left: null, right: null } }
)
