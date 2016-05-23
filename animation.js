// JavaScript source code
function Animation(spriteSheet, game, startX, startY, frameWidth, frameHeight, frameDuration, frames, loop, horizonal, reverse, tldx, tldy) {
    this.game = game;
    this.spriteSheet = spriteSheet; 
    this.startX = startX;
    this.startY = startY;
    this.dx = tldx;
    this.dy = tldy;
    this.frameWidth = frameWidth;
    this.frameDuration = frameDuration;
    this.frameHeight = frameHeight;
    this.frames = frames;
    this.totalTime = frameDuration * frames;
    this.elapsedTime = 0;
    this.loop = loop;
    this.reverse = reverse;
    this.horizonal = horizonal;
}

Animation.prototype.drawFrame = function (tick, ctx, x, y, scaleBy) {
    //console.log(this.startX + " " + this.startY);
    var scaleBy = scaleBy || 1;
    this.elapsedTime += tick;
    if (this.loop) {
        if (this.isDone()) {
            this.elapsedTime = 0;
        }
    } else if (this.isDone()) {
        return;
    }

    var hindex = 0;
    var vindex = 0;
    var locX = 0;
    var locY = 0;
    var offsetX = 0;
    var offsetY = 0;

    if (this.horizonal) {
        hindex = this.reverse ? this.frames - this.currentFrame() - 1 : this.currentFrame();
        vindex = 0;
        if ((hindex + 1) * this.frameWidth + this.startX > this.spriteSheet.width) {
            hindex -= Math.floor((this.spriteSheet.width - this.startX) / this.frameWidth);
            vindex++;
        }
        while ((hindex + 1) * this.frameWidth > this.spriteSheet.width) {
            hindex -= Math.floor(this.spriteSheet.width / this.frameWidth);
            vindex++;
        }

        locX = x;
        locY = y;
        offsetX = vindex === 0 ? this.startX : 0;
    } else {
        vindex = this.reverse ? this.frames - this.currentFrame() - 1 : this.currentFrame();
        hindex = 0;
        if ((vindex + 1) * this.frameHeight + this.startY > this.spriteSheet.height) {
            vindex -= Math.floor((this.spriteSheet.height - this.startY) / this.frameHeight);
            hindex++;
        }
        while ((vindex + 1) * this.frameHeight > this.spriteSheet.height) {
            vindex -= Math.floor(this.spriteSheet.height / this.frameHeight);
            hindex++;
        }

        locX = x;
        locY = y;
        offsetY = hindex === 0 ? this.startY : 0;
    }
    //console.log(this.dx + locX + " " + this.dy+  locY);
    var sx = hindex * this.frameWidth + offsetX;
    var sy = vindex * this.frameHeight + this.startY + offsetY;
    var sWidth = this.frameWidth;
    var sHeight = this.frameHeight;
    //console.log(this);
    //console.log("g.dx = " + this.game.dx + " /bg.dx = " + this.game.background.dx + " /this.tldx =  " + this.tldx + " /lx =  " + locX);
    var dx = this.game.dx + this.game.background.dx - this.dx + locX;
    var dy = this.game.dy + this.game.background.dy - this.dy + locY;
    var dWidth = sWidth * scaleBy;
    var dHeight = sHeight * scaleBy;

    //console.log("bat -------------------------");
    //console.log("source : " + sx + "," + sy);
    //console.log("       : " + sWidth + "," + sHeight);
    //console.log("destin : " + dx + "," + dy);
    //console.log("       : " + dWidth + "," + dHeight);

    ctx.drawImage(this.spriteSheet,
                  sx, sy,  // source from sheet
                  sWidth, sHeight, //size of source 
                  dx, dy,  //location on canvas
                  dWidth, dHeight);
}

Animation.prototype.currentFrame = function () {
    return Math.floor(this.elapsedTime / this.frameDuration);
}

Animation.prototype.isDone = function () {
    return (this.elapsedTime >= this.totalTime);
    
}

