function Wizard(game, x, y) {
    this.game = game;
    Entity.call(this, game, x, y, 10);

    this.dx = 24;
    this.dy = 44;
    this.setBox(-15, -35, 13, 3);
    this.type = LIVE + FLYABLE;
    this.radius = 100;

    this.appear = true;
    this.shoot = false;
    this.warp = false;
    this.teleported = false;
    this.direction = 1;
    this.icetimer = Math.floor(Math.random() * 200 + 100);
    this.warptimer = Math.floor(Math.random() * 200 + 200);

    this.faceright = new Animation(ASSET_MANAGER.getAsset("./img/wizardblur.png"),
            this.game, 0, 0, 48, 52, 0.1, 1, true, true, false, this.dx, this.dy);

    this.faceleft = new Animation(ASSET_MANAGER.getAsset("./img/wizardblurflip.png"),
            this.game, 9 * 48, 0, 48, 52, 0.1, 1, true, true, false, this.dx, this.dy);

    this.warpfaceright = new Animation(ASSET_MANAGER.getAsset("./img/wizardblur.png"),
            this.game, 0, 0, 48, 52, 0.2, 10, false, true, false, this.dx, this.dy);

    this.warpfaceleft = new Animation(ASSET_MANAGER.getAsset("./img/wizardblurflip.png"),
            this.game, 0, 0, 48, 52, 0.2, 10, false, true, true, this.dx, this.dy);

    this.appearfaceright = new Animation(ASSET_MANAGER.getAsset("./img/wizardblur.png"),
            this.game, 0, 0, 48, 52, 0.2, 10, false, true, true, this.dx, this.dy);

    this.appearfaceleft = new Animation(ASSET_MANAGER.getAsset("./img/wizardblurflip.png"),
            this.game, 0, 0, 48, 52, 0.2, 10, false, true, false, this.dx, this.dy);

    this.shootright = new Animation(ASSET_MANAGER.getAsset("./img/wizard2.png"),
            this.game, 0 * 48, 3 * 48, 48, 48, 0.15, 6, false, true, false, this.dx, this.dy);

    this.shootleft = new Animation(ASSET_MANAGER.getAsset("./img/wizard2reflect.png"),
            this.game, 4 * 48, 3 * 48, 48, 48, 0.15, 6, false, true, false, this.dx, this.dy);
}

Wizard.prototype = new Entity();
Wizard.prototype.constructor = Wizard;

Wizard.prototype.update = function () {
    if (this.life <= 0) {
        this.removeFromWorld = true;
    }

    if (this.teleported) {
        var x = Math.floor(Math.random() * 12 + 2); // gives a random x from tile 2 to 13
        var y = Math.floor(Math.random() * 6 + 2); // gives a random y from tiles 2 to 7
        var add1 = Math.random() * 33; //gives random x pixel from 0 to 32
        var add2 = Math.random() * 33; // gives random y pixel from 0 to 32
        this.x = x * 32 + add1;
        this.y = y * 32 + add2;
        this.teleported = false;
        this.appear = true;
        return;
    }

    if (this.x <= this.game.link.x) {
        this.direction = 1; //facing right
    } else {
        this.direction = -1; //facing left
    }

    if (this.icetimer === 0) {
        var iceball = new WizardIceBall(this.game, this.x, this.y - 20, this.direction);
        this.game.addEntity(iceball);
        document.getElementById('iceballSound').play();
        this.shoot = true;
        this.icetimer = Math.floor(Math.random() * 200 + 100);
    } else {
        this.icetimer -= 1;
    }

    if (this.warptimer === 0) {
        this.warp = true;
        this.warptimer = Math.floor(Math.random() * 200 + 200);
    } else {
        this.warptimer -= 1;
    }

    Entity.prototype.update.call(this);
}

Wizard.prototype.draw = function (ctx) {
    if (this.appear) {
        
        if (this.direction === -1/*facing left*/) {
            this.appearfaceleft.drawFrame(this.game.clockTick, ctx, this.x, this.y);
            if (this.appearfaceleft.isDone()) {
                this.appear = false;
                this.appearfaceleft.elapsedTime = 0;
            }
        } else {
            this.appearfaceright.drawFrame(this.game.clockTick, ctx, this.x, this.y);
            if (this.appearfaceright.isDone()) {
                this.appear = false;
                this.appearfaceright.elapsedTime = 0;
            }
        }
    } else
    if (this.shoot) {
        if (this.direction === -1/*facing left*/) {
            this.shootleft.drawFrame(this.game.clockTick, ctx, this.x, this.y);
            if (this.shootleft.isDone()) {
                this.shoot = false;
                this.shootleft.elapsedTime = 0;
            }
        } else {
            this.shootright.drawFrame(this.game.clockTick, ctx, this.x, this.y);
            if (this.shootright.isDone()) {
                this.shoot = false;
                this.shootright.elapsedTime = 0;
            }
        }
    } else if (this.warp) {
        if (this.direction === -1/*facing left*/) {

            this.warpfaceleft.drawFrame(this.game.clockTick, ctx, this.x, this.y);
            if (this.warpfaceleft.isDone()) {
                this.warp = false;
                this.teleported = true;
                this.warpfaceleft.elapsedTime = 0;
            }
        } else {
            this.warpfaceright.drawFrame(this.game.clockTick, ctx, this.x, this.y);

            if (this.warpfaceright.isDone()) {
                this.warp = false;
                this.teleported = true;
                this.warpfaceright.elapsedTime = 0;
            }
        }
    } else {
        if (this.direction === -1 /*facing left*/) {
            this.faceleft.drawFrame(this.game.clockTick, ctx, this.x, this.y);
        } else {
            this.faceright.drawFrame(this.game.clockTick, ctx, this.x, this.y);
        }
    }
    Entity.prototype.draw.call(this);
}
