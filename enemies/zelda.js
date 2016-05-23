function Zelda(game, x, y) {
    this.game = game;
    Entity.call(this, game, x, y, -99);

    this.dx = 25;
    this.dy = 68;
    this.setBox(-12, -42, 12, 1);
    this.type = LIVE;

    this.timer = 175;
    document.getElementById("bgm").pause();
    document.getElementById("rescue").play();
    this.zelda = new Animation(ASSET_MANAGER.getAsset("./img/zelda.png"), this.game, 0, 0, 50, 75, 0.2, 23, true, true, false, this.dx, this.dy);
}

Zelda.prototype = new Entity();
Zelda.prototype.constructor = Zelda;

Zelda.prototype.update = function () {
    if(this.timer === 0) {
        var zelda2 = new Zelda2(this.game, this.x + 1, this.y);
        this.game.addEntity(zelda2);
        this.removeFromWorld = true;
    } else {
        this.timer -= 1;
    }

    Entity.prototype.update.call(this);
}

Zelda.prototype.draw = function (ctx) {
    this.zelda.drawFrame(this.game.clockTick, ctx, this.x + 1, this.y);
    Entity.prototype.draw.call(this);
}
