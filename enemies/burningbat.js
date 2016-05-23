function BurningBat(game, x, y) {
    this.game = game;
    Entity.call(this, game, x, y, 1);

    this.dx = 13;
    this.dy = 13;
    this.setBox(-10, -10, 10, 10);
    this.type = LIVE + FLYABLE;

    this.burn = new Animation(ASSET_MANAGER.getAsset("./img/vampirebat.png"), this.game, 0, 225, 25, 25, 0.2, 2, true, true, false, this.dx, this.dy);
}

BurningBat.prototype = new Entity();
BurningBat.prototype.constructor = BurningBat;

BurningBat.prototype.update = function () {
    
    if (this.life <= 0) {
        var dyingBat = new DyingBat(this.game, this.x, this.y);
        this.game.addEntity(dyingBat);
        this.removeFromWorld = true;
    }
    
    var randomNumber = Math.floor(Math.random() * 4);
    switch (randomNumber) {
        case 0: //left
            this.x = (this.x <= 2) ? 0 : this.x - 4;
            break;
        case 1: //up
            this.y = (this.y <= 2) ? 0 : this.y - 4;
            break;
        case 2: //right
            this.x = (this.x >= this.game.maxX - 1) ? this.game.maxX : this.x + 4;
            break;
        case 3: //down
            this.y = (this.y >= this.game.maxY - 1) ? this.game.maxY : this.y + 4;
            break;
    }

    Entity.prototype.update.call(this);
}

BurningBat.prototype.draw = function (ctx) {

    this.burn.drawFrame(this.game.clockTick, ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
}