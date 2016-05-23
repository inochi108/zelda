function Mummy(game, x, y) {
    this.game = game;
    Entity.call(this, game, x, y, 3);

    this.dx = 23;
    this.dy = 40;
    this.setBox(-15, -28, 18, 0);
    this.type = LIVE;

    this.direction = -1;
    this.velocity = 0;
    this.velocityDx = 0;
    this.velocityDy = 0;

    this.animation = new Animation(ASSET_MANAGER.getAsset("./img/underworld.png"), this.game, 0, 50, 50, 50, .75, 2, true, true, false, this.dx, this.dy);
};

Mummy.prototype = new Entity();
Mummy.prototype.constructor = Mummy;
Mummy.prototype.parent = Entity.prototype;

Mummy.prototype.update = function () {
    if (this.life <= 0) {
        this.removeFromWorld = true;
    }
    if (Entity.prototype.collideLeftWall.call(this) || Entity.prototype.collideRightWall.call(this)) {
        this.direction *= -1;
    }
    for (var i = 0; i < this.game.entities.length; i++) {
        var ent = this.game.entities[i];
        if (ent !== this) {
            var cl = Entity.prototype.collide.call(this, ent);
            if (cl == COLLIDE_LEFT || cl == COLLIDE_RIGHT) {
                this.direction *= -1;
                break;
            }
        }
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
};

Mummy.prototype.draw = function (ctx) {
    this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
};