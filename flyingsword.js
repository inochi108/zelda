function FlyingSword(game, x, y, direction) {
    this.game = game;
    Entity.call(this, game, x, y, -99);
    this.dx = 0;
    this.dy = 0;

    switch (direction) {
        case 37: //left
            this.setBox(5, 4, 26, 15);
            this.dx = -1;
            break;
        case 38: //up
            this.setBox(5, 4, 16, 28);
            this.dy = -1;
            break;
        case 39: //right
            this.setBox(15, 4, 36, 15);
            this.dx = 1;
            break;
        case 40: //down
            this.setBox(5, 13, 16, 38);
            this.dy = 1;
            break;
    }
    this.type = MACHINE;
    this.direction = direction;

    this.speed = 0.2
    this.flyLeft = new Animation(ASSET_MANAGER.getAsset("./img/flyingsword.png"), this.game, 0, 0, 40, 20, this.speed, 2, true, true, false, this.dx, this.dy);
    this.flyRight = new Animation(ASSET_MANAGER.getAsset("./img/flyingsword.png"), this.game, 0, 20, 40, 20, this.speed, 2, true, true, false, this.dx, this.dy);
    this.flyDown = new Animation(ASSET_MANAGER.getAsset("./img/flyingsword.png"), this.game, 0, 40, 20, 40, this.speed, 2, true, true, false, this.dx, this.dy);
    this.flyUp = new Animation(ASSET_MANAGER.getAsset("./img/flyingsword.png"), this.game, 40, 40, 20, 40, this.speed, 2, true, true, false, this.dx, this.dy);
    }

FlyingSword.prototype = new Entity();
FlyingSword.prototype.constructor = FlyingSword;

FlyingSword.prototype.update = function () {
    if (this.x < 0 || this.x > this.game.maxX || this.y < 0 || this.y > this.game.maxY) {
        this.removeFromWorld = true;
        return;
    }
    this.x += this.dx * 5;
    this.y += this.dy * 5;
    for (var i = 0; i < this.game.entities.length; i++) {
        var ent = this.game.entities[i];
        if (this.removeFromWorld) return;
        var cl = Entity.prototype.collide.call(this, ent);
        if (cl > 0) {
            if (ent.hasLife() && !ent.isFirefly() || !ent.isFairy()) {    
                ent.life -= 2;
                this.removeFromWorld = true;
                if (ent.life <= 0) {
                    document.getElementById('killSound').play();
                } else {
                    document.getElementById('hitSound').play();
                }
                ent.velocity = 10;
                switch (this.direction) {
                    case 37: //left
                        ent.velocityDy = 0;
                        ent.velocityDx = -1;
                        break;
                    case 38: //up 
                        ent.velocityDy = -1;
                        ent.velocityDx = 0;
                        break;
                    case 39: //right
                        ent.velocityDy = 0;
                        ent.velocityDx = 1;
                        break;
                    case 40: //down
                        ent.velocityDy = 1;
                        ent.velocityDx = 0;
                        break;
                    default:
                        break;
                }
            } else if (ent.isBullet()) {
                ent.removeFromWorld = true;
            }
        }
    }
    Entity.prototype.update.call(this);
}

FlyingSword.prototype.draw = function (ctx) {
    switch (this.direction) {
        case 37: //left
            this.flyLeft.drawFrame(this.game.clockTick, ctx, this.x, this.y);
            break;
        case 38: //up
            this.flyUp.drawFrame(this.game.clockTick, ctx, this.x, this.y);
            break;
        case 39: //right
            this.flyRight.drawFrame(this.game.clockTick, ctx, this.x, this.y);
            break;
        case 40: //down
            this.flyDown.drawFrame(this.game.clockTick, ctx, this.x, this.y);
            break;
    }
    Entity.prototype.draw.call(this);
}