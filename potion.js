function potion(game, x, y, potionType) {
    this.game = game;
    Entity.call(this, game, x, y, 2);
    
    this.dx = 37;
    this.dy = 49;
    //this.setBox(-22, -21, 30, 5);
    //this.type = LIVE + FLYABLE; 
     switch(potionType) {
         
        case "blue" : 
            this.potion = new Animation(ASSET_MANAGER.getAsset("./img/bluepotion.png"),
            this.game, 0, 0, 23, 27, 0.3, 1, true, true, false, this.dx, this.dy);
            break;
            
        case "red" :
            this.potion = new Animation(ASSET_MANAGER.getAsset("./img/redpotion.png"),
            this.game, 0, 0, 23, 27, 0.3, 1, true, true, false, this.dx, this.dy);
            break;
        
        case "black" :
            this.potion = new Animation(ASSET_MANAGER.getAsset("./img/blackpotion.png"),
            this.game, 0, 0, 23, 27, 0.3, 1, true, true, false, this.dx, this.dy);
            break;
            
        default : break;
     }
}

potion.prototype = new Entity();
potion.prototype.constructor = potion;

potion.prototype.update = function () { 
    Entity.prototype.update.call(this);
}

potion.prototype.draw = function (ctx) {  
    this.potion.drawFrame(this.game.clockTick, ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
}