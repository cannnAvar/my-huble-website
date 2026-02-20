console.log(game)

const BACKGROUND = "#101010"
const FOREGROUND = "#3dee19"
game.width = 800
game.height = 800

const ctx = game.getContext("2d")

console.log(ctx)

function clear() {
    ctx.fillStyle = BACKGROUND
    ctx.fillRect(0, 0, game.width, game.height)
}


function point({ x, y }) {
    const s = 20
    ctx.fillStyle = FOREGROUND
    ctx.fillRect(x - s / 2, y - s / 2, s, s)
}

function line(p1, p2) {
    ctx.lineWidth = 2
    ctx.strokeStyle = FOREGROUND;
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.stroke();
}


function screen(p) {
    return {

        // -1..1 => 0..2 => 0..1 => 0..w
        x: (p.x + 1) / 2 * game.width,
        // -1..1 => 0..2 => 0..1 => 0..h
        y: (1 - (p.y + 1) / 2) * game.height
    }

}

function project({ x, y, z }) {
    return {
        x: x / z,
        y: y / z,
    }
}


function translate_z({ x, y, z }, dz) {
    return {
        x: x,
        y: y,
        z: z + dz,
    };
}

function rotate_xz({ x, y, z }, angle) {
    const c = Math.cos(angle)
    const s = Math.sin(angle)
    return {
        x: x * c - z * s,
        y,
        z: x * s + z * c,
    }
}

const FPS = 60;
let dz = 1;
let angle = 1;

function frame() {
    const dt = 1 / FPS
    // dz += 1 * dt
    angle += Math.PI * dt
    clear()
    /*for (const v of vs) {
        point(screen((project(translate_z(rotate_xz(v, angle), dz)))))
    }*/
    for (const f of fs) {
        for (let i = 0; i < f.length; i++) {
            const a = vs[f[i]];
            const b = vs[f[(i + 1) % f.length]]

            line(screen((project(translate_z(rotate_xz(a, angle), dz)))),
                screen((project(translate_z(rotate_xz(b, angle), dz)))))

        }
    }
    setTimeout(frame, 1000 / FPS);

}

setTimeout(frame, 1000 / FPS);
