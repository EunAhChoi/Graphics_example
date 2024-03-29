
var gl;
var points;

window.onload = function init()
{
    var canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    
   var vertices = new Float32Array([
    0, 0.8, -0.4, 0.4, 0.4, 0.4, // leaf (3)
    0, 0.4, -0.4, 0, 0.4, 0, // leaf (3)
    0, 0, -0.4, -0.4, 0.4, -0.4,   // leaf (3)
    -0.1, -0.4, -0.1,-0.8, 0.1,-0.8,  // bottom (3)
    -0.1, -0.4, 0.1,-0.8, 0.1,-0.4  // bottom (3)
    ]);


    //  Configure WebGL

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );
    
    //  Load shaders and initialize attribute buffers
    
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
    
    // Load the data into the GPU
    
    var bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData( gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW );

    // Associate out shader variables with our data buffer
    
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    var fColor = gl.getUniformLocation(program, "fColor");

    gl.clear( gl.COLOR_BUFFER_BIT );
    
    // draw leaf
    gl.uniform4f(fColor, 0, 0.8, 0, 1);
    gl.drawArrays( gl.TRIANGLES, 0, 9 );

    // draw bottom (change color)
    gl.uniform4f(fColor, 0.6, 0.5, 0.0, 1);
    gl.drawArrays( gl.TRIANGLES, 9, 6 );
};

