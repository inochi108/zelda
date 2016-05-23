function DyingBat(game, x, y) {
    this.game = game;
    Entity.call(this, game, x, y, -99);

    this.dx = 13;
    this.dy = 13;

    this.timer = 70;
    this.die = new Animation(ASSET_MANAGER.getAsset("./img/vampirebat.png"), this.game, 0, 250, 25, 25, 0.3, 6, true, true, false, this.dx, this.dy);
}

DyingBat.prototype = new Entity();
DyingBat.prototype.constructor = DyingBat;

DyingBat.prototype.update = function () {
    
    this.y += 1;
    if(this.timer === 0){
            this.removeFromWorld = true;
    } else {
        this.timer -= 1;
    }
    Entity.prototype.update.call(this);
}

DyingBat.prototype.draw = function (ctx) {

    this.die.drawFrame(this.game.clockTick, ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
}