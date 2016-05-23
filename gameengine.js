// This game shell was happily copied from Googler Seth Ladd's "Bad Aliens" game and his Google IO talk in 2011

window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (/* function */ callback, /* DOMElement */ element) {
                window.setTimeout(callback, 1000 / 60);
            };
})();

function Timer() {
    this.gameTime = 0;
    this.maxStep = 0.5;
    this.wallLastTimestamp = 0;
}

Timer.prototype.tick = function () {
    var wallCurrent = Date.now();
    var wallDelta = (wallCurrent - this.wallLastTimestamp); // change the image every tick , usually, wallDelta = 0.00032
    this.wallLastTimestamp = wallCurrent;

    var gameDelta = Math.min(wallDelta, this.maxStep);
    this.gameTime += gameDelta;
    return gameDelta;
}

function distance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
}

function moveto(thisx, thisy, targetx, targety, speed) {
    this.direction = { x: 0, y: 0 };
    this.direction.x = (targetx - thisx);  //length
    this.direction.y = (targety - thisy);  //height 

    var distance = Math.sqrt(this.direction.x * this.direction.x + this.direction.y * this.direction.y);

    this.direction.x = this.direction.x * speed / distance;
    this.direction.y = this.direction.y * speed / distance;
    return direction;
}

function getXandY(e) {
    var x = e.clientX;
    var y = e.clientY - 100; //canvas.dy = 100
    return { x: x, y: y };
}

//------------------------------------------------------------------------------------
function GameEngine(socket) {
    this.index = 1;
    this.socket = socket;
    this.entities = [];
    this.blocks = [];
    this.items = [];

    this.pause = false;
    this.startGame = true;
    this.gameOver = false;
    this.scrolling = false;
    this.music = true; //background music on/off
    this.mPressed = false;
    this.showOutlines = false;
    this.ctx = null;
    this.ctx2 = null;

    this.click = null;
    this.mouse = null;
    this.wheel = null;
    this.surfaceWidth = null;
    this.surfaceHeight = null;

    this.keyCode = 0;
    this.space = false;
    this.arrow = false;
    this.arrowRelesed = false;

    this.scrolling = false;
    this.scrollingX = 0; //for all entities & Link
    this.scrollingY = 0; //for all entities & Link
    this.scrollingD = 0; //total number pixels will be moved
    this.scrollingBgDx = 0; //the current X offset for the background
    this.scrollingBgDy = 0;  //the current Y offset for the background
    this.newID = 0;
    this.newLinkX = 0;
    this.newLinkY = 0;

    this.dx = 0;
    this.dy = 0;
    this.maxX = 512; //16 blocks x 32 pixels/block
    this.maxY = 320; //10 blocks x 32 pixels/block

    for (i = 0; i < 49; i++) {
        this.items.push(false);
    }
    this.currentID = 0;
    this.loadGame(this.currentID);

    this.enteringDirection = 37;
    this.background = new Background(this, 512, 320, 7, 7, 16, 16);
    this.sword = new Sword(this)
    this.flyingSword = null;
    this.panel = new Panel(this, 450, 50);
    this.gameOverEntity = new GameOver(this, 170, 100);
    this.startGameEntity = new StartGame(this, 170, 100);
}

GameEngine.prototype.loadGame = function (currentID) {
    this.currentID = currentID;
    if (currentID === 0) {
        this.items = [];
        for (i = 0; i < 49; i++) {
            this.items.push(false);
        }
        //load blocks
        var ab = new addBox(this, this.currentID);
        ab.load();
        this.ella = null;
        this.newLinkX = 256;
        this.newLinkY = 230;
        this.enteringDirection = 37;
        this.link = new Link(this, this.newLinkX, this.newLinkY);
    } else {
        this.link.direction = this.enteringDirection;
        this.link.x = this.newLinkX;
        this.link.y = this.newLinkY;
    }
    //load enemies
    this.ella = null;
    var am = new addMonster(this, this.currentID);
    am.load();

    if (this.music) {
        document.getElementById('bgm').play();
    }

}
GameEngine.prototype.touchAnyBlock = function (obj) {
    var found = false;
    var i = 0;
    var len = this.blocks.length;
    var tldy = obj.tldy;
    var brdy = obj.brdy;
    obj.tldy = -1;
    obj.brdy = 0;
    obj.tldy = -1;
    while (!found && i < len) {
        found = obj.collide(this.blocks[i]) > 0;
        i++;
    }
    obj.tldy = tldy;
    obj.brdy = brdy;
    return found;
}

