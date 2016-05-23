function Link(game,x, y) {
    this.game = game;
    //Entity.call(this, game, Math.floor(game.maxX / 2), Math.floor(game.maxY / 2), 6);
    Entity.call(this, game, x, y, 1); // Link has 6 lifes now

    this.lifes = 3; //Link has 10 hearts now
    this.maxLife = 20; //Link can have the maximum of 20 hearts
    this.dx = 38;
    this.dy = 56;
    this.setBox(-11, -30, 11, 0);
    this.type = LIVE;

    this.slashing = false;
    this.walking = false;
    this.direction = 37;
    this.speed = 0.2;

    this.walkLeft = new Animation(ASSET_MANAGER.getAsset("./img/link.png"), this.game, 0, 0, 90, 90, this.speed, 2, true, true, false, this.dx, this.dy);
    this.walkUp = new Animation(ASSET_MANAGER.getAsset("./img/link.png"), this.game, 0, 90, 90, 90, this.speed, 2, true, true, false, this.dx, this.dy);
    this.walkRight = new Animation(ASSET_MANAGER.getAsset("./img/link.png"), this.game, 0, 180, 90, 90, this.speed, 2, true, true, false, this.dx, this.dy);
    this.walkDown = new Animation(ASSET_MANAGER.getAsset("./img/link.png"), this.game, 0, 270, 90, 90, this.speed, 2, true, true, false, this.dx, this.dy);
    this.slashLeft = new Animation(ASSET_MANAGER.getAsset("./img/link.png"), this.game, 0, 360, 90, 90, this.speed, 2, false, true, false, this.dx, this.dy);
    this.slashUp = new Animation(ASSET_MANAGER.getAsset("./img/link.png"), this.game, 0, 450, 90, 90, this.speed, 2, false, true, false, this.dx, this.dy);
    this.slashRight = new Animation(ASSET_MANAGER.getAsset("./img/link.png"), this.game, 0, 540, 90, 90, this.speed, 2, false, true, false, this.dx, this.dy);
    this.slashDown = new Animation(ASSET_MANAGER.getAsset("./img/link.png"), this.game, 0, 630, 90, 90, this.speed, 2, false, true, false, this.dx, this.dy);
    this.dead = new Animation(ASSET_MANAGER.getAsset("./img/link.png"), this.game, 0, 720, 90, 90, this.speed, 2, false, true, false, this.dx, this.dy);
    this.idleLeft = new Animation(ASSET_MANAGER.getAsset("./img/link.png"), this.game, 90, 0, 90, 90, this.speed, 1, true, true, false, this.dx, this.dy);
    this.idleUp = new Animation(ASSET_MANAGER.getAsset("./img/link.png"), this.game, 90, 90, 90, 90, this.speed, 1, true, true, false, this.dx, this.dy);
    this.idleRight = new Animation(ASSET_MANAGER.getAsset("./img/link.png"), this.game, 90, 180, 90, 90, this.speed, 1, true, true, false, this.dx, this.dy);
    this.idleDown = new Animation(ASSET_MANAGER.getAsset("./img/link.png"), this.game, 90, 270, 90, 90, this.speed, 1, true, true, false, this.dx, this.dy);

    this.walkLeftHurt = new Animation(ASSET_MANAGER.getAsset("./img/link2.png"), this.game, 0, 0, 90, 90, this.speed / 2, 4, true, true, false, this.dx, this.dy);
    this.walkUpHurt = new Animation(ASSET_MANAGER.getAsset("./img/link2.png"), this.game, 0, 90, 90, 90, this.speed / 2, 4, true, true, false, this.dx, this.dy);
    this.walkRightHurt = new Animation(ASSET_MANAGER.getAsset("./img/link2.png"), this.game, 0, 180, 90, 90, this.speed / 2, 4, true, true, false, this.dx, this.dy);
    this.walkDownHurt = new Animation(ASSET_MANAGER.getAsset("./img/link2.png"), this.game, 0, 270, 90, 90, this.speed / 2, 4, true, true, false, this.dx, this.dy);
    this.slashLeftHurt = new Animation(ASSET_MANAGER.getAsset("./img/link2.png"), this.game, 0, 360, 90, 90, this.speed / 2, 4, false, true, false, this.dx, this.dy);
    this.slashUpHurt = new Animation(ASSET_MANAGER.getAsset("./img/link2.png"), this.game, 0, 450, 90, 90, this.speed / 2, 4, false, true, false, this.dx, this.dy);
    this.slashRightHurt = new Animation(ASSET_MANAGER.getAsset("./img/link2.png"), this.game, 0, 540, 90, 90, this.speed / 2, 4, false, true, false, this.dx, this.dy);
    this.slashDownHurt = new Animation(ASSET_MANAGER.getAsset("./img/link2.png"), this.game, 0, 630, 90, 90, this.speed / 2, 4, false, true, false, this.dx, this.dy);
    this.idleLeftHurt = new Animation(ASSET_MANAGER.getAsset("./img/link2.png"), this.game, 90, 0, 90, 90, this.speed / 2, 2, true, true, false, this.dx, this.dy);
    this.idleUpHurt = new Animation(ASSET_MANAGER.getAsset("./img/link2.png"), this.game, 90, 90, 90, 90, this.speed / 2, 2, true, true, false, this.dx, this.dy);
    this.idleRightHurt = new Animation(ASSET_MANAGER.getAsset("./img/link2.png"), this.game, 90, 180, 90, 90, this.speed / 2, 2, true, true, false, this.dx, this.dy);
    this.idleDownHurt = new Animation(ASSET_MANAGER.getAsset("./img/link2.png"), this.game, 90, 270, 90, 90, this.speed / 2, 2, true, true, false, this.dx, this.dy);

    this.hurtTime = 0;
    this.ImHurt = false;
}

