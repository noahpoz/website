var canvas = document.querySelector("canvas");
canvas.width = document.body.offsetWidth;
canvas.height = document.body.scrollHeight;
var ctx = canvas.getContext("2d");
var background 	= "#FFFFFF";
var blobColor	= "#3533FF";

console.log(Math.random() * canvas.width);

var blobs = [];
for (var i = 0; i < 10; i++) {
	blobs.push(new Blob(Math.random() * canvas.width, Math.random() * canvas.height, Math.random() / 1.3, Math.random() / 1.3, Math.random() * 40 + 5));
}

function loop() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	update();
	draw();
	requestAnimationFrame(loop);
}

// update asset positions and animation frames
function update() {
	for (var i = 0; i < blobs.length; i++) {

		// detect collisions
		for (var j = 0; j < blobs.length; j++) {
			distance = Math.pow(Math.pow((blobs[i].x - blobs[j].x), 2) + Math.pow((blobs[i].y - blobs[j].y), 2), 0.5);
		}

		blobs[i].update(canvas);
	}
}

// draw assets to the context
function draw() {
	for (var i = 0; i < blobs.length; i++) {
		blobs[i].draw(ctx);
	}
}

// define blob object that will move about the canvas
function Blob(initX, initY, initXVelocity, initYVelocity, initSize) {
	this.x = initX;
	this.y = initY;
	this.size = initSize;

	this.velocity = {
		x: initXVelocity,
		y: initYVelocity
	};

	this.update = function(canvas) {

		if (this.x > canvas.width - this.size || this.x < 0) {
			this.velocity.x *= -1;
		}

		if (this.y > canvas.height - this.size || this.y < 0) {
			this.velocity.y *= -1;
		}	

		this.x += this.velocity.x;
		this.y += this.velocity.y;
	}

	this.draw = function(ctx) {
		ctx.beginPath();
		ctx.globalAlpha = 1;
		ctx.fillStyle = blobColor;
		ctx.arc(this.size + this.x, this.size + this.y, this.size, 0, 2 * Math.PI, false);
		ctx.stroke();
	}
}


loop();
