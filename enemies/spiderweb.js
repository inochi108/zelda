//spider lay a web in a fixed time, and the web will stay at that place and hold link if he touch it

function SpiderWeb(game, x, y) {
    this.game = game;
    Entity.call(this, game, x, y, 1);

    this.dx = 24;
    this.dy = 21;
    this.setBox(-20, -20, 20, 15);
    this.type = LIVE;

    this.direction = 0;

    this.animation = new Animation(ASSET_MANAGER.getAsset("./img/spiderweb.png"), this.game, 0, 0, 50, 50, .75, 1, true, true, false, this.dx, this.dy);
};

SpiderWeb.prototype = new Entity();
SpiderWeb.prototype.constructor = SpiderWeb;
SpiderWeb.prototype.parent = Entity.prototype;

SpiderWeb.prototype.update = function () {
    if (this.life <= 0) {
        this.removeFromWorld = true;
    }
    Entity.prototype.update.call(this);
};

SpiderWeb.prototype.draw = function (ctx) {
    this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
};