GameEngine.prototype.touchBlock = function (obj, dir) {
    var found = false;
    var i = 0;
    var d = 0;
    var len = this.blocks.length;
    var tldy = obj.tldy;
    var brdy = obj.brdy;
    obj.tldy = -1;
    obj.brdy = 0;
    obj.tldy = -1;
    while (!found && i < len) {
        d = obj.collide(this.blocks[i]);
        found = (d == dir);
        i++;
    }
    obj.tldy = tldy;
    obj.brdy = brdy;
    return found;
}

GameEngine.prototype.scroll = function (dir) { //0=up; 1=down; 2=left; 3=right
    this.newID = this.currentID;
    this.scrollingX = 0;
    this.scrollingY = 0;
    this.scrollingD = 0;
    this.scrollingBgDx = 0;
    this.scrollingBgDy = 0;
    var speed = 2;
    this.blocks = [];
    
    switch (dir) {
        case UP: //up
            this.newID -= this.background.columns;
            this.scrollingY = -1;
            this.scrollingD = this.maxY;
            this.newLinkX = this.link.x;
            this.newLinkY = this.maxY - 2;
            break;
        case DOWN: //down
            this.newID += this.background.columns;
            this.scrollingY = 1;
            this.scrollingD = this.maxY;
            this.newLinkX = this.link.x;
            this.newLinkY = 2;
            break;
        case LEFT: //left
            this.newID -= 1;
            this.scrollingX = -1;
            this.scrollingD = this.maxX;
            this.newLinkX = this.maxX - 2;
            this.newLinkY = this.link.y;
            break;
        case RIGHT: //right
            this.newID += 1;
            this.scrollingX = 1;
            this.scrollingD = this.maxX;
            this.newLinkX = 2;
            this.newLinkY = this.link.y;
            break;
    }
    this.enteringDirection = dir;
}

GameEngine.prototype.init = function (ctx, ctx2) {
    this.ctx = ctx;
    this.ctx2 = ctx2;
    this.surfaceWidth = this.ctx.canvas.width;
    this.surfaceHeight = this.ctx.canvas.height;
    this.startInput();
    this.timer = new Timer();
    console.log('game initialized');
}

GameEngine.prototype.start = function () {
    console.log("starting game");
    var that = this;
    (function gameLoop() {
        that.loop();
        requestAnimFrame(gameLoop, that.ctx.canvas);
    })();
}

GameEngine.prototype.startInput = function () {
    console.log('Starting input');
    var that = this;

    this.ctx.canvas.addEventListener("keydown", function (e) {
        if (e.which >= 37 && e.which <= 40) {
            that.keyCode = e.which;
            that.arrow = true;
        } else if (e.which == 32) {
            that.space = true;
        } 
        if (String.fromCharCode(e.which) === ' ') that.space = true;
//        if (String.fromCharCode(e.which).toUpperCase() == "S") that.saveState(that.socket, that.index);
//        if (String.fromCharCode(e.which).toUpperCase() == "L") that.loadState(that.socket, that.index);
        if (String.fromCharCode(e.which).toUpperCase() == "M") that.mPressed = true;
        if (String.fromCharCode(e.which).toUpperCase() == "B") that.showOutlines = !that.showOutlines;
        if (String.fromCharCode(e.which).toUpperCase() == "P") {
            that.pause = !that.pause;
            if (that.pause) {
                that.ctx2.fillStyle = "grey";
                that.ctx2.font = "bold 18px Arial";
                that.ctx2.fillText("Game Paused", 30, 80);
            } 
        }
        if (String.fromCharCode(e.which).toUpperCase() == "E") {
            if (that.ella == null) {
                that.ella = new EllaTheRoseFairy(that, 200, 100);
            } else {
                that.ella = null;
                document.getElementById('goodbyeSound').play();
            }
        }
        e.preventDefault();
    }, false);

    this.ctx.canvas.addEventListener("keyup", function (e) {
        if (e.which >= 37 && e.which <= 40 && e.which === that.keyCode) {
            that.arrowRelesed = true;
            that.arrow = false;
            that.space = false;
            that.keyCode = 0;
        }
        e.preventDefault();
    }, false);
    console.log('Input started');

    this.ctx.canvas.addEventListener("click", function (e) {
       that.click = getXandY(e);
    }, false);
}

GameEngine.prototype.addEntity = function (entity) {
    this.entities.push(entity);
}

GameEngine.prototype.insertEntity = function (entity) {
    this.entities.splice(0, 0, entity); //insert into the first spot
}

GameEngine.prototype.addBlock = function (block) {
    this.blocks.push(block);
}

