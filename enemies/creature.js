function Creature(game, x, y) {
    this.game = game;
    Entity.call(this, game, x, y, 10);

    this.dx = 29;
    this.dy = 21;
    this.setBox(-29, -10, 29, 21);
    this.type = LIVE + FLYABLE;

    this.direction = 1;
    this.readyToDrop = 20; // drop every 20 tick

    var speed = 0.2;
    this.swimLeft = new Animation(ASSET_MANAGER.getAsset("./img/creature.png"), this.game, 2, 56, 58, 43, speed, 4, true, true, false, this.dx, this.dy);
    this.swimRight = new Animation(ASSET_MANAGER.getAsset("./img/creature.png"), this.game, 2, 100, 58, 45, speed, 4, true, true, false, this.dx, this.dy);
}

Creature.prototype = new Entity();
Creature.prototype.constructor = Creature;

Creature.prototype.update = function () {
    if (this.life <= 0) {
        this.removeFromWorld = true;
    }
    if (this.readyToDrop < 20) {
        this.readyToDrop++;
    }
    if ((this.readyToDrop >= 20) && (Math.abs(this.x - this.game.link.x) <= 1)) {
        var egg = new Egg(this.game, this.x, this.y + 30);
        this.game.addEntity(egg);
        this.readyToDrop = 0;
    }

    if (this.x <= 0 || this.x >= this.game.maxX) {
        this.direction *= -1;
    }

    this.x += 2 * this.direction;
    Entity.prototype.update.call(this);
}

Creature.prototype.draw = function (ctx) {

    if (this.direction < 0) {
        this.swimLeft.drawFrame(this.game.clockTick, ctx, this.x, this.y + 7);
    } else {
        this.swimRight.drawFrame(this.game.clockTick, ctx, this.x, this.y);
    }
    Entity.prototype.draw.call(this);
}