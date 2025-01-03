const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Bytecode {
    constructor(x, y, fontSize, canvasHeight) {
        this.characters = "10101001";
        this.x = x;
        this.y = y;
        this.fontSize = fontSize;
        this.text = "";
        this.canvasHeight = canvasHeight;
    }
    draw(context) {
        this.text = this.characters.charAt(Math.floor(Math.random() * this.characters.length));
        context.fillStyle = `#${Math.random().toString(16).substr(-6)}`;
        context.fillText(this.text, this.x * this.fontSize, this.y * this.fontSize);
        if (this.y * this.fontSize > this.canvasHeight) {
            this.y = 0;
        } else {
            this.y += 0.8;
        }
    }
}
class Machine {
    constructor(canvasWidth, canvasHeight) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.fontSize = 27;
        this.columns = this.canvasWidth / this.fontSize;
        this.bytecode = [];
        this.#initalize();
        console.log(this.bytecode);
    }
    #initalize() { /* private method */
        for (let i = 0; i < this.columns; i++) {
            this.bytecode[i] = new Bytecode(i, 0, this.fontSize, this.canvasHeight);
        }
    }
    resize(width, height) {
        this.canvasWidth = width;
        this.canvasHeight = height;
        this.columns = this.canvasWidth / this.fontSize;
        this.bytecode = [];
        this.#initalize();
    }
}
const machine = new Machine(canvas.width, canvas.height);

const fPerSecond = 20;
const nextFrame = 1000 / fPerSecond;
let lastTime = 0;
let timer = 0;

function animate(timeStamp) {
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    if (timer > nextFrame) {
        ctx.fillStyle = "rgba(0,0,0,0.1)";
        ctx.textAlign = "center";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.font = machine.fontSize + "px monospace";
        machine.bytecode.forEach(zeroOrOne => zeroOrOne.draw(ctx));
        timer = 10;
    } else {
        timer += deltaTime;
    }
    requestAnimationFrame(animate);
}
animate(0);

window.addEventListener('resize', function () {
    canvas.width = window.innerWidth,
        canvas.height = window.innerHeight;
    machine.resize(canvas.width, canvas.height)
})