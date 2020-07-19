$(document).ready(function(){
    const PIXELSIZE = 2;
    const dimension = 25;
    const repeatx = 20;
    const repeaty = 15;

    const canvas = $("#myBigcanvas");
    // window.canvas = canvas;
    let ctx = canvas.get(0).getContext("2d");
    const cwidth = dimension * repeatx * PIXELSIZE;
    const cheight = dimension * repeaty * PIXELSIZE;
    let selectedBox = null;

    canvas.attr('width', cwidth);
    canvas.attr('height', cheight);

    // let pColor = '#222244';
    // let ENABLED = true;
    // let FILLED = {};

    ctx.strokeStyle = 'rgba(0,0,0,0,25)';

    for(let i = 0; i < dimension * repeatx; ++i){
        if(i % dimension != 0) {continue;}

        x = i * PIXELSIZE;

        ctx.beginPath();
        ctx.moveTo(x,0);
        ctx.lineTo(x,cheight);
        ctx.stroke();

        y = i * PIXELSIZE;
        ctx.beginPath();
        ctx.moveTo(0,y);
        ctx.lineTo(cwidth, y);
        ctx.stroke();
    }

    canvas.mousemove(function(e){
        // console.log(e.offsetX, e.offsetY);
        let pixel = [Math.floor(e.offsetX / (PIXELSIZE * dimension)), Math.floor(e.offsetY / (PIXELSIZE * dimension))];
        if (pixel[0] < 0 || pixel[1] < 0 ||
            pixel[0] >= repeatx || pixel[1] >= repeaty) {
            return;
        }
        if(!selectedBox){
            selectedBox = $("<div id=selectedBox></div>");
            selectedBox.css({width: dimension * PIXELSIZE - 2 , height: dimension * PIXELSIZE - 2});
            $("#myCanvasWrapper").prepend(selectedBox);
        }
        let left = pixel[0] * PIXELSIZE * dimension + 1;
        let top = pixel[1] * PIXELSIZE * dimension;
        // left = top = 0;
        selectedBox.css({
            left: left,
            top: top
        });
        // console.log(e.offsetX, e.offsetY, pixel, left, top);

        // left: 0,
        // top: 0
    });

    canvas.click(function(e){
        selectBox(e);
    });

    let selected = 0;
    function selectBox(e) {
        if(selected) return;
        selected = 1;

        let pixel = [Math.floor(e.offsetX / (PIXELSIZE * dimension)), Math.floor(e.offsetY / (PIXELSIZE * dimension))];
        window.location = "drawing.php?x=" + pixel[0] + "&y=" + pixel[1];
    }
    
    $.each(alldata, function(key, val){
        let cell = key.split(",");
        jval = JSON.parse(val);
        $.each(jval, function(k2, color){
            let dot = k2.split(",");
            fillPixel(cell,dot,color);
        });

    });
    
    function fillPixel(cell, dot, color){
        console.log(cell, dot, color)
        let cx = parseInt(cell[0]);
        let cy = parseInt(cell[1]);
        let dx = parseInt(dot[0]);
        let dy = parseInt(dot[1]);
        ctx.fillStyle = color;
        let x = (cx * dimension + dx) * PIXELSIZE;
        let y = (cy * dimension + dy) * PIXELSIZE;
        ctx.fillRect(x,y,PIXELSIZE, PIXELSIZE );
    }
});