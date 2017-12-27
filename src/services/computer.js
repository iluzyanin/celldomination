function computeMove(rows) {
  const availableMoves = [];
  const size = rows.length;
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      const cell = rows[i][j];
      if (cell.player !== undefined) {
        continue;
      }

      const openBorders = cell.getOpenBorders();
      if (openBorders.length === 1) {
        return {row: i, column: j, border: openBorders[0]};
      }

      if (openBorders.length === 0) {
        continue;
      }

      for (let k = 0; k < openBorders.length; k++) {
        const isLowPriority = openBorders.length === 2 ||
          (i > 0 && openBorders[k] === 0 && rows[i - 1][j].getOpenBorders().length === 2) ||
          (j < size - 1 && openBorders[k] === 1 && rows[i][j + 1].getOpenBorders().length === 2) ||
          (i < size - 1 && openBorders[k] === 2 && rows[i + 1][j].getOpenBorders().length === 2) ||
          (j > 0 && openBorders[k] === 3 && rows[i][j - 1].getOpenBorders().length === 2);
        availableMoves.push({
          row: i,
          column: j,
          border: openBorders[k],
          isLowPriority: isLowPriority
        });
      }
    }
  }

  if (availableMoves.length === 0) {
    return;
  }

  let randomMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
  const goodMoves = availableMoves.filter(cell => !cell.isLowPriority);
  if (goodMoves.length > 0) {
    randomMove = goodMoves[Math.floor(Math.random() * goodMoves.length)];
  }

  return { row: randomMove.row, column: randomMove.column, border: randomMove.border};
}

export default computeMove;