function Portal(game, x, y) {
    this.game = game;
    Entity.call(this, game, x, y, 10);
    this.dx = 25;
    this.dy = 25;
    this.setBox(-15, -15, 15, 15);
    this.type = LIVE;
    this.radius = 100;
    this.elapsed = 1;
    this.timer = 250;
    this.count = 0;
    this.portal = new Animation(ASSET_MANAGER.getAsset("./img/vampirebat.png"), this.game, 0, 300, 50, 50, 0.07, 5, true, true, false, this.dx, this.dy);
}

Portal.prototype = new Entity();
Portal.prototype.constructor = Portal;
Portal.prototype.update = function () {
    if (this.life <= 0) {
        this.removeFromWorld = true;
    }
    if(this.timer === 0) {
        switch(this.count) {
            case 0:
                this.game.addEntity(new Bat(this.game, this.x, this.y));
                break;
            case 1:
                this.game.addEntity(new Bat2(this.game, this.x, this.y));
                break;
            case 2:
                this.game.addEntity(new Spider(this.game, this.x, this.y));
                break;
            case 3:
                this.game.addEntity(new Firefly(this.game, this.x, this.y));
                break;
            case 4:
                this.game.addEntity(new Wizard(this.game, this.x, this.y));
                this.removeFromWorld = true;
                break;
        }
        this.count++;
        this.timer = 250;
    } else {
        this.timer -= 1;
    }
    
    Entity.prototype.update.call(this);
}

Portal.prototype.draw = function (ctx) {

    this.portal.drawFrame(this.game.clockTick, ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
}
