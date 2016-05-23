function Trap(game, x, y) {
    this.game = game;
    Entity.call(this, game, x, y, 10);
    
    this.dx = 30;
    this.dy = 20;
    //this.setBox(-22, -21, 30, 5);
    //this.type = LIVE + FLYABLE; 

    this.direction = 1;
    this.explosionTrigger = 100;
    
    this.shooting = false;

    this.redCrossPosition = new Animation(ASSET_MANAGER.getAsset("./img/trap.png"),
    this.game, 0, 0, 48, 48, 0.30, 1, true, true, true, this.dx, this.dy);
}

Trap.prototype = new Entity();
Trap.prototype.constructor = Trap;

Trap.prototype.update = function () {

    if(this.explosionTrigger === 0) {
        
        var RCE = new TrapExplosion(this.game, this.x - 17, this.y - 52);
        this.game.addEntity(RCE);
        this.explosionTrigger = 100;
        //this.shooting = true;
        
    }else {
        this.explosionTrigger -= 1;
        //this.shooting = false;
    }

    //this.x += 1 * this.direction;
    Entity.prototype.update.call(this);
}

Trap.prototype.draw = function (ctx) {
    
    this.redCrossPosition.drawFrame(this.game.clockTick, ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
}