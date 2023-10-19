var INCHES_TO_MM = 25.4;
var rimRadiusInput = document.getElementById("rimRadius");
var rimRadius = +rimRadiusInput.value;
var rimRadiusOutput = document.getElementById("rimRadiusValue");
rimRadiusOutput.innerHTML = rimRadiusInput.value;
var tyreWidthInput = document.getElementById("tyreWidth");
var tyreWidth = +tyreWidthInput.value;
var tyreWidthOutput = document.getElementById("tyreWidthValue");
tyreWidthOutput.innerHTML = tyreWidthInput.value;
var tyreThicknessInput = document.getElementById("tyreThickness");
var tyreThickness = +tyreThicknessInput.value;
var tyreThicknessOutput = document.getElementById("tyreThicknessValue");
tyreThicknessOutput.innerHTML = tyreThicknessInput.value;
var outerDiameterInput = document.getElementById("outerDiameter");
var outerDiameter = +outerDiameterInput.value;
outerDiameterInput.value = String(outerDiameter);
var mainContainer = document.querySelector('.mainContainer');
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var car = new Image();
var rim = new Image();
car.src = './img/car.png';
var defineCanvasWidth = function () {
    if (document.body.clientWidth < 600) {
        return Math.max(mainContainer.offsetWidth * 0.7, 250);
    }
    else
        return Math.min(mainContainer.clientWidth * 0.45, 400);
};
var drawCanvas = function () {
    var carHeightWidthRatio = 0.35;
    canvas.width = defineCanvasWidth();
    canvas.height = canvas.width * carHeightWidthRatio * 1.3;
    var carWidth = canvas.width;
    var carHeight = canvas.width * carHeightWidthRatio;
    var realCarWidthMm = 3800;
    var mmpxRatio = carWidth / realCarWidthMm;
    var wheelCenterCarHeightRatio = 0.914;
    var frontWheelCenterCarWidthRatio = 0.198;
    var rearWheelCenterCarWidthRatio = 0.872;
    var frontWheelCenterX = carWidth * frontWheelCenterCarWidthRatio;
    var rearWheelCenterX = carWidth * rearWheelCenterCarWidthRatio;
    var wheelCenterY = carHeight * wheelCenterCarHeightRatio;
    var rimDiameter = rimRadius * INCHES_TO_MM * mmpxRatio;
    var rimTop = carHeight * wheelCenterCarHeightRatio - rimDiameter / 2;
    var frontRimLeft = carWidth * frontWheelCenterCarWidthRatio - rimDiameter / 2;
    var rearRimLeft = carWidth * rearWheelCenterCarWidthRatio - rimDiameter / 2;
    var tyreHeight = (outerDiameter * mmpxRatio - rimDiameter) / 2;
    var outerRadius = (outerDiameter * mmpxRatio / 2) - tyreHeight / 2;
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
};
var calcOuterDiameter = function () {
    outerDiameter =
        rimRadius * INCHES_TO_MM + 2 * ((tyreWidth * tyreThickness) / 100);
    outerDiameterInput.value = String(Math.round(outerDiameter));
    drawCanvas();
};
car.onload = function () {
    rim.src = './img/rim.svg';
};
rim.onload = function () {
    calcOuterDiameter();
};
var calcTyreThickness = function () {
    tyreThickness = Math.round(((outerDiameter - rimRadius * INCHES_TO_MM) * 50 * 0.2) / tyreWidth) * 5;
    tyreThicknessInput.value = String(tyreThickness);
    tyreThicknessOutput.innerHTML = tyreThicknessInput.value;
    tyreThickness = +tyreThicknessInput.value;
    calcOuterDiameter();
};
var onRimRadiusChange = function () {
    rimRadius = +rimRadiusInput.value;
    rimRadiusOutput.innerHTML = String(rimRadius);
    calcOuterDiameter();
};
var onTyreWidthChange = function () {
    tyreWidth = +tyreWidthInput.value;
    tyreWidthOutput.innerHTML = String(tyreWidth);
    calcOuterDiameter();
};
var onTyreThicknessChange = function () {
    tyreThickness = +tyreThicknessInput.value;
    tyreThicknessOutput.innerHTML = String(tyreThickness);
    calcOuterDiameter();
};
var onOuterDiameterChange = function (e) {
    e.preventDefault();
    outerDiameter = +outerDiameterInput.value;
    calcTyreThickness();
};
window.onresize = function () { return drawCanvas(); };
