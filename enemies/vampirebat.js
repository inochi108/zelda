function VampireBat(game, x, y) {
    this.game = game;
    Entity.call(this, game, x, y, 50);
    this.dx = 49;
    this.dy = 42;
    this.setBox(-30, -10, 30, 25);
    this.type = LIVE;
    this.timer = 0;
    this.walkTimer = 50;
    this.random = Math.floor(Math.random() * 4);

    this.fly = new Animation(ASSET_MANAGER.getAsset("./img/vampirebat.png"), this.game, 0, 0, 100, 100, 0.25, 3, true, true, false, this.dx, this.dy);
}

VampireBat.prototype = new Entity();
VampireBat.prototype.constructor = VampireBat;

VampireBat.prototype.update = function () {
    if (this.life <= 0) {
        for (var i = 0; i < this.game.entities.length; i++) {
            if (this.game.entities[i] !== this.game.link && this.game.entities[i] !== this) {
                this.game.entities[i].removeFromWorld = true;
            }
        }
        this.game.winning = true;
        var zeldaportal = new ZeldaPortal(this.game, 256, 160, 10);
        this.game.addEntity(zeldaportal);
        this.removeFromWorld = true;
    }

    if (this.timer === 0) {
            for (var i = 0; i < 4; i++) {
                var x = Math.floor(Math.random() * 12 + 2); // gives a random x from tile 2 to 13
                var y = Math.floor(Math.random() * 6 + 2); // gives a random y from tiles 2 to 7
                var add1 = Math.random() * 33; //gives random x pixel from 0 to 32
                var add2 = Math.random() * 33; // gives random y pixel from 0 to 32
                this.game.addEntity(new Portal(this.game, x * 32 + add1, y * 32 + add2));
            }
        this.timer = 2000;
    } else {
        this.timer -= 1;
    }

    if (this.walkTimer === 0) {
        this.random = Math.floor(Math.random() * 4);
        this.walkTimer = 40;
    } else {
        this.walkTimer -= 1;
    }

    switch (this.random) {
        case 0: //left
            this.x = (this.x <= 2) ? 0 : this.x - 1.5;
            break;
        case 1: //up
            this.y = (this.y <= 2) ? 0 : this.y - 1.5;
            break;
        case 2: //right
            this.x = (this.x >= this.game.maxX - 1) ? this.game.maxX : this.x + 1.5;
            break;
        case 3: //down
            this.y = (this.y >= this.game.maxY - 1) ? this.game.maxY : this.y + 1.5;
            break;
    }

    Entity.prototype.update.call(this);
}

VampireBat.prototype.draw = function (ctx) {

    this.fly.drawFrame(this.game.clockTick, ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
}
