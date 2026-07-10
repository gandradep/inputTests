const ATTRACT = 0;
const LANGUAGE = 1;
const FILTRO = 2;
const GETINFO = 3;
const HISTORY = 4;
const AFTERINFO = 5;
let currentState=ATTRACT;
let productImg=[],currentSlide=1;
let userType=[];
let logo, venado, dragon,home,menuImg;
let slideDuration=3000,lastSlideChange=0;
let attractManual=false;
let timeoutDuration = 120000;
let lastInteraction;
let selectedLanguage="en";
let langIndex, langImg;
let xtra = 0;
let productInfoENG,productInfoZH;
let beigeDorado, amarillo, cyan, violeta;
let welcomeEN=[
  "Welcome",
  "Welcome to",
  "Welcome to the",
  "Welcome to the world",
  "Welcome to the world of..."
];
let welcomeZH=[
  "歡迎",
  "歡迎來到",
  "歡迎來到咖啡",
  "歡迎來到咖啡的世界",
  "歡迎來到咖啡的世界..."
];
let titleStep = 0;
let titleLanguage = 0;
let titleLastChange = 0;
let titleInterval = 1000;
let lastClick=0;
//filtro vars
const filtroEN = [
  ["Who are you?"],
  ["Coffee Enthusiast", "Roaster", "Producer", "Business Owner"]
];

const filtroZH = [
  ["你是誰？"],
  ["咖啡愛好者", "烘豆師", "生產者", "企業經營者"]
];
let selectedProfile;
let historyENG, historyZH;
let historyPage;

let nameInput,phoneInput, companyInput;
let formMessage = "";
let sheetURL = "https://script.google.com/macros/s/AKfycbyTbt20eEjTiQKsufJsQmOTuIPuaGHyqFpm90IcS7at6mH8CdRjXQW0Bt6c192iQz33/exec"


function preload(){

  for(let i=0;i<7;i++)productImg[i]=loadImage("assets/coffee"+(i+1)+".png");
  for(let i=0;i<4;i++)userType[i]=loadImage("assets/filtro"+(i)+".png");
  logo = loadImage("assets/logo.png");
  venado = loadImage("assets/venado.png");
  dragon = loadImage("assets/dragon.png");
  home = loadImage("assets/home.png");
  menuImg = loadImage("assets/menuImg.png");

  productInfoENG=loadJSON("assets/productInfoENG.json");
  productInfoZH=loadJSON("assets/productInfoZH.json");
  historyENG = loadJSON("assets/historyENG.json");
  historyZH = loadJSON("assets/historyZH.json");
}


function setup(){

  createCanvas(windowWidth,windowHeight);

  beigeDorado=color(205,177,115);
  amarillo = color (239, 127, 0);
  cyan=color(22, 136, 194);
  violeta=color(226, 45, 81);

  textAlign(CENTER,CENTER);

  lastSlideChange=millis();
  lastInteraction=millis();
  createInputs();
  hideInputs();
}


function draw(){
  // background(0);
  if(currentState != ATTRACT && millis()-lastInteraction > timeoutDuration){
    currentState = ATTRACT;
    attractManual = false;
  }
  if(currentState == ATTRACT && attractManual &&
     millis()-lastInteraction > timeoutDuration){
    attractManual = false;
    currentSlide = 1;
    lastSlideChange = millis();
  }
   if(currentState==GETINFO){
    showInputs();
  }else{
    hideInputs();
  }

  switch(currentState){
    case ATTRACT:
      drawAttract();
      break;
    case LANGUAGE:
      drawLanguage();
      break;
    case FILTRO:
      drawFiltro();
      break;
    case GETINFO:
      drawGetInfo();
      break;
    case HISTORY:
      drawHistory();
      break;
    case AFTERINFO:
      drawAfterInfo();
      break;
  }
  drawFooterNav();
}


