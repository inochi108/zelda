
function addMonster(game, mapNum) {
    this.game = game;
    this.mapNum = mapNum;
}

addMonster.prototype.load = function () {
    document.getElementById("zombiesound").pause();
    var fireflySpawnRate = 25;
    this.game.entities = [];
    switch (this.mapNum) {
        case 0:
//            this.game.addEntity(new Wizard(this.game, 400, 100));
//            this.game.addEntity(new Zombie(this.game, 150, 150));
//            this.game.addEntity(new Wizard(this.game, 400, 200));
//            this.game.addEntity(new Bat2(this.game, 100, 150));
//            this.game.addEntity(new Bat2(this.game, 150, 150));
//            this.game.addEntity(new Bat2(this.game, 300, 300));
//            this.game.addEntity(new Bat2(this.game, 200, 200));
//            this.game.addEntity(new Bat2(this.game, 100, 300));
//            this.game.addEntity(new Bat2(this.game, 200, 50));
            if (!this.game.items[this.game.currentID]) { //Link did not take this item before, show it
                this.game.addEntity(new MaxHeart(this.game, 80, 115));
            }
//            this.game.addEntity(new potion(this.game, 200, 180, "blue"));
//            this.game.addEntity(new potion(this.game, 450, 180, "red"));
//            this.game.addEntity(new potion(this.game, 400, 180, "black"));
//            this.game.addEntity(new Wizard(this.game, 100, 250));
            this.game.addEntity(new Fairy(this.game, 255, 180));
            for (var i = 0; i < 6; i++) {
                var x = Math.random() * 412 + 50;
                var y = Math.random() * 220 + 50;
                this.game.addEntity(new Firefly(this.game, x, y));
            }
            break;
        case 1:
            if (!this.game.items[this.game.currentID]) { //Link did not take this item before, show it
                this.game.addEntity(new MaxHeart(this.game, 425, 115));
            }
            this.game.addEntity(new BeeNest(this.game, 150, 150));
            for (var i = 0; i < 3; i++) {
                var value = Math.floor(Math.random() * 100 + 1);
                if (value <= fireflySpawnRate) {
                    var xx = Math.floor(Math.random() * 312 + 100);
                    var yy = Math.floor(Math.random() * 120 + 100);
                    this.game.addEntity(new Firefly(this.game, xx, yy));
                }
            }
            break;
        case 2:
            if (!this.game.items[this.game.currentID]) {
                this.game.addEntity(new MaxHeart(this.game, 55, 115));
            }

            for (var j = 0; j < 3; j++) {
                var x = Math.floor(Math.random() * 12 + 2); // gives a random x from tile 2 to 13
                var y = Math.floor(Math.random() * 6 + 2); // gives a random y from tiles 2 to 7
                for (var i = 0; i < BOX2.length; i++) {
                    if (BOX2[i].x === x && BOX2[i].y === y) {
                        x = Math.floor(Math.random() * 12 + 2);
                        y = Math.floor(Math.random() * 6 + 2);
                        i = 0;
                    }
                }
                for (var i = 0; i < 1; i++) {
                    var add1 = Math.random() * 33; //gives random x pixel from 0 to 32
                    var add2 = Math.random() * 33; // gives random y pixel from 0 to 32
                    this.game.addEntity(new Plant(this.game, x * 32 + add1, y * 32 + add2));
                }
            }
            for (var i = 0; i < 3; i++) {
                var value = Math.floor(Math.random() * 100 + 1);
                if (value <= fireflySpawnRate) {
                    var xx = Math.floor(Math.random() * 312 + 100);
                    var yy = Math.floor(Math.random() * 120 + 100);
                    this.game.addEntity(new Firefly(this.game, xx, yy));
                }
            }
            var x = Math.floor(Math.random() * 312 + 100);
            var y = Math.floor(Math.random() * 120 + 100);
            var bat = new Bat(this.game, x, y);

            for (var i = 0; i < 3; i++) {
                var random1 = Math.random() * 33;
                var random2 = Math.random() * 33;
                this.game.addEntity(new Bat(this.game, bat.x + random1, bat.y + random2));
            }
            this.game.addEntity(new Plant(this.game, 140, 180));
            break;
        case 3:
            for (var j = 0; j < 6; j++) {
                var x = Math.floor(Math.random() * 12 + 2); // gives a random x from tile 2 to 13
                var y = Math.floor(Math.random() * 6 + 2); // gives a random y from tiles 2 to 7
                for (var i = 0; i < BOX3.length; i++) {
                    if (BOX3[i].x === x && BOX3[i].y === y) {
                        x = Math.floor(Math.random() * 12 + 2);
                        y = Math.floor(Math.random() * 6 + 2);
                        i = 0;
                    }
                }
                for (var i = 0; i < 1; i++) {
                    var add1 = Math.random() * 33; //gives random x pixel from 0 to 32
                    var add2 = Math.random() * 33; // gives random y pixel from 0 to 32
                    this.game.addEntity(new Spider(this.game, x * 32 + add1, y * 32 + add2));
                }
            }
            for (var i = 0; i < 3; i++) {
                var value = Math.floor(Math.random() * 100 + 1);
                if (value <= fireflySpawnRate) {
                    var xx = Math.floor(Math.random() * 312 + 100);
                    var yy = Math.floor(Math.random() * 120 + 100);
                    this.game.addEntity(new Firefly(this.game, xx, yy));
                }
            }
            break;
        case 4:
            for (var j = 0; j < 2; j++) {
                var x = Math.floor(Math.random() * 12 + 2); // gives a random x from tile 2 to 13
                var y = Math.floor(Math.random() * 6 + 2); // gives a random y from tiles 2 to 7
                for (var i = 0; i < BOX4.length; i++) {
                    if (BOX4[i].x === x && BOX4[i].y === y) {
                        x = Math.floor(Math.random() * 12 + 2);
                        y = Math.floor(Math.random() * 6 + 2);
                        i = 0;
                    }
                }
                for (var i = 0; i < 1; i++) {
                    var add1 = Math.random() * 33; //gives random x pixel from 0 to 32
                    var add2 = Math.random() * 33; // gives random y pixel from 0 to 32
                    this.game.addEntity(new Spider(this.game, x * 32 + add1, y * 32 + add2));
                }
            }
            this.game.addEntity(new Mummy(this.game, 200, 95));
            this.game.addEntity(new Mummy(this.game, 100, 95));
            this.game.addEntity(new Mummy(this.game, 270, 95));
            this.game.addEntity(new Mummy(this.game, 100, 285));
            this.game.addEntity(new Mummy(this.game, 180, 285));
            this.game.addEntity(new Mummy(this.game, 220, 285));
            for (var i = 0; i < 3; i++) {
                var value = Math.floor(Math.random() * 100 + 1);
                if (value <= fireflySpawnRate) {
                    var xx = Math.floor(Math.random() * 312 + 100);
                    var yy = Math.floor(Math.random() * 120 + 100);
                    this.game.addEntity(new Firefly(this.game, xx, yy));
                }
            }
            break;
        case 5:
            this.game.addEntity(new TwinBat1(this.game, 100, 175));
            this.game.addEntity(new TwinBat2(this.game, 100, 175));
            this.game.addEntity(new Plant(this.game, 80, 80));
            this.game.addEntity(new Plant(this.game, 80, 270));
            this.game.addEntity(new Plant(this.game, 350, 80));
            this.game.addEntity(new Plant(this.game, 350, 280));
            for (var i = 0; i < 3; i++) {
                var value = Math.floor(Math.random() * 100 + 1);
                if (value <= fireflySpawnRate) {
                    var xx = Math.floor(Math.random() * 312 + 100);
                    var yy = Math.floor(Math.random() * 120 + 100);
                    this.game.addEntity(new Firefly(this.game, xx, yy));
                }
            }
            break;
        case 6:
            if (!this.game.items[this.game.currentID]) {
                this.game.addEntity(new MaxHeart(this.game, 465, 185));
            }

            this.game.addEntity(new Zombie(this.game, 200, 115));
            this.game.addEntity(new Zombie(this.game, 400, 275));
            for (var j = 0; j < 3; j++) {
                var x = Math.floor(Math.random() * 312 + 100);
                var y = Math.floor(Math.random() * 120 + 100);
                var bat = new Bat(this.game, x, y);

                for (var i = 0; i < 3; i++) {
                    var random1 = Math.random() * 33;
                    var random2 = Math.random() * 33;
                    this.game.addEntity(new Bat(this.game, bat.x + random1, bat.y + random2));
                }
            }

            for (var i = 0; i < 3; i++) {
                var value = Math.floor(Math.random() * 100 + 1);
                if (value <= fireflySpawnRate) {
                    var xx = Math.floor(Math.random() * 312 + 100);
                    var yy = Math.floor(Math.random() * 120 + 100);
                    this.game.addEntity(new Firefly(this.game, xx, yy));
                }
            }
            break;
        case 7:
            var x = Math.floor(Math.random() * 312 + 100);
            var y = Math.floor(Math.random() * 120 + 100);
            var bat = new Bat(this.game, x, y);

            for (var i = 0; i < 3; i++) {
                var random1 = Math.random() * 33;
                var random2 = Math.random() * 33;
                this.game.addEntity(new Bat(this.game, bat.x + random1, bat.y + random2));
            }
            this.game.addEntity(new Plant(this.game, 350, 180));
            for (var i = 0; i < 3; i++) {
                var value = Math.floor(Math.random() * 100 + 1);
                if (value <= fireflySpawnRate) {
                    var xx = Math.floor(Math.random() * 312 + 100);
                    var yy = Math.floor(Math.random() * 120 + 100);
                    this.game.addEntity(new Firefly(this.game, xx, yy));
                }
            }

            //thuan added these mummies
            this.game.addEntity(new Mummy(this.game, 180, 140));
            this.game.addEntity(new Mummy(this.game, 270, 140));
            this.game.addEntity(new Mummy(this.game, 250, 240));
            this.game.addEntity(new Mummy(this.game, 450, 140));
            break;
        case 8:
            for (var j = 0; j < 4; j++) {
                var x = Math.floor(Math.random() * 12 + 2); // gives a random x from tile 2 to 13
                var y = Math.floor(Math.random() * 6 + 2); // gives a random y from tiles 2 to 7
                for (var i = 0; i < BOX3.length; i++) {
                    if (BOX3[i].x === x && BOX3[i].y === y) {
                        x = Math.floor(Math.random() * 12 + 2);
                        y = Math.floor(Math.random() * 6 + 2);
                        i = 0;
                    }
                }
                for (var i = 0; i < 1; i++) {
                    var add1 = Math.random() * 33; //gives random x pixel from 0 to 32
                    var add2 = Math.random() * 33; // gives random y pixel from 0 to 32
                    this.game.addEntity(new Spider(this.game, x * 32 + add1, y * 32 + add2));
                }
            }
            break;
        case 9:
            var x = Math.floor(Math.random() * 312 + 100);
            var y = Math.floor(Math.random() * 120 + 100);
            var bat = new Bat(this.game, x, y);

            for (var i = 0; i < 12; i++) {
                var random1 = Math.random() * 33;
                var random2 = Math.random() * 33;
                this.game.addEntity(new Bat(this.game, bat.x + random1, bat.y + random2));
            }
            for (var i = 0; i < 3; i++) {
                var value = Math.floor(Math.random() * 100 + 1);
                if (value <= fireflySpawnRate) {
                    var xx = Math.floor(Math.random() * 312 + 100);
                    var yy = Math.floor(Math.random() * 120 + 100);
                    this.game.addEntity(new Firefly(this.game, xx, yy));
                }
            }
            break;
        case 10:
            for (var j = 0; j < 4; j++) {
                var x = Math.floor(Math.random() * 12 + 2); // gives a random x from tile 2 to 13
                var y = Math.floor(Math.random() * 6 + 2); // gives a random y from tiles 2 to 7
                for (var i = 0; i < BOX10.length; i++) {
                    if (BOX10[i].x === x && BOX10[i].y === y) {
                        x = Math.floor(Math.random() * 12 + 2);
                        y = Math.floor(Math.random() * 6 + 2);
                        i = 0;
                    }
                }
                for (var i = 0; i < 1; i++) {
                    var add1 = Math.random() * 33; //gives random x pixel from 0 to 32
                    var add2 = Math.random() * 33; // gives random y pixel from 0 to 32
                    this.game.addEntity(new Spider(this.game, x * 32 + add1, y * 32 + add2));
                }

            }
            for (var j = 0; j < 1; j++) {
                var x = Math.floor(Math.random() * 312 + 100);
                var y = Math.floor(Math.random() * 120 + 100);
                var bat = new Bat(this.game, x, y);

                for (var i = 0; i < 3; i++) {
                    var random1 = Math.random() * 33;
                    var random2 = Math.random() * 33;
                    this.game.addEntity(new Bat(this.game, bat.x + random1, bat.y + random2));
                }
            }
            for (var i = 0; i < 3; i++) {
                var value = Math.floor(Math.random() * 100 + 1);
                if (value <= fireflySpawnRate) {
                    var xx = Math.floor(Math.random() * 312 + 100);
                    var yy = Math.floor(Math.random() * 120 + 100);
                    this.game.addEntity(new Firefly(this.game, xx, yy));
                }
            }
            break;
        case 11:
            this.game.addEntity(new Mummy(this.game, 200, 95));
            this.game.addEntity(new Mummy(this.game, 400, 95));
            this.game.addEntity(new Mummy(this.game, 300, 95));
            this.game.addEntity(new Mummy(this.game, 100, 285));
            this.game.addEntity(new Mummy(this.game, 180, 285));
            this.game.addEntity(new Mummy(this.game, 220, 285));
            this.game.addEntity(new Plant(this.game, 350, 180));
            if (!this.game.items[this.game.currentID]) {
                this.game.addEntity(new MaxHeart(this.game, 240, 185));
            }

            for (var i = 0; i < 1; i++) {
                var x = Math.floor(Math.random() * 12 + 2); // gives a random x from tile 2 to 13
                var y = Math.floor(Math.random() * 6 + 2); // gives a random y from tiles 2 to 7
                var add1 = Math.random() * 33; //gives random x pixel from 0 to 32
                var add2 = Math.random() * 33; // gives random y pixel from 0 to 32
                this.game.addEntity(new Wizard(this.game, x * 32 + add1, y * 32 + add2));
            }
            for (var i = 0; i < 3; i++) {
                var value = Math.floor(Math.random() * 100 + 1);
                if (value <= fireflySpawnRate) {
                    var xx = Math.floor(Math.random() * 312 + 100);
                    var yy = Math.floor(Math.random() * 120 + 100);
                    this.game.addEntity(new Firefly(this.game, xx, yy));
                }
            }
            break;
        case 12:
            for (var j = 0; j < 6; j++) {
                var x = Math.floor(Math.random() * 12 + 2); // gives a random x from tile 2 to 13
                var y = Math.floor(Math.random() * 6 + 2); // gives a random y from tiles 2 to 7
                for (var i = 0; i < BOX12.length; i++) {
                    if (BOX12[i].x === x && BOX12[i].y === y) {
                        x = Math.floor(Math.random() * 12 + 2);
                        y = Math.floor(Math.random() * 6 + 2);
                        i = 0;
                    }
                }
                for (var i = 0; i < 1; i++) {
                    var add1 = Math.random() * 33; //gives random x pixel from 0 to 32
                    var add2 = Math.random() * 33; // gives random y pixel from 0 to 32
                    this.game.addEntity(new Bat2(this.game, x * 32 + add1, y * 32 + add2));
                }
            }
            for (var i = 0; i < 3; i++) {
                var value = Math.floor(Math.random() * 100 + 1);
                if (value <= fireflySpawnRate) {
                    var xx = Math.floor(Math.random() * 312 + 100);
                    var yy = Math.floor(Math.random() * 120 + 100);
                    this.game.addEntity(new Firefly(this.game, xx, yy));
                }
            }
            break;
        case 13:
            if (!this.game.items[this.game.currentID]) {
                this.game.addEntity(new MaxHeart(this.game, 465, 185));
            }

            for (var i = 0; i < 4; i++) {
                var x = Math.floor(Math.random() * 12 + 2); // gives a random x from tile 2 to 13
                var y = Math.floor(Math.random() * 6 + 2); // gives a random y from tiles 2 to 7
                var add1 = Math.random() * 33; //gives random x pixel from 0 to 32
                var add2 = Math.random() * 33; // gives random y pixel from 0 to 32
                this.game.addEntity(new Wizard(this.game, x * 32 + add1, y * 32 + add2));
            }
            for (var i = 0; i < 3; i++) {
                var value = Math.floor(Math.random() * 100 + 1);
                if (value <= fireflySpawnRate) {
                    var xx = Math.floor(Math.random() * 312 + 100);
                    var yy = Math.floor(Math.random() * 120 + 100);
                    this.game.addEntity(new Firefly(this.game, xx, yy));
                }
            }
            break;
        case 14:
            for (var j = 0; j < 6; j++) {
                var x = Math.floor(Math.random() * 12 + 2);
                var y = Math.floor(Math.random() * 6 + 2);
                for (var i = 0; i < BOX14.length; i++) {
                    if (BOX14[i].x === x && BOX14[i].y === y) {
                        x = Math.floor(Math.random() * 12 + 2);
                        y = Math.floor(Math.random() * 6 + 2);
                        i = 0;
                    }
                }
                var add1 = Math.random() * 33;
                var add2 = Math.random() * 33;
                this.game.addEntity(new Plant(this.game, x * 32 + add1, y * 32 + add2));

            }
            for (var i = 0; i < 3; i++) {
                var value = Math.floor(Math.random() * 100 + 1);
                if (value <= fireflySpawnRate) {
                    var xx = Math.floor(Math.random() * 312 + 100);
                    var yy = Math.floor(Math.random() * 120 + 100);
                    this.game.addEntity(new Firefly(this.game, xx, yy));
                }
            }
            break;
        case 15:
            for (var j = 0; j < 6; j++) {
                var x = Math.floor(Math.random() * 12 + 2);
                var y = Math.floor(Math.random() * 6 + 2);
                for (var i = 0; i < BOX15.length; i++) {
                    if (BOX15[i].x === x && BOX15[i].y === y) {
                        x = Math.floor(Math.random() * 12 + 2);
                        y = Math.floor(Math.random() * 6 + 2);
                        i = 0;
                    }
                }
                var add1 = Math.random() * 33;
                var add2 = Math.random() * 33;
                this.game.addEntity(new Plant(this.game, x * 32 + add1, y * 32 + add2));
            }
            var x = Math.floor(Math.random() * 312 + 100);
            var y = Math.floor(Math.random() * 120 + 100);
            var bat = new Bat(this.game, x, y);

            for (var i = 0; i < 3; i++) {
                var random1 = Math.random() * 33;
                var random2 = Math.random() * 33;
                this.game.addEntity(new Bat(this.game, bat.x + random1, bat.y + random2));
            }
            for (var i = 0; i < 3; i++) {
                var value = Math.floor(Math.random() * 100 + 1);
                if (value <= fireflySpawnRate) {
                    var xx = Math.floor(Math.random() * 312 + 100);
                    var yy = Math.floor(Math.random() * 120 + 100);
                    this.game.addEntity(new Firefly(this.game, xx, yy));
                }
            }
            break;
        case 16:
            for (var j = 0; j < 15; j++) {
                var x = Math.floor(Math.random() * 12 + 3);
                var y = Math.floor(Math.random() * 6 + 2);
                for (var i = 0; i < BOX16.length; i++) {
                    if (BOX16[i].x === x && BOX16[i].y === y) {
                        x = Math.floor(Math.random() * 12 + 3);
                        y = Math.floor(Math.random() * 6 + 2);
                        i = 0;
                    }
                }
                var add1 = Math.random() * 33;
                var add2 = Math.random() * 33;
                this.game.addEntity(new SpiderWeb(this.game, x * 32 + add1, y * 32 + add2));

            }
            for (var i = 0; i < 3; i++) {
                var value = Math.floor(Math.random() * 100 + 1);
                if (value <= fireflySpawnRate) {
                    var xx = Math.floor(Math.random() * 312 + 100);
                    var yy = Math.floor(Math.random() * 120 + 100);
                    this.game.addEntity(new Firefly(this.game, xx, yy));
                }
            }
            break;
        case 17:
            for (var j = 0; j < 8; j++) {
                var x = Math.floor(Math.random() * 10 + 3); // gives a random x from tile 2 to 13
                var y = Math.floor(Math.random() * 4 + 3); // gives a random y from tiles 2 to 7
                for (var i = 0; i < BOX17.length; i++) {
                    if (BOX17[i].x === x && BOX17[i].y === y) {
                        x = Math.floor(Math.random() * 10 + 3);
                        y = Math.floor(Math.random() * 4 + 3);
                        i = 0;
                    }
                }
                for (var i = 0; i < 1; i++) {
                    var add1 = Math.random() * 33; //gives random x pixel from 0 to 32
                    var add2 = Math.random() * 33; // gives random y pixel from 0 to 32
                    this.game.addEntity(new Bat(this.game, x * 32 + add1, y * 32 + add2));
                }
                for (var i = 0; i < 1; i++) {
                    var add1 = Math.random() * 33; //gives random x pixel from 0 to 32
                    var add2 = Math.random() * 33; // gives random y pixel from 0 to 32
                    this.game.addEntity(new Bat2(this.game, x * 32 + add1, y * 32 + add2));
                }
            }
            for (var i = 0; i < 3; i++) {
                var value = Math.floor(Math.random() * 100 + 1);
                if (value <= fireflySpawnRate) {
                    var xx = Math.floor(Math.random() * 312 + 100);
                    var yy = Math.floor(Math.random() * 120 + 100);
                    this.game.addEntity(new Firefly(this.game, xx, yy));
                }
            }
            break;
        case 18:
            if (!this.game.items[this.game.currentID]) {
                this.game.addEntity(new MaxHeart(this.game, 225, 285));
            }

            for (var j = 0; j < 5; j++) {
                var x = Math.floor(Math.random() * 12 + 2);
                var y = Math.floor(Math.random() * 6 + 2);
                for (var i = 0; i < BOX18.length; i++) {
                    if (BOX18[i].x === x && BOX18[i].y === y) {
                        x = Math.floor(Math.random() * 12 + 2);
                        y = Math.floor(Math.random() * 6 + 2);
                        i = 0;
                    }
                }
                var add1 = Math.random() * 33;
                var add2 = Math.random() * 33;
                this.game.addEntity(new Spider(this.game, x * 32 + add1, y * 32 + add2));

            }
            this.game.addEntity(new Plant(this.game, 300, 180));
            for (var i = 0; i < 3; i++) {
                var value = Math.floor(Math.random() * 100 + 1);
                if (value <= fireflySpawnRate) {
                    var xx = Math.floor(Math.random() * 312 + 100);
                    var yy = Math.floor(Math.random() * 120 + 100);
                    this.game.addEntity(new Firefly(this.game, xx, yy));
                }
            }
            break;
        case 19:
            for (var j = 0; j < 7; j++) {
                var x = Math.floor(Math.random() * 12 + 2);
                var y = Math.floor(Math.random() * 6 + 2);
                for (var i = 0; i < BOX19.length; i++) {
                    if (BOX19[i].x === x && BOX19[i].y === y) {
                        x = Math.floor(Math.random() * 12 + 2);
                        y = Math.floor(Math.random() * 6 + 2);
                        i = 0;
                    }
                }
                var add1 = Math.random() * 33;
                var add2 = Math.random() * 33;
                this.game.addEntity(new Plant(this.game, x * 32 + add1, y * 32 + add2));

            }
            for (var i = 0; i < 3; i++) {
                var value = Math.floor(Math.random() * 100 + 1);
                if (value <= fireflySpawnRate) {
                    var xx = Math.floor(Math.random() * 312 + 100);
                    var yy = Math.floor(Math.random() * 120 + 100);
                    this.game.addEntity(new Firefly(this.game, xx, yy));
                }
            }
            break;
        case 20:

            var x = Math.floor(Math.random() * 312 + 100);
            var y = Math.floor(Math.random() * 120 + 100);
            var bat = new Bat(this.game, x, y);

            for (var i = 0; i < 30; i++) {
                var random1 = Math.random() * 33;
                var random2 = Math.random() * 33;
                this.game.addEntity(new Bat(this.game, bat.x + random1, bat.y + random2));
            }
            for (var i = 0; i < 3; i++) {
                var value = Math.floor(Math.random() * 100 + 1);
                if (value <= fireflySpawnRate) {
                    var xx = Math.floor(Math.random() * 312 + 100);
                    var yy = Math.floor(Math.random() * 120 + 100);
                    this.game.addEntity(new Firefly(this.game, xx, yy));
                }
            }
            break;
        case 21:
            if (!this.game.items[this.game.currentID]) {
                this.game.addEntity(new MaxHeart(this.game, 115, 85));
            }

            for (var j = 0; j < 10; j++) {
                var x = Math.floor(Math.random() * 12 + 2);
                var y = Math.floor(Math.random() * 6 + 2);
                for (var i = 0; i < BOX21.length; i++) {
                    if (BOX21[i].x === x && BOX21[i].y === y) {
                        x = Math.floor(Math.random() * 12 + 2);
                        y = Math.floor(Math.random() * 6 + 2);
                        i = 0;
                    }
                }
                var add1 = Math.random() * 33;
                var add2 = Math.random() * 33;
                this.game.addEntity(new Bat(this.game, x * 32 + add1, y * 32 + add2));

            }
            for (var i = 0; i < 2; i++) {
                var x = Math.floor(Math.random() * 12 + 2); // gives a random x from tile 2 to 13
                var y = Math.floor(Math.random() * 6 + 2); // gives a random y from tiles 2 to 7
                var add1 = Math.random() * 33; //gives random x pixel from 0 to 32
                var add2 = Math.random() * 33; // gives random y pixel from 0 to 32
                this.game.addEntity(new Wizard(this.game, x * 32 + add1, y * 32 + add2));
            }
            for (var i = 0; i < 3; i++) {
                var value = Math.floor(Math.random() * 100 + 1);
                if (value <= fireflySpawnRate) {
                    var xx = Math.floor(Math.random() * 312 + 100);
                    var yy = Math.floor(Math.random() * 120 + 100);
                    this.game.addEntity(new Firefly(this.game, xx, yy));
                }
            }
            break;
        case 22:
            for (var j = 0; j < 6; j++) {
                var x = Math.floor(Math.random() * 12 + 2);
                var y = Math.floor(Math.random() * 6 + 2);
                for (var i = 0; i < BOX22.length; i++) {
                    if (BOX22[i].x === x && BOX22[i].y === y) {
                        x = Math.floor(Math.random() * 12 + 2);
                        y = Math.floor(Math.random() * 6 + 2);
                        i = 0;
                    }
                }
                var add1 = Math.random() * 33;
                var add2 = Math.random() * 33;
                this.game.addEntity(new Spider(this.game, x * 32 + add1, y * 32 + add2));

            }
            for (var i = 0; i < 2; i++) {
                var x = Math.floor(Math.random() * 12 + 2); // gives a random x from tile 2 to 13
                var y = Math.floor(Math.random() * 6 + 2); // gives a random y from tiles 2 to 7
                var add1 = Math.random() * 33; //gives random x pixel from 0 to 32
                var add2 = Math.random() * 33; // gives random y pixel from 0 to 32
                this.game.addEntity(new Wizard(this.game, x * 32 + add1, y * 32 + add2));
            }
            for (var i = 0; i < 3; i++) {
                var value = Math.floor(Math.random() * 100 + 1);
                if (value <= fireflySpawnRate) {
                    var xx = Math.floor(Math.random() * 312 + 100);
                    var yy = Math.floor(Math.random() * 120 + 100);
                    this.game.addEntity(new Firefly(this.game, xx, yy));
                }
            }
            break;
        case 23:
            if (!this.game.items[this.game.currentID]) {
                this.game.addEntity(new MaxHeart(this.game, 175, 185));
            }

            for (var j = 0; j < 10; j++) {
                var x = Math.floor(Math.random() * 12 + 2);
                var y = Math.floor(Math.random() * 6 + 2);
                for (var i = 0; i < BOX23.length; i++) {
                    if (BOX23[i].x === x && BOX23[i].y === y) {
                        x = Math.floor(Math.random() * 12 + 2);
                        y = Math.floor(Math.random() * 6 + 2);
                        i = 0;
                    }
                }
                var add1 = Math.random() * 33;
                var add2 = Math.random() * 33;
                this.game.addEntity(new Spider(this.game, x * 32 + add1, y * 32 + add2));

            }
            for (var i = 0; i < 3; i++) {
                var value = Math.floor(Math.random() * 100 + 1);
                if (value <= fireflySpawnRate) {
                    var xx = Math.floor(Math.random() * 312 + 100);
                    var yy = Math.floor(Math.random() * 120 + 100);
                    this.game.addEntity(new Firefly(this.game, xx, yy));
                }
            }
            break;
        case 24:
            if (!this.game.items[this.game.currentID]) {
                this.game.addEntity(new MaxHeart(this.game, 177, 185));
            }

            for (var j = 0; j < 4; j++) {
                var x = Math.floor(Math.random() * 12 + 2);
                var y = Math.floor(Math.random() * 6 + 2);
                for (var i = 0; i < BOX24.length; i++) {
                    if (BOX24[i].x === x && BOX24[i].y === y) {
                        x = Math.floor(Math.random() * 12 + 2);
                        y = Math.floor(Math.random() * 6 + 2);
                        i = 0;
                    }
                }
                var add1 = Math.random() * 33;
                var add2 = Math.random() * 33;
                this.game.addEntity(new Bat(this.game, x * 32 + add1, y * 32 + add2));

            }
            for (var i = 0; i < 3; i++) {
                var value = Math.floor(Math.random() * 100 + 1);
                if (value <= fireflySpawnRate) {
                    var xx = Math.floor(Math.random() * 312 + 100);
                    var yy = Math.floor(Math.random() * 120 + 100);
                    this.game.addEntity(new Firefly(this.game, xx, yy));
                }
            }
            this.game.addEntity(new Plant3(this.game, 135, 170));
            this.game.addEntity(new Mummy(this.game, 270, 155));
            this.game.addEntity(new Mummy(this.game, 320, 155));
            this.game.addEntity(new Mummy(this.game, 360, 155));
            this.game.addEntity(new Mummy(this.game, 400, 155));
            this.game.addEntity(new Mummy(this.game, 270, 190));
            this.game.addEntity(new Mummy(this.game, 320, 190));
            this.game.addEntity(new Mummy(this.game, 360, 190));
            this.game.addEntity(new Mummy(this.game, 400, 190));
            break;
        case 25:
            for (var i = 0; i < 3; i++) {
                var value = Math.floor(Math.random() * 100 + 1);
                if (value <= fireflySpawnRate) {
                    var xx = Math.floor(Math.random() * 312 + 100);
                    var yy = Math.floor(Math.random() * 120 + 100);
                    this.game.addEntity(new Firefly(this.game, xx, yy));
                }
            }
            break;
        case 26:
            if (!this.game.items[this.game.currentID]) {
                this.game.addEntity(new MaxHeart(this.game, 415, 75));
            }

            this.game.addEntity(new Zombie(this.game, 150, 120));
            this.game.addEntity(new Zombie(this.game, 150, 275));
            this.game.addEntity(new Lizard(this.game, 110, 170));
            this.game.addEntity(new Lizard(this.game, 100, 220));

            for (var i = 0; i < 3; i++) {
                var value = Math.floor(Math.random() * 100 + 1);
                if (value <= fireflySpawnRate) {
                    var xx = Math.floor(Math.random() * 312 + 100);
                    var yy = Math.floor(Math.random() * 120 + 100);
                    this.game.addEntity(new Firefly(this.game, xx, yy));
                }
            }
            break;
        case 27:
            if (!this.game.items[this.game.currentID]) {
                this.game.addEntity(new MaxHeart(this.game, 465, 245));
            }

            for (var j = 0; j < 4; j++) {
                var x = Math.floor(Math.random() * 12 + 2);
                var y = Math.floor(Math.random() * 6 + 2);
                for (var i = 0; i < BOX27.length; i++) {
                    if (BOX27[i].x === x && BOX27[i].y === y) {
                        x = Math.floor(Math.random() * 12 + 2);
                        y = Math.floor(Math.random() * 6 + 2);
                        i = 0;
                    }
                }
                var add1 = Math.random() * 33;
                var add2 = Math.random() * 33;
                this.game.addEntity(new Firefly(this.game, x * 32 + add1, y * 32 + add2));

            }
            for (var i = 0; i < 3; i++) {
                var value = Math.floor(Math.random() * 100 + 1);
                if (value <= fireflySpawnRate) {
                    var xx = Math.floor(Math.random() * 312 + 100);
                    var yy = Math.floor(Math.random() * 120 + 100);
                    this.game.addEntity(new Firefly(this.game, xx, yy));
                }
            }
            break;
        case 28:
            if (!this.game.items[this.game.currentID]) {
                this.game.addEntity(new MaxHeart(this.game, 80, 280));
            }
            for (var j = 0; j < 4; j++) {
                var x = Math.floor(Math.random() * 12 + 2);
                var y = Math.floor(Math.random() * 6 + 2);
                for (var i = 0; i < BOX28.length; i++) {
                    if (BOX28[i].x === x && BOX28[i].y === y) {
                        x = Math.floor(Math.random() * 12 + 2);
                        y = Math.floor(Math.random() * 6 + 2);
                        i = 0;
                    }
                }
                var add1 = Math.random() * 33;
                var add2 = Math.random() * 33;
                this.game.addEntity(new Bat2(this.game, x * 32 + add1, y * 32 + add2));

            }
            for (var i = 0; i < 2; i++) {
                var x = Math.floor(Math.random() * 12 + 2); // gives a random x from tile 2 to 13
                var y = Math.floor(Math.random() * 6 + 2); // gives a random y from tiles 2 to 7
                var add1 = Math.random() * 33; //gives random x pixel from 0 to 32
                var add2 = Math.random() * 33; // gives random y pixel from 0 to 32
                this.game.addEntity(new Wizard(this.game, x * 32 + add1, y * 32 + add2));
            }
            for (var i = 0; i < 3; i++) {
                var value = Math.floor(Math.random() * 100 + 1);
                if (value <= fireflySpawnRate) {
                    var xx = Math.floor(Math.random() * 312 + 100);
                    var yy = Math.floor(Math.random() * 120 + 100);
                    this.game.addEntity(new Firefly(this.game, xx, yy));
                }
            }
            break;
        case 29:
            for (var i = 0; i < 2; i++) {
                var x = Math.floor(Math.random() * 12 + 2); // gives a random x from tile 2 to 13
                var y = Math.floor(Math.random() * 6 + 2); // gives a random y from tiles 2 to 7
                var add1 = Math.random() * 33; //gives random x pixel from 0 to 32
                var add2 = Math.random() * 33; // gives random y pixel from 0 to 32
                this.game.addEntity(new Wizard(this.game, x * 32 + add1, y * 32 + add2));
            }
            for (var i = 0; i < 3; i++) {
                var value = Math.floor(Math.random() * 100 + 1);
                if (value <= fireflySpawnRate) {
                    var xx = Math.floor(Math.random() * 312 + 100);
                    var yy = Math.floor(Math.random() * 120 + 100);
                    this.game.addEntity(new Firefly(this.game, xx, yy));
                }
            }
            break;
        case 30:
            this.game.addEntity(new Mummy(this.game, 300, 223));
            this.game.addEntity(new Mummy(this.game, 100, 223));
            this.game.addEntity(new Mummy(this.game, 150, 223));
            this.game.addEntity(new Mummy(this.game, 200, 223));
            this.game.addEntity(new Mummy(this.game, 250, 223));

            this.game.addEntity(new Mummy(this.game, 300, 157));
            this.game.addEntity(new Mummy(this.game, 100, 157));
            this.game.addEntity(new Mummy(this.game, 150, 157));
            this.game.addEntity(new Mummy(this.game, 200, 157));
            this.game.addEntity(new Mummy(this.game, 250, 157));

            this.game.addEntity(new Mummy(this.game, 100, 95));
            this.game.addEntity(new Mummy(this.game, 150, 95));
            this.game.addEntity(new Mummy(this.game, 200, 95));
            this.game.addEntity(new Mummy(this.game, 250, 95));
            this.game.addEntity(new Mummy(this.game, 300, 95));
            this.game.addEntity(new Mummy(this.game, 350, 95));

            this.game.addEntity(new Mummy(this.game, 100, 285));
            this.game.addEntity(new Mummy(this.game, 150, 285));
            this.game.addEntity(new Mummy(this.game, 250, 285));
            this.game.addEntity(new Mummy(this.game, 300, 285));
            this.game.addEntity(new Mummy(this.game, 350, 285));
            this.game.addEntity(new Mummy(this.game, 400, 285));
            for (var i = 0; i < 3; i++) {
                var value = Math.floor(Math.random() * 100 + 1);
                if (value <= fireflySpawnRate) {
                    var xx = Math.floor(Math.random() * 312 + 100);
                    var yy = Math.floor(Math.random() * 120 + 100);
                    this.game.addEntity(new Firefly(this.game, xx, yy));
                }
            }
            break;
        case 31:
            for (var j = 0; j < 5; j++) {
                var x = Math.floor(Math.random() * 12 + 2);
                var y = Math.floor(Math.random() * 6 + 2);
                for (var i = 0; i < BOX31.length; i++) {
                    if (BOX31[i].x === x && BOX31[i].y === y) {
                        x = Math.floor(Math.random() * 12 + 2);
                        y = Math.floor(Math.random() * 6 + 2);
                        i = 0;
                    }
                }
                var add1 = Math.random() * 33;
                var add2 = Math.random() * 33;
                this.game.addEntity(new Bat2(this.game, x * 32 + add1, y * 32 + add2));

            }
            for (var i = 0; i < 3; i++) {
                var value = Math.floor(Math.random() * 100 + 1);
                if (value <= fireflySpawnRate) {
                    var xx = Math.floor(Math.random() * 312 + 100);
                    var yy = Math.floor(Math.random() * 120 + 100);
                    this.game.addEntity(new Firefly(this.game, xx, yy));
                }
            }
            break;
        case 32:
            for (var j = 0; j < 2; j++) {
                var x = Math.floor(Math.random() * 12 + 2);
                var y = Math.floor(Math.random() * 6 + 2);
                for (var i = 0; i < BOX32.length; i++) {
                    if (BOX32[i].x === x && BOX32[i].y === y) {
                        x = Math.floor(Math.random() * 12 + 2);
                        y = Math.floor(Math.random() * 6 + 2);
                        i = 0;
                    }
                }
                var add1 = Math.random() * 33;
                var add2 = Math.random() * 33;
                this.game.addEntity(new Plant(this.game, x * 32 + add1, y * 32 + add2));

            }
            for (var i = 0; i < 3; i++) {
                var value = Math.floor(Math.random() * 100 + 1);
                if (value <= fireflySpawnRate) {
                    var xx = Math.floor(Math.random() * 312 + 100);
                    var yy = Math.floor(Math.random() * 120 + 100);
                    this.game.addEntity(new Firefly(this.game, xx, yy));
                }
            }
            break;
        case 33:
            for (var j = 0; j < 5; j++) {
                var x = Math.floor(Math.random() * 12 + 2);
                var y = Math.floor(Math.random() * 6 + 2);
                for (var i = 0; i < BOX32.length; i++) {
                    if (BOX32[i].x === x && BOX32[i].y === y) {
                        x = Math.floor(Math.random() * 12 + 2);
                        y = Math.floor(Math.random() * 6 + 2);
                        i = 0;
                    }
                }
                var add1 = Math.random() * 33;
                var add2 = Math.random() * 33;
                this.game.addEntity(new Plant2(this.game, x * 32 + add1, y * 32 + add2));

            }
            for (var i = 0; i < 3; i++) {
                var value = Math.floor(Math.random() * 100 + 1);
                if (value <= fireflySpawnRate) {
                    var xx = Math.floor(Math.random() * 312 + 100);
                    var yy = Math.floor(Math.random() * 120 + 100);
                    this.game.addEntity(new Firefly(this.game, xx, yy));
                }
            }
            break;
        case 34:
            for (var j = 0; j < 2; j++) {
                var x = Math.floor(Math.random() * 12 + 2);
                var y = Math.floor(Math.random() * 6 + 2);
                for (var i = 0; i < BOX34.length; i++) {
                    if (BOX34[i].x === x && BOX34[i].y === y) {
                        x = Math.floor(Math.random() * 12 + 2);
                        y = Math.floor(Math.random() * 6 + 2);
                        i = 0;
                    }
                }
                var add1 = Math.random() * 33;
                var add2 = Math.random() * 33;
                this.game.addEntity(new Bat(this.game, x * 32 + add1, y * 32 + add2));

            }
            for (var i = 0; i < 3; i++) {
                var value = Math.floor(Math.random() * 100 + 1);
                if (value <= fireflySpawnRate) {
                    var xx = Math.floor(Math.random() * 312 + 100);
                    var yy = Math.floor(Math.random() * 120 + 100);
                    this.game.addEntity(new Firefly(this.game, xx, yy));
                }
            }
            break;
        case 35:
            this.game.addEntity(new Vampire(this.game, 250, 50));
            break;
        case 36:
            if (!this.game.items[this.game.currentID]) {
                this.game.addEntity(new MaxHeart(this.game, 80, 185));
            }

            for (var j = 0; j < 15; j++) {
                var x = Math.floor(Math.random() * 12 + 2);
                var y = Math.floor(Math.random() * 6 + 2);
                for (var i = 0; i < BOX36.length; i++) {
                    if (BOX36[i].x === x && BOX36[i].y === y) {
                        x = Math.floor(Math.random() * 12 + 2);
                        y = Math.floor(Math.random() * 6 + 2);
                        i = 0;
                    }
                }
                var add1 = Math.random() * 33;
                var add2 = Math.random() * 33;
                this.game.addEntity(new Bat2(this.game, x * 32 + add1, y * 32 + add2));

            }
            for (var i = 0; i < 3; i++) {
                var value = Math.floor(Math.random() * 100 + 1);
                if (value <= fireflySpawnRate) {
                    var xx = Math.floor(Math.random() * 312 + 100);
                    var yy = Math.floor(Math.random() * 120 + 100);
                    this.game.addEntity(new Firefly(this.game, xx, yy));
                }
            }
            break;
        case 37:
            for (var j = 0; j < 3; j++) {
                var x = Math.floor(Math.random() * 12 + 2);
                var y = Math.floor(Math.random() * 6 + 2);
                for (var i = 0; i < BOX37.length; i++) {
                    if (BOX37[i].x === x && BOX37[i].y === y) {
                        x = Math.floor(Math.random() * 12 + 2);
                        y = Math.floor(Math.random() * 6 + 2);
                        i = 0;
                    }
                }
                var add1 = Math.random() * 33;
                var add2 = Math.random() * 33;
                this.game.addEntity(new Spider(this.game, x * 32 + add1, y * 32 + add2));

            }
            var x = Math.floor(Math.random() * 312 + 100);
            var y = Math.floor(Math.random() * 120 + 100);
            var bat = new Bat(this.game, x, y);

            for (var i = 0; i < 3; i++) {
                var random1 = Math.random() * 33;
                var random2 = Math.random() * 33;
                this.game.addEntity(new Bat(this.game, bat.x + random1, bat.y + random2));
            }
            for (var i = 0; i < 2; i++) {
                var x = Math.floor(Math.random() * 12 + 2); // gives a random x from tile 2 to 13
                var y = Math.floor(Math.random() * 6 + 2); // gives a random y from tiles 2 to 7
                var add1 = Math.random() * 33; //gives random x pixel from 0 to 32
                var add2 = Math.random() * 33; // gives random y pixel from 0 to 32
                this.game.addEntity(new Wizard(this.game, x * 32 + add1, y * 32 + add2));
            }

            for (var i = 0; i < 3; i++) {
                var value = Math.floor(Math.random() * 100 + 1);
                if (value <= fireflySpawnRate) {
                    var xx = Math.floor(Math.random() * 312 + 100);
                    var yy = Math.floor(Math.random() * 120 + 100);
                    this.game.addEntity(new Firefly(this.game, xx, yy));
                }
            }
            break;
        case 38:
            this.game.addEntity(new Mummy(this.game, 100, 93));
            this.game.addEntity(new Mummy(this.game, 200, 93));
            this.game.addEntity(new Mummy(this.game, 300, 93));
            this.game.addEntity(new Mummy(this.game, 100, 285));
            this.game.addEntity(new Mummy(this.game, 200, 285));
            this.game.addEntity(new Mummy(this.game, 300, 285));
            this.game.addEntity(new Mummy(this.game, 250, 223));
            this.game.addEntity(new Mummy(this.game, 250, 158));
            this.game.addEntity(new Mummy(this.game, 300, 158));
            for (var i = 0; i < 2; i++) {
                var x = Math.floor(Math.random() * 12 + 2); // gives a random x from tile 2 to 13
                var y = Math.floor(Math.random() * 6 + 2); // gives a random y from tiles 2 to 7
                var add1 = Math.random() * 33; //gives random x pixel from 0 to 32
                var add2 = Math.random() * 33; // gives random y pixel from 0 to 32
                this.game.addEntity(new Wizard(this.game, x * 32 + add1, y * 32 + add2));
            }
            for (var i = 0; i < 3; i++) {
                var value = Math.floor(Math.random() * 100 + 1);
                if (value <= fireflySpawnRate) {
                    var xx = Math.floor(Math.random() * 312 + 100);
                    var yy = Math.floor(Math.random() * 120 + 100);
                    this.game.addEntity(new Firefly(this.game, xx, yy));
                }
            }

            break;
        case 39:
            if (!this.game.items[this.game.currentID]) {
                this.game.addEntity(new MaxHeart(this.game, 415, 115));
            }

            for (var i = 0; i < 7; i++) {
                var x = Math.floor(Math.random() * 12 + 2); // gives a random x from tile 2 to 13
                var y = Math.floor(Math.random() * 6 + 2); // gives a random y from tiles 2 to 7
                var add1 = Math.random() * 33; //gives random x pixel from 0 to 32
                var add2 = Math.random() * 33; // gives random y pixel from 0 to 32
                this.game.addEntity(new Wizard(this.game, x * 32 + add1, y * 32 + add2));
            }
            for (var i = 0; i < 3; i++) {
                var value = Math.floor(Math.random() * 100 + 1);
                if (value <= fireflySpawnRate) {
                    var xx = Math.floor(Math.random() * 312 + 100);
                    var yy = Math.floor(Math.random() * 120 + 100);
                    this.game.addEntity(new Firefly(this.game, xx, yy));
                }
            }
            break;
        case 40:
            for (var j = 0; j < 3; j++) {
                var x = Math.floor(Math.random() * 12 + 2);
                var y = Math.floor(Math.random() * 6 + 2);
                for (var i = 0; i < BOX40.length; i++) {
                    if (BOX40[i].x === x && BOX40[i].y === y) {
                        x = Math.floor(Math.random() * 12 + 2);
                        y = Math.floor(Math.random() * 6 + 2);
                        i = 0;
                    }
                }
                var add1 = Math.random() * 33;
                var add2 = Math.random() * 33;
                this.game.addEntity(new Spider(this.game, x * 32 + add1, y * 32 + add2));

            }
            for (var i = 0; i < 3; i++) {
                var value = Math.floor(Math.random() * 100 + 1);
                if (value <= fireflySpawnRate) {
                    var xx = Math.floor(Math.random() * 312 + 100);
                    var yy = Math.floor(Math.random() * 120 + 100);
                    this.game.addEntity(new Firefly(this.game, xx, yy));
                }
            }
            break;
        case 41:
            for (var i = 0; i < 3; i++) {
                var value = Math.floor(Math.random() * 100 + 1);
                if (value <= fireflySpawnRate) {
                    var xx = Math.floor(Math.random() * 312 + 100);
                    var yy = Math.floor(Math.random() * 120 + 100);
                    this.game.addEntity(new Firefly(this.game, xx, yy));
                }
            }
            break;
        case 42:
            for (var j = 0; j < 5; j++) {
                var x = Math.floor(Math.random() * 12 + 2);
                var y = Math.floor(Math.random() * 6 + 2);
                for (var i = 0; i < BOX42.length; i++) {
                    if (BOX42[i].x === x && BOX42[i].y === y) {
                        x = Math.floor(Math.random() * 12 + 2);
                        y = Math.floor(Math.random() * 6 + 2);
                        i = 0;
                    }
                }
                var add1 = Math.random() * 33;
                var add2 = Math.random() * 33;
                this.game.addEntity(new Firefly(this.game, x * 32 + add1, y * 32 + add2));

            }
            for (var i = 0; i < 3; i++) {
                var value = Math.floor(Math.random() * 100 + 1);
                if (value <= fireflySpawnRate) {
                    var xx = Math.floor(Math.random() * 312 + 100);
                    var yy = Math.floor(Math.random() * 120 + 100);
                    this.game.addEntity(new Firefly(this.game, xx, yy));
                }
            }
            break;
        case 43:
            for (var j = 0; j < 3; j++) {
                var x = Math.floor(Math.random() * 12 + 2);
                var y = Math.floor(Math.random() * 6 + 2);
                for (var i = 0; i < BOX43.length; i++) {
                    if (BOX43[i].x === x && BOX43[i].y === y) {
                        x = Math.floor(Math.random() * 12 + 2);
                        y = Math.floor(Math.random() * 6 + 2);
                        i = 0;
                    }
                }
                var add1 = Math.random() * 33;
                var add2 = Math.random() * 33;
                this.game.addEntity(new Spider(this.game, x * 32 + add1, y * 32 + add2));

            }
            for (var i = 0; i < 3; i++) {
                var x = Math.floor(Math.random() * 12 + 2); // gives a random x from tile 2 to 13
                var y = Math.floor(Math.random() * 6 + 2); // gives a random y from tiles 2 to 7
                var add1 = Math.random() * 33; //gives random x pixel from 0 to 32
                var add2 = Math.random() * 33; // gives random y pixel from 0 to 32
                this.game.addEntity(new Wizard(this.game, x * 32 + add1, y * 32 + add2));
            }
            for (var i = 0; i < 3; i++) {
                var value = Math.floor(Math.random() * 100 + 1);
                if (value <= fireflySpawnRate) {
                    var xx = Math.floor(Math.random() * 312 + 100);
                    var yy = Math.floor(Math.random() * 120 + 100);
                    this.game.addEntity(new Firefly(this.game, xx, yy));
                }
            }
            break;
        case 44:
            var x = Math.floor(Math.random() * 312 + 100);
            var y = Math.floor(Math.random() * 120 + 100);
            var bat = new Bat(this.game, x, y);

            for (var i = 0; i < 5; i++) {
                var random1 = Math.random() * 33;
                var random2 = Math.random() * 33;
                this.game.addEntity(new Bat(this.game, bat.x + random1, bat.y + random2));
            }

            for (var i = 0; i < 3; i++) {
                var value = Math.floor(Math.random() * 100 + 1);
                if (value <= fireflySpawnRate) {
                    var xx = Math.floor(Math.random() * 312 + 100);
                    var yy = Math.floor(Math.random() * 120 + 100);
                    this.game.addEntity(new Firefly(this.game, xx, yy));
                }
            }
            this.game.addEntity(new Zombie(this.game, 100, 150));
            this.game.addEntity(new Creature(this.game, 1, 30));
            break;
        case 45:
            if (!this.game.items[this.game.currentID]) {
                this.game.addEntity(new MaxHeart(this.game, 455, 185));
            }

            this.game.addEntity(new Lizard(this.game, 100, 170));
            this.game.addEntity(new Lizard(this.game, 400, 170));
            for (var i = 0; i < 3; i++) {
                var value = Math.floor(Math.random() * 100 + 1);
                if (value <= fireflySpawnRate) {
                    var xx = Math.floor(Math.random() * 312 + 100);
                    var yy = Math.floor(Math.random() * 120 + 100);
                    this.game.addEntity(new Firefly(this.game, xx, yy));
                }
            }
            this.game.addEntity(new Creature(this.game, 511, 30));
            break;
        case 46:

            this.game.addEntity(new Zombie(this.game, 200, 180));

            for (var i = 0; i < 3; i++) {
                var value = Math.floor(Math.random() * 100 + 1);
                if (value <= fireflySpawnRate) {
                    var xx = Math.floor(Math.random() * 312 + 100);
                    var yy = Math.floor(Math.random() * 120 + 100);
                    this.game.addEntity(new Firefly(this.game, xx, yy));
                }
            }
            break;
        case 47:
            for (var j = 0; j < 3; j++) {
                var x = Math.floor(Math.random() * 12 + 2);
                var y = Math.floor(Math.random() * 6 + 2);
                for (var i = 0; i < BOX47.length; i++) {
                    if (BOX47[i].x === x && BOX47[i].y === y) {
                        x = Math.floor(Math.random() * 12 + 2);
                        y = Math.floor(Math.random() * 6 + 2);
                        i = 0;
                    }
                }
                var add1 = Math.random() * 33;
                var add2 = Math.random() * 33;
                this.game.addEntity(new Bat2(this.game, x * 32 + add1, y * 32 + add2));

            }
            for (var i = 0; i < 3; i++) {
                var value = Math.floor(Math.random() * 100 + 1);
                if (value <= fireflySpawnRate) {
                    var xx = Math.floor(Math.random() * 312 + 100);
                    var yy = Math.floor(Math.random() * 120 + 100);
                    this.game.addEntity(new Firefly(this.game, xx, yy));
                }
            }
            break;
        case 48:
            if (!this.game.items[this.game.currentID]) {
                this.game.addEntity(new MaxHeart(this.game, 225, 135));
            }

            for (var i = 0; i < 3; i++) {
                var value = Math.floor(Math.random() * 100 + 1);
                if (value <= fireflySpawnRate) {
                    var xx = Math.floor(Math.random() * 312 + 100);
                    var yy = Math.floor(Math.random() * 120 + 100);
                    this.game.addEntity(new Firefly(this.game, xx, yy));
                }
            }
            break;
    }
};
