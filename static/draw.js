var canvas = document.getElementById("canvas")
var context = canvas.getContext("2d")

var prevx, prevy, currx, curry;
var draw = false;

context.lineJoin = "round";
context.lineWidth = 20;

$("#canvas").mousedown(function (e) {
    prevx = e.pageX - this.offsetLeft;
    prevy = e.pageY - this.offsetTop;

    drawLine(prevx, prevy, prevx + 1, prevy + 1);

    draw = true;
});

$("#canvas").mousemove(function (e) {
    if (draw) {
        currx = e.pageX - this.offsetLeft;
        curry = e.pageY - this.offsetTop;

        drawLine(prevx, prevy, currx, curry);

        prevx = currx;
        prevy = curry;
    }
});

$("canvas").mouseup(function () {
    draw = false;
});

$("canvas").mouseout(function () {
    draw = false;
});


function drawLine(x1, y1, x2, y2) {

    context.beginPath();

    context.moveTo(x1, y1);
    context.lineTo(x2, y2);

    context.closePath();
    context.stroke();

}

function clears() {
    context.clearRect(0, 0, canvas.width, canvas.height);
}

function predicts(){
    var data = canvas.toDataURL();
    
    $.ajax({
        type: "POST",
        url: "http://127.0.0.1:5000/process_image",
        data:{
          imageBase64: data
        },
        success: function(reply){
            $("body").append(reply);
        }
      })
}
