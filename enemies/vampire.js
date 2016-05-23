function Vampire(game, x, y) {
    this.game = game;
    Entity.call(this, game, x, y, 50);

    this.dx = 24;
    this.dy = 43;
    this.setBox(-15, -38, 15, 1);
    this.type = LIVE;
    this.timer = 0;
    this.radius = 100;
    this.walktime = 40;
    this.random = 0;

    this.elapsed = 1;

    this.down = new Animation(ASSET_MANAGER.getAsset("./img/vampire.png"), this.game, 0, 0, 48, 48, 0.2, 4, true, true, false, this.dx, this.dy);
    this.left = new Animation(ASSET_MANAGER.getAsset("./img/vampire.png"), this.game, 0, 48, 48, 48, 0.2, 4, true, true, false, this.dx, this.dy);
    this.right = new Animation(ASSET_MANAGER.getAsset("./img/vampire.png"), this.game, 0, 96, 48, 48, 0.2, 4, true, true, false, this.dx, this.dy);
    this.up = new Animation(ASSET_MANAGER.getAsset("./img/vampire.png"), this.game, 0, 144, 48, 48, 0.2, 4, true, true, false, this.dx, this.dy);
}

Vampire.prototype = new Entity();
Vampire.prototype.constructor = Vampire;

Vampire.prototype.update = function () {

    if (this.life <= 0) {

        var vampireBat = new VampireBat(this.game, this.x, this.y, 30);
        this.game.addEntity(vampireBat);

        this.removeFromWorld = true;
    }
    if(this.timer === 0) {
        var portal = new Portal(this.game, this.x, this.y);
        this.game.addEntity(portal);
        this.timer = 500;
    } else {
        this.timer -= 1;
    }
    
    if(this.walktime === 0) {
        this.random = Math.floor(Math.random() * 4);
        this.walktime = 40;
    } else {
        this.walktime -= 1;
    }
    switch (this.random) {
        case 0: //left
            this.x = (this.x <= 2) ? 0 : this.x - 1.25;
            break;
        case 1: //up
            this.y = (this.y <= 2) ? 0 : this.y - 1.25;
            break;
        case 2: //right
            this.x = (this.x >= this.game.maxX - 1) ? this.game.maxX : this.x + 1.25;
            break;
        case 3: //down
            this.y = (this.y >= this.game.maxY - 1) ? this.game.maxY : this.y + 1.25;
            break;
    }
    Entity.prototype.update.call(this);
}

Vampire.prototype.draw = function (ctx) {
    switch (this.random) {
        case 0:
            this.left.drawFrame(this.game.clockTick, ctx, this.x, this.y);
            break;
        case 1:
            this.up.drawFrame(this.game.clockTick, ctx, this.x, this.y);
            break;
        case 2:
            this.right.drawFrame(this.game.clockTick, ctx, this.x, this.y);
            break;
        case 3:
            this.down.drawFrame(this.game.clockTick, ctx, this.x, this.y);
            break;
    }
    Entity.prototype.draw.call(this);
}
