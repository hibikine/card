class MockImageData {
  constructor() {
    this.height = 16;
    this.width = 16;
    this.data = new Array(this.width * this.height).fill(0);
  }
}

class MockContext {
  set fillStyle(value) {}
  fillRect(x, y, width, height) {}
  drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh) {}
  getImageData(sx, sy, sw, sh) { return new MockImageData(); }
}

HTMLCanvasElement.prototype.getContext = (contextType) => {
  return new MockContext();
};
