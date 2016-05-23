//map is 16x17, (x,y) is the coordinate, starting from (0,0)

function Box(game, x, y) {
    this.game = game;
    Entity.call(this, game, x, y, -99);

    this.dx = 0;
    this.dy = 0;
    this.setBox(0, 0, 32, 32);
    this.type = BLOCK;

    this.move = new Animation(ASSET_MANAGER.getAsset("./img/box.png"), this.game, 0, 0, 32, 32,/*frame speed*/ 0.5, /*# of frames*/1, true, true, false, this.dx, this.dy);
};

Box.prototype = new Entity();
Box.prototype.constructor = Box;

Box.prototype.update = function () {
};

Box.prototype.draw = function (ctx) {
    Entity.prototype.draw.call(this);
};
