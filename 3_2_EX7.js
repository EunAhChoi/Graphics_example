
var gl;
var points;

window.onload = function init()
{
    var canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }
    
    // leaf
    //var vertices = new Float32Array([ ])
    var vertices = [    ]
 
 
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
    
    
    var sq_x;
    var sq_y;
    var width;
    var height;
    

    for (var i = 0; i<50; ++i){
        
        sq_x = Math.random()*2 -1; 
        sq_y = Math.random()*2 -1;
        width = Math.random()*2 -1;
        height = Math.random()*2 -1;


        vertices =[ 
            vec2(sq_x,sq_y),
            vec2((sq_x+width), sq_y),
            vec2(sq_x, (sq_y-height)),
            vec2((sq_x+width), sq_y),
            vec2(sq_x, (sq_y-height)),
            vec2((sq_x+width), (sq_y-height))
        ]

        gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW );
        gl.uniform4f (fColor, Math.random(), Math.random(), Math.random(), 1);

        gl.drawArrays(gl.TRIANGLES, 0, 6);
    }










};


/**
 * 
 * 
    // 오두막 
    gl.bufferData( gl.ARRAY_BUFFER, vertices_hut, gl.STATIC_DRAW );

    // 기둥
    gl.uniform4f(fColor,0.71, 0.3, 0.05, 1.0);
    gl.drawArrays( gl.TRIANGLES, 0, 12 );

    // 지붕 
    gl.uniform4f(fColor,0.81, 0.4, 0.05, 1.0);
    gl.drawArrays( gl.TRIANGLES, 12, 3 );

    // 가운데 
    gl.uniform4f(fColor,0.51, 0.2, 0.05, 1.0);
    gl.drawArrays( gl.TRIANGLES, 15, 12 );
    
    //나무 밑동
    gl.bufferData( gl.ARRAY_BUFFER, vertices_bottom, gl.STATIC_DRAW );
    gl.drawArrays( gl.TRIANGLES, 0, 12 );

    // --------- Program 2 ---------- (그라데이션)
    var program2 = initShaders( gl, "vertex-shader", "fragment-shader2" );
    gl.useProgram( program2 );

    var vPosition = gl.getAttribLocation( program2, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    // color buffer 생성
    var vColor_vertex_bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vColor_vertex_bufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(colors_leaf), gl.STATIC_DRAW );

    var vColor= gl.getAttribLocation( program2, "vColor" );
    gl.vertexAttribPointer( vColor, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vColor );

    // 그리기  

    gl.bindBuffer( gl.ARRAY_BUFFER, vPosition_bufferId );
    gl.bufferData( gl.ARRAY_BUFFER, vertices_leaf, gl.STATIC_DRAW );

    gl.drawArrays( gl.TRIANGLES, 0, 18 );

 */

