function Fairy(game, x, y) {
    this.game = game;
    Entity.call(this, game, x, y, 1);

    this.dx = 23;
    this.dy = 23;
    this.setBox(-50, -50, 50, 50); 
    this.type = LIVE + FLYABLE + FAIRY;
    this.talking = false;
    this.timer = 10;
    this.fly = new Animation(ASSET_MANAGER.getAsset("./img/fairy.png"), this.game, 0, 0, 50, 50, 0.5, 2, true, true, false, this.dx, this.dy);
}

Fairy.prototype = new Entity();
Fairy.prototype.constructor = Fairy;

Fairy.prototype.update = function () {
    if(this.talking) {
        var chat = new ChatMessage(this.game, this.x, this.y);
        this.game.addEntity(chat);
    }
    if(this.timer === 0) {
        this.talking = false;
    } else {
        this.timer -= 1;
    }
    Entity.prototype.update.call(this);
}

Fairy.prototype.draw = function (ctx) {
    this.fly.drawFrame(this.game.clockTick, ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
}