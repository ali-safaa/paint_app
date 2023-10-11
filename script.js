let canvas = document.querySelector('canvas')
let ctx = canvas.getContext('2d')
let tools = document.querySelectorAll('.tools')
let range = document.querySelector('.range')


canvas.width = '500'
canvas.height = '500'
ctx.fillStyle = 'gray'
ctx.fillRect(0,0, canvas.width, canvas.height)

let isDraw = false
selectedTool = 'brush'
let prevMouseX;
let prevMouseY;
let snapshot;
let brushSize;

function drawing(e){
    if(!isDraw) return
    ctx.putImageData(snapshot, 0, 0)
    if(selectedTool == 'brush'){
        ctx.lineWidth = brushSize
        ctx.lineTo(e.offsetX, e.offsetY)
        ctx.stroke()
    }else if(selectedTool == 'circle'){
        drawCircle(e)

    }else if(selectedTool == 'rect'){
        drawRect(e)
    }
}

function startDraw(e){
   isDraw = true
   prevMouseX = e.offsetX
   prevMouseY = e.offsetY
   snapshot = ctx.getImageData(0,0, canvas.width,canvas.height)
   ctx.beginPath()
}

tools.forEach(tool => {
    tool.addEventListener('click', () => {
      selectedTool = tool.id
    })
})

function drawRect(e){
    ctx.fillStyle = 'blue'
    ctx.strokeRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY)
    
}

function drawCircle(e){
   ctx.beginPath()
    let radius = Math.sqrt(Math.pow(prevMouseX - e.offsetX, 2) + Math.pow(prevMouseY - e.offsetY, 2))
    ctx.arc(prevMouseX, prevMouseY, radius,0,2 * Math.PI)
    ctx.stroke()
}

range.addEventListener('change', () => brushSize = range.value)

canvas.addEventListener('mousemove', drawing)
canvas.addEventListener('mousedown', startDraw)
canvas.addEventListener('mouseup', () => isDraw = false)