function ZeldaPortal(game, x, y) {
    this.game = game;
    Entity.call(this, game, 256, 160, -99);

    this.dx = 24;
    this.dy = 24;
    this.setBox(-8, -10, 9, 11);
    this.type = BLOCK;

    this.radius = 100;
    this.elapsed = 1;
    this.timer = 200;
    this.timer2 = 370;

    this.portal = new Animation(ASSET_MANAGER.getAsset("./img/vampirebat.png"), this.game, 0, 300, 50, 50, 0.07, 5, true, true, false, this.dx, this.dy);
}

ZeldaPortal.prototype = new Entity();
ZeldaPortal.prototype.constructor = ZeldaPortal;

ZeldaPortal.prototype.update = function () {
    
    if (this.timer2 === 0) {
        this.removeFromWorld = true;
    } else {
        this.timer2 -= 1;
    }
    if (this.timer === 0) {
        var zelda = new Zelda(this.game, this.x, this.y);
        this.game.addEntity(zelda);
        this.timer -= 1;
    } else {
        this.timer -= 1;
    }
    Entity.prototype.update.call(this);
}

ZeldaPortal.prototype.draw = function (ctx) {
    this.portal.drawFrame(this.game.clockTick, ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
}