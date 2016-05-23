function GameOver(game, x, y) {   
    this.game = game;
    Entity.call(this, game, x, y, 1);
    
    this.gameOver = new Animation(ASSET_MANAGER.getAsset("./img/gameover2.png"), this.game, 0, 0, 170, 80, 0.5, 10, true, true, false, 0, 0);
}

GameOver.prototype = new Entity();
GameOver.prototype.constructor = GameOver;

GameOver.prototype.update = function () {  
    Entity.prototype.update.call(this);
}

GameOver.prototype.draw = function (ctx) {
    this.gameOver.drawFrame(this.game.clockTick, ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
}