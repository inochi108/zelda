function StartGame(game, x, y) {   
    this.game = game;
    Entity.call(this, game, x, y, 1);
    
    this.start = new Animation(ASSET_MANAGER.getAsset("./img/startgame.png"), this.game, 0, 0, 170, 51, 0.5, 1, true, true, false, 0, 0);
}

StartGame.prototype = new Entity();
StartGame.prototype.constructor = StartGame;

StartGame.prototype.update = function () {
    Entity.prototype.update.call(this);
}

StartGame.prototype.draw = function (ctx) {
    this.start.drawFrame(this.game.clockTick, ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
}