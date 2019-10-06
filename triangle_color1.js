
var gl;
var points;

window.onload = function init()
{
    var canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    //position
    var vertices= new Float32Array([
        0, 0.7, -0.5, -0.3, 0.5, -0.3
        ]);

    //colors
    var colors = [
        vec4(1.0, 0.0, 0.0, 1.0),
        vec4(0.0, 1.0, 0.0, 1.0),
        vec4(0.0, 0.0, 1.0, 1.0)
    ]
    //  Configure WebGL

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0.0, 0.0, 0.0, 1.0 );
    
    //  Load shaders and initialize attribute buffers
    //---------------------------------------------------------------------
    var program1 = initShaders( gl, "vertex-shader", "fragment-shader1" );
    gl.useProgram( program1 );
    
    var vPosition_bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vPosition_bufferId );
    gl.bufferData( gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW );
    
    var vPosition = gl.getAttribLocation( program1, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    //---------------------------------------------------------------------
    var vColor_vertex_bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vColor_vertex_bufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW );

    var vColor= gl.getAttribLocation( program1, "vColor" );
    gl.vertexAttribPointer( vColor, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vColor );

    gl.clear( gl.COLOR_BUFFER_BIT );
    gl.drawArrays( gl.TRIANGLES, 0, 3 );


    // draw bottom (change color)
    //gl.uniform4f(fColor, 0.6, 0.5, 0.0, 1);
    //gl.drawArrays( gl.TRIANGLES, 9, 6 );
};

