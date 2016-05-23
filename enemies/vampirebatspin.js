function VampireBatSpin(game, x, y, health) {
    this.game = game;
    Entity.call(this, game, x, y, -99);

    this.health = health;
    this.dx = 24;
    this.dy = 35;
    this.setBox(-12, -32, 12, 32);
    this.type = BULLET;
    this.timer = 1500;
    this.portalTimer = 0;
    this.radius = 100;

    this.elapsed = 1;

    this.spin = new Animation(ASSET_MANAGER.getAsset("./img/vampirebat.png"), this.game, 250, 100, 50, 100, 0.2, 3, true, true, true, this.dx, this.dy);
}

VampireBatSpin.prototype = new Entity();
VampireBatSpin.prototype.constructor = VampireBatSpin;

VampireBatSpin.prototype.update = function () {
    if (this.portalTimer === 0) {

        var portal1 = new Portal(this.game, this.x + 75, this.y + 25);
        var portal2 = new Portal(this.game, this.x - 75, this.y + 25);
        var portal3 = new Portal(this.game, this.x, this.y + 75 + 25);
        var portal4 = new Portal(this.game, this.x, this.y - 75 + 25);
        this.game.addEntity(portal1);
        this.game.addEntity(portal2);
        this.game.addEntity(portal3);
        this.game.addEntity(portal4);

        this.portalTimer = 2000;
    } else {
        this.portalTimer -= 1;

    }
    if(this.timer === 0) {
        var reverseCoccoon = new VampireBatCocoon(this.game, this.x, this.y, this.health, true);
        this.game.addEntity(reverseCoccoon);
        this.removeFromWorld = true;
    } else {
        this.timer -= 1;
    }

    Entity.prototype.update.call(this);
}

VampireBatSpin.prototype.draw = function (ctx) {

    this.spin.drawFrame(this.game.clockTick, ctx, this.x, this.y);
    
    Entity.prototype.draw.call(this);
}
