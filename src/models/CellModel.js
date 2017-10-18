class CellModel {
    constructor(top, right, bottom, left) {
        this.top = top;
        this.right = right;
        this.bottom = bottom;
        this.left = left;

        this.activateBorder = this.activateBorder.bind(this);
    }

    get isActive() {
        return this.top === 2 && this.right === 2 && this.bottom === 2 && this.left === 2;
    }

    activateBorder(borderIndex) {
        if (borderIndex === 0) {
            this.top = 2;
        }
        if (borderIndex === 1) {
            this.right = 2;
        }
        if (borderIndex === 2) {
            this.bottom = 2;
        }
        if (borderIndex === 3) {
            this.left = 2;
        }
    }
}

export default CellModel;