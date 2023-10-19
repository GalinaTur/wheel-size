const INCHES_TO_MM = 25.4;

const rimRadiusInput = document.getElementById("rimRadius") as HTMLInputElement;
let rimRadius = +rimRadiusInput.value;
const rimRadiusOutput = document.getElementById("rimRadiusValue") as HTMLOutputElement;
rimRadiusOutput.innerHTML = rimRadiusInput.value;
const tyreWidthInput = document.getElementById("tyreWidth") as HTMLInputElement;
let tyreWidth = +tyreWidthInput.value;
const tyreWidthOutput = document.getElementById("tyreWidthValue") as HTMLOutputElement;
tyreWidthOutput.innerHTML = tyreWidthInput.value;
const tyreThicknessInput = document.getElementById("tyreThickness") as HTMLInputElement;
let tyreThickness = +tyreThicknessInput.value;
const tyreThicknessOutput = document.getElementById("tyreThicknessValue") as HTMLOutputElement;
tyreThicknessOutput.innerHTML = tyreThicknessInput.value;
const outerDiameterInput = document.getElementById("outerDiameter") as HTMLInputElement;
let outerDiameter = +outerDiameterInput.value;
outerDiameterInput.value = String(outerDiameter);

const mainContainer = document.querySelector('.mainContainer') as HTMLElement;
const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d')!;
  const car = new Image()!;
  const rim = new Image()!;
  car.src = './img/car.png';

const defineCanvasWidth = () => {
  if (document.body.clientWidth < 600) {
    return Math.max(mainContainer.offsetWidth*0.7, 250);
  } else return Math.min(mainContainer.clientWidth*0.45, 400)
}

const drawCanvas = () => {
  const carHeightWidthRatio = 0.35;

  canvas.width = defineCanvasWidth();
  canvas.height = canvas.width * carHeightWidthRatio * 1.3;

  const carWidth = canvas.width;
  const carHeight = canvas.width * carHeightWidthRatio;
  const realCarWidthMm = 3800;
  const mmpxRatio = carWidth/realCarWidthMm;
  const wheelCenterCarHeightRatio = 0.914;
  const frontWheelCenterCarWidthRatio = 0.198;
  const rearWheelCenterCarWidthRatio = 0.872;
  const frontWheelCenterX = carWidth * frontWheelCenterCarWidthRatio;
  const rearWheelCenterX = carWidth * rearWheelCenterCarWidthRatio;
  const wheelCenterY = carHeight * wheelCenterCarHeightRatio;

  const rimDiameter = rimRadius * INCHES_TO_MM * mmpxRatio;
  const rimTop = carHeight * wheelCenterCarHeightRatio - rimDiameter / 2;
  const frontRimLeft = carWidth * frontWheelCenterCarWidthRatio - rimDiameter / 2;
  const rearRimLeft = carWidth * rearWheelCenterCarWidthRatio - rimDiameter / 2;
  const tyreHeight = (outerDiameter * mmpxRatio - rimDiameter) / 2;
  const outerRadius = (outerDiameter * mmpxRatio / 2) - tyreHeight/2;

    ctx.drawImage(car, 0, 0, carWidth, carHeight);

    ctx.drawImage(rim, rearRimLeft, rimTop, rimDiameter, rimDiameter);
    ctx.drawImage(rim, frontRimLeft, rimTop, rimDiameter, rimDiameter);
    ctx.beginPath();
    ctx.arc(frontWheelCenterX, wheelCenterY, outerRadius, 0 * Math.PI, 2 * Math.PI);
    ctx.lineWidth = tyreHeight;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(rearWheelCenterX, wheelCenterY, outerRadius, 0 * Math.PI, 2 * Math.PI);
    ctx.lineWidth = tyreHeight;
    ctx.stroke();
}

const calcOuterDiameter = () => {
  outerDiameter =
    rimRadius * INCHES_TO_MM + 2 * ((tyreWidth * tyreThickness) / 100);
  outerDiameterInput.value = String(Math.round(outerDiameter));
  drawCanvas();
};

car.onload = () => {
  rim.src = './img/rim.svg';
}
rim.onload = () => {
  calcOuterDiameter();
}

const calcTyreThickness = () => {
  tyreThickness = Math.round(((outerDiameter - rimRadius * INCHES_TO_MM) * 50 * 0.2) / tyreWidth) * 5;
  tyreThicknessInput.value = String(tyreThickness);
  tyreThicknessOutput.innerHTML = tyreThicknessInput.value;
  tyreThickness = +tyreThicknessInput.value;
  calcOuterDiameter();
};

const onRimRadiusChange = () => {
  rimRadius = +rimRadiusInput.value;
  rimRadiusOutput.innerHTML = String(rimRadius);
  calcOuterDiameter();
}

const onTyreWidthChange = () => {
  tyreWidth = +tyreWidthInput.value;
  tyreWidthOutput.innerHTML = String(tyreWidth);
  calcOuterDiameter();
}

const onTyreThicknessChange = () => {
  tyreThickness = +tyreThicknessInput.value;
  tyreThicknessOutput.innerHTML = String(tyreThickness);
  calcOuterDiameter();
}

const onOuterDiameterChange = (e: Event) => {
  e.preventDefault();
  outerDiameter = +outerDiameterInput.value;
  calcTyreThickness();
}

window.onresize = () => drawCanvas();
