
var canvas;
var gl;

var theta = 0.0;
var thetaLoc;

var delay =1000;
var direction = true;

window.onload = function init()
{
    var canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }
    

    var program = initShaders( gl, "vertex-shader", "fragment-shader1" );
    gl.useProgram( program );

    var vertices = [
        vec2(  0,  1 ),
        vec2(  -1,  0 ),
        vec2( 1,  0 ),
        vec2(  0, -1 )
    ];

    // Load the data into the GPU
    var bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW );
 
    // Associate out shader variables with our data buffer
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
 
    thetaLoc = gl.getUniformLocation( program, "theta" );


    this.document.getElementById("Direction").onclick = function(){
        direction = !direction;
    }


    this.document.getElementById("Controls").onclick = function(){
        switch(event.target.index){
            case 0:
                direction = !direction;
                break;
            case 1:
                delay /= 2;
                break;
            case 2:
                delay *= 2;
                break;
        }
    }


    window.onkeydown = function(event){
        var key = String.fromCharCode(event.keyCode);
        switch(key){
            case '1': 
                direction = !this.direction;
                break;
            case '2':
                delay /= 2;
                break;
            case '3':
                delay *= 2;
                break;
        }
    }



    render();
};
function render() {

    gl.clear( gl.COLOR_BUFFER_BIT );

    theta += (direction? 0.1: -0.1);
    gl.uniform1f( thetaLoc, theta );

    gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4 );

    setTimeout(
        function(){
            window.requestAnimFrame(render);
        }, delay
    );
}