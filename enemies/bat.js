function Bat(game, x, y) {
    this.game = game;
    Entity.call(this, game, x, y, 1);

    this.dx = 23;
    this.dy = 23;
    this.setBox(-15, -9, 17, 9);
    this.type = LIVE + FLYABLE;
    this.speed = .5;
    this.fly = new Animation(ASSET_MANAGER.getAsset("./img/underworld.png"), this.game, 0, 0, 50, 50, 0.5, 2, true, true, false, this.dx, this.dy);
}

Bat.prototype = new Entity();
Bat.prototype.constructor = Bat;

Bat.prototype.update = function () {
    if (this.life <= 0) {
        this.removeFromWorld = true;
    }

    if (distance(this.x, this.y, this.game.link.x, this.game.link.y) <= 100) { //chase Link if he is in 100 pixels
        var direction = moveto(this.x, this.y, this.game.link.x, this.game.link.y, 2);//chasing speed is 2 pixels/clockTick
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

Bat.prototype.draw = function (ctx) {
    this.fly.drawFrame(this.game.clockTick, ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
}