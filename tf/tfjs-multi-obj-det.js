
var model
var video 
var localstream


//console.log('loading coco-ssd model...')
cocoSsd.load().then(function(res){
model = res
//console.log('done')
document.getElementById("model").value="model berhasil didownload";
});

function drawVideoPredictions(predictions){
    const c = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
   // c.width = 700;
   // c.height = 500;
    c.width = 300;
    c.height = 200;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.drawImage(video, 0, 0, ctx.canvas.width, ctx.canvas.height);
    

    // Font options.
    const font = "16px sans-serif";
    ctx.font = font;
    ctx.textBaseline = "top";

    predictions.forEach(prediction => {
     var x = prediction.bbox[0];
     var y = prediction.bbox[1];
     var width = prediction.bbox[2];
     var height = prediction.bbox[3];
      //deteksi object batas----------------------
      var str = (prediction.class)
      var res = str.valueOf();
      document.getElementById("myInput").value=res;
     

    

      //memindahkan url
     // setTimeout(function(){  location.replace("jajal.html"); }, 5000);  

      // Draw the bounding box.
      ctx.strokeStyle = "#00FFFF";
      ctx.lineWidth = 4;
      ctx.strokeRect(x, y, width, height);

      // Draw the label background.
      ctx.fillStyle = "#00FFFF";
      const textWidth = ctx.measureText(prediction.class).width;
      const textHeight = parseInt(font, 10); // base 10
      ctx.fillRect(x, y, textWidth + 4, textHeight + 4);
      ctx.fillStyle = "#000000";
      ctx.fillText(prediction.class, x, y);

      document.getElementById('lebar').value 	= width.toFixed(0);
      document.getElementById('tinggi').value	= height.toFixed(0);
  
        
      if(res== "Manusia"){
        setTimeout(function(){ activate()
          document.getElementById("myInput").value="";
        }, 3000); 
 
    } 
       
    

    
      
      
  
    });



}

function detectFrame() {
    model.detect(video).then(predictions => {
        drawVideoPredictions(predictions)
       
        if(video.srcObject.active){
            requestAnimationFrame(detectFrame)
        
        }
    })
  }

function load_webcam(){
    video = document.getElementById("Video")
    navigator.mediaDevices.getUserMedia(
      {audio:false,
        video: {
          facingMode: "user",
        //  width: 700,
         // height: 500
          width: 300,
          height: 200

        }
      })
      .then(stream => {
        video.srcObject = stream
        localstream = stream
        video.onloadedmetadata = () => {
          video.play()
          detectFrame()
        
          
        }
      })
      
}



