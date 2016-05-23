function PlantBullet2(game, x, y) {
    this.game = game;
    Entity.call(this, game, x, y, -99);

    this.dx = 24;
    this.dy = 24;
    this.setBox(-8, -10, 9, 11);
    this.type = BULLET;

    this.radius = 100;
    this.direction = {x: 0, y: 0};
    this.direction.x = (this.game.link.x - this.x);  //length
    this.direction.y = (this.game.link.y - this.y - 10);  //height 

    this.bounceBack = false;

    this.speed = 2; //this bullet moves 2 pixels every tick
    var distance = Math.sqrt(this.direction.x * this.direction.x + this.direction.y * this.direction.y);

    this.direction.x = this.direction.x * this.speed / distance;
    this.direction.y = this.direction.y * this.speed / distance;

    this.elapsed = 1;

    this.shoot = new Animation(ASSET_MANAGER.getAsset("./img/underworld.png"), this.game, 0, 100, 50, 50, 0.02, 2, true, true, false, this.dx, this.dy)
}

PlantBullet2.prototype = new Entity();
PlantBullet2.prototype.constructor = PlantBullet2;

PlantBullet2.prototype.update = function () {
    if (this.life <= 0 && this.life > -99) {
        this.removeFromWorld = true;
    }
    if (this.x < 0 || this.x > this.game.maxX || this.y < 0 || this.y > this.game.maxY) {
        this.direction.x = (this.game.link.x - this.x);  //length
        this.direction.y = (this.game.link.y - this.y);
        this.distance = Math.sqrt(this.direction.x * this.direction.x + this.direction.y * this.direction.y);
        this.direction.x = this.direction.x * this.speed / this.distance;
        this.direction.y = this.direction.y * this.speed / this.distance;
        this.bounceBack = true;
    }

    if (this.bounceBack) {
        this.x -= this.elapsed * (this.direction.x * -1);
        this.y -= this.elapsed * (this.direction.y * -1);
    } else {
        this.x += this.elapsed * this.direction.x;
        this.y += this.elapsed * this.direction.y;
    }

    Entity.prototype.update.call(this);
}

PlantBullet2.prototype.draw = function (ctx) {
    this.shoot.drawFrame(this.game.clockTick, ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
}
