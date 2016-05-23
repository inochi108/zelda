function BeeNest(game, x, y) {
    this.game = game;
    Entity.call(this, game, x, y, 10);
    this.setBox(-13, -15, 14, 16);
    this.type = LIVE + FLYABLE;

    this.dx = 15;
    this.dy = 15;
    this.radius = 100;
    this.changeRadius = 0;

    this.fly = new Animation(ASSET_MANAGER.getAsset("./img/bee.png"), this.game, 50, 0, 32, 32, 0.2, 2, true, true, false, this.dx, this.dy);

    this.game.addEntity(new BeeNest2(this.game, this, 0));
    this.game.addEntity(new BeeNest2(this.game, this, 1 * Math.PI / 2));
    this.game.addEntity(new BeeNest2(this.game, this, 2 * Math.PI / 2));
    this.game.addEntity(new BeeNest2(this.game, this, 3 * Math.PI / 2));  
}

BeeNest.prototype = new Entity();
BeeNest.prototype.constructor = BeeNest;

BeeNest.prototype.getPosition = function (alpha) {
    var location = { x: 0, y: 0 };
    location.x = Math.sin(alpha) * this.radius + this.x;
    location.y = Math.cos(alpha) * this.radius + this.y;
    return location;
}

BeeNest.prototype.update = function () {
    if (this.life <= 0) {
        for (i = 0; i < this.game.entities.length; i++) {
            if (this.game.entities[i] instanceof BeeNest2) {
                this.game.entities[i].removeFromWorld = true;
            }
        }

        for (var i = 0; i < 6; i++) {
            var x = Math.random() * 412 + 50;
            var y = Math.random() * 220 + 50;
            this.game.addEntity(new Firefly(this.game, x, y));
        }
        this.removeFromWorld = true;
    }

    var randomNumber = Math.floor(Math.random() * 4);
    switch (randomNumber) {
        case 0: //left
            this.x = (this.x <= 2) ? 0 : this.x - 2;
            break;
        case 1: //up
            this.y = (this.y <= 2) ? 0 : this.y - 2;
            break;
        case 2: //right
            this.x = (this.x >= this.game.maxX - 1) ? this.game.maxX : this.x + 2;
            break;
        case 3: //down
            this.y = (this.y >= this.game.maxY - 1) ? this.game.maxY : this.y + 2;
            break;
    }

    if (this.changeRadius === 0) {
        var dir = Math.floor(Math.random() * 2);
        if (dir === 0) dir = -1;
        this.changeRadius += Math.floor(Math.random() * 20) * dir;
    } else {
        if (this.changeRadius > 0) {
            this.changeRadius--;
            if (this.radius > 20) {
                this.radius--;
            }
        }
        if (this.changeRadius < 0) {
            this.changeRadius++;
            if (this.radius < 150) {
                this.radius++;
            }
        }
    }
    this.radius
    Entity.prototype.update.call(this);
}

BeeNest.prototype.draw = function (ctx) {
    this.fly.drawFrame(this.game.clockTick, ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
}

function BeeNest2(game, nest, alpha) {
    this.game = game;
    Entity.call(this, game, 0, 0, 2);
    this.setBox(-7, -7, 8, 8);
    this.type = LIVE + FLYABLE;

    this.dx = 8;
    this.dy = 8;
    this.beeNest = nest;
    this.alpha = alpha;

    this.fly = new Animation(ASSET_MANAGER.getAsset("./img/bee.png"), this.game, 19, 0, 16, 16, 10, 2, true, true, false, this.dx, this.dy);
}

BeeNest2.prototype = new Entity();
BeeNest2.prototype.constructor = BeeNest2;

BeeNest2.prototype.update = function () {
    if (this.life <= 0) {
        this.removeFromWorld = true;
    }
   
    this.alpha = (this.alpha + 0.1) % 360;
    var location = this.beeNest.getPosition(this.alpha);
    this.x = location.x;
    this.y = location.y;
    Entity.prototype.update.call(this);
}

BeeNest2.prototype.draw = function (ctx) {
    this.fly.drawFrame(this.game.clockTick, ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
}

function Bee(game, x, y) {
    this.game = game;
    Entity.call(this, game, x, y, 1);

    this.dx = 5;
    this.dy = 5;
    this.setBox(-4, -4, 4, 4);
    this.type = LIVE + FLYABLE;

    this.fly = new Animation(ASSET_MANAGER.getAsset("./img/bee.png"), this.game, 0, 0, 9, 9, 10, 2, true, true, false, this.dx, this.dy);
}

Bee.prototype = new Entity();
Bee.prototype.constructor = Bee;

Bee.prototype.update = function () {
    if (this.life <= 0) {
        this.removeFromWorld = true;
    }
    Entity.prototype.update.call(this);
}

Bee.prototype.draw = function (ctx) {
    this.fly.drawFrame(this.game.clockTick, ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
}