Link.prototype = new Entity();
Link.prototype.constructor = Link;

Link.prototype.update = function () {
    var oldX = this.x;
    var oldY = this.y;
    var tldy = this.tldy;

    var UP = 38;
    var DOWN = 40;
    var LEFT = 37;
    var RIGHT = 39;

    switch (this.game.keyCode) {
        case LEFT: //left
            this.x += -2;
            if (GameEngine.prototype.touchAnyBlock.call(this.game, this)) {
                this.x = oldX;
                this.y = oldY;
            }
            if (this.x <= 0) {
                this.game.scrolling = true;
                GameEngine.prototype.scroll.call(this.game, LEFT);
            }
            break;
        case UP: //up
            this.y += -2;
            if (GameEngine.prototype.touchAnyBlock.call(this.game, this)) {
                this.x = oldX;
                this.y = oldY;
            }
            if (this.y <= 0) {
                this.game.scrolling = true;
                GameEngine.prototype.scroll.call(this.game, UP);
            }
            break;
        case RIGHT: //right
            this.x += 2;
            if (GameEngine.prototype.touchAnyBlock.call(this.game, this)) {
                this.x = oldX;
                this.y = oldY;
            }
            if (this.x >= this.game.maxX) {
                this.game.scrolling = true;
                GameEngine.prototype.scroll.call(this.game, RIGHT);
            }
            break;
        case DOWN: //down
            this.y += 2;
            if (GameEngine.prototype.touchAnyBlock.call(this.game, this)) {
                this.x = oldX;
                this.y = oldY;
            }
            if (this.y >= this.game.maxY) {
                this.game.scrolling = true;
                GameEngine.prototype.scroll.call(this.game, DOWN);
            }
            break;
    }
    if (this.game.keyCode >= 37 && this.game.keyCode <= 40) {
        this.direction = this.game.keyCode;
    }

    this.walking = this.game.arrow && !this.game.arrowReleased;
    
    if (this.game.space && !this.slashing) {
        this.slashing = true;
        this.game.space = null;
        this.game.sword.x = this.x;
        this.game.sword.y = this.y;
        this.game.sword.swordReady = true;    
        document.getElementById('swordSound').play();
    }

    if (this.slashing) {
        if (this.life === this.lifes && !this.game.flyingSword) {
            var dx = 0;
            var dy = 0;
            switch (this.direction) {
                case LEFT: //left
                    dx = -35;
                    dy = -23;
                    break;
                case UP: //up
                    dx = -10;
                    dy = -60;
                    break;
                case RIGHT: //right
                    dx = 5;
                    dy = -23;
                    break;
                case DOWN: //down
                    dx = -10;
                    dy = 0;
                    break;
            }
            this.game.flyingSword = new FlyingSword(this.game, this.x + dx, this.y + dy, this.direction);
            document.getElementById('flyingSwordSound').play();
        }
        switch (this.direction) {
            case LEFT: //left
                if (this.slashLeft.isDone()) {
                    this.slashLeft.elapsedTime = 0;
                    this.slashing = false;
                }
                if (this.slashLeftHurt.isDone()) {
                    this.slashLeftHurt.elapsedTime = 0;
                    this.slashing = false;
                }
                break;
            case UP: //up
                if (this.slashUp.isDone()) {
                    this.slashUp.elapsedTime = 0;
                    this.slashing = false;
                }
                if (this.slashUpHurt.isDone()) {
                    this.slashUpHurt.elapsedTime = 0;
                    this.slashing = false;
                }
                break;
            case RIGHT: //right
                if (this.slashRight.isDone()) {
                    this.slashRight.elapsedTime = 0;
                    this.slashing = false;
                }
                if (this.slashRightHurt.isDone()) {
                    this.slashRightHurt.elapsedTime = 0;
                    this.slashing = false;
                }
                break;
            case DOWN: //down
                if (this.slashDown.isDone()) {
                    this.slashDown.elapsedTime = 0;
                    this.slashing = false;
                }
                if (this.slashDownHurt.isDone()) {
                    this.slashDownHurt.elapsedTime = 0;
                    this.slashing = false;
                }
                break;
            default:
                break;
        }
    }
    if (this.ImHurt && this.hurtTime < this.game.timer.gameTime - 20) {
        this.ImHurt = false;
    }

    if (!this.ImHurt) {
        this.hurtTime = this.game.timer.gameTime;
        for (var i = 0; i < this.game.entities.length; i++) {
            if (!this.ImHurt) {
                var ent = this.game.entities[i];
                if (ent.hasLife() || ent.isBullet()) {
                    var cl = Entity.prototype.collide.call(this, ent);
                    if (cl > 0) {
                        if (ent.isFirefly()) {
                            document.getElementById('getHeartSound').play();
                            if (this.life < this.lifes) {
                                this.life++;    
                            }
                            ent.removeFromWorld = true;
                        } else if (ent.isFairy()) {
                            ent.talking = true;
                        } else if (ent.isHeart()) {
                            if (this.lifes < this.maxLife) {
                                this.lifes++;
                            }
                            this.game.items[this.game.currentID] = true; //get this item
                            document.getElementById('getItemSound').play();
                            ent.removeFromWorld = true;
                        } else {
                            if (ent.isBullet()) {
                                ent.removeFromWorld = true;
                                if (cl === this.direction) {
                                    document.getElementById('shieldSound').play();
                                    return;
                                }
                            }                           
                            this.life -= 1;
                            this.ImHurt = true;
                            document.getElementById('hurtSound').play();
                            var d = 20; //pull back 10 when Link was hit
                            if (this.life <= 0) {
                                document.getElementById('dieSound').play();
                                this.game.gameOver = true;
                            }

                            switch (cl) {
                                case COLLIDE_TOP: //enemy on top
                                    d = Math.min(d, this.game.maxY - this.y - 1);
                                    while (d > 0) {
                                        this.y++;
                                        if (GameEngine.prototype.touchBlock.call(this.game, this, COLLIDE_BOTTOM)) { //will we touch a block on bottom?
                                            d = 0;
                                            this.y--;
                                        } else {
                                            d--;
                                        }
                                    }
                                    break;
                                case COLLIDE_BOTTOM: //enemy at bottom
                                    d = Math.min(d, this.y - 1);
                                    while (d > 0) {
                                        this.y--;
                                        if (GameEngine.prototype.touchBlock.call(this.game, this, COLLIDE_TOP)) { //will we touch a block on top?
                                            d = 0;
                                            this.y++;
                                        } else {
                                            d--;
                                        }
                                    }
                                    break;
                                case COLLIDE_LEFT: //enemy on left 
                                    d = Math.min(d, this.game.maxX - this.x - 1);
                                    while (d > 0) {
                                        this.x++;
                                        if (GameEngine.prototype.touchBlock.call(this.game, this, COLLIDE_RIGHT)) { //will we touch a block on right?
                                            d = 0;
                                            this.x--;
                                        } else {
                                            d--;
                                        }
                                    }
                                    break;
                                case COLLIDE_RIGHT: //enemy on right
                                    d = Math.min(d, this.x - 1);
                                    while (d > 0) {
                                        this.x--;
                                        if (GameEngine.prototype.touchBlock.call(this.game, this, COLLIDE_LEFT)) { //will we touch a block on left?
                                            d = 0;
                                            this.x++;
                                        } else {
                                            d--;
                                        }
                                    }
                                    break;
                            }
                        }
                    }
                }
            }
        }
    }
    Entity.prototype.update.call(this);
}

