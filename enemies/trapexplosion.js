function TrapExplosion(game, x, y) {
    this.game = game;
    Entity.call(this, game, x, y, -99);

    this.dx = 24; 
    this.dy = 24;
    //this.setBox(-8, -10, 9, 11);
    //this.type = Entity.BULLET;

    this.radius = 100;
    this.direction = {x: 0, y: 0};
    this.direction.x = this.x;  //length
    this.direction.y = this.y;  //height 

//    var speed = 2; //this bullet moves 2 pixels every tick
//    var distance = Math.sqrt(this.direction.x * this.direction.x + this.direction.y * this.direction.y);
//
//    this.direction.x = this.direction.x * speed / distance;
//    this.direction.y = this.direction.y * speed / distance;
//
//    this.elapsed = 1.3;
    
    this.RCE = new Animation(ASSET_MANAGER.getAsset("./img/trapexplosion.png"),
    this.game, 0, 0, 80.95, 92, 0.15, 11, false, true, false, this.dx, this.dy);
}

TrapExplosion.prototype = new Entity();
TrapExplosion.prototype.constructor = TrapExplosion;

TrapExplosion.prototype.update = function () {
    
//    if(this.RCE.isDone()) {
//        console.log("I am done");
//        this.removeFromWorld = true;
//    }
    
    Entity.prototype.update.call(this);
}

TrapExplosion.prototype.draw = function (ctx) {
    
    this.RCE.drawFrame(this.game.clockTick, ctx, this.x, this.y);
    
    
    Entity.prototype.draw.call(this);
}
