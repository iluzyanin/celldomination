import CellModel from './CellModel';

describe('CellModel', () => {
  describe('When cell is not active', () => {
    [
      { borders: [0, 0, 0, 0], openCount: 0, hasMove: false },
      { borders: [1, 0, 0, 0], openCount: 1, hasMove: true },
      { borders: [0, 1, 0, 0], openCount: 1, hasMove: true },
      { borders: [0, 0, 1, 0], openCount: 1, hasMove: true },
      { borders: [0, 0, 0, 1], openCount: 1, hasMove: true },
      { borders: [1, 1, 1, 1], openCount: 4, hasMove: true },
      { borders: [2, 0, 0, 0], openCount: 0, hasMove: false },
      { borders: [0, 2, 0, 0], openCount: 0, hasMove: false },
      { borders: [0, 0, 2, 0], openCount: 0, hasMove: false },
      { borders: [0, 0, 0, 2], openCount: 0, hasMove: false },
    ].map((entry) => {
      let { borders, openCount, hasMove } = entry; 
      const cell = new CellModel(...borders);
      test('Should return false for isActive', () => {
        expect(cell.isActive).toBeFalsy();
      });
      test('Should return correct open borders', () => {
        expect(cell.getOpenBorders()).toHaveLength(openCount);
      });
      test('Should return correct hasMove status', () => {
        expect(cell.hasMove).toEqual(hasMove);
      });
    });
  });
  describe('When cell is active', () => {
    let cell;
    beforeEach(() => {
      cell = new CellModel(2, 2, 2, 2);
    });
    test('Should return true for isActive', () => {
      expect(cell.isActive).toBeTruthy();
    });
    test('Should return 0 open borders', () => {
      expect(cell.getOpenBorders()).toHaveLength(0);
    });
    test('Should return false for hasMove', () => {
      expect(cell.hasMove).toBeFalsy();
    });
  });
});