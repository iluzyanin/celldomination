class CellModel {
  constructor(top, right, bottom, left, player) {
    this.top = top;
    this.right = right;
    this.bottom = bottom;
    this.left = left;
    this.player = player;
  }

  get isActive() {
    return this.top === 2 && this.right === 2 && this.bottom === 2 && this.left === 2;
  }

  get hasMove() {
    return this.getOpenBorders().length > 0;
  }

  getOpenBorders() {
    const openBorders = [];
    if (this.top === 1) openBorders.push(0);
    if (this.right === 1) openBorders.push(1);
    if (this.bottom === 1) openBorders.push(2);
    if (this.left === 1) openBorders.push(3);

    return openBorders;
  }

  clone() {
    return new CellModel(this.top, this.right, this.bottom, this.left, this.player);
  }
}

export default CellModel;