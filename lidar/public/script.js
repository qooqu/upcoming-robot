import targets from "./targets.js";

const nav = document.getElementById("nav");
const footer = document.getElementById("footer");

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = document.documentElement.clientWidth;
canvas.height =
    document.documentElement.clientHeight -
    nav.offsetHeight -
    footer.offsetHeight;

// ctx.beginPath();
// ctx.arc(100, 100, 50, 0, Math.PI * 2, false);
// ctx.fillStyle = "green";
// ctx.fill();

let frame = 0;
let lidarArr = [];
let targetArr = [];
let targetIndex = 0;
let prevTargetIndex = 0;

const lidarSpeed = 10;
const targetSpeed = -6;

const lidarHz = 2.1;
// const nLidarRows = 50;
// let iLidarRow = 0;

const fps = 25;

class Particle {
    constructor(which, x, y, xStep, yStep, size) {
        this.which = which;
        this.x = x;
        this.y = y;
        this.xStep = xStep;
        this.yStep = yStep;
        this.size = size;
        this.alpha = which === "lidar" ? 1 : 0;
        this.color = `rgba(255, 255, 255, ${this.alpha})`;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
    kill(index) {
        let arr = this.which === "lidar" ? lidarArr : targetArr;
        arr.splice(index, 1);
    }
    update(index) {
        // update position
        this.x += this.xStep;
        this.y += this.yStep;
        // if it's out of the canvas, kill it and move on
        if (
            this.which === "lidar" &&
            (this.x > canvas.width + 5 ||
                this.y > canvas.height + 5 ||
                this.y < -5)
        ) {
            this.kill(index);
        } else if (this.which === "target" && this.x < -5) {
            this.kill(index);
        } else {
            // if it's a target particle and alpha < 1, check collision
            if (this.which === "target" && this.alpha < 1) {
                lidarArr.forEach((lidar) => {
                    if (
                        Math.abs(lidar.x - this.x) < 15 &&
                        Math.abs(lidar.y - this.y) < 15
                    ) {
                        this.alpha += 0.1;
                        this.color = `rgba(255, 255, 255, ${this.alpha})`;
                    }
                });
            }
            this.draw();
        }
    }
}

// sinusoidal sweep
const createLidarParticle = () => {
    let range = 20; // deg, up and down
    // frame / fps = sec
    // sec * Hz = cycle
    let angle = range * Math.sin((frame / fps) * lidarHz * Math.PI);
    let step = lidarSpeed;
    let xStep = step * Math.cos(angle * (Math.PI / 180));
    let yStep = step * Math.sin(angle * (Math.PI / 180));
    lidarArr.push(new Particle("lidar", 0, canvas.height / 2, xStep, yStep, 5));
};

// // linear sweep
// const createLidarParticle = () => {
//     const loc = (iLidarRow * canvas.height) / nLidarRows;
//     lidarArr.push(new Particle("lidar", 0, loc, lidarSpeed, 0, 5));
//     iLidarRow = iLidarRow === nLidarRows ? 0 : iLidarRow + 1;
// };

const initTargetArr = () => {
    while (targetIndex === prevTargetIndex) {
        targetIndex = Math.floor(Math.random() * targets.length);
    }
    const target = targets[targetIndex];
    const spacing = (canvas.height * 0.8) / target.length;
    target.forEach((row, index) => {
        const y = 0.1 * canvas.height + index * spacing;
        row.forEach((pixelLoc) => {
            const x = canvas.width + pixelLoc * spacing;
            targetArr.push(new Particle("target", x, y, targetSpeed, 0, 5));
        });
    });
    prevTargetIndex = targetIndex;
};

const animate = () => {
    // requestAnimationFrame == run as fast as you can
    // very different results in desktop FF, desktop chrome, and iOS
    // requestAnimationFrame(animate);
    // setTimeout == run every x ms
    setTimeout(animate, 1000 / fps);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (frame % 1 === 0) {
        createLidarParticle();
    }
    if (targetArr.length === 0) {
        initTargetArr();
    }
    lidarArr.forEach((particle, index) => particle.update(index));
    targetArr.forEach((particle, index) => particle.update(index));
    frame++;
};

animate();
