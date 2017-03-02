var canvas = document.querySelector("canvas");
canvas.width = document.body.offsetWidth;
canvas.height = document.body.scrollHeight;
var ctx = canvas.getContext("2d");
var background 	= "#FFFFFF";
var blobColor	= "#000000";
var maxSize = 25;

console.log(Math.random() * canvas.width);

var blobs = [];
for (var i = 0; i < 25; i++) {
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
		blobs[i].colliding = false;
		blobs[i].update(canvas);
	}

	for (var i = 0; i < blobs.length; i++) {
		for (var j = 0; j < blobs.length; j++) {
			
			iSize = blobs[i].size;
			jSize = blobs[j].size;			
			ix = blobs[i].x;
			jx = blobs[j].x;
			iy = blobs[i].y;
			jy = blobs[j].y;
			xDiff = Math.pow(ix - jx, 2);
			yDiff = Math.pow(iy - jy, 2);
			distance = Math.pow(xDiff + yDiff, 0.5);

	
			if (i != j && ((iSize + jSize) >= distance)) {
				blobs[i].colliding = true;
				blobs[j].colliding = true;
				
				growthRate = 0.0;
				if (iSize < jSize) {
					blobs[i].size -= growthRate;
					blobs[j].size += growthRate;
				} else if (iSize > jSize) {
					blobs[i].size += growthRate;
					blobs[j].size -= growthRate;
				}
			}
		}

	}

	for (var i = 0; i < blobs.length; i++) {
		if (blobs[i].size <= 0) {
		}
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
	this.colliding = false;

	var velocity = 1 - this.size / maxSize + 0.15;
	velocity *= 1;
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
		ctx.globalAlpha = 0.2;
		ctx.strokeStyle = blobColor;
		
		if (this.size > 0) {
			ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI, false);
		}

		if (this.colliding) {
			ctx.fill();
		} else {
			ctx.stroke();
		}
	}
}


loop();
