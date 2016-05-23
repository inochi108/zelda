// JavaScript source code
function Background(game, width, height, columns, rows, dx, dy) {
    this.game = game; 
    this.width = width;
    this.height = height;
    this.columns = columns;
    this.rows = rows;
    this.dx = dx;
    this.dy = dy;
}

Background.prototype.update = function () {
}

Background.prototype.draw = function (ctx, ax, ay) {
    var axx = (ax === undefined) ? 0 : ax;
    var ayy = (ay === undefined) ? 0 : ay;
    var sx = (this.game.currentID % this.columns) * this.width + axx;
    var sy = Math.floor(this.game.currentID / this.columns) * this.height + ayy;
    var sWidth = this.width + 2 * this.dx;
    var sHeight = this.height + this.dy * 2;
    var dx = this.game.dx;
    var dy = this.game.dy;
    var dWidth = sWidth;
    var dHeight = sHeight;
    //console.log("current id = " + this.game.currentID);
    //console.log("source : " + sx + "," + sy);
    //console.log("       : " + sWidth + "," + sHeight);
    //console.log("destin : " + dx + "," + dy);
    //console.log("       : " + dWidth + "," + dHeight);

    this.game.ctx.drawImage(ASSET_MANAGER.getAsset("./img/background.png"),
         sx, sy,  // source from sheet
         sWidth, sHeight, //image size
         dx, dy,  // from this point
         dWidth, dHeight); //width & height of the showing

    //ctx.drawImage(ASSET_MANAGER.getAsset("./img/background.png"),
    //             this.game.currentID * this.width - (this.game.currentID % this.columns) * this.dx, this.game.currentID * this.height - Math.floor(this.game.currentID / this.rows) * this.dy,  // source from sheet
    //             this.width + 2 * this.dx, this.height + this.dy * 2, //image size
    //             this.game.dx, this.game.dy,  // from this point
    //             this.width + 2 * this.dx, this.height + this.dy * 2); //width & height of the showing
    //ctx.fillStyle = "SaddleBrown";
    //ctx.fillRect(0, 500, 800, 300);
    Entity.prototype.draw.call(this);
}
