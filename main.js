var ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./img/background.png");
ASSET_MANAGER.queueDownload("./img/box.png");
ASSET_MANAGER.queueDownload("./img/creature.png");
ASSET_MANAGER.queueDownload("./img/egg.png");
ASSET_MANAGER.queueDownload("./img/fireball.png");
ASSET_MANAGER.queueDownload("./img/fireballflip.png");
ASSET_MANAGER.queueDownload("./img/gameover.png");
ASSET_MANAGER.queueDownload("./img/gameover2.png")
ASSET_MANAGER.queueDownload("./img/item2.png");
ASSET_MANAGER.queueDownload("./img/link.png");
ASSET_MANAGER.queueDownload("./img/link2.png");
ASSET_MANAGER.queueDownload("./img/lizard.png");
ASSET_MANAGER.queueDownload("./img/plant.png");
ASSET_MANAGER.queueDownload("./img/plant3.png");
ASSET_MANAGER.queueDownload("./img/spider.png");
ASSET_MANAGER.queueDownload("./img/spiderweb.png");
ASSET_MANAGER.queueDownload("./img/startgame.png");
ASSET_MANAGER.queueDownload("./img/trap.png");
ASSET_MANAGER.queueDownload("./img/trapexplosion.png");
ASSET_MANAGER.queueDownload("./img/underworld.png");
ASSET_MANAGER.queueDownload("./img/vampire.png");
ASSET_MANAGER.queueDownload("./img/vampirebat.png");
ASSET_MANAGER.queueDownload("./img/winningstar.png");
ASSET_MANAGER.queueDownload("./img/zombie.png");
ASSET_MANAGER.queueDownload("./img/zombiefire.png");
ASSET_MANAGER.queueDownload("./img/fairy.png");
ASSET_MANAGER.queueDownload("./img/firefly.png");
ASSET_MANAGER.queueDownload("./img/flyingsword.png");
ASSET_MANAGER.queueDownload("./img/zelda.png");
ASSET_MANAGER.queueDownload("./img/zelda2.png");
ASSET_MANAGER.queueDownload("./img/theend.png");
ASSET_MANAGER.queueDownload("./img/chatmessage.png");
ASSET_MANAGER.queueDownload("./img/wizard.png");
ASSET_MANAGER.queueDownload("./img/wizard2.png");
ASSET_MANAGER.queueDownload("./img/wizardreflect.png");
ASSET_MANAGER.queueDownload("./img/wizard2reflect.png");
ASSET_MANAGER.queueDownload("./img/iceball.png");
ASSET_MANAGER.queueDownload("./img/iceballreflect.png");
ASSET_MANAGER.queueDownload("./img/bluepotion.png");
ASSET_MANAGER.queueDownload("./img/blackpotion.png");
ASSET_MANAGER.queueDownload("./img/redpotion.png");
ASSET_MANAGER.queueDownload("./img/maxheart.png");
ASSET_MANAGER.queueDownload("./img/wizardblur.png");
ASSET_MANAGER.queueDownload("./img/wizardblurflip.png");
ASSET_MANAGER.queueDownload("./img/volume.png");
ASSET_MANAGER.queueDownload("./img/bee.png");
ASSET_MANAGER.queueDownload("./img/arrow.png");
ASSET_MANAGER.queueDownload("./img/ella.png");
ASSET_MANAGER.queueDownload("./img/ella1.png");
ASSET_MANAGER.queueDownload("./img/ella2.png");
ASSET_MANAGER.queueDownload("./img/ella3.png");
ASSET_MANAGER.queueDownload("./img/ella4.png");
ASSET_MANAGER.queueDownload("./img/ella5.png");

ASSET_MANAGER.queueDownload("./sound/lizardfireball.wav");
ASSET_MANAGER.queueDownload("./sound/loz_get_heart.wav");
ASSET_MANAGER.queueDownload("./sound/loz_sword.wav");
ASSET_MANAGER.queueDownload("./sound/loz_hit.wav");
ASSET_MANAGER.queueDownload("./sound/loz_kill.wav");
ASSET_MANAGER.queueDownload("./sound/loz_hurt.wav");
ASSET_MANAGER.queueDownload("./sound/loz_die.wav");
ASSET_MANAGER.queueDownload("./sound/loz_shield.wav");
ASSET_MANAGER.queueDownload("./sound/loz_flying_sword.wav");
ASSET_MANAGER.queueDownload("./sound/loz_get_item.wav");
ASSET_MANAGER.queueDownload("./sound/fairysound.mp3");
ASSET_MANAGER.queueDownload("./sound/goodbye.mp3");
ASSET_MANAGER.queueDownload("./sound/loz_recorder.wav");

ASSET_MANAGER.downloadAll(function () {
    var canvas = document.getElementById('gameWorld');
    var ctx = canvas.getContext('2d');
    var canvas2 = document.getElementById('panel');
    var ctx2 = canvas2.getContext('2d');
//    var socket = io.connect("http://76.28.150.193:8888");

//    var gameEngine = new GameEngine(socket);
    var gameEngine = new GameEngine();
    gameEngine.init(ctx, ctx2);
    gameEngine.start();

//    socket.on("save", function (data) {
//        console.log("socket.on_save ");
//    });
//
//    socket.on("load", function (data) {
//        console.log("socket.on_load");
//        console.log("getting data: ")
//        console.log(data.data);
        //for (var i = 0; i < data.entities.length; i++) {
        //    gameEngine.entities = [];
        //    ent = data.entities[i];
        //    name, x, y, mass, color
        //    ent = new Star(ent.name, ent.x, ent.y, ent.mass, ent.color);
        //    engine.addEntity(ent);
        //}
//    });
});
