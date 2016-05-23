function EllaTheRoseFairy(game, x, y) {
    this.game = game;
    Entity.call(this, game, x, y, 100);
    this.setBox(-25, -30, 25, 30);
    this.type = LIVE + FLYABLE + FAIRY;

    this.dx = 25;
    this.dy = 30;
    this.direction = Math.floor(Math.random() * 360 + 1); // for 360 degrees
    this.directionTimer = 0;
    this.speed = 1;
    this.size = 0.5;
    this.timer = 100;
    this.flyClock = 0;
    this.sizeClock = 0;

    this.fly = new Animation(ASSET_MANAGER.getAsset("./img/ella.png"), this.game, 0, 0, 120, 120, 0.1, 1, true, true, false, this.dx, this.dy);
    this.flies = ["./img/ella1.png", "./img/ella2.png", "./img/ella3.png", "./img/ella4.png", "./img/ella5.png"];

    document.getElementById('fairySound').play();  
}

EllaTheRoseFairy.prototype = new Entity();
EllaTheRoseFairy.prototype.constructor = EllaTheRoseFairy;

EllaTheRoseFairy.prototype.update = function () {
    if (this.directionTimer === 0) {//so this part works in getting direction
        this.directionTimer = 30;
        var degrees = Math.floor(Math.random() * 45 + 1);
        var sign = Math.floor(Math.random() * 2);
        if (sign === 0)
            sign = -1;
        this.direction += degrees * sign;
        if (this.direction < 0)
            this.direction += 360;
        if (this.direction > 360)
            this.direction -= 360;
        
    } else {
        this.directionTimer -= 1;
    }
                                                                                           
    if (this.collideLeftWall() || this.collideRightWall() || this.collideTopWall() || this.collideBottomWall()) {  
        var x = Math.floor(Math.random() * 512 + 32);
        var y = Math.floor(Math.random() * 256 + 32);
        this.direction = Math.atan2(this.y - x, this.x - y) * 180 / Math.PI - 90;
    }
    
    this.x += this.speed * Math.sin(this.direction * Math.PI / 180);
    this.y -= this.speed * Math.cos(this.direction * Math.PI / 180); // canvas (0,0) starts top left not bottom left
    
    var TO_RADIANS = Math.PI / 180;
    var angle = this.direction * TO_RADIANS;
    this.flyClock = (this.flyClock + 1) % 5;
    var rotatedImage = this.rotateAndCache(ASSET_MANAGER.getAsset(this.flies[this.flyClock]), angle);
 
    this.fly = new Animation(rotatedImage, this.game, 0, 0, 120, 120, 0.1, 7, true, true, false, this.dx, this.dy);

    if (this.timer === 0) {
        if (this.timer % 10 === 0) {
            if (this.game.link.life < this.game.link.lifes) {
                this.game.link.life++;
                document.getElementById('healingSound').play();
            } else {
                this.timer = 100;
            }
        } else {
            this.timer--;
        }
    } else {
        this.timer--;;
    }
    Entity.prototype.update.call(this);
}

EllaTheRoseFairy.prototype.draw = function (ctx) {
    if (this.sizeClock <= 0) {
        var sign = Math.floor(Math.random() * 2);
        if (sign === 0) sign = -1;
        this.size = Math.max(Math.min(this.size + sign * Math.random()/10, 1), 0.2);
        this.sizeClock = 50 + Math.random() * 50;
    }
    this.sizeClock--;
    this.fly.drawFrame(this.game.clockTick, ctx,  this.x, this.y, this.size);
    Entity.prototype.draw.call(this);
}