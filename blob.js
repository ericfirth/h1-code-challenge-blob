const sample = `0000000000
0011100000
0011111000
0010001000
0011111000
0000101000
0000101000
0000111000
0000000000
0000000000`;

class Blob {
  constructor(string) {
    this.matrix = this.toMatrix(string);
  }

  toMatrix(string) {
    const rows = string.split('\n');
    const intoArrayOfBooleans = row => row.split('').map(entry => parseInt(entry));

    return rows.map(intoArrayOfBooleans);
  }

  isHit(x, y) {
    return this.matrix[x][y] === 1;
  }
}

// first thought was to go around the sides and get each one, one by one, getting each side

class AroundTheSidesSolution {
  constructor(blob) {
    this.blob = blob;
    this.cellReads = [];
    this.cordinates = {};
    this.init();
  }

  findSide(side) {
    for (let a = 0; a < 10; a++) {
      for (let b = 0; b < 10; b++) {
        let [x, y] = this.findCoordinates(a, b, side);
        if (!this.cellReads.includes([x, y])) {
          this.cellReads.push([x, y]);
          if (blob.isHit(x, y)) {
            return ['left', 'right'].includes(side) ? y : x;
          }
        }
      }
    }
  }

  findCoordinates(x, y, side) {
    switch (side) {
      case 'top':
        return [x, y];
      case 'bottom':
        return [9 - x, y];
      case 'left':
        return [y, x];
      case 'right':
        return [9 - y, 9 - x];
    }
  }

  init() {
    const coordinates = ['top', 'left', 'bottom', 'right'].reduce((obj, side) => {
      obj[side] = this.findSide(side);
      return obj;
    }, {});

    console.log('Cell Reads:', this.cellReads.length);
    console.log('Top:', coordinates.top);
    console.log('Left:', coordinates.left);
    console.log('Bottom:', coordinates.bottom);
    console.log('Right:', coordinates.right);
  }
}

// const blob = new Blob(sample);
// const solution = new AroundTheSidesSolution(blob);

// okay so this is ugly _and_ it takes 93 tries, but its not the worst thing ever
// it seems like i am testing too many so i decided i might be able to use each number to not have to go through everything.
// unfortunately the refactoring would be such that i think you'd lose what i did

class EnhancedAroundTheSidesSolution {
  constructor(blob) {
    this.blob = blob;
    this.top = 0;
    this.bottom = 9;
    this.left = 0;
    this.right = 9;
    this.cellReads = [];
    this.run();
  }

  run() {
    this.findTop();
    this.findLeft();
    this.findBottom();
    this.findRight();
    console.log('Cell Reads:', this.cellReads.length);
    console.log('Top', this.top);
    console.log('Left', this.left);
    console.log('Bottom', this.bottom);
    console.log('Right', this.right);
  }

  findTop() {
    for (let x = this.top; x < this.bottom; x++) {
      for (let y = this.left; y < this.right; y++) {
        this.cellReads.push([x, y]);
        if (this.blob.isHit(x, y)) {
          this.top = x;
          return;
        }
      }
    }
  }

  findLeft() {
    for (let y = this.left; y < this.right; y++) {
      for (let x = this.top; x < this.bottom; x++) {
        this.cellReads.push([x, y]);
        if (this.blob.isHit(x, y)) {
          this.left = y;
          return;
        }
      }
    }
  }

  findBottom() {
    for (let x = this.bottom; x > this.top; x--) {
      for (let y = this.left; y < this.right; y++) {
        this.cellReads.push([x, y]);
        if (this.blob.isHit(x, y)) {
          this.bottom = x;
          return;
        }
      }
    }
  }

  findRight() {
    for (let y = this.right; y > this.left; y--) {
      for (let x = this.top; x < this.bottom; x++) {
        this.cellReads.push([x, y]);
        if (this.blob.isHit(x, y)) {
          this.right = y;
          return;
        }
      }
    }
  }
}

const blob = new Blob(sample);
const solution = new EnhancedAroundTheSidesSolution(blob);

// My solution! looks better and 23 less steps.
