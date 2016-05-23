function WinningScene(game, x, y) {

    this.game = game;
    Entity.call(this, game, x, y, 10);
    
    this.dx = 32;
    this.dy = 55;
    //this.setBox(-22, -21, 30, 5);
    //this.type = LIVE + FLYABLE; 

    this.direction = 1;
    this.fireTime = 100;

    this.winningStar = new Animation(ASSET_MANAGER.getAsset("./img/winningstar.png"),
    this.game, 0, 0, 67, 48, 0.15, 6, true, true, true, this.dx, this.dy);
    
    this.winningStar2 = new Animation(ASSET_MANAGER.getAsset("./img/winningstar.png"),
    this.game, 0, 1 * 48 + 43, 67, 50, 0.15, 6, true, true, true, this.dx, this.dy);
    
    this.winningStar3 = new Animation(ASSET_MANAGER.getAsset("./img/winningstar.png"),
    this.game, 0, 181, 67, 50, 0.15, 6, true, true, true, this.dx, this.dy);
       
    this.winningStar4 = new Animation(ASSET_MANAGER.getAsset("./img/winningstar.png"),
    this.game, 0, 270, 67, 50, 0.15, 6, true, true, true, this.dx, this.dy); 
    
    this.winningStar5 = new Animation(ASSET_MANAGER.getAsset("./img/winningstar.png"),
    this.game, 0, 270, 67, 50, 0.15, 6, true, true, true, this.dx, this.dy); 
    
    this.winningStar6 = new Animation(ASSET_MANAGER.getAsset("./img/winningstar.png"),
    this.game, 0, 1 * 48 + 43, 67, 50, 0.15, 6, true, true, true, this.dx, this.dy);
    
    this.winningStar7 = new Animation(ASSET_MANAGER.getAsset("./img/winningstar.png"),
    this.game, 0, 270, 67, 50, 0.15, 6, true, true, true, this.dx, this.dy); 
}

WinningScene.prototype = new Entity();
WinningScene.prototype.constructor = WinningScene;

WinningScene.prototype.update = function () {
   
    if (this.y >= this.game.maxY) { 
        this.removeFromWorld = true;
    }
    
    this.y += 1 * this.direction;
   
    Entity.prototype.update.call(this);
}

WinningScene.prototype.draw = function (ctx) {
    if(this.isDone) {
        return;
    }
    this.winningStar.drawFrame(this.game.clockTick, ctx, this.x, this.y);
    this.winningStar2.drawFrame(this.game.clockTick, ctx, this.x + 120, this.y + 50);
    this.winningStar3.drawFrame(this.game.clockTick, ctx, this.x + 170, this.y + 30);
    this.winningStar4.drawFrame(this.game.clockTick, ctx, this.x + 240, this.y + 80);
    this.winningStar5.drawFrame(this.game.clockTick, ctx, this.x - 50, this.y + 20);
    this.winningStar6.drawFrame(this.game.clockTick, ctx, this.x + 310, this.y - 10);
    this.winningStar7.drawFrame(this.game.clockTick, ctx, this.x + 360, this.y + 30);
    Entity.prototype.draw.call(this);
}