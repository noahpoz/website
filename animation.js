var canvas = document.querySelector("canvas");
canvas.width = document.body.offsetWidth;
canvas.height = document.body.scrollHeight;
var ctx = canvas.getContext("2d");
var background 	= "#FFFFFF";
var blobColor	= "#3533FF";
var maxSize = 75;

console.log(Math.random() * canvas.width);

var blobs = [];
for (var i = 0; i < 100; i++) {
	blobs.push(new Blob(Math.random() * canvas.width, Math.random() * canvas.height, Math.random() * maxSize + 2));
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
function Blob(initX, initY, initSize) {
	this.x = initX;
	this.y = initY;
	this.size = initSize;

	var velocity = 1 - this.size / maxSize + 0.15;
	velocity /= 1.5;
	var angle = Math.random() * 2 * Math.PI;

	this.velocity = {
		x: velocity * Math.sin(angle),
		y: velocity * Math.cos(angle)
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