Link.prototype.draw = function (ctx) {
    if (this.life <= 0) {
        this.dead.drawFrame(this.game.clockTick, ctx, this.x, this.y);
    } else if (this.slashing) {
       switch (this.direction) {     
            case LEFT: //left
                if (this.ImHurt) {
                    this.slashLeftHurt.drawFrame(this.game.clockTick, ctx, this.x, this.y);
                } else {
                    this.slashLeft.drawFrame(this.game.clockTick, ctx, this.x, this.y);
                }
                break;
            case UP: //up
                if (this.ImHurt) {
                    this.slashUpHurt.drawFrame(this.game.clockTick, ctx, this.x, this.y);
                } else {
                    this.slashUp.drawFrame(this.game.clockTick, ctx, this.x, this.y);
                }
                break;
            case RIGHT: //right
                if (this.ImHurt) {
                    this.slashRightHurt.drawFrame(this.game.clockTick, ctx, this.x, this.y);
                } else {
                    this.slashRight.drawFrame(this.game.clockTick, ctx, this.x, this.y);
                }
                break;
            case DOWN: //down
                if (this.ImHurt) {
                    this.slashDownHurt.drawFrame(this.game.clockTick, ctx, this.x, this.y);
                } else {
                    this.slashDown.drawFrame(this.game.clockTick, ctx, this.x, this.y);
                }
                break;
        }
    }
    else if (this.walking) {
        switch (this.direction) {
            case LEFT: //left
                if (this.ImHurt) {
                    this.walkLeftHurt.drawFrame(this.game.clockTick, ctx, this.x, this.y);
                } else {
                    this.walkLeft.drawFrame(this.game.clockTick, ctx, this.x, this.y);
                }
                break;
            case UP: //up
                if (this.ImHurt) {
                    this.walkUpHurt.drawFrame(this.game.clockTick, ctx, this.x, this.y);
                } else {
                    this.walkUp.drawFrame(this.game.clockTick, ctx, this.x, this.y);
                } break;
            case RIGHT: //right
                if (this.ImHurt) {
                    this.walkRightHurt.drawFrame(this.game.clockTick, ctx, this.x, this.y);
                } else {
                    this.walkRight.drawFrame(this.game.clockTick, ctx, this.x, this.y);
                } break;
            case DOWN: //down
                if (this.ImHurt) {
                    this.walkDownHurt.drawFrame(this.game.clockTick, ctx, this.x, this.y);
                } else {
                    this.walkDown.drawFrame(this.game.clockTick, ctx, this.x, this.y);
                } break;
        }
    } else {
        switch (this.direction) {
            case LEFT: //left
                if (this.ImHurt) {
                    this.idleLeftHurt.drawFrame(this.game.clockTick, ctx, this.x, this.y);
                } else {
                    this.idleLeft.drawFrame(this.game.clockTick, ctx, this.x, this.y);
                }
                break;
            case UP: //up
                if (this.ImHurt) {
                    this.idleUpHurt.drawFrame(this.game.clockTick, ctx, this.x, this.y);
                } else {
                    this.idleUp.drawFrame(this.game.clockTick, ctx, this.x, this.y);
                } break;
            case RIGHT: //right
                if (this.ImHurt) {
                    this.idleRightHurt.drawFrame(this.game.clockTick, ctx, this.x, this.y);
                } else {
                    this.idleRight.drawFrame(this.game.clockTick, ctx, this.x, this.y);
                } break;
            case DOWN: //down
                if (this.ImHurt) {
                    this.idleDownHurt.drawFrame(this.game.clockTick, ctx, this.x, this.y);
                } else {
                    this.idleDown.drawFrame(this.game.clockTick, ctx, this.x, this.y);
                } break;
        }
    }
    Entity.prototype.draw.call(this);
}
