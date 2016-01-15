/**
 * Created by ihjn on 01.01.2016.
 */
var VSHADER_SOURCE =
    'attribute vec4 a_Position;\n' +
    'uniform mat4 u_xformMatrix;\n' +
    'void main() {\n' +
    'gl_Position = u_xformMatrix * a_Position;\n' +
    '}\n';

var FSHADER_SOURCE =
    'void main() {\n' +
    '  gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n' +
    '}\n';

function main()
{
    var canvas = document.getElementById('webgl');
    var gl = getWebGLContext(canvas);
    if (!gl) {
        console.log('Failed to get the rendering context for WebGL');
        return;
    }

    if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
        console.log('Failed to intialize shaders.');
        return;
    }

    var rotationMatrix = new Matrix4();
    var lastMouseX = 0;
    var lastMouseY = 0;
    var deltaX = 0;
    var deltaY = 0;
    var flag = 0;

    var u_xformMatrix = gl.getUniformLocation(gl.program, 'u_xformMatrix');
    gl.uniformMatrix4fv(u_xformMatrix, false, rotationMatrix.elements);


    canvas.addEventListener("mousedown", function(e){
        flag = 1;
    }, false);
    canvas.addEventListener("mousemove", function(e){
        if (flag == 1) {
            console.log("move");
            deltaX = e.clientX - lastMouseX;
            deltaY = e.clientY - lastMouseY;
            lastMouseX = e.clientX;
            lastMouseY = e.clientY;

            rotationMatrix.rotate(deltaX/2, 1, 0, 0);
            rotationMatrix.rotate(deltaY/2, 0, 1, 0);
            gl.uniformMatrix4fv(u_xformMatrix, false, rotationMatrix.elements);
            gl.clearColor(0, 0, 0, 1);
            gl.clear(gl.COLOR_BUFFER_BIT);
            gl.drawArrays(gl.LINE_STRIP, 0, 400);

        }

    }, false);
    canvas.addEventListener("mouseup", function(e){
        var lastMouseX = 0;
        var lastMouseY = 0;
        var deltaX = 0;
        var deltaY = 0;
        flag = 0;
    }, false);


    var n = initVertexBuffers(gl);
    if (n < 0) {
        console.log('Failed to set the positions of the vertices');
        return;
    }

    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);

    //Создаем слайдеры

    var s1_val = 1, s2_val = 1, s3_val = 1, s4_val = 1, s5_val = 1;
    $( "#slider1" ).slider({
        value: 1,
        min:1,
        step: 1,
        max:100,
        slide:function(event, ui)
        {
            s1_val = $('#slider1').slider("option", "value");
            gl.clearColor(0, 0, 0, 1);
            gl.clear(gl.COLOR_BUFFER_BIT);
            drawCurve(gl, s1_val, s2_val, s3_val, s4_val, s5_val);
            console.log(s1_val);


        }
    });

    $( "#slider2" ).slider({
        value: 1,
        min:1,
        step: 1,
        max:100,
        slide:function(event, ui)
        {
            s2_val = $('#slider2').slider("option", "value");
            gl.clearColor(0, 0, 0, 1);
            gl.clear(gl.COLOR_BUFFER_BIT);
            drawCurve(gl, s1_val, s2_val, s3_val, s4_val, s5_val);
            console.log(s2_val);


        }
    });

    $( "#slider3" ).slider({
        value: 1,
        min:1,
        step: 1,
        max:100,
        slide:function(event, ui)
        {
            s3_val = $('#slider3').slider("option", "value");
            gl.clearColor(0, 0, 0, 1);
            gl.clear(gl.COLOR_BUFFER_BIT);
            drawCurve(gl, s1_val, s2_val, s3_val, s4_val, s5_val);
            console.log(s3_val);


        }
    });

    $( "#slider4" ).slider({
        value: 1,
        min:1,
        step: 1,
        max:100,
        slide:function(event, ui)
        {
            var s4_val = $('#slider4').slider("option", "value");
            gl.clearColor(0, 0, 0, 1);
            gl.clear(gl.COLOR_BUFFER_BIT);
            drawCurve(gl, s1_val, s2_val, s3_val, s4_val, s5_val);
            console.log(s4_val);


        }
    });

    $( "#slider5" ).slider({
        value: 1,
        min:1,
        step: 1,
        max:100,
        slide:function(event, ui)
        {
            s5_val = $('#slider5').slider("option", "value");
            gl.clearColor(0, 0, 0, 1);
            gl.clear(gl.COLOR_BUFFER_BIT);
            drawCurve(gl, s1_val, s2_val, s3_val, s4_val, s5_val);
            console.log(s5_val);


        }
    });


    drawCurve(gl, 1 ,1, 1, 1, 1);

}

function drawCurve(gl, a, b, c, d, t)
{
    var scale = 600;
    var prevArr = calculateCurve(0, a, b, c, d, scale);
    var arr = [];
    var i;
    for (i=1; i<=100; i=i+0.2)
    {
        arr.push.apply(arr, calculateCurve(i, a, b, c, d, scale));
    }
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(arr), gl.STATIC_DRAW);
    gl.drawArrays(gl.LINE_STRIP, 0, 450);
    console.log("begin\n");
    console.log(arr);
}

function initVertexBuffers(gl) {
    var n = 3; // The number of vertices

    // Create a buffer object
    var vertexBuffer = gl.createBuffer();
    if (!vertexBuffer) {
        console.log('Failed to create the buffer object');
        return -1;
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

    var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    if (a_Position < 0) {
        console.log('Failed to get the storage location of a_Position');
        return -1;
    }
    gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(a_Position);

    return n;
}


