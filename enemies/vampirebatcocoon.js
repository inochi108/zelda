function VampireBatCocoon(game, x, y, health, isReverse) {
    this.game = game;
    this.isReverse = isReverse;
    Entity.call(this, game, x, y, -99);
    this.health = health;
    this.dx = 24;
    this.dy = 35;
    this.setBox(-16, -36, 16, 36);
    this.type = BLOCK;
    this.radius = 100;
    this.elapsed = 1;
    this.timer = 50;

    this.coccoon = new Animation(ASSET_MANAGER.getAsset("./img/vampirebat.png"), this.game, 0, 100, 50, 100, .3, 5, true, true, this.isReverse, this.dx, this.dy);
}

VampireBatCocoon.prototype = new Entity();
VampireBatCocoon.prototype.constructor = VampireBatCocoon;

VampireBatCocoon.prototype.update = function () {
    if (this.timer === 0) {
        if (this.isReverse === false) {
            var vampireBatSpin = new VampireBatSpin(this.game, this.x, this.y, this.health);
            this.game.addEntity(vampireBatSpin);
            this.removeFromWorld = true;
        } else {
            var vampireBat = new VampireBat(this.game, this.x, this.y, this.health);
            this.game.addEntity(vampireBat);
            this.removeFromWorld = true;
        }
    } else {
        this.timer -= 1;
    }
    Entity.prototype.update.call(this);
}

VampireBatCocoon.prototype.draw = function (ctx) {

    this.coccoon.drawFrame(this.game.clockTick, ctx, this.x, this.y);

    Entity.prototype.draw.call(this);
}
