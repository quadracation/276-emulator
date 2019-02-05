var Renderer= function(canvas, givenH, givenW, cellScalar){
    this.context = canvas.getContext("2d");                      //setting up our drawing plane
    this.canvas  = canvas;                                       //linking our current canvas to the used canvas
    
    this.height  = givenH;                                       //dimensions: Height property
    this.width   = givenW;                                       //dimensions: Width property
        
    this.scalar  = cellScalar;                                   //1px is too small. Used a scalar defined in index.html
    
};

Renderer.prototype.clearPix=function(){
    this.context.clearRect(0, 0,                                 //Start at <0,0> on our canvas plane
                           this.width*this.scalar,               //Clears entire rows    (wipe)
                           this.height*this.scalar);             //Clears entire columns (wipe)
};

Renderer.prototype.render=function(displayArray){                //pass in our displayArray from Chip8.js --> ... = Array(64 * 32);
    let x, y;
    let count = 0;
    this.clearPix();                                             //This will display a "glitching" effect, ...
                                                                 //...common with the CHIP-8 program. 
    for(let i = 0; i < displayArray.length; i++){  
        count++;                                                 // [ ...EXPLAINED BELOW... ]
        x = (i % this.width) * this.scalar;                      // . . .
        y = Math.floor(i / this.height) * this.scalar;           // . . .
        
                                                                 //Colour and fill in the pixel at the specified location
                                                                 //# R G B -> # 00 00 00; each R/G/B is 1-byte long (2 nibbles)
        this.context.fillStyle = ["#000000"][displayArray[i]];   //000000 = no reflected light -> black matter (black colour)
        this.context.fillRect(x,y, this.scalar, this.scalar);    //fillRext(xCord, yCord, xWidth, yHeight)
    }
    // console.log("AMOUNT OF PIXELS: " + count);

};

var Comments = function() {
/* . . .
[ EXPLANATION: Renderer.prototype.render=function(display){...} ]
X and Y are to be thought of as (X,Y) Coordinates for our pixel. Since it is tedious to save 
a pixel.png image and load it at every calculated location, we will manually draw it onto the screen.
In the below for-loop, it is important to note that 'display.length()' refers to the original image length, 
stored in a 1-D Array. This is important because of how it will control the math. 
--
Since our pixel is a square, we can set X and Y to either width or height (does not matter). 
PIXEL_SCALAR in index.html refers to the SCALAR that will resize each pixel cell(WxH) from 1x1 to SxS. 
Thus, we make both X and Y to be multiplied by the scalar.
--
For each iteration of the for-loop, X and Y are set to be the squared coordinates of the pixel with location relative
to the designated canvas (the only one). 
--
Why use 'Y = math.floor(...)'? It is because Math.floor(x) returns the largest SMALLER integer
possible. That is, for values such as (5 / 3) = 1.6667 will be rounded DOWNWARD to 1 (no doubles allowed!). 
--
For example, we have a 3x3 image block we wish to draw onto. That means that the original image has a length=9 (3*3). 
Keep in mind that JavaScript handles 1-D arrays better than 2-D. That implies that as we iterate, we have the following values
(without the scalar):
--
--
    [ i = 0 ; length = 9 ]                   [ i = 1; length = 9 ]               [ i = 2; length = 9 ]
    X = (0 % 3) = 0                          X = (1 % 3) = 1                     X = (2 % 3) = 2
    Y = (0 / 3) = 0 (thus: <0,0>)            Y = (1 / 3) = 0 (thus: <1,0>)       Y = (2 / 3) = 0 (thus: <2,0>)
    
    [ i = 3 ; length = 9 ]                   [ i = 4; length = 9 ]               [ i = 5; length = 9 ]
    X = (3 % 3) = 0                          X = (4 % 3) = 1                     X = (5 % 3) = 2
    Y = (3 / 3) = 1 (thus: <0,1>)            Y = (4 / 3) = 0 (thus: <1,1>)       Y = (5 / 3) = 1 (thus: <2,1>)
    [ i = 6 ; length = 9 ]                   [ i = 7; length = 9 ]               [ i = 8; length = 9 ]
    X = (6 % 3) = 0                          X = (7 % 3) = 1                     X = (8 % 3) = 2
    Y = (6 / 3) = 2 (thus: <0,2>)            Y = (7 / 3) = 2 (thus: <1,2>)       Y = (8 / 3) = 2 (thus: <2,2>)
    
    DRAWS:
    <0,0>  <1,0>  <2,0>               |  |  |           [  ][  ][  ]
    <0,1>  <1,1>  <2,1>  -->(locate)  |  |  | -->(fill) [  ][  ][  ] (a 3x3 block of black pixels)
    <0,2>  <1,2>  <2,2>               |  |  |           [  ][  ][  ]
    
*/
}
