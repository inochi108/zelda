function Sword(game) {
    this.game = game;
    Entity.call(this, game, -1, -1, -99);

    this.setBox(0, 0, 0, 0);
    this.type = MACHINE;
    this.swordReady = false;
}

Sword.prototype = new Entity();
Sword.prototype.constructor = Sword;

Sword.prototype.update = function () {
    if (this.swordReady) {
        this.swordReady = false;
        this.x = this.game.link.x;
        this.y = this.game.link.y;
        switch (this.game.link.direction) {
            case 37: //left
                this.setBox(-40, -22, -11, -3);
                break;
            case 38: //up
                this.setBox(-8, -56, 8, -30);
                break;
            case 39: //right
                this.setBox(12, -23, 45, -6);
                break;
            case 40: //down
                this.setBox(-10, 0, 9, 28);
                break;
            default:
                break;
        }
        for (var i = 0; i < this.game.entities.length; i++) {
            var ent = this.game.entities[i];

            var cl = Entity.prototype.collide.call(this, ent);
            if (cl > 0) {
                if (ent.hasLife()) {
                    if (ent.isFirefly() || ent.isFairy()) {
                        return;
                    }
                    ent.life -= 1;
                    if (ent.life <= 0) {
                        document.getElementById('killSound').play();
                    } else {
                        document.getElementById('hitSound').play();
                    }
                    ent.velocity = 10;
                    switch (this.game.link.direction) {
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
    } else {
        this.x = -1;
        this.y = -1;
        this.setBox(0, 0, 0, 0);
    }
    Entity.prototype.update.call(this);
}

Sword.prototype.draw = function (ctx) {
    Entity.prototype.draw.call(this);
}