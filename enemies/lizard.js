function Lizard(game, x, y) {
    this.game = game;
    Entity.call(this, game, x, y, 10);
    
    this.dx = 40;
    this.dy = 50;
    this.setBox(-28, -36, 23, 0);
    this.type = LIVE; 

    this.direction = 1;
    this.velocity = 0;
    this.velocityDx = 0;
    this.velocityDy = 0;

    this.fireTime = 100;
    this.shooting = false;

    this.walkingRight = new Animation(ASSET_MANAGER.getAsset("./img/lizard.png"),
    this.game, 0, 0, 80, 60, 0.15, 6, true, true, false, this.dx, this.dy);
    
    this.walkingLeft = new Animation(ASSET_MANAGER.getAsset("./img/lizard.png"),
    this.game, 0, 2 * 60, 80, 60, 0.15, 6, true, true, false, this.dx, this.dy);
    
    this.shootingFireBallRight = new Animation(ASSET_MANAGER.getAsset("./img/lizard.png"),
    this.game, 0, 1 * 60, 80, 60, 0.15, 5, false, true, false, this.dx, this.dy); 
    
    this.shootingFireBallLeft = new Animation(ASSET_MANAGER.getAsset("./img/lizard.png"),
    this.game, 0, 3 * 60, 80, 45, 0.15, 5, false, true, false, this.dx, this.dy); 
}

Lizard.prototype = new Entity();
Lizard.prototype.constructor = Lizard;

Lizard.prototype.update = function () {
    if (this.life <= 0) {
        this.removeFromWorld = true;
    }
    if (this.x <= 0 || this.x >= this.game.maxX) { 
        this.direction *= -1; 
    }
    for (var i = 0; i < this.game.blocks.length; i++) {
        var blk = this.game.blocks[i];
        if (blk !== this) {
            var cl = Entity.prototype.collide.call(this, blk);
            if (cl == COLLIDE_LEFT || cl == COLLIDE_RIGHT) {
                this.direction *= -1;
                break;
            }
        }
    }

    var fireBall; 
    if(this.fireTime === 100) {
        
        if (this.direction > 0) {
           // console.log("I am facing right");
            fireBall = new LizardFireball(this.game, this.x + 68, this.y - 20, 1);
        } else {
            //console.log("I am facing left");
            fireBall = new LizardFireball(this.game, this.x - 50, this.y - 20, -1);
        }
        document.getElementById('fireballSound').play();
        this.game.addEntity(fireBall);
        this.fireTime = 0;
        this.shooting = true;
    } else {
        this.fireTime += 1;
    }
    
    if (this.shooting) {
        this.x += 0;
    } else {
        this.x += 2 * this.direction;
    }
    
    this.x += this.direction * 0.5;
    if (this.velocity > 0.5) {
        this.x += this.velocity * this.velocityDx;
        this.y += this.velocity * this.velocityDy;
        this.velocity *= .75;
    } else {
        this.velocity = 0;
        this.velocityDx = 0;
        this.velocityDy = 0;
    }
    Entity.prototype.update.call(this);
}

Lizard.prototype.draw = function (ctx) {

    if(this.shooting) {
        
        if(this.direction > 0) {
            this.shootingFireBallRight.drawFrame(this.game.clockTick, ctx, this.x, this.y);
        } else {
            this.shootingFireBallLeft.drawFrame(this.game.clockTick, ctx, this.x, this.y + 7);
        }
        
        if(this.shootingFireBallRight.isDone()) {
            this.shooting = false;  
            this.shootingFireBallRight.elapsedTime = 0;
        }
        
        if(this.shootingFireBallLeft.isDone()) {
            this.shooting = false;  
            this.shootingFireBallLeft.elapsedTime = 0;
        }
        
    } else if (this.direction < 0) {
        this.walkingLeft.drawFrame(this.game.clockTick, ctx, this.x, this.y + 7);
    } else if (this.direction > 0) {
        this.walkingRight.drawFrame(this.game.clockTick, ctx, this.x, this.y);
    }
    
    //this.shooting = false;
    
    Entity.prototype.draw.call(this);
}