GameEngine.prototype.update = function () {
    if (this.mPressed) {
        this.mPressed = false;
        this.music = !this.music;
        if (this.music) {
            document.getElementById('bgm').play();
        } else {
            document.getElementById('bgm').pause();;
        }
    }
    if (this.startGame) {
        if (this.click) {
            if (this.click.x >= 170 && this.click.x <= 360 && this.click.y >= 130 & this.click.y <= 181) {
                this.startGame = false;
            }
        }
        this.ctx.save();
        this.startGameEntity.draw(this.ctx);
        this.ctx.restore();
        return;
    }

    if (!this.gameOver && !this.pause && !this.scrolling) {
        var entitiesCount = this.entities.length;
        for (var i = 0; i < entitiesCount; i++) {
            var entity = this.entities[i];
            if (!entity.removeFromWorld) {
                entity.update();
            }
        }
        if (this.ella) this.ella.update();
        this.link.update();
        this.sword.update();
        if (this.flyingSword) {
            this.flyingSword.update();
        }
        for (var i = this.entities.length - 1; i >= 0; --i) {
            if (this.entities[i].removeFromWorld) {
                this.entities.splice(i, 1);
            }
        }
        if (this.flyingSword && this.flyingSword.removeFromWorld) {
            this.flyingSword = null;
        }
    } else {
        if (this.click) {
            if (this.click.x >= 197 && this.click.x <= 278 && this.click.y >= 181 & this.click.y <= 211) {
                this.gameOver = false;
                this.click = null;
                this.currentID = 0;
                this.loadGame(this.currentID);
            } else if (this.click.x >= 281 && this.click.x <= 326 && this.click.y >= 183 & this.click.y <= 211) {
                this.gameOver = false;
                this.click = null;
                this.link.life = Math.floor(this.link.lifes / 2);
                this.loadGame(this.currentID);
            }
        }
    }
}

GameEngine.prototype.draw = function () {
    if (this.startGame) {
        this.ctx.save();
        this.startGameEntity.draw(this.ctx);
        this.ctx.restore();
        return;
    }
    if (this.pause) {
        return;
    }

    this.ctx2.clearRect(0, 0, this.ctx2.canvas.width, this.ctx2.canvas.height);
    this.ctx2.save();
    this.panel.draw(this.ctx2);
    this.ctx2.restore();

    if (this.gameOver) {
        this.ctx.save();
        this.gameOverEntity.draw(this.ctx);
        document.getElementById("bgm").pause();
        this.ctx.restore();
        return;
    }
    if (this.scrolling) {
        var speed = 6;
        if (this.scrollingD > 0) {
            var entitiesCount = this.entities.length;
            for (var i = 0; i < entitiesCount; i++) {
                var entity = this.entities[i];
                entity.x -= this.scrollingX * speed;
                entity.y -= this.scrollingY * speed;
            }
            this.link.x -= this.scrollingX * speed;
            this.link.y -= this.scrollingY * speed;

            if (this.scrollingD <= 64) {
                this.link.x += this.scrollingX * 2;
                this.link.y += this.scrollingY * 2;
            }
            this.scrollingD -= speed;
            this.scrollingBgDx += this.scrollingX * speed;
            this.scrollingBgDy += this.scrollingY * speed;
        } else {
            this.scrolling = false;
            this.scrollingBgDx = 0;
            this.scrollingBgDy = 0;
            this.currentID = this.newID;
            this.newLinkX = this.link.x;
            this.newLinkY = this.link.y;
            //load block
            var ab = new addBox(this, this.currentID);
            ab.load();

            //load all new enemies here
            var am = new addMonster(this, this.currentID);
            am.load();
        }
    }
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.ctx.save();
    this.background.draw(this.ctx, this.scrollingBgDx, this.scrollingBgDy);
    for (var i = 0; i < this.blocks.length; i++) {
        this.blocks[i].draw(this.ctx);
    }
    for (var i = 0; i < this.entities.length; i++) {
        this.entities[i].draw(this.ctx);
    }  
    if (this.flyingSword) this.flyingSword.draw(this.ctx);
    if (this.ella) this.ella.draw(this.ctx);
    this.link.draw(this.ctx);
    this.ctx.restore();
}

GameEngine.prototype.loop = function () {
    this.clockTick = this.timer.tick() / 20; //slow down the motion   
    this.update();
    this.draw();
}

GameEngine.prototype.saveState = function (socket, state) {
    console.log("emit save");
    socket.emit('save', {
        studentname: "Thuan Lam",
        statename: state,
        data: "Hello World!"
    });
};

GameEngine.prototype.loadState = function (socket, state) {
    console.log("emit load");
    socket.emit('load', {
        studentname: "Thuan Lam",
        statename: state
    });
}