function Arrow(game, x, y) {
    this.game = game;
    Entity.call(this, game, x, y, -99);

    this.dx = 5;
    this.dy = 1;
    this.setBox(0, 0, 1, 1);
    this.type = ARROW;
    this.angle = 0;

    this.radius = 100;
    this.direction = {x: 0, y: 0};
    this.direction.x = (this.game.link.x - this.x);  //length
    this.direction.y = (this.game.link.y - this.y - 10);  //height 

    var speed = 2; //this bullet moves 2 pixels every tick
    var distance = Math.sqrt(this.direction.x * this.direction.x + this.direction.y * this.direction.y);

    this.direction.x = this.direction.x * speed / distance;
    this.direction.y = this.direction.y * speed / distance;

    this.elapsed = 1;

    this.arrow = new Animation(ASSET_MANAGER.getAsset("./img/arrow.png"), this.game, 0, 0, 12, 34, 1, 1, true, true, false, this.dx, this.dy)
}

Arrow.prototype = new Entity();
Arrow.prototype.constructor = Arrow;

Arrow.prototype.update = function () {
    if (this.x < 0 || this.x > this.game.maxX || this.y < 0 || this.y > this.game.maxY) {
        this.removeFromWorld = true;
    }

    this.x += this.elapsed * this.direction.x;
    this.y += this.elapsed * this.direction.y;

    Entity.prototype.update.call(this);
}

Arrow.prototype.aim = function () {
    console.log("before @(" + this.x + ", " + this.y + ")");
    this.angle = Math.atan(Math.abs(this.x - this.game.link.x) / Math.abs(this.y - this.game.link.y));
    console.log("Sin270 = " + Math.sin(270));
    console.log("angle: " + this.angle);
    var radian_angle = this.angle * Math.PI / 180;
    console.log()
    this.x += this.speed * Math.sin(radian_angle);
    this.y -= this.speed * Math.cos(radian_angle);
    console.log("after @(" + this.x + ", " + this.y + ")");
    var rotatedImage = this.rotateAndCache(ASSET_MANAGER.getAsset("./img/arrow.png"), radian_angle);
    this.arrow = new Animation(rotatedImage, 12, 34, 0.1, 1, true, false);
}

Arrow.prototype.draw = function (ctx) {
    this.arrow.drawFrame(this.game.clockTick, ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
}
          