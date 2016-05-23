function Panel(game, x, y) {
    this.game = game;
};

Panel.prototype.update = function () {
};

Panel.prototype.draw = function (ctx) {
    var sx = this.game.surfaceWidth - 262;
    var sy = 25;

    ctx.beginPath();
    ctx.rect(sx - 6, sy -6, 262, 62);
    ctx.fillStyle = 'black';
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'red';
    ctx.stroke();

    for (i = 0; i < this.game.link.life; i++) {
        ctx.drawImage(ASSET_MANAGER.getAsset("./img/item2.png"), //red Panel
                     0, 0, // source from sheet
                     25, 25, //image size
                     sx + (i % 10) * 25, sy + Math.floor(i / 10) * 25,  // from this point
                     25, 25); //width & height of the showing
    }
    
    for (i = this.game.link.life; i < this.game.link.lifes; i++) {
            ctx.drawImage(ASSET_MANAGER.getAsset("./img/item2.png"),  //white Panel
                     0, 25,  // source from sheet
                     25, 25, //image size
                     sx + (i % 10) * 25, sy + Math.floor(i / 10) * 25,  // from this point
                     25, 25); //width & height of the showing
    }

    var i = 0
    if (!this.game.music) {
        i = 1;
    }
    ctx.drawImage(ASSET_MANAGER.getAsset("./img/volume.png"),  //white Panel
                    i * 30, 0,  // source from sheet
                    30, 30, //image size
                    30, 30,  // draw from this point
                    30, 30); //width & height of the showing

    if (this.game.showOutlines) {
        ctx.beginPath();
        ctx.rect(30, 5, 15, 18);
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'green';
        ctx.stroke();
    }

    ctx.fillStyle = "white";
    ctx.font = "bold 18px Arial";
    ctx.fillText("B", 5, 20);
    ctx.fillText("M", 5, 50);
    ctx.fillText("P", 5, 80);
    ctx.fillText("E", 100, 20);

    if (this.game.ella) {
        ctx.fillStyle = "green";
        ctx.fillText("E", 100, 20);
        ctx.fillStyle = "white";
        ctx.fillText("lla the Rose Fairy", 113, 20);
    }
};
