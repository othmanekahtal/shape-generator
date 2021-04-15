"use strict";

function setup() {
  canvas = createCanvas(650, 650);
  canvas.parent("area");
  background("white");
}

class shape {
  center = [325, 325];
  constructor(fill, strk_width, strk_color) {
    this.stroke_width = strk_width;
    this.stroke_color = strk_color;
    this.fill = fill;
  }
  set stroke_width_(stroke_width) {
    this.stroke_width = stroke_width;
  }
  set fill_(fill) {
    this.fill = fill;
  }
  set stroke_color_(strk_color) {
    this.stroke_color = strk_color;
  }
}
class Square extends shape {
  constructor(width) {
    super();
    this.width = width;
    this.center = [350 - this.width, 350 - this.width];
  }
  draw() {
    stroke(this.stroke_color);
    fill(this.fill);
    strokeWeight(this.stroke_width);
    square(...this.center, +this.width);
  }
}

class Circle extends shape {
  constructor(r) {
    super();
    this.diameter = r * 2;
  }
  draw() {
    stroke(this.stroke_color);
    fill(this.fill);
    strokeWeight(this.stroke_width);
    circle(...this.center, this.diameter);
  }
}

let draw = document.querySelector(".draw");
let selected_shape = document.getElementById("select-shape");
let colorPickerFill = document.getElementById("select-color");
let strokeWidth = document.getElementById("select-stroke_width");
let shapeObj;
let strokeColor = document.getElementById("select-stroke_color");

selected_shape.addEventListener("click", function () {
  console.log(this.value);
  switch (this.value) {
    case "Square":
      shapeObj = new Square(50);
      break;
    case "Circle":
      shapeObj = new Circle(50);
      break;
  }
  console.log(shapeObj);
});

colorPickerFill.addEventListener("change", function (event) {
  shapeObj.fill = event.target.value;
});

strokeWidth.addEventListener("change", function () {
  shapeObj.stroke_width = this.value;
});

strokeColor.addEventListener("change", function (event) {
  shapeObj.stroke_color = event.target.value;
});

draw.addEventListener("click", function () {
  if (!shapeObj) {
    switch (selected_shape.value) {
      case "Square":
        shapeObj = new Square(50);
        break;
      case "Circle":
        shapeObj = new Circle(50);
        break;
    }
  }
  if (!shapeObj.fill) {
    shapeObj.fill = colorPickerFill.value;
  }
  if (!shapeObj.stroke_width) {
    shapeObj.stroke_width = this.value || 1;
  }
  if (!shapeObj.stroke_color) {
    shapeObj.stroke_color = strokeColor.value;
  }
  shapeObj.draw();
});
