function TwinBat2(game, x, y) {
    this.game = game;
    Entity.call(this, game, x, y, 1);

    this.dx = 23;
    this.dy = 23;
    this.setBox(-15, -7, 17, 11);
    this.type = LIVE + FLYABLE;

    this.direction = 0;
    this.radius = 100;
    this.attack = false;
    this.doit = 3;
    this.fly = new Animation(ASSET_MANAGER.getAsset("./img/underworld.png"), this.game, 0, 0, 50, 50, 0.2, 2, true, true, false, this.dx, this.dy);
}

TwinBat2.prototype = new Entity();
TwinBat2.prototype.constructor = TwinBat2;

TwinBat2.prototype.update = function () {
    if (this.life <= 0) {
        this.removeFromWorld = true;
    }
    if (this.doit === 0) {
        this.x += 1;
        this.y -= 20 * Math.sin(this.x / 2);
        this.doit = 5;
    } else {
        this.doit--;
    }
    Entity.prototype.update.call(this);
}

TwinBat2.prototype.draw = function (ctx) {

    this.fly.drawFrame(this.game.clockTick, ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
}