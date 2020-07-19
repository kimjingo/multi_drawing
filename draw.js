$(document).ready(function(){
    let canvas = $("#mycanvas");
    let ctx = canvas.get(0).getContext("2d");
    const dimension = 25;
    const cwidth = canvas.width();
    const cheight = canvas.height();
    const PIXELSIZE = cwidth / dimension;
    let pColor = '#222244';
    let ENABLED = true;
    // let FILLED = {};

    ctx.strokeStyle = 'rgba(0,0,0,0,1)';

    for(let i = 0; i < dimension; ++i){
        x = Math.floor(i * cwidth / dimension);
        ctx.beginPath();
        ctx.moveTo(x,0);
        ctx.lineTo(x,cheight);
        ctx.stroke();

        y = Math.floor(i * cheight / dimension);
        ctx.beginPath();
        ctx.moveTo(0,y);
        ctx.lineTo(cwidth, y);
        ctx.stroke();
    }

    canvas.on('mousemove touchmove touchstart mousedown', mouseFill);
    function mouseFill(e) {
        e.preventDefault();
        if(!ENABLED) return;

        if(e.which !=1) return;

        let offsetX = e.offsetX;
        let offsetY = e.offsetY;

        pixel = [Math.floor(offsetX / PIXELSIZE), Math.floor(offsetY / PIXELSIZE)];
        console.log(pColor);
        fillPixel(pixel);
    }

    function fillPixel(pixel, colr=pColor){
        let key = pixel[0] + "," + pixel[1];
        console.log(key, colr, pColor);
        FILLED[key] = colr;
        ctx.fillStyle = colr;
        ctx.fillRect(pixel[0] * PIXELSIZE, pixel[1] * PIXELSIZE, PIXELSIZE -1, PIXELSIZE -1)
    }
    // Simple example, see optional options for more configuration.
    const pickr = Pickr.create({
        el: '.color-picker',
        theme: 'classic', // or 'monolith', or 'nano'

        swatches: [
            'rgba(244, 67, 54, 1)',
            'rgba(233, 30, 99, 0.95)',
            'rgba(156, 39, 176, 0.9)',
            'rgba(103, 58, 183, 0.85)',
            'rgba(63, 81, 181, 0.8)',
            'rgba(33, 150, 243, 0.75)',
            'rgba(3, 169, 244, 0.7)',
            'rgba(0, 188, 212, 0.7)',
            'rgba(0, 150, 136, 0.75)',
            'rgba(76, 175, 80, 0.8)',
            'rgba(139, 195, 74, 0.85)',
            'rgba(205, 220, 57, 0.9)',
            'rgba(255, 235, 59, 0.95)',
            'rgba(255, 193, 7, 1)'
        ],

        components: {

            // Main components
            preview: true,
            opacity: true,
            hue: true,

            // Input / output Options
            interaction: {
                hex: true,
                rgba: true,
                hsla: true,
                hsva: true,
                cmyk: true,
                input: true,
                clear: true,
                save: true
            }
        }
    });
    pickr.on('change', function(){
        // window.myColor = pickr;
        pColor = pickr.getColor().toHEXA().toString();
    
    });

    pickr.on('init', instance => {
        // console.log('init', instance);
        pickr.setColor(pColor);
    }).on('hide', instance => {
        console.log('hide', instance);
        setTimeout(function(){
            ENABLED = true;
        },300);
    }).on('show', (color, instance) => {
        // console.log('show', color, instance);
        ENABLED = false;
    }).on('save', (color, instance) => {
        // console.log('save', color, instance);
    }).on('clear', instance => {
        // console.log('clear', instance);
    }).on('change', (color, instance) => {
        // console.log('change', color, instance);
    }).on('changestop', instance => {
        // console.log('changestop', instance);
    }).on('cancel', instance => {
        // console.log('cancel', instance);
    }).on('swatchselect', (color, instance) => {
        // console.log('swatchselect', color, instance);
    });

    window.save = function(x,y){
        var data = {};
        data.x = x;
        data.y = y;
        data.data = FILLED ;

        $.post('drawing.php?submit=1', data, function(rsp){
            $('body').append(rsp);
        });

    }
    $.each(FILLED, function(key, val){
        let pixel = key.split(',');
        fillPixel(pixel, val);
    });
});