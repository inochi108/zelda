//spider lay a web in a fixed time, and the web will stay at that place and hold link if he touch it

function Spider(game, x, y) {
    this.game = game;
    Entity.call(this, game, x, y, 2);

    this.dx = 22;
    this.dy = 24;
    this.setBox(-18, -14, 18, 19);
    this.type = LIVE;

    this.direction = Math.floor(Math.direction * 4);
    this.directionTimer = 0;
    this.webTimer = 200;
    this.webCount = 0;

    this.move = new Animation(ASSET_MANAGER.getAsset("./img/spider.png"), this.game, 0, 0, 48, 50, /*frame speed*/ 0.25, /*# of frames*/2, true, true, false, this.dx, this.dy);
}

Spider.prototype = new Entity();
Spider.prototype.constructor = Spider;

Spider.prototype.update = function () {
    if (this.life <= 0) {
        this.removeFromWorld = true;
    }
    if (this.webTimer === 0 && this.webCount !== 5) {
        var web = new SpiderWeb(this.game, this.x, this.y);
        this.game.insertEntity(web);
        this.webCount += 1;
        this.webTimer = 400;
    } else {
        this.webTimer -= 1;
    }

    if (this.directionTimer === 0) {
        this.direction = Math.floor(Math.random() * 4);
        this.directionTimer = Math.floor(Math.random() * 30 + 30);
    } else {
        this.directionTimer -= 1;
    }
    switch (this.direction) {
        case 0: //left
            this.x = (this.x <= 2) ? 0 : this.x - 1;
            break;
        case 1: //up
            this.y = (this.y <= 2) ? 0 : this.y - 1;
            break;
        case 2: //right
            this.x = (this.x >= this.game.maxX - 1) ? this.game.maxX : this.x + 1;
            break;
        case 3: //down
            this.y = (this.y >= this.game.maxY - 1) ? this.game.maxY : this.y + 1;
            break;
    }
    Entity.prototype.update.call(this);
}

Spider.prototype.draw = function (ctx) {

    this.move.drawFrame(this.game.clockTick, ctx, this.x, this.y);

    Entity.prototype.draw.call(this);
}