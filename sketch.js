let nameInput;
let phoneInput;
let companyInput;

let selectedLanguage = "en";

let placeholderEN = [
  "Your Information",
  "Name (required)",
  "Phone (required)",
  "Company (optional)",
  "CONFIRM"
];

let placeholderZH = [
  "您的資訊",
  "姓名（必填）",
  "電話（必填）",
  "公司名稱（選填）",
  "確認送出"
];

let activeInput = null;

function setup() {

  createCanvas(windowWidth, windowHeight);

  textAlign(CENTER, CENTER);
  textFont("Arial");

  createInputs();

}


function draw() {

  background(40, 100, 150);


  let placeholder;

  if (selectedLanguage === "en") {
    placeholder = placeholderEN;
  } else {
    placeholder = placeholderZH;
  }


  fill(255);

  textSize(50);
  text(
    placeholder[0],
    width/2,
    100
  );


  drawLabel(
    placeholder[1],
    width/2,
    180
  );

  drawLabel(
    placeholder[2],
    width/2,
    310
  );

  drawLabel(
    placeholder[3],
    width/2,
    440
  );


  // Confirm button

  fill(80);
  rectMode(CENTER);

  rect(
    width/2,
    680,
    300,
    80,
    15
  );


  fill(255);

  textSize(35);

  text(
    placeholder[4],
    width/2,
    680
  );

}


function createInputs(){

  let x = width/2 - 300;


  nameInput = createInput("");
  nameInput.position(x,220);
  nameInput.size(600,60);


  phoneInput = createInput("");
  phoneInput.position(x,350);
  phoneInput.size(600,60);

  // This gives iPad a number keyboard
  phoneInput.attribute(
    "type",
    "tel"
  );


  companyInput = createInput("");
  companyInput.position(x,480);
  companyInput.size(600,60);


  styleInputs();


}


function styleInputs(){

  let inputs = [
    nameInput,
    phoneInput,
    companyInput
  ];


  for(let i=0;i<inputs.length;i++){

    inputs[i].style(
      "font-size",
      "30px"
    );

    inputs[i].style(
      "text-align",
      "center"
    );

    inputs[i].style(
      "border-radius",
      "10px"
    );

    inputs[i].style(
      "background",
      "#444"
    );

    inputs[i].style(
      "color",
      "white"
    );

  }

}



function drawLabel(label,x,y){

  fill(255);

  textSize(25);

  text(
    label,
    x,
    y
  );

}



function mousePressed(){


  // confirm button

  if(
    mouseX > width/2-150 &&
    mouseX < width/2+150 &&
    mouseY > 640 &&
    mouseY < 720
  ){

    console.log(
      "NAME:",
      nameInput.value()
    );

    console.log(
      "PHONE:",
      phoneInput.value()
    );

    console.log(
      "COMPANY:",
      companyInput.value()
    );

  }

}



function windowResized(){

  resizeCanvas(
    windowWidth,
    windowHeight
  );

}