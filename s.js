window.addEventListener('resize', resize);
var dim = [800, 500];
var canvas = document.getElementById('gameArea');
var ctx = canvas.getContext('2d');
var pvis = false; var gamestart = false; var lvl = 0; var invin = 0; var delay = 0; var shake = 0; var ded = 0; var current = 0;
var page = [0, 0]
var ploc = [200, 250, [0, 0], 0]; var proj = []; var prs = 10; var reload = 30; var retimer = reload; var projfade = [];
var eloc = []; var ehitbox = [30, 15, 30, 15, 30, 15]; var joined = [0, 2, 4];
var bkdf = 0;
var splits = [];
var initframes = 0; var transition = 0; var transtime = 40;
var menutimer = 0; var mt = 0;
document.addEventListener('contextmenu', event => event.preventDefault());
var keysdown = []; var movevector = [0, 0]; var accel = 0.6; var sqrt = Math.sqrt(2) / 2; var friction = 0.55;
window.addEventListener('keydown', function (e) {
    if (gamestart) {
        keysdown = (keysdown || []);
        keysdown[e.keyCode] = true;
    } else if (mt > 100) {
        startGame();
    }
});
window.addEventListener('keyup', function (e) {
    keysdown[e.keyCode] = false;
});
window.addEventListener('mousemove', function (e) {
    page = [(e.pageX - skew) / scale, e.pageY / scale];
});
window.addEventListener('mousedown', function (e) {
    if (gamestart) {
        shoot();
    }
});
var scale = 1; var skew = 0;
resize();
function resize() {
    if (window.innerWidth * 5 / 8 > window.innerHeight) {
        document.getElementById("gameArea").style.height = window.innerHeight + "px";
        document.getElementById("gameArea").style.width = Math.round(window.innerHeight * 8 / 5) + "px";
        document.getElementById("gameArea").height = window.innerHeight;
        document.getElementById("gameArea").width = Math.round(window.innerHeight * 8 / 5);
        scale = window.innerHeight / 500;
    } else {
        document.getElementById("gameArea").style.width = window.innerWidth + "px";
        document.getElementById("gameArea").style.height = Math.round(window.innerWidth * 5 / 8) + "px";
        document.getElementById("gameArea").width = window.innerWidth;
        document.getElementById("gameArea").height = Math.round(window.innerWidth * 5 / 8);
        scale = window.innerWidth / 800;
    } skew = (window.innerWidth - document.getElementById("gameArea").width) / 2; console.log("F")
}
ctx.scale(scale, scale); ctx.save();
var animation; var startscreen = window.requestAnimationFrame(menu);
function startGame() {
    window.cancelAnimationFrame(startscreen);
    ctx.save();
    animation = window.requestAnimationFrame(game);
    pvis = true;
    gamestart = true;
    document.getElementById('menu').currentTime = 0; document.getElementById('menu').play();
    level();
}
function level() {
    splits = []; projfade = [];
    eloc = []; proj = []; retimer = reload; ploc[2] = [0, 0]; ploc[3] = 0;
    if (lvl == 0) {
        ploc[0] = 200; ploc[1] = 250;
        eloc.push([400, 250, [0, 0], 0, 20, 2]);
    } else if (lvl == 1) {
        ploc[0] = 200; ploc[1] = 250;
        eloc.push([750, 150, [0, 0], 0, 90, 2]);
        eloc.push([750, 250, [0, 0], 2, 0, 0]);
        eloc.push([750, 350, [0, 0], 0, 0, -2]);
    } else if (lvl == 2) {
        ploc[0] = 400; ploc[1] = 250; delay = 100;
        eloc.push([200, 250, [0, 0], 0, 20, 2]);
        eloc.push([800, 50, [-2, 2], 5, 10, 10, 0]);
        eloc.push([800, 450, [-2, -2], 5, 10, -10, 0]);
    } else if (lvl == 3) {
        ploc[0] = 400; ploc[1] = 250;
        eloc.push([200, 450, [0, 0], 0, 0, 4]);
        eloc.push([600, 450, [0, 0], 0, 0, 4]);
        eloc.push([400, 450, [0, 0], 0, 0, 2]);
    } else if (lvl == 4) {
        ploc[0] = 400; ploc[1] = 400;
        eloc.push([200, 50, [0, 0], 0, 0, 10]);
        eloc.push([600, 50, [0, 0], 0, 0, 10]);
        eloc.push([400, 50, [0, 0], 2, 0, 2]);
        eloc.push([250, 0, [2, 2], 5, 20, 10, 0]);
        eloc.push([550, 0, [-2, 2], 5, 20, -10, 0]);
    } else if (lvl == 5) {
        ploc[0] = 100; ploc[1] = 250;
        eloc.push([200, 250, [0, 0], 2, 90, 0]);
        eloc.push([400, 250, [0, 0], 2, 0, 0]);
        eloc.push([400, 100, [0, 0], 2, 90, 0]);
        eloc.push([400, 400, [0, 0], 2, 90, 0]);
        eloc.push([600, 400, [0, 0], 0, 90, 4]);
        eloc.push([600, 100, [0, 0], 0, 0, 4]);
    } else if (lvl == 6) {
        ploc[0] = 400; ploc[1] = 250;
        eloc.push([200, 450, [0, 0], 0, 0, 1]);
        eloc.push([600, 450, [0, 0], 0, 0, 1]);
        eloc.push([400, 450, [0, 0], 0, 0, 1]);
        eloc.push([400, 450, [0, 0], 0, 0, 1]);
    } else if (lvl == 7) {
        ploc[0] = 400; ploc[1] = 250;
        eloc.push([600, 400, [0, 0], 4, 0, 3]);
        eloc.push([200, 400, [0, 0], 4, 0, -3]);
        eloc.push([400, 100, [0, 0], 4, 0, 3]);
    } else if (lvl == 8) {
        ploc[0] = 400; ploc[1] = 250;
        eloc.push([550, 400, [-2, -2], 0, 90, 10]);
        eloc.push([250, 100, [2, 2], 0, 90, -10]);
        eloc.push([250, 400, [2, -2], 0, 90, 10]);
        eloc.push([550, 100, [-2, 2], 0, 90, -10]);
    } else if (lvl == 9) {
        ploc[0] = 700; ploc[1] = 250;
        eloc.push([550, 250, [0, 0], 2, 90, 0]);
        eloc.push([400, 250, [0, 0], 2, 90, 1]);
        eloc.push([250, 250, [0, 0], 4, 90, 4]);
        eloc.push([400, 100, [0, 0], 0, 90, 4]);
        eloc.push([400, 400, [0, 0], 0, 90, 4]);
    } else if (lvl == 10) {
        ploc[0] = 400; ploc[1] = 350;
        eloc.push([100, 75, [0, 0], 4, 90, 2]);
        eloc.push([700, 75, [0, 0], 4, 90, 2]);
        eloc.push([400, 75, [0, 0], 4, 90, 2]);
        eloc.push([400, 200, [0, 0], 1, 90, 2]);
        eloc.push([400, 200, [0, 0], 1, 90, 2]);
        eloc.push([400, 200, [0, 0], 1, 90, 2]);
        eloc.push([400, 200, [0, 0], 1, 90, 2]);
        eloc.push([400, 200, [0, 0], 1, 90, 2]);
        eloc.push([400, 200, [0, 0], 1, 90, 2]);
    } else if (lvl == 11) {
        ploc[0] = 25; ploc[1] = 25;
        eloc.push([70, 70, [10, 10], 1, 10, 2]);
        eloc.push([70, 30, [10, 0], 1, 10, 2]);
        eloc.push([30, 70, [0, 10], 1, 10, 2]);
        eloc.push([50, 100, [0, 10], 1, 10, 2]);
        eloc.push([100, 50, [10, 0], 1, 10, 2]);
        eloc.push([400, 350, [0, 0], 2, 10, 2]);
        eloc.push([400, 450, [0, 0], 2, 10, 2]);
        eloc.push([400, 450, [0, 0], 2, 10, 2]);
        eloc.push([400, 350, [0, 3], 2, 10, 2]);
        eloc.push([400, 250, [0, -3], 2, 10, 2]);
    } else if (lvl == 12) {
        ploc[0] = 400; ploc[1] = 250;
        eloc.push([400, 15, [-7.7, 4.7], 5, 90, 5, 2]);
        //eloc.push([207.5,132.5,[-7.7,4.7],5,90,5,2]);
        eloc.push([15, 250, [7.7, 4.7], 5, 90, 5, 2]);
        //eloc.push([207.5,367.5,[7.7,4.7],5,90,5,2]);
        eloc.push([400, 485, [7.7, -4.7], 5, 90, 5, 2]);
        //eloc.push([592.5,367.5,[7.7,-4.7],5,90,5,2]);
        eloc.push([785, 250, [-7.7, -4.7], 5, 90, 2, 2]);
        //eloc.push([592.5,132.5,[-7.7,-4.7],5,90,2,2]);

        eloc.push([725, 425, [0, 0], 0, 0, 2]);
        eloc.push([75, 75, [0, 0], 0, 90, 2]);
        eloc.push([725, 75, [0, 0], 0, 0, 2]);
        eloc.push([75, 425, [0, 0], 0, 90, 2]);
    } else if (lvl == 13) {
        ploc[0] = 750; ploc[1] = 250;
        eloc.push([550, 400, [5, 1], 0, 90, 10]);
        eloc.push([550, 100, [5, -1], 0, 135, -10]);
        eloc.push([250, 250, [3, 0], 0, 0, 2]);
        eloc.push([400, 100, [2, 0], 0, 0, 2]);
        eloc.push([550, 250, [1, 0], 0, 0, 2]);
        eloc.push([400, 400, [1, 0], 0, 0, 5]);
    } else if (lvl == 14) {
        ploc[0] = 400; ploc[1] = 250;
        eloc.push([400, 15, [-7.7, 4.7], 1, 90, 5]);
        //eloc.push([207.5,132.5,[-7.7,4.7],5,90,5,2]);
        eloc.push([15, 250, [7.7, 4.7], 1, 90, 5]);
        //eloc.push([207.5,367.5,[7.7,4.7],5,90,5,2]);
        eloc.push([400, 485, [7.7, -4.7], 1, 90, 5]);
        //eloc.push([592.5,367.5,[7.7,-4.7],5,90,5,2]);
        eloc.push([785, 250, [-7.7, -4.7], 1, 90, 2]);
        //eloc.push([592.5,132.5,[-7.7,-4.7],5,90,2,2]);

        eloc.push([725, 425, [0, 0], 4, 0, 2]);
        eloc.push([75, 75, [0, 0], 4, 90, 2]);
        eloc.push([725, 75, [0, 0], 2, 0, 2]);
        eloc.push([75, 425, [0, 0], 4, 90, 2]);
    } else if (lvl == 15) {
        ploc[0] = 400; ploc[1] = 250;
        eloc.push([550, 400, [0, 0], 2, 90, 2]);
        eloc.push([250, 100, [0, 0], 2, 0, 2]);
        eloc.push([250, 400, [0, 0], 2, 45, 2]);
        eloc.push([550, 100, [0, 0], 2, 135, 2]);
        eloc.push([250, 250, [0, 0], 4, 0, 2]);
        eloc.push([400, 100, [0, 0], 4, 0, 2]);
        eloc.push([550, 250, [0, 0], 4, 0, 2]);
        eloc.push([400, 400, [0, 0], 4, 0, 2]);
    } else if (lvl == 16) {
        ploc[0] = 400; ploc[1] = 100;
        eloc.push([325, 200, [1, 0], 5, 90, 3, 0]);
        eloc.push([475, 200, [-1, 0], 5, 90, 3, 0]);
        eloc.push([325, 300, [1, 0], 5, 90, 3, 0]);
        eloc.push([475, 300, [-1, 0], 5, 90, 3, 0]);
        eloc.push([400, 400, [0, 0], 2, 10, 1]);
        eloc.push([200, 450, [0, 10], 0, 10, 2]);
        eloc.push([600, 450, [0, 10], 0, 10, 2]);
    } else if (lvl == 17) {
        ploc[0] = 100; ploc[1] = 150;
        eloc.push([175, 150, [0, 0], 3, 270, 0]);
        eloc.push([250, 150, [0, 0], 2, 0, 0]);
        eloc.push([250, 50, [0, 0], 0, 90, -4]);
        eloc.push([250, 250, [0, 0], 2, 90, 0]);
        eloc.push([100, 250, [0, 0], 0, 10, 8]);
        eloc.push([500, 100, [0, 0], 4, 90, -4]);
        eloc.push([550, 250, [0, 0], 2, 90, 2]);
        eloc.push([600, 400, [0, 0], 0, 90, 3]);
    } else {
        window.clearAnimationFrame(animation);
    }
}
function shoot() {
    if (delay == 0) {
        if (retimer == reload && ded == 0) {
            retimer = 0;
            var vectr = [30 * Math.cos(ploc[3] * Math.PI / 180), 30 * Math.sin(ploc[3] * Math.PI / 180)];
            proj.push([vectr[0] + ploc[0], vectr[1] + ploc[1], [prs * Math.cos(ploc[3] * Math.PI / 180), prs * Math.sin(ploc[3] * Math.PI / 180)], ploc[3]]);
            ploc[2][0] -= 1 / 3 * vectr[0]; ploc[2][1] -= 1 / 3 * vectr[1];
            shake += 10;
            document.getElementById('shoot').currentTime = 0; document.getElementById('shoot').play();
        }
    }
}
function complete() {
    for (var i = 0; i < eloc.length; i++) {
        if (joined.includes(eloc[i][3])) {
            return false;
        }
    }
    return true;
}
function game() {
    animation = window.requestAnimationFrame(game);
    ctx.setTransform(scale, 0, 0, scale, 0, 0); ctx.textAlign = 'center';
    if (complete() && invin == 0 && ded == 0) {
        invin = 1; document.getElementById('advance').currentTime = 0; document.getElementById('advance').play();
        var g = setTimeout(function () { lvl++; console.log(lvl); level(); invin = 0; initframes = 0; }, 1000);
    }
    initframes = Math.min(initframes + 1, transtime);
    bkdf = (bkdf + 1) % 1000; delay = Math.max(delay - 1, 0); shake = Math.max(shake - 1, 0); ded = Math.max(ded - 1, 0); var shamount = [0, 0];

    ctx.clearRect(-50, -50, dim[0] + 50, dim[1] + 50);
    ctx.fillStyle = 'rgb(79, 51, 150)';
    ctx.fillRect(-50, -50, dim[0] + 50, dim[1] + 50);
    if (shake > 0) {
        if (shake > 30) {
            shake = 30;
        }
        shamount = [perlin(bkdf / 7, 4, 2.0, 0.5) * shake ** 2 / 4, perlin(bkdf / 7 + 327, 4, 2.0, 0.5) * shake ** 2 / 4];
        ctx.translate(shamount[0], shamount[1]);

    }
    //reload
    retimer = Math.min(reload, retimer + 1);


    //movement
    if (delay == 0 && ded == 0) {
        ploc[3] = Math.atan2(page[1] - ploc[1], page[0] - ploc[0]) * 180 / Math.PI;
        movevector = [0, 0];
        if (keysdown[87]) { movevector[1] -= accel; } if (keysdown[65]) { movevector[0] -= accel; } if (keysdown[83]) { movevector[1] += accel; } if (keysdown[68]) { movevector[0] += accel; }
        if (Math.abs(movevector[0]) > 0 && Math.abs(movevector[1]) > 0) {
            movevector[0] = sqrt * movevector[0]; movevector[1] = sqrt * movevector[1];
        }
        ploc[2][0] += movevector[0]; ploc[2][1] += movevector[1];
        ploc[2][0] = 0.5 * ploc[2][0] / friction; ploc[2][1] = 0.5 * ploc[2][1] / friction;
        ploc[0] += ploc[2][0]; ploc[1] += ploc[2][1];
        if (ploc[0] < 25) { ploc[0] = 25; } if (ploc[0] > dim[0] - 25) { ploc[0] = dim[0] - 25; } if (ploc[1] < 25) { ploc[1] = 25; } if (ploc[1] > dim[1] - 25) { ploc[1] = dim[1] - 25; }

    }

    //enemy movement
    if (gamestart) {
        for (var i = eloc.length - 1; i >= 0; i--) {
            eloc[i][4] += eloc[i][5];
            eloc[i][0] += eloc[i][2][0]; eloc[i][1] += eloc[i][2][1];
            var hit = ehitbox[eloc[i][3]];
            if (eloc[i][0] < hit) { eloc[i][0] = hit; eloc[i][2][0] *= -1; }
            if (eloc[i][0] > dim[0] - hit) { eloc[i][0] = dim[0] - hit; eloc[i][2][0] *= -1; }
            if (eloc[i][1] < hit) { eloc[i][1] = hit; eloc[i][2][1] *= -1; }
            if (eloc[i][1] > dim[1] - hit) { eloc[i][1] = dim[1] - hit; eloc[i][2][1] *= -1; }
        }
    }
    if (gamestart) {
        //add dynamic background here
    }
    if (lvl == 0) {
        ctx.fillStyle = 'rgba(255,255,255,0.5)';
        ctx.font = "50px Lexend Deca";
        ctx.fillText("WASD to move", 400, 150);
        ctx.fillText("Click to shoot", 400, 400);
    }
    if (gamestart) {
        for (var i = proj.length - 1; i >= 0; i--) {
            proj[i][0] += proj[i][2][0]; proj[i][1] += proj[i][2][1];
            var hit = 2;
            if (proj[i][0] < hit || proj[i][0] > dim[0] - hit || proj[i][1] < hit || proj[i][1] > dim[1] - hit) {
                projfade.push([proj[i][0], proj[i][1], proj[i][3], 15]); proj.splice(i, 1);
                document.getElementById('hit').currentTime = 0; document.getElementById('hit').play();
            }
        }
        for (var i = projfade.length - 1; i >= 0; i--) {
            if (projfade[i][3] > 0) {
                projfade[i][3]--;
                ctx.globalAlpha = projfade[i][3] / 15;
                ctx.fillStyle = 'rgb(255,255, 255)';
                ctx.lineWidth = 5;
                ctx.strokeStyle = 'rgba(255,255,255,0.5)';
                ctx.translate(projfade[i][0], projfade[i][1]);
                ctx.rotate(projfade[i][2] * Math.PI / 180);
                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.lineTo(-20, -0.5 * 10 * Math.sqrt(3));
                ctx.lineTo(-20, 0.5 * 10 * Math.sqrt(3));
                ctx.closePath();
                ctx.stroke();
                ctx.fill();
                ctx.rotate(-projfade[i][2] * Math.PI / 180);
                ctx.translate(-projfade[i][0], -projfade[i][1]);
                ctx.globalAlpha = 1;
            } else {
                projfade.splice(i, 1);
            }
        }
    }
    if (gamestart) {
        for (var i = 0; i < proj.length; i++) {
            ctx.fillStyle = 'rgb(255, 204, 0)';
            ctx.lineWidth = 5;
            ctx.strokeStyle = 'rgba(255,255,255,0.5)';
            ctx.translate(proj[i][0], proj[i][1]);
            ctx.rotate(proj[i][3] * Math.PI / 180);
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(-20, -0.5 * 10 * Math.sqrt(3));
            ctx.lineTo(-20, 0.5 * 10 * Math.sqrt(3));
            ctx.closePath();
            ctx.stroke();
            ctx.fill();
            ctx.rotate(-proj[i][3] * Math.PI / 180);
            ctx.translate(-proj[i][0], -proj[i][1]);
        }
        for (var j = splits.length - 1; j >= 0; j--) {
            if (splits[j][3] > 0) {
                splits[j][3] -= 1;
                ctx.strokeStyle = 'rgba(255,255,255,' + (0.6 - 0.6 * (20 - splits[j][3]) / 20) + ')';
                ctx.lineWidth = 5 - 5 * (20 - splits[j][3]) / 20;
                ctx.beginPath();
                ctx.arc(splits[j][0], splits[j][1], 50 - splits[j][3], 0, 2 * Math.PI);
                ctx.stroke();
            } else {
                splits.splice(j, 1);
            }
        }
    }
    if (pvis) {
        var deficit = [255, 204, 0]; var or = [116, 212, 196]; var pshamount = [0, 0];
        if (ded > 50) {
            ctx.globalAlpha = (ded - 60) / 20;
            ctx.fillStyle = 'rgba(255,255,255,1)';
            pshamount = [perlin(bkdf / 7, 4, 2.0, 0.5) * ((ded - 40) / 4) ** 2 / 4, perlin(bkdf / 7 + 327, 4, 2.0, 0.5) * ((ded - 40) / 4) ** 2 / 4];
            ctx.translate(pshamount[0], pshamount[1]);
        } else if (delay > 0) {
            ctx.fillStyle = 'rgb(' + deficit.join() + ')';
        } else if (retimer == reload) {
            ctx.fillStyle = 'rgb(' + or.join() + ')';
        } else {
            ctx.fillStyle = 'rgb(' + [deficit[0] + (or[0] - deficit[0]) * retimer / reload, deficit[1] + (or[1] - deficit[1]) * retimer / reload, deficit[2] + (or[2] - deficit[2]) * retimer / reload].join() + ")";
        }
        ctx.lineWidth = 5;
        ctx.strokeStyle = 'rgba(255,255,255,0.5)';
        ctx.translate(ploc[0], ploc[1]);
        ctx.rotate(ploc[3] * Math.PI / 180);
        ctx.rotate(1 / 3 * Math.PI);
        ctx.beginPath();
        ctx.arc(0, 0, 20, 0, 4 / 3 * Math.PI);
        ctx.rotate(-1 / 3 * Math.PI);
        ctx.lineTo(30, 0);
        ctx.closePath();
        ctx.stroke();
        ctx.fill();
        ctx.rotate(-ploc[3] * Math.PI / 180);
        ctx.translate(-ploc[0], -ploc[1]);
        ctx.globalAlpha = 1;
        if (ded == 60) {
            ploc[0] = -1000; ploc[1] = -1000;
        }
        ctx.translate(-pshamount[0], -pshamount[1]);
    }
    if (gamestart) {
        for (var i = 0; i < eloc.length; i++) {
            ctx.strokeStyle = 'rgba(255,255,255,0.6)';
            if (eloc[i][3] == 0) {
                ctx.fillStyle = 'rgb(13, 3, 128)';
                ctx.lineWidth = 5;
                ctx.translate(eloc[i][0], eloc[i][1]);
                ctx.rotate(-eloc[i][4] * Math.PI / 180);
                ctx.beginPath();
                ctx.arc(0, 20, 15, 0, 2 * Math.PI);
                ctx.stroke();
                ctx.fill();
                ctx.beginPath();
                ctx.arc(0, -20, 15, 0, 2 * Math.PI);
                ctx.stroke();
                ctx.fill();
                ctx.rotate(eloc[i][4] * Math.PI / 180);
                ctx.beginPath();
                ctx.arc(0, 0, 30, 0, 2 * Math.PI);
                ctx.stroke();
                ctx.translate(-eloc[i][0], -eloc[i][1]);
            } else if (eloc[i][3] == 1) {
                ctx.fillStyle = 'rgb(13, 3, 128)';
                ctx.lineWidth = 5;
                ctx.beginPath();
                ctx.arc(eloc[i][0], eloc[i][1], 15, 0, 2 * Math.PI);
                ctx.stroke();
                ctx.fill();
            } else if (eloc[i][3] == 2) {
                var side = 30;
                var h = side * (Math.sqrt(3) / 2);
                ctx.fillStyle = 'rgb(209, 61, 120)';
                ctx.lineWidth = 5;
                ctx.translate(eloc[i][0], eloc[i][1]);
                ctx.rotate(-eloc[i][4] * Math.PI / 180);
                ctx.translate(0, -20);
                ctx.beginPath();
                ctx.moveTo(0, -h / 2);
                ctx.lineTo(-side / 2, h / 2);
                ctx.lineTo(side / 2, h / 2);
                ctx.lineTo(0, -h / 2);
                ctx.closePath();
                ctx.closePath();
                ctx.stroke();
                ctx.fill();
                ctx.translate(0, 40);
                ctx.beginPath();
                ctx.moveTo(0, h / 2);
                ctx.lineTo(-side / 2, -h / 2);
                ctx.lineTo(side / 2, -h / 2);
                ctx.lineTo(0, h / 2);
                ctx.closePath();
                ctx.stroke();
                ctx.fill();
                ctx.translate(0, -20);
                ctx.rotate(eloc[i][4] * Math.PI / 180);
                ctx.beginPath();
                ctx.arc(0, 0, 30, 0, 2 * Math.PI);
                ctx.stroke();
                ctx.translate(-eloc[i][0], -eloc[i][1]);
            } else if (eloc[i][3] == 3) {
                var side = 30;
                var h = side * (Math.sqrt(3) / 2);
                ctx.fillStyle = 'rgb(209, 61, 120)';
                ctx.lineWidth = 5;
                ctx.translate(eloc[i][0], eloc[i][1]);
                ctx.rotate(-eloc[i][4] * Math.PI / 180);
                ctx.translate(0, -4);
                ctx.beginPath();
                ctx.moveTo(0, -h / 2);
                ctx.lineTo(-side / 2, h / 2);
                ctx.lineTo(side / 2, h / 2);
                ctx.lineTo(0, -h / 2);
                ctx.closePath();
                ctx.stroke();
                ctx.fill();
                ctx.translate(0, 4);
                ctx.rotate(eloc[i][4] * Math.PI / 180);
                ctx.translate(-eloc[i][0], -eloc[i][1]);
            } else if (eloc[i][3] == 4) {
                ctx.fillStyle = 'rgb(39, 145, 29)';
                ctx.lineWidth = 5; var fip = 0;
                if (eloc[i][6]) {
                    eloc[i][6] = Math.max(eloc[i][6] - 1, 0);
                    fip = Math.sin(eloc[i][6] / 8) * 5;
                    ctx.lineWidth = 5 - 5 * eloc[i][6] / 20;
                }
                ctx.translate(eloc[i][0], eloc[i][1]);
                ctx.rotate(-eloc[i][4] * Math.PI / 180);
                ctx.strokeRect(-14, -33 - fip, 28, 28);
                ctx.fillRect(-14, -33 - fip, 28, 28);
                ctx.strokeRect(-14, 6 + fip, 28, 28);
                ctx.fillRect(-14, 6 + fip, 28, 28);
                ctx.rotate(eloc[i][4] * Math.PI / 180);
                ctx.beginPath();
                if (eloc[i][6]) {
                    ctx.strokeStyle = 'rgb(255,255,255,' + (0.2 + 0.4 * eloc[i][6] / 10) + ')';
                }
                ctx.arc(0, 0, 30 + fip * 2, 0, 2 * Math.PI);
                ctx.stroke();
                ctx.translate(-eloc[i][0], -eloc[i][1]);
            } else if (eloc[i][3] == 5) {
                ctx.fillStyle = 'rgb(39, 145, 29)';
                ctx.lineWidth = 5;
                ctx.translate(eloc[i][0], eloc[i][1]);
                ctx.rotate(-eloc[i][4] * Math.PI / 180);
                ctx.strokeRect(-14, -14, 28, 28);
                ctx.fillRect(-14, -14, 28, 28);
                ctx.rotate(eloc[i][4] * Math.PI / 180);
                ctx.translate(-eloc[i][0], -eloc[i][1]);
            }
        }
    }

    checkCollisions();
    if (shake > 0) {
        ctx.translate(-shamount[0], -shamount[1]);
    }
    //transition stuff
    if (initframes < transtime) {
        if (transition == 0) {
            ctx.fillStyle = "rgba(0,0,0," + (1 - initframes / transtime) + ")";
            ctx.fillRect(0, 0, dim[0], dim[1]);
        }
    }
    if (ded > 0 && ded < 60) {
        ctx.fillStyle = 'rgba(0,0,0)';
        if (ded > 30) {
            current = lerp(current, dim[1], 0.11)
            ctx.fillRect(0, 0, dim[0], current);
        } else if (ded <= 30) {
            if (ded == 30) {
                current = 0;
                level();
            }
            current = lerp(current, dim[1], 0.11)
            ctx.fillRect(0, current, dim[0], dim[1] - current + 1);
        }
    }
    //yey beat level
    if (complete() && ded == 0) {
        ctx.fillStyle = 'rgb(255,255,255)';
        ctx.font = "100px Lexend Deca";
        ctx.fillText("Nice!", 400, 300);
    }
}
function split(index) {
    var pos1 = [Math.cos((eloc[index][4] - 90) * Math.PI / 180), Math.sin((eloc[index][4] - 90) * Math.PI / 180)];
    var pos2 = [-Math.cos((eloc[index][4] - 90) * Math.PI / 180), -Math.sin((eloc[index][4] - 90) * Math.PI / 180)];
    var explosive;
    if (joined.includes(eloc[index][3])) {
        splits.push([eloc[index][0], eloc[index][1], 30, 20]); document.getElementById('split').currentTime = 0; document.getElementById('split').play();
    } else {
        document.getElementById('hit').currentTime = 0; document.getElementById('hit').play();
    }
    if (eloc[index][3] == 0) {
        explosive = 3;
        var vec1 = [eloc[index][2][0] + pos1[0] * explosive, eloc[index][2][1] + pos1[1] * explosive];
        var vec2 = [eloc[index][2][0] + pos2[0] * explosive, eloc[index][2][1] + pos2[1] * explosive];
        eloc.push([pos1[0] + eloc[index][0], pos1[1] + eloc[index][1], vec1, eloc[index][3] + 1, 0, 0]);
        eloc.push([pos2[0] + eloc[index][0], pos2[1] + eloc[index][1], vec2, eloc[index][3] + 1, 0, 0]);
        eloc.splice(index, 1);
    } else if (eloc[index][3] == 2) {
        explosive = 4;
        var vec1 = [eloc[index][2][0] + pos1[0] * explosive, eloc[index][2][1] + pos1[1] * explosive];
        var vec2 = [eloc[index][2][0] + pos2[0] * explosive, eloc[index][2][1] + pos2[1] * explosive];
        eloc.push([pos1[0] + eloc[index][0], pos1[1] + eloc[index][1], vec1, eloc[index][3] + 1, eloc[index][4] + 30, Math.random() * 5 + 2]);
        eloc.push([pos2[0] + eloc[index][0], pos2[1] + eloc[index][1], vec2, eloc[index][3] + 1, -eloc[index][4] + 30, Math.random() * 5 + 2]);
        eloc.splice(index, 1);
    } else if (eloc[index][3] == 4) {
        explosive = 5;
        var vec1 = [eloc[index][2][0] + pos1[0] * explosive, eloc[index][2][1] + pos1[1] * explosive];
        var vec2 = [eloc[index][2][0] + pos2[0] * explosive, eloc[index][2][1] + pos2[1] * explosive];
        eloc.push([pos1[0] + eloc[index][0], pos1[1] + eloc[index][1], vec1, eloc[index][3] + 1, eloc[index][4], Math.random() * 2 + 1, 5]);
        eloc.push([pos2[0] + eloc[index][0], pos2[1] + eloc[index][1], vec2, eloc[index][3] + 1, -eloc[index][4], Math.random() * 2 + 1, 5]);
        eloc.splice(index, 1);
    }
    //add effect here!
    shake += 15;

}
function combine(in1, in2) {
    var angle = (Math.atan2(eloc[in2][1] - eloc[in1][1], eloc[in1][0] - eloc[in2][0]) * 180 / Math.PI) - 90;
    var vector = [(eloc[in1][2][0] + eloc[in2][2][0]) / 8, (eloc[in1][2][1] + eloc[in2][2][1]) / 8];
    var position = [(eloc[in1][0] + eloc[in2][0]) / 2, (eloc[in1][1] + eloc[in2][1]) / 2];
    eloc[in2] = [position[0], position[1], vector, eloc[in1][3] - 1, angle, Math.random() - 2, 20];
    eloc.splice(in1, 1);
    document.getElementById('combine').currentTime = 0; document.getElementById('combine').play();
    //add effect here!
}
function checkCollisions() {
    for (var i = eloc.length - 1; i >= 0; i--) {
        if (eloc[i][3] == 5) { eloc[i][6] = Math.max(eloc[i][6] - 1, 0); }
        if (i > 0) {
            for (var j = i - 1; j >= 0; j--) {
                var distance = Math.hypot(eloc[i][0] - eloc[j][0], eloc[i][1] - eloc[j][1]);
                /*if (Math.hypot(eloc[i][0]-eloc[j][0],eloc[i][1]-eloc[j][1]) <= ehitbox[eloc[i][3]]+ehitbox[eloc[j][3]]) {
                    console.log("popqwp");
                    var m1 = Math.pow(ehitbox[eloc[i][3]],3);
                    var momentum1 = [eloc[i][2][0] * m1, eloc[i][2][1] * m1]
                    var normalVector1 = [eloc[j][0]-eloc[i][0],eloc[j][1]-eloc[i][1]];
                    normalVector1[0] /= distance;
                    normalVector1[1] /= distance;
                    var dot1 = normalVector1[0] * eloc[i][2][0] + normalVector1[1] * eloc[i][2][1];
                    var normalMomentum1 = [eloc[i][2][0] * dot1, eloc[i][2][1] * dot1];

                    var m2 = Math.pow(ehitbox[eloc[j][3]],3);
                    var momentum2 = [eloc[j][2][0] * m2, eloc[j][2][1] * m2];
                    var normalVector2 = normalVector1;
                    normalVector2[0] *= -1;
                    normalVector2[1] *= -1;
                    var dot2 = normalVector2[0] * eloc[j][2][0] + normalVector2[1] * eloc[j][2][1];
                    var normalMomentum2 = [eloc[j][2][0] * dot2, eloc[j][2][1] * dot2];

                    momentum1[0] += -normalMomentum1[0] + normalMomentum2[0];
                    momentum1[1] += -normalMomentum1[1] + normalMomentum2[1];
                    momentum2[0] += -normalMomentum2[0] + normalMomentum1[0];
                    momentum2[1] += -normalMomentum2[1] + normalMomentum1[1];
                    
                    eloc[i][2][0] = momentum1[0] / m1;
                    eloc[i][2][1] = momentum1[1] / m1;
                    eloc[j][2][0] = momentum2[0] / m2;
                    eloc[j][2][1] = momentum2[1] / m2;

                    var normalVector1 = [eloc[j][0]-eloc[i][0],eloc[j][1]-eloc[i][1]];
                    normalVector1[0] /= distance;
                    normalVector1[1] /= distance;
                    var normalVector2 = normalVector1;
                    normalVector2[0] *= -1;
                    normalVector2[1] *= -1;

                    var overlap = ehitbox[eloc[i][3]]+ehitbox[eloc[j][3]] - distance;
                    eloc[i][0] += normalVector1[0] * overlap;
                    eloc[i][1] += normalVector1[1] * overlap;
                    eloc[j][0] -= normalVector2[0] * overlap;
                    eloc[j][1] -= normalVector2[1] * overlap;
                }*/
                if (Math.hypot(eloc[i][0] - eloc[j][0], eloc[i][1] - eloc[j][1]) <= ehitbox[eloc[i][3]] + ehitbox[eloc[j][3]]) {
                    if (eloc[i][3] == eloc[j][3] && eloc[i][3] == 5 && eloc[i][6] == 0 && eloc[i][6] == 0 && invin == 0) {
                        combine(i, j);
                    } else if ((eloc[i][3] == 3 || eloc[j][3] == 3) && (joined.includes(eloc[i][3]) || joined.includes(eloc[j][3]))) {
                        if (eloc[i][3] == 3) {
                            split(j);
                            eloc.splice(i - 1, 1); //effects here!
                            i -= 2;
                        } else {
                            split(i);
                            eloc.splice(j, 1); //effects here!
                            i--;
                        }
                    } else {
                        var m1 = Math.pow(ehitbox[eloc[i][3]], 3); var m2 = Math.pow(ehitbox[eloc[j][3]], 3);
                        var normalVector = [eloc[j][0] - eloc[i][0], eloc[j][1] - eloc[i][1]];
                        if (distance <= 0.0001) {
                            normalVector = [1, 0];
                        } else {
                            normalVector = [normalVector[0] / distance, normalVector[1] / distance];
                        }
                        var scalar1 = m2 / (m1 + m2) * 0.8 * (Math.sqrt(eloc[j][2][0] ** 2 + eloc[j][2][1] ** 2) * 0.2 + 1); var scalar2 = m1 / (m1 + m2) * 0.8 * (Math.sqrt(eloc[i][2][0] ** 2 + eloc[i][2][1] ** 2) * 0.2 + 1);
                        eloc[i][2][0] -= normalVector[0] * scalar1; eloc[i][2][1] -= normalVector[1] * scalar1;
                        eloc[j][2][0] += normalVector[0] * scalar2; eloc[j][2][1] += normalVector[1] * scalar2;
                    }
                }
            }
        }
        for (var j = proj.length - 1; j >= 0; j--) {
            if (Math.hypot(eloc[i][0] - proj[j][0], eloc[i][1] - proj[j][1]) <= ehitbox[eloc[i][3]] + 1) {
                eloc[i][2][0] += proj[j][2][0] / 2; eloc[i][2][1] += proj[j][2][1] / 2;
                projfade.push([proj[j][0], proj[j][1], proj[j][3], 15]);
                proj.splice(j, 1);
                split(i);
            }
        }
    }
    for (var i = eloc.length - 1; i >= 0; i--) {
        if (Math.hypot(eloc[i][0] - ploc[0], eloc[i][1] - ploc[1]) <= ehitbox[eloc[i][3]] + 20 && invin == 0) {
            if (ded == 0) {
                ded = 80;
                document.getElementById('die').currentTime = 0; document.getElementById('die').play();
                current = 0;
            }
            //level();
        }
    }
}
function lerp(start, end, lerp) {
    return (start * (1 - lerp) + end * lerp);
}

