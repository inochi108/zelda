var LIVE = 1;
var FLYABLE = 2;
var BULLET = 4;
var MACHINE = 8;
var BLOCK = 16;
var FIREFLY = 32;
var FAIRY = 64;
var HEART = 128;
var ARROW = 256;

var UP = 38;
var DOWN = 40;
var LEFT = 37;
var RIGHT = 39;

var COLLIDE_TOP = 38;
var COLLIDE_BOTTOM = 40;
var COLLIDE_LEFT = 37;
var COLLIDE_RIGHT = 39;

function Entity(game, x, y, life) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.life = life;
    this.type = 0;
    this.removeFromWorld = false;
}

Entity.prototype.canFly = function () {
    return (this.type & FLYABLE) != 0;
};

Entity.prototype.hasLife = function () {
    return (this.type & LIVE) != 0;
};

Entity.prototype.isBullet = function () {
    return (this.type & BULLET) != 0;
};

Entity.prototype.isMachine = function () {
    return (this.type & MACHINE) != 0;
}

Entity.prototype.isBlock = function () {
    return (this.type & BLOCK) != 0;
}

Entity.prototype.isFirefly = function () {
    return (this.type & FIREFLY) != 0;
}

Entity.prototype.isFairy = function () {
    return (this.type & FAIRY) != 0;
}

Entity.prototype.isHeart = function () {
    return (this.type & HEART) != 0;
}

Entity.prototype.setBox = function (tlx, tly, brx, bry) {
    this.tldx = tlx; //top left dx from x; tldx < 0
    this.tldy = tly; //top left dy from y; tldy < 0
    this.brdx = brx; //bottom right dx from x; brdx > 0
    this.brdy = bry; //bottom right dy from y; brdy > 0
    //console.log("setbox " + this.tldx + " " + this.tldy + " " + this.brdx + " " + this.brdy);
};

Entity.prototype.collideLeftWall = function () { 
    return this.x + this.tldx <= 0;
};

Entity.prototype.collideRightWall = function () {
    return this.x + this.brdx >= this.game.maxX;
};

Entity.prototype.collideTopWall = function () {
    return this.y + this.tldy <= 0;
}

Entity.prototype.collideBottomWall = function () {
    return this.y + this.brdy >= this.game.maxY;
}

Entity.prototype.collideLeftRight = function (other) {
    var collided = false;
    var tl = this.x + this.tldx;
    var tr = this.x + this.brdx;
    var ol = other.x + other.tldx;
    var or = other.x + other.brdx;

    if (tl <= or && tr >= ol) {
        var ta = this.y + this.tldy;
        var tb = this.y + this.brdy;
        var oa = other.y + other.tldy;
        var ob = other.y + other.brdy;

        var collided = (ta <= oa && tb >= ob) || (ta >= oa && tb <= ob); //one is inside the other one
        if (!collided) {
            collided = Math.abs(Math.min(ta, oa) - Math.max(tb, ob)) <= Math.abs(ta - tb) + Math.abs(oa - ob);
        }
    }
    if (collided) {
        if (this.x > other.x) {
            return COLLIDE_LEFT; //other is in the left side
        } else {
            return COLLIDE_RIGHT; //other is in the right side
        }
    };
    return 0;
}

Entity.prototype.collideTopBottom = function (other) {
    var collided = false;
    var tt = this.y + this.tldy;
    var tb = this.y + this.brdy;
    var ot = other.y + other.tldy;
    var ob = other.y + other.brdy;
    //console.log(tt + " " + tb + "//" + ot + " " + ob);
    if (tb >= ot && tt <= ob) {
        //console.log("1th passed")
        var ta = this.x + this.tldx;
        var tb = this.x + this.brdx;
        var oa = other.x + other.tldx;
        var ob = other.x + other.brdx;
        var collided = (ta <= oa && tb >= ob) || (ta >= oa && tb <= ob); //one is inside the other one
        if (!collided) {
            collided = Math.abs(Math.min(ta, oa) - Math.max(tb, ob)) <= Math.abs(ta - tb) + Math.abs(oa - ob);
        }
    }
    if (collided) {
        if (this.y > other.y) {
            return COLLIDE_TOP; //other is in the top of this object
        } else {
            return COLLIDE_BOTTOM; //other is in the bottom of this object
        }
    };
    return 0;
}

Entity.prototype.collide = function (other) {
    var i = 0;
    if (other instanceof Entity) {
        
        i = this.collideLeftRight(other);
        if (i === 0) {
            i = this.collideTopBottom(other);
        }
    }
    return i;
}

//Entity.prototype.collide = function (other) {
//    var i = 0;
//    var iLR = 0;
//    var iTB = 0;
//    if (other instanceof Entity) {
//        iLR = this.collideLeftRight(other);
//        iTB = this.collideTopBottom(other);
//    }
//    if (iLR + iTB !== 0) { //colided
//        if (iLR === 0) { // not left right
//            i = iTB;
//        } else if (iTB === 0) { //not top bottom
//            i = iLR;
//        } else { // 2 ways
//            i = (Math.abs(this.x - other.x) > Math.abs(this.y - other.y)) ? iLR : iTB;
//        }
//    }
//    return i;
//}

Entity.prototype.update = function () {
}

Entity.prototype.draw = function (ctx) {
    if (this.game.showOutlines) {
        this.game.ctx.beginPath();
        this.game.ctx.strokeStyle = "green";
        this.game.ctx.rect(this.x + this.tldx + 16, this.y + this.tldy + 16, this.brdx - this.tldx, this.brdy - this.tldy);
        this.game.ctx.lineWidth = 2;
        this.game.ctx.stroke();
    }
    //if (this.game.showOutlines && this.radius) {
    //    this.game.ctx.beginPath();
    //    this.game.ctx.strokeStyle = "green";
    //    this.game.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    //    this.game.ctx.stroke();
    //    this.game.ctx.closePath();
    //}
}

Entity.prototype.rotateAndCache = function (image, angle) {
    var offscreenCanvas = document.createElement('canvas');
    var size = Math.max(image.width, image.height);
    offscreenCanvas.width = size;
    offscreenCanvas.height = size;
    var offscreenCtx = offscreenCanvas.getContext('2d');
    offscreenCtx.save();
    offscreenCtx.translate(size / 2, size / 2);
    offscreenCtx.rotate(angle);
    offscreenCtx.translate(0, 0);
    offscreenCtx.drawImage(image, -(image.width / 2), -(image.height / 2));
    offscreenCtx.restore();
    //offscreenCtx.strokeStyle = "red";
    //offscreenCtx.strokeRect(0,0,size,size);
    return offscreenCanvas;
}

