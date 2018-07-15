import { buildRows, getCellNeighbours } from './field-model';
import CellModel from './cell-model';

describe('FieldModel', () => {
  describe('When calling buildRows method with 0', () => {
    let rows;
    beforeEach(() => {
      rows = buildRows(0);
    });
    test('Should create field with 0 rows', () => {
      expect(rows).toHaveLength(0);
    });
  });

  describe('When calling buildRows method with 2', () => {
    let rows;
    beforeEach(() => {
      rows = buildRows(2);
    });

    test('Should create field with 4 rows', () => {
      expect(rows).toHaveLength(4);
    });

    test('Should create field with 4 columns', () => {
      expect(rows[0]).toHaveLength(4);
    });

    test('Should create correct cells', () => {
      expect(rows).toEqual([
        [new CellModel(0, 2, 2, 0), new CellModel(2, 1, 1, 2), new CellModel(2, 2, 1, 1), new CellModel(0, 0, 2, 2)],
        [new CellModel(2, 1, 1, 2), new CellModel(1, 1, 1, 1), new CellModel(1, 1, 1, 1), new CellModel(2, 2, 1, 1)],
        [new CellModel(1, 1, 2, 2), new CellModel(1, 1, 1, 1), new CellModel(1, 1, 1, 1), new CellModel(1, 2, 2, 1)],
        [new CellModel(2, 2, 0, 0), new CellModel(1, 1, 2, 2), new CellModel(1, 2, 2, 1), new CellModel(2, 0, 0, 2)]
      ]);
    });
  });

  describe('When calling getCellNeighbours method with 2, 2', () => {
    let neighbours;
    beforeEach(() => {
      neighbours = getCellNeighbours(2, 2);
    });

    test('Should return 4 neighbours', () => {
      expect(neighbours).toHaveLength(4);
    });

    test('Should return neighbours for cell at row 2, column 2', () => {
      expect(neighbours).toEqual([{
        borderName: 'top',
        nextRow: 1,
        nextColumn: 2
      }, {
        borderName: 'right',
        nextRow: 2,
        nextColumn:  3
      }, {
        borderName: 'bottom',
        nextRow: 3,
        nextColumn: 2
      }, {
        borderName: 'left',
        nextRow: 2,
        nextColumn: 1
      }]);
    });
  });
});