class CellModel {
    constructor(top, right, bottom, left) {
        this.top = top;
        this.right = right;
        this.bottom = bottom;
        this.left = left;
    }

    get isActive() {
        return this.top === 2 && this.right === 2 && this.bottom === 2 && this.left === 2;
    }
}

export default CellModel;