function drawAttract(){
  background(beigeDorado);
  if(!attractManual && millis()-lastSlideChange>slideDuration){
    currentSlide++;
    if(currentSlide>7) currentSlide=1;
    lastSlideChange=millis();
  }
  imageMode(CENTER);
  let img = productImg[currentSlide-1];

let imgW = width * 0.28;
let imgH = img.height * (imgW / img.width);

image(img, width*0.17, height*0.43, imgW, imgH);
  let label=selectedLanguage=="en"
    ? productInfoENG[currentSlide-1]
    : productInfoZH[currentSlide-1];
  fill(255);
  // TITLE
  textAlign(CENTER,TOP);
  textSize(width*.026);
  text(
    label[0],
    width/2,
    height*.07
  );
  // INFO
  textAlign(LEFT,TOP);
  textSize(width*.02);
  let x=width*.36;
  let y=height*.19;

  for(let i=1;i<label.length;i++){
    text(label[i],x,y);
    y+=label[i].split("\n").length*35+15;
  }

  // TOUCH MESSAGE
  // textAlign(CENTER,CENTER);
  // textSize(width*.03);
  // text(
  //   "TOUCH TO BEGIN",
  //   width/2,
  //   height*0.95
  // );
  if (attractManual) {
    drawAttractNavButtons();
  }

}
function drawLanguage(){
  background(amarillo);
  updateWelcomeAnimation();
  imageMode(CENTER);
  drawScaledImage(logo, width*0.5, height*0.45, width*0.7);

  fill(255);
  textAlign(CENTER,CENTER);
  textSize(width*0.08);
  if(titleLanguage == 0){
    text(welcomeEN[titleStep],width*0.5,height*0.15);
  }else{
    text(welcomeZH[titleStep],width*0.5,height*0.15);
  }
  // language buttons
  drawButton(width*0.28, height*0.73, width*0.26, height*0.12, "English",0.035);
  drawButton(width*0.72,height*0.73,width*0.26,height*0.12,"中文",0.035);
  push()
  translate(width*0.15, height*0.75,);
  rotate(radians(sin(xtra)*20))
  drawScaledImage(venado, 0,0, width*0.15);
  pop();
  push()
  rotate(radians(sin(xtra)))
  drawScaledImage(dragon, width*0.6, height*0.8, width*0.15);
  pop()
  xtra = xtra + 0.01;
}
function drawFiltro(){
  background(amarillo);
  imageMode(CENTER);
  push()
  let imgScale = sin(xtra)*30
  tint(255,180-imgScale)
  drawScaledImage(langImg, width*0.25, height*0.3, width*0.25+imgScale);
  xtra = 0.01 + xtra;

  let labels;
  let title;
  if (selectedLanguage === "en") {
    title = filtroEN[0][0];
    labels = filtroEN[1];
  } else {
    title = filtroZH[0][0];
    labels = filtroZH[1];
  }
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(width * 0.06);
  text(title, width * 0.25, height * 0.55);
  for (let i = 0; i < labels.length; i++) {
    drawButton(width*0.75,height*0.15+(i*height*0.18),width*0.28,height*0.12,labels[i],0.03);
    if (i%2==0) {
      drawScaledImage(userType[i], width*0.75-(width*0.15), height*0.15+(i*height*0.18), width*0.1);
    } else {
      drawScaledImage(userType[i], width*0.75+(width*0.15), height*0.15+(i*height*0.18), width*0.1);
    }
  }
  pop()
}
function drawHistory(){

  push();

  rectMode(CORNER);
  imageMode(CORNER);
  textStyle(NORMAL);

  background(filtroResponse);

  let page = selectedLanguage === "en"
    ? historyENG[historyPage-1]
    : historyZH[historyPage-1];

  fill(255);

  textAlign(CENTER,CENTER);
  textSize(width*0.04);
  text(page[0],width*0.5,height*0.12);


  textAlign(LEFT,TOP);
  textSize(width*0.028);

  let x = width*0.13;
  let y = height*0.3;

  let lineHeight = height*0.045;


  for(let i=1;i<page.length;i++){

    let bulletText = "• " + page[i];

    text(bulletText,x,y);

    let rows = page[i].split("\n").length;

    y += rows * lineHeight + height*0.05;
  }


  textAlign(CENTER,CENTER);
  textSize(width*0.022);

  const maxHistoryPages = 3;


  text(
    historyPage < maxHistoryPages
      ? (selectedLanguage==="en" ? "Tap to continue" : "點擊繼續")
      : (selectedLanguage==="en" ? "Continue to coffee varieties" : "繼續查看咖啡品種"),
    width*0.5,
    height*0.92
  );

  pop();
}
function drawGetInfo(){
  background(filtroResponse);
  fill(255);
  let title = selectedLanguage==="en" ? "Let's Connect Over Coffee" : "一起分享咖啡故事";
  let nameLabel = selectedLanguage==="en"
    ? "Name (required)"
    : "姓名（必填）";
  let phoneLabel = selectedLanguage==="en"
    ? "Phone (required)"
    : "電話（必填）";
  let companyLabel = selectedLanguage==="en"
    ? "Company (optional)"
    : "公司名稱（選填）";
  let confirmLabel = selectedLanguage==="en"
    ? "CONFIRM"
    : "確認送出";

  textSize(width*0.035);
  text(
    title,
    width*0.5,
    height*0.15
  );
  textSize(width*0.018);
  text(
    nameLabel,
    width*0.5,
    height*0.22
  );
  text(
    phoneLabel,
    width*0.5,
    height*0.36
  );
  text(
    companyLabel,
    width*0.5,
    height*0.50
  );
  fill(80);
  rectMode(CENTER);
  rect(
    width*0.5,
    height*0.78,
    width*0.26,
    height*0.1,
    15
  );
  fill(255);
  textSize(width*0.025);
  text(
    confirmLabel,
    width*0.5,
    height*0.78
  );
  fill(220);
textAlign(CENTER);
text(formMessage, width/2, height*0.7);
}
function drawAfterInfo(){

  background(filtroResponse);

  fill(255);
  textAlign(CENTER,CENTER);

  if(selectedLanguage==="en"){

    textSize(width*0.05);
    text("We'll be in touch!",width*0.5,height*0.15);

    textSize(width*0.03);
    text("What would you like to do next?",width*0.5,height*0.23);

    drawButton(width*0.5,height*0.45,width*0.4,height*0.1,"Know More About Us",0.025);

    drawButton(width*0.5,height*0.62,width*0.4,height*0.1,"View Coffee Menu",0.025);

  }else{

    textSize(width*0.05);
    text("我們會與您聯繫！",width*0.5,height*0.15);

    textSize(width*0.03);
    text("接下來您想做什麼？",width*0.5,height*0.23);

    drawButton(width*0.5,height*0.45,width*0.4,height*0.1,"了解更多",0.025);

    drawButton(width*0.5,height*0.62,width*0.4,height*0.1,"查看咖啡菜單",0.025);

  }
}

function mousePressed(){

  if(millis() - lastInteraction < 300) return;
  lastInteraction = millis();

   console.log("click", currentState);
   if (handleGlobalNav()) {
    console.log("nav");
    return;
  }
  if(currentState == ATTRACT){
    if (attractManual) {

  // LEFT arrow → previous
      if (insideButton(width*0.08,height*0.92,width*0.12,height*0.08)) {
        currentSlide--;
        if (currentSlide < 1) currentSlide = 7;
        lastSlideChange = millis();
        return;
      }
      // RIGHT arrow → next
      if (insideButton(width*0.92,height*0.92,width*0.12,height*0.08)) {
        currentSlide++;
        if (currentSlide > 7) currentSlide = 1;
        lastSlideChange = millis();
        return;
      }
    }
    currentState = LANGUAGE;
    return;
  }
  if (currentState == LANGUAGE) {

    if (insideButton(width*0.28, height*0.73,width*0.26, height*0.12)) {
      langIndex = 0;
      selectedLanguage = "en";
      langImg=venado;
      currentState = FILTRO;
      return;
    }

    if (insideButton(width*0.72, height*0.73,width*0.26, height*0.12)) {
      langIndex = 1;
      selectedLanguage = "zh";
      langImg=dragon;
      currentState = FILTRO;
      return;
    }
  }
  if (currentState === FILTRO) {

  const profiles = ["aficionado", "roaster", "producer", "business"];

  for (let i = 0; i < 4; i++) {

    if (insideButton(width*0.75,height*0.15+(i*height*0.18),width*0.28,height*0.12)) {

      selectedProfile = profiles[i];

      if (i === 0) {
        filtroResponse = cyan;
        currentState = HISTORY;
        historyPage = 1;
      } else {
        filtroResponse = violeta;
        currentState = GETINFO;
      }

      console.log(selectedProfile);
      return;
    }
  }
}
  if (currentState == HISTORY) {
      if (historyPage < 3) {
        historyPage++;
      } else {
        currentState = ATTRACT;
        attractManual=true;
        historyPage = 1;
      }

      return;
  }
  if(currentState === GETINFO){
    if(insideButton(width*0.5,height*0.78,width*0.26,height*0.1)){

      userName = nameInput.value().trim();
      userPhone = phoneInput.value().trim();
      userCompany = companyInput.value().trim();

      if(userName === "" || userPhone === ""){
         formMessage = selectedLanguage==="en"
    ? "Please enter your name and phone number"
    : "請輸入姓名和電話";
        return;
      }

      saveUserData();

      currentState = AFTERINFO;

      nameInput.value("");
      phoneInput.value("");
      companyInput.value("");
      formMessage = "";
      return;
    }
}
  if(currentState===AFTERINFO){
    if(insideButton(width*0.5,height*0.45,width*0.4,height*0.1)){
      currentState=HISTORY;
      historyPage=1;
      return;
    }
    if(insideButton(width*0.5,height*0.62,width*0.4,height*0.1)){
      currentState=ATTRACT;
      currentSlide=1;
      attractManual=true;
      lastSlideChange=millis();
      return;
    }
  }
}

