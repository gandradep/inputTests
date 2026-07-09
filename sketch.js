let nameInput;
let phoneInput;
let companyInput;


function setup() {

  createCanvas(windowWidth, windowHeight);

  createInputs();

  textAlign(CENTER, CENTER);
}



function draw() {

  background(40,100,150);

  fill(255);

  textSize(width*0.045);

  text(
    "Your Information",
    width/2,
    height*0.12
  );


  drawLabel(
    "Name (required)",
    height*0.22
  );

  drawLabel(
    "Phone (required)",
    height*0.37
  );

  drawLabel(
    "Company (optional)",
    height*0.52
  );


  fill(80);

  rectMode(CENTER);

  rect(
    width/2,
    height*0.82,
    width*0.3,
    height*0.1,
    15
  );


  fill(255);

  textSize(width*0.03);

  text(
    "CONFIRM",
    width/2,
    height*0.82
  );

}



function drawLabel(label,y){

  fill(255);

  textSize(width*0.025);

  text(
    label,
    width/2,
    y
  );

}



function createInputs(){

  let inputWidth = width*0.55;
  let inputHeight = height*0.08;


  nameInput = createInput("");

  nameInput.size(
    inputWidth,
    inputHeight
  );

  nameInput.position(
    width/2-inputWidth/2,
    height*0.27
  );


  phoneInput = createInput("");

  phoneInput.attribute(
    "type",
    "tel"
  );

  phoneInput.size(
    inputWidth,
    inputHeight
  );

  phoneInput.position(
    width/2-inputWidth/2,
    height*0.42
  );


  companyInput = createInput("");

  companyInput.size(
    inputWidth,
    inputHeight
  );

  companyInput.position(
    width/2-inputWidth/2,
    height*0.57
  );



  let inputs=[
    nameInput,
    phoneInput,
    companyInput
  ];


  for(let i=0;i<inputs.length;i++){

    inputs[i].style(
      "font-size",
      width*0.025+"px"
    );

    inputs[i].style(
      "text-align",
      "center"
    );

  }

}



function windowResized(){

  resizeCanvas(
    windowWidth,
    windowHeight
  );

}