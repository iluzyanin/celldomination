import FieldModel from './FieldModel';
import CellModel from './CellModel';

describe('FieldModel', () => {
    describe('When calling buildRows method with 2', () => {
        let rows;
        beforeEach(() => {
            let fieldModel = new FieldModel();
            rows = fieldModel.buildRows(2);
        });

        test('Should create rows with 4 rows', () => {
            expect(rows.length).toBe(4);
        });

        test('Should create rows with 4 columns', () => {
            expect(rows[0].length).toBe(4);
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
});