function updateWelcomeAnimation(){
  if(millis()-titleLastChange > titleInterval){
    titleStep++;
    if(titleStep >= welcomeEN.length){
      titleStep = 0;
      titleLanguage++;
      if(titleLanguage > 1){
        titleLanguage = 0;
      }
    }
    titleLastChange = millis();
  }
}
function drawButton(x,y,w,h,label,sizePercent){

  fill(255);
  noStroke();
  ellipse(x,y,w,h);

  fill(25);
  textSize(width*sizePercent);
  textAlign(CENTER,CENTER);
  text(label,x,y);

}
function drawScaledImage(img, x, y, targetW) {
  let targetH = img.height * (targetW / img.width);
  image(img, x, y, targetW, targetH);
}
function insideButton(x, y, w, h) {
  let dx = mouseX - x;
  let dy = mouseY - y;

  return (dx * dx) / (w * w / 4) +
         (dy * dy) / (h * h / 4) <= 1;
}
function drawFooterNav() {

  if (currentState == ATTRACT || currentState == LANGUAGE) return;
  push();
  imageMode(CENTER);
  drawScaledImage(menuImg,width*0.1,height*0.9,width*0.085);
  drawScaledImage(home,width*0.9,height*0.9,width*0.085);
  pop();
}
function handleGlobalNav() {

  // NOT active in ATTRACT or LANGUAGE
  if (currentState === ATTRACT || currentState === LANGUAGE) {
    return false;
  }

  let btnSize = width * 0.085;

  // LEFT → ATTRACT
  if (insideButton(width*0.1, height* 0.9, btnSize, btnSize )) {

    currentState = ATTRACT;
    currentSlide = 1;
    attractManual = true;
    lastSlideChange = millis();

    return true;
  }

  // RIGHT → LANGUAGE
  if (insideButton(width*0.9, height* 0.9, btnSize, btnSize )) {

    currentState = LANGUAGE;
    return true;
  }

  return false;
}

function drawAttractNavButtons() {

  rectMode(CENTER);
  textAlign(CENTER, CENTER);

  let btnW = width * 0.12;
  let btnH = height * 0.08;
  let y = height * 0.92;

  fill(80, 30);
  rect(width * 0.08, y, btnW, btnH, 20);

  fill(255);
  textSize(width * 0.03);
  text("←", width * 0.08, y);

  fill(80, 30);
  rect(width * 0.92, y, btnW, btnH, 20);

  fill(255);
  textSize(width * 0.03);
  text("→", width * 0.92, y);
}

function createInputs(){

  let inputWidth = width*0.5;
  let inputHeight = height*0.07;

  nameInput = createInput("");
  phoneInput = createInput("");
  companyInput = createInput("");

  phoneInput.attribute("type","tel");

  let inputs=[nameInput, phoneInput, companyInput];

  for(let i=0;i<inputs.length;i++){

    inputs[i].size(inputWidth,inputHeight);

    inputs[i].style("font-size",width*0.022+"px");
    inputs[i].style("text-align","center");
    inputs[i].style("border-radius","10px");
    inputs[i].style("border","none");
    inputs[i].style("background","#464646");
    inputs[i].style("color","#ffffff");
  }

  updateInputPositions();
}

function updateInputPositions(){

  let inputWidth = width*0.5;
  let inputHeight = height*0.07;

  nameInput.position(
    width/2-inputWidth/2,
    height*0.27-inputHeight/2
  );

  phoneInput.position(
    width/2-inputWidth/2,
    height*0.41-inputHeight/2
  );

  companyInput.position(
    width/2-inputWidth/2,
    height*0.55-inputHeight/2
  );
}

function showInputs(){
  nameInput.show();
  phoneInput.show();
  companyInput.show();
}

function hideInputs(){
  nameInput.hide();
  phoneInput.hide();
  companyInput.hide();
}
function windowResized(){

  resizeCanvas(windowWidth,windowHeight);

  updateInputPositions();
}
function saveUserData(){

  let data = {
    name:userName,
    phone:userPhone,
    company:userCompany,
    profile:selectedProfile,
    language:selectedLanguage,
    date:
      year()+"-"+
      month()+"-"+
      day()
  };

  fetch(sheetURL,{
    method:"POST",
    body:JSON.stringify(data)
  })
  .then(response=>response.text())
  .then(result=>{
    console.log(result);
  });

}