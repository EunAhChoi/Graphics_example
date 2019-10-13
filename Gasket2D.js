
var gl;
var points = [];

window.onload = function init()
{
    var canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }
    
    // leaf
    //var vertices = new Float32Array([ ])
    
    var NumTimesToSubdivide = 5;

    var vertices = [
        vec2 (-1, -1),
        vec2 (0, 1),
        vec2 (1, -1)
    ];

    divideTriangle (vertices[0], vertices[1], vertices[2], NumTimesToSubdivide)
 
 
    //  Configure WebGL
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );
 
    //  Load shaders and initialize attribute buffers
    var program = initShaders( gl, "vertex-shader", "fragment-shader1" );
    gl.useProgram( program );
    

    var vPosition_bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vPosition_bufferId );


    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    var fColor = gl.getUniformLocation(program, "fColor");

    // --------- 그리기
    gl.clear( gl.COLOR_BUFFER_BIT );

    gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW );
    gl.uniform4f (fColor, Math.random(), Math.random(), Math.random(), 1);

    gl.drawArrays(gl.TRIANGLES, 0, points.length);

};

function triangle (a, b, c){
    points.push (a,b,c);
}

function divideTriangle(a, b, c, count){

    if (count==0){
        triangle(a, b, c);
    }
    else{
        var ab = mix(a, b, 0.5);
        var ac = mix(a, c, 0.5);
        var bc = mix(b, c, 0.5);

        divideTriangle(a, ab, ac, count-1);
        divideTriangle(c, ac, bc, count-1);
        divideTriangle(b, bc, ab, count-1);
    }
}