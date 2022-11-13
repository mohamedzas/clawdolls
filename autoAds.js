var adsShown = false;
let xNum = 0;
setInterval(
function(){
    var canvas = document.getElementsByTagName("canvas")[document.getElementsByTagName("canvas").length-1];
    var context = canvas.getContext('webgl', {preserveDrawingBuffer: true}) || canvas.getContext('webgl2', {preserveDrawingBuffer: true});;
    var pixelR, pixelG, pixelB, pixelA;   

    // ***** SET VALUES HERE *********\\
    var detected = [[20,13,16],[255,122,198]];
    //********************************\\
    
    if(context != null){
        var pixels = new Uint8Array(
            4 * context.drawingBufferWidth * context.drawingBufferHeight
        );
        context.readPixels(
            0,
            0,
            context.drawingBufferWidth,
            context.drawingBufferHeight,
            context.RGBA,
            context.UNSIGNED_BYTE,
            pixels
        );
        var x = 0, y = 0;
        // And here's components of a pixel on (x, y):
        pixelR = pixels[4 * (y * context.drawingBufferWidth + x)];
        pixelG = pixels[4 * (y * context.drawingBufferWidth + x) + 1];
        pixelB = pixels[4 * (y * context.drawingBufferWidth + x) + 2];
        pixelA = pixels[4 * (y * context.drawingBufferWidth + x) + 3];
        console.log("WEBGL");
        
    }else
    {
        context = canvas.getContext('2d');
        var pixels = context.getImageData(0, 0, 1, 1).data;
        pixelR = pixels[0];
        pixelG = pixels[1];
        pixelB = pixels[2];
        pixelA = pixels[3];
        console.log("2D");
        
    }
    for(var i = 0; i < detected.length; i++){
        if(Math.abs(pixelR - detected[i][0]) < 8
        && Math.abs(pixelG - detected[i][1]) < 8
        && Math.abs(pixelB - detected[i][2]) < 8)
        {
            if(!adsShown)
            { 
                if (xNum == 3){
                    setTimeout(function()
                    {
                       window.location.href = "html5player://showInterstitial"
                    }, 500);
                    adsShown = true;
                    xNum = 0;
                } else { 
                    xNum = xNum + 1;
                    console.log("Showing Ad after: ", 3-xNum , " Times");
                }
                
            }
        }
    }
    adsShown = false;
    for(var i = 0; i < detected.length; i++){
        if(Math.abs(pixelR - detected[i][0]) < 8
        && Math.abs(pixelG - detected[i][1]) < 8
        && Math.abs(pixelB - detected[i][2]) < 8)
        {
            adsShown = true;
            break;
        }
    }
    console.log(pixelR + ' ' + pixelG + ' ' + pixelB + ' ' + pixelA);

}, 2000);