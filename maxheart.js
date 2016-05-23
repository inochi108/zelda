function MaxHeart(game, x, y) {
    this.game = game;
    Entity.call(this, game, x, y, -99);
    
    this.dx = 20;
    this.dy = 17;
    this.setBox(-11, -15, 12, 0);
    this.type = LIVE + HEART; 

    this.heart = new Animation(ASSET_MANAGER.getAsset("./img/maxheart.png"),
    this.game, 0, 0, 40, 20, 0.17, 7, true, true, false, this.dx, this.dy);
}

MaxHeart.prototype = new Entity();
MaxHeart.prototype.constructor = MaxHeart;

MaxHeart.prototype.update = function () { 
    Entity.prototype.update.call(this);
}

MaxHeart.prototype.draw = function (ctx) {
    this.heart.drawFrame(this.game.clockTick, ctx, this.x, this.y);    
    Entity.prototype.draw.call(this);
}