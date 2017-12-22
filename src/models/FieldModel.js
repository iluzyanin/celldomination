import CellModel from './CellModel';

function buildRows(halfSize) {
  const rows = [];
  for (let i = 0; i < halfSize * 2; i++) {
    const cells = [];
    for (let j = 0; j < halfSize * 2; j++) {
      if (i < halfSize) {
        if (j < halfSize - i - 2 ||
          j >= halfSize + i + 2) {
          cells.push(new CellModel());
          continue;
        }
        if (j === halfSize - i - 2) {
          cells.push(new CellModel(0, 2, 2, 0));
          continue;
        }
        if (j === halfSize - i - 1) {
          cells.push(new CellModel(2, 1, 1, 2));
          continue;
        }
        if (j === halfSize + i) {
          cells.push(new CellModel(2, 2, 1, 1));
          continue;
        }
        if (j === halfSize + i + 1) {
          cells.push(new CellModel(0, 0, 2, 2));
          continue;
        }
      }
      if (i === halfSize) {
        if (j === 0) {
          cells.push(new CellModel(1, 1, 2, 2));
          continue;
        }
        if (j === halfSize * 2 - 1) {
          cells.push(new CellModel(1, 2, 2, 1));
          continue;
        }
      }
      if (i > halfSize) {
        if (j < i - halfSize - 1 ||
          j > 3 * halfSize - i) {
          cells.push(new CellModel());
          continue;
        }
        if (j === i - halfSize - 1) {
          cells.push(new CellModel(2, 2, 0, 0));
          continue;
        }
        if (j === i - halfSize) {
          cells.push(new CellModel(1, 1, 2, 2));
          continue;
        }
        if (j === 3 * halfSize - i - 1) {
          cells.push(new CellModel(1, 2, 2, 1));
          continue;
        }
        if (j === 3 * halfSize - i) {
          cells.push(new CellModel(2, 0, 0, 2));
          continue;
        }
      }

      cells.push(new CellModel(1, 1, 1, 1));
    }

    rows.push(cells);
  }
  return rows;
}

function getCellNeighbours(row, column) {
  return [{
    borderName: 'top',
    nextRow: row - 1,
    nextColumn: column
  }, {
    borderName: 'right',
    nextRow: row,
    nextColumn: column + 1
  }, {
    borderName: 'bottom',
    nextRow: row + 1,
    nextColumn: column
  }, {
    borderName: 'left',
    nextRow: row,
    nextColumn: column - 1
  }];
}

export { buildRows, getCellNeighbours };