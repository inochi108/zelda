function ChatMessage(game, x, y) {
    this.game = game;
    Entity.call(this, game, x, y, -99);

    this.dx = 23;
    this.dy = 23;
    this.setBox(-15, -7, 17, 11);
    this.type = LIVE + FLYABLE;
    this.timer = 10;
    this.direction = 0;
    this.radius = 100;
    this.attack = false;
    this.chat = new Animation(ASSET_MANAGER.getAsset("./img/chatmessage.png"), this.game, 0, 0, 300, 138, .02, 1, true, true, false, this.dx, this.dy);
}

ChatMessage.prototype = new Entity();
ChatMessage.prototype.constructor = ChatMessage;

ChatMessage.prototype.update = function () {
    if(this.timer === 0) {
        this.removeFromWorld = true;
        this.timer = 100;
    } else {
        this.timer -= 1;
    }
    Entity.prototype.update.call(this);
}

ChatMessage.prototype.draw = function (ctx) {

    this.chat.drawFrame(this.game.clockTick, ctx, this.x - 10, this.y - 120);
    Entity.prototype.draw.call(this);
}