function Plant2(game, x, y) {
    this.game = game;
    Entity.call(this, game, x, y, 2);

    this.numberOfBullet = 0;

    this.dx = 11;
    this.dy = 26;
    this.setBox(-11, -24, 14, 4);
    this.type = LIVE;

    this.radius = 10;
    this.direction = 0;
    this.bulletTimer = Math.floor(Math.random() * 300 + 100);

    this.idle = new Animation(ASSET_MANAGER.getAsset("./img/plant.png"), this.game, 0, 0, 27, 32, 0.5, 8, true, true, false, this.dx, this.dy);
}

Plant2.prototype = new Entity();
Plant2.prototype.constructor = Plant2;

Plant2.prototype.update = function () {
    if (this.life <= 0) {
        this.removeFromWorld = true;
    }
    if (this.bulletTimer === 0 && this.numberOfBullet < 5) {
        var bullet = new PlantBullet2(this.game, this.x, this.y, this.numberOfBullet);
        this.game.addEntity(bullet);
        this.bulletTimer = Math.floor(Math.random() * 300 + 100);
        this.numberOfBullet++;
    } else {
        this.bulletTimer -= 1;
    }

    Entity.prototype.update.call(this);
}

Plant2.prototype.draw = function (ctx) {
    this.idle.drawFrame(this.game.clockTick, ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
}