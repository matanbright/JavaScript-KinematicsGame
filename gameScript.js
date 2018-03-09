const BALL_RADIUS = 20;
const BALL_COLOR = "red";
const GRAVITY = 1;
const MOVEMENT_TIMER_INTERVAL = 20;
const ENERGY_LOSS = 0.2;

var canvas;
var canvasContext;
var ballsArray;


initialize();




function initialize() {
	canvas = document.getElementById("gameCanvas");
	canvasContext = canvas.getContext("2d");
	ballsArray = [];
	drawAllBalls(canvasContext);
	canvas.onclick = function(event) {
		ballsArray.push(new Ball(new Point(event.clientX, event.clientY), BALL_RADIUS, BALL_COLOR, new Speed(0, 0)));
	};
}


window.setInterval(function() {
	for (i = 0; i < ballsArray.length; i++) {
		var ball = ballsArray[i];
		ball.speed.ySpeed += GRAVITY;
		ball.location.x += ball.speed.xSpeed;
		ball.location.y += ball.speed.ySpeed;
		
		if (ball.location.x - ball.radius < 0 && ball.speed.xSpeed < 0) {
			ball.location.x = ball.radius;
			ball.speed = new Speed(ball.speed.xSpeed * -(1 - ENERGY_LOSS), ball.speed.ySpeed * (1 - ENERGY_LOSS));
		} else if (ball.location.x + ball.radius >= canvas.width && ball.speed.xSpeed > 0) {
			ball.location.x = canvas.width - 1 - ball.radius;
			ball.speed = new Speed(ball.speed.xSpeed * -(1 - ENERGY_LOSS), ball.speed.ySpeed * (1 - ENERGY_LOSS));
		}
		if (ball.location.y - ball.radius < 0 && ball.speed.ySpeed < 0) {
			ball.location.y = ball.radius;
			ball.speed = new Speed(ball.speed.xSpeed * (1 - ENERGY_LOSS), ball.speed.ySpeed * -(1 - ENERGY_LOSS));
		} else if (ball.location.y + ball.radius >= canvas.height && ball.speed.ySpeed > 0) {
			ball.location.y = canvas.height - 1 - ball.radius;
			ball.speed = new Speed(ball.speed.xSpeed * (1 - ENERGY_LOSS), ball.speed.ySpeed * -(1 - ENERGY_LOSS));
		}
	}
	drawAllBalls(canvasContext);
}, MOVEMENT_TIMER_INTERVAL);


function drawAllBalls() {
	canvasContext.clearRect(0, 0, canvas.width, canvas.height);
	for (i = 0; i < ballsArray.length; i++)
		ballsArray[i].draw(canvasContext);
}
