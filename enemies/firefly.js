function Firefly(game, x, y) {
    this.game = game;
    Entity.call(this, game, x, y, 1);

    this.dx = 24;
    this.dy = 36;
    this.setBox(-11, -10, 11, 10);
    this.speed = .5;
    this.type = LIVE + FLYABLE + FIREFLY;
    this.fly = new Animation(ASSET_MANAGER.getAsset("./img/firefly.png"), this.game, 0, 0, 50, 50, 0.05, 3, true, true, false, this.dx, this.dy);
}

Firefly.prototype = new Entity();
Firefly.prototype.constructor = Firefly;

Firefly.prototype.update = function () {
    if (this.life <= 0) {
        this.removeFromWorld = true;
    }
    var d = distance(this.x, this.y, this.game.link.x, this.game.link.y);
    if (d <= 60) {
        var direction = moveto(this.x, this.y, this.game.link.x, this.game.link.y, 2);
        this.x += direction.x * this.speed;
        this.y += direction.y * this.speed;
    } else {
        var randomNumber = Math.floor(Math.random() * 4);
        switch (randomNumber) {
            case 0: //left
                this.x = (this.x <= 2) ? 0 : this.x - 2;
                break;
            case 1: //up
                this.y = (this.y <= 2) ? 0 : this.y - 2;
                break;
            case 2: //right
                this.x = (this.x >= this.game.maxX - 1) ? this.game.maxX : this.x + 2;
                break;
            case 3: //down
                this.y = (this.y >= this.game.maxY - 1) ? this.game.maxY : this.y + 2;
                break;
        }
    }
    Entity.prototype.update.call(this);
}

Firefly.prototype.draw = function (ctx) {
    this.fly.drawFrame(this.game.clockTick, ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
}