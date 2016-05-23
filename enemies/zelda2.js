function Zelda2(game, x, y) {
    this.game = game;
    Entity.call(this, game, x, y, -99);

    this.once = true;
    this.dx = 25;
    this.dy = 68;
    this.setBox(-12, -42, 12, 1);
    this.type = BLOCK;
    this.fly = new Animation(ASSET_MANAGER.getAsset("./img/zelda2.png"), this.game, 0, 0, 50, 75, 0.5, 3, true, true, false, this.dx, this.dy);
    this.timer = 0;
}

Zelda2.prototype = new Entity();
Zelda2.prototype.constructor = Zelda2;

Zelda2.prototype.update = function () {
    
    if (this.once) {
        for (var i = 0; i < this.game.entities.length; i++) {
            if (this.game.entities[i] !== this.game.link && this.game.entities[i] !== this) {
                this.game.entities[i].removeFromWorld = true;
            }
        }
        this.once = false;
    }

    var theend = new TheEnd(this.game, this.x, this.y - 150);
    this.game.addEntity(theend);

    if (this.timer === 0) {
        var stars = new WinningScene(this.game, this.x - 150, this.y - 150);
        this.game.addEntity(stars);
        this.timer = 350;
    } else {
        this.timer -= 1;
    }
    Entity.prototype.update.call(this);
}

Zelda2.prototype.draw = function (ctx) {
    this.fly.drawFrame(this.game.clockTick, ctx, this.x, this.y);

    Entity.prototype.draw.call(this);
}
