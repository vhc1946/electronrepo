// Takes in a canvas element to create an element that can be drawn on

class DrawingPad {
  constructor(cont, color='black'){
    this.canvas = cont;
    this.ctx = this.canvas.getContext('2d');
    this.coord = {x:0 , y:0};
    this.paint = false;
    this.color = color;

    this.canvas.addEventListener('mousedown', this.startPainting);
    this.canvas.addEventListener('mouseup', this.stopPainting);
    this.canvas.addEventListener('mousemove', this.sketch);
    window.addEventListener('resize', this.resize);

    this.resize(); // Resizes the canvas once the window loads
  }

  resize=()=>{
    let ratio = Math.max(window.devicePixelRatio || 1,1);
    this.ctx.canvas.width = this.canvas.offsetWidth * ratio;
    this.ctx.canvas.height = this.canvas.offsetHeight * ratio;
    this.canvas.getContext('2d').scale(ratio, ratio);
  }

  getPosition=(event)=>{
    this.coord.x = event.offsetX;
    this.coord.y = event.offsetY;
  }

  startPainting=(event)=>{
    this.paint = true;
    this.getPosition(event);
  }

  stopPainting=()=>{
    this.paint = false;
  }

  sketch=(event)=>{
    if (!this.paint) return;
    this.ctx.beginPath();
    this.ctx.lineWidth = 3;
    this.ctx.lineCap = 'round';
    this.ctx.strokeStyle = this.color;
    this.ctx.moveTo(this.coord.x, this.coord.y);
    this.getPosition(event);
    this.ctx.lineTo(this.coord.x , this.coord.y);
    this.ctx.stroke();
  }
}
module.exports={
  DrawingPad
}