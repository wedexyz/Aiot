function play(audioId) {
    $('#audio-' + audioId)[0].play();
    }
function pause(audioId) {
        $('#audio-' + audioId)[0].pause();
      
        }
//notifikasi objek detectioon
function activate() {
  play('activated');
      }
//notifikasi testimoni
function persiapan() {
        play('persiapan');
            }
    //notifikasi baik
function ta() {
    play('ta');
        }  
//notifikasi buruk
function tb() {
    play('tb');
        }
function fire() {
    play('fire');
                }       