"use strict";

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var FONT_GAP = 20;
var TEXT_WIDTH = 50;
var BAR_HEIGHT = -150;
var BAR_WIDTH = 40;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];
  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, "rgba(0, 0, 0, 0.7)");
  renderCloud(ctx, CLOUD_X, CLOUD_Y, "#fff");

  ctx.fillStyle = "#000";
  ctx.font = "16px PT Mono";
  ctx.textBaseline = "hanging";
  ctx.fillText("Ура вы победили!", CLOUD_X + FONT_GAP, 25);
  ctx.fillText("Список результатов:", CLOUD_X + FONT_GAP, 45);

  var maxTime = getMaxElement(times);

  var generateFullBarColor = function (namePlayer) {
    var randomOpacity = Math.floor(Math.random() * 100);
    if (namePlayer === "Вы") {
      return "rgba(255, 0, 0, 1)";
    }
    return "HSL(240, " + randomOpacity + "%, 50%)";
  };

  for (var i = 0; i < players.length; i++) {
    ctx.fillText(
      players[i],
      CLOUD_X + BAR_WIDTH + BAR_WIDTH * i * 2 + GAP * i,
      CLOUD_HEIGHT - FONT_GAP
    );
    ctx.fillStyle = generateFullBarColor(players[i]);
    ctx.fillRect(
      CLOUD_X + BAR_WIDTH + BAR_WIDTH * i * 2 + GAP * i,
      CLOUD_HEIGHT - GAP - FONT_GAP,
      BAR_WIDTH,
      (BAR_HEIGHT * times[i]) / maxTime
    );
    ctx.fillStyle = "#000";
    ctx.fillText(
      Math.floor(times[i]),
      CLOUD_X + BAR_WIDTH + BAR_WIDTH * i + BAR_WIDTH * i + GAP * i,
      CLOUD_HEIGHT -
        FONT_GAP -
        GAP +
        (BAR_HEIGHT * times[i]) / maxTime -
        FONT_GAP
    );
  }
};
