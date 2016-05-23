function Plant3(game, x, y) {
    this.game = game;
    Entity.call(this, game, x, y, 30);

    this.dx = 23;
    this.dy = 43;
    this.setBox(-18, -30, 18, 4);
    this.type = LIVE;

    this.radius = 10;
    this.direction = 0;
    this.bulletTimer = Math.floor(Math.random() * 300 + 100);

    this.idle = new Animation(ASSET_MANAGER.getAsset("./img/plant3.png"), this.game, 0, 0, 45, 50, 0.2, 6, true, true, false, this.dx, this.dy);
}

Plant3.prototype = new Entity();
Plant3.prototype.constructor = Plant3;

Plant3.prototype.update = function () {
    if (this.life <= 0) {
        this.removeFromWorld = true;
    }
    if (this.bulletTimer === 0) {
        var bullet1 = new PlantBullet3(this.game, this.x + 10, this.y - 15, 1);
        var bullet2 = new PlantBullet3(this.game, this.x + 10, this.y - 15, 2);
        var bullet3 = new PlantBullet3(this.game, this.x + 10, this.y - 15, 3);
        var bullet4 = new PlantBullet3(this.game, this.x + 10, this.y - 15, 4);
        var bullet5 = new PlantBullet3(this.game, this.x + 10, this.y - 15, 5);

        this.game.addEntity(bullet1);
        this.game.addEntity(bullet2);
        this.game.addEntity(bullet3);
        this.game.addEntity(bullet4);
        this.game.addEntity(bullet5);

        this.bulletTimer = Math.floor(Math.random() * 300 + 100);
    } else {
        this.bulletTimer -= 1;
    }
    Entity.prototype.update.call(this);
}

Plant3.prototype.draw = function (ctx) {
    this.idle.drawFrame(this.game.clockTick, ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
}