var slopes = [];
var slopeCount = 4096;
for (var i = 0; i < slopeCount; i++) {
    slopes.push(Math.random() * 2 - 1);
}
var seed = 0;
function perlinHelper(x) {
    var x = seed + x;
    var floorInt = Math.floor(x);
    var ceilInt = floorInt + 1;
    var dist = x - floorInt;
    floorSlope = slopes[floorInt % slopeCount];
    ceilSlope = slopes[ceilInt % slopeCount];
    y1 = floorSlope * dist;
    y2 = ceilSlope * (1 - dist);
    smoothDist = dist * dist * (3 - 2 * dist);
    return lerp(y1, y2, smoothDist);
}
function perlin(x, octaves, lacunarity, persistence) {
    var value = 0;
    var amplitude = 0;
    for (var i = 0; i < octaves; i++) {
        var octaveAmplitude = persistence ** i;
        value += perlinHelper((x + 17) * lacunarity ** i) * octaveAmplitude;
        amplitude += octaveAmplitude;
    }
    return value / amplitude;
}

function menu() {
    startscreen = window.requestAnimationFrame(menu);
    ctx.setTransform(scale, 0, 0, scale, 0, 0);
    menutimer = (menutimer + 1) % 1000;
    mt = Math.min((mt + 1), 1000);
    ctx.clearRect(0, 0, dim[0], dim[1]);
    ctx.fillStyle = 'rgb(82, 61, 173)';
    ctx.fillRect(0, 0, dim[0], dim[1]);
    if ((menutimer) % 50 <= 30 && mt >= 100) {
        ctx.fillStyle = 'rgb(255,255,255)';
        ctx.font = "30px Lexend Deca";
        ctx.textAlign = 'center';
        ctx.fillText("- Press any key to continue - ", 400, 400);
    }
    ctx.fillStyle = 'rgb(255,255,255)';
    ctx.font = "80px Lexend Deca";
    ctx.textAlign = 'center';
    ctx.fillText("Shoot n' Split!", 400, 125);

    if (mt < 100) {
        ctx.fillStyle = 'rgba(255,255,255,' + ((100 - mt) / 100) + ')';
        ctx.fillRect(0, 0, dim[0], dim[1]);
    }
}