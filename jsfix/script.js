 // Initialize Firebase
 var config= {
  apiKey: "AIzaSyBYVwVZUBLXSm7iR5Fp6k-dziJGEuhwExk",
  authDomain: "megaboth007.firebaseapp.com",
  databaseURL: "https://megaboth007.firebaseio.com",
  projectId: "megaboth007",
  storageBucket: "megaboth007.appspot.com",
  messagingSenderId: "942424390212",
  appId: "1:942424390212:web:c3622743b0fba57b5a1a11"
  
};
firebase.initializeApp(config);
var dbRef = firebase.database();
 


//membuat database untuk halaman login-----------------------------------------------------------------------------
    var database = firebase.database();
//menu 1------------------------------------------------------------------------------------------------------------

//melihat content
    //pembacaaan nilai value foto
 
      var baca_jarak = document.getElementById('jarak');
      var baca_asuhuc =document.getElementById('a_suhuc');
      var baca_asuhuf =document.getElementById('a_suhuf');
      var baca_suhuc =document.getElementById('suhuc');
      var baca_suhuf =document.getElementById('suhuf');
//waktu
      
var d = new Date();
var n = d.toLocaleDateString();
var a = d.toLocaleTimeString();
document.getElementById("waktu").innerHTML=n+" "+a;

      dbRef.ref("/Jarak").on('value', snap => baca_jarak.innerHTML= snap.val());
      dbRef.ref("/Ambientc").on('value', snap => baca_asuhuc.innerHTML= snap.val());
      dbRef.ref("/Ambientf").on('value', snap => baca_asuhuf.innerHTML= snap.val());
      dbRef.ref("/Suhuc").on('value', snap => baca_suhuc.innerHTML= snap.val());
      dbRef.ref("/Suhuf").on('value', snap => baca_suhuf.innerHTML= snap.val());

// Melakukan proses penambahan data
function addData_Proses() {

 // var id_add_proses = document.getElementById("nomor").innerHTML;
  var jarak = document.getElementById("jarak").innerHTML;
  var a_suhu_c = document.getElementById("a_suhuc").innerHTML;
  var a_suhu_f = document.getElementById("a_suhuf").innerHTML;
  var suhu_c= document.getElementById("suhuc").innerHTML;
  var suhu_f= document.getElementById("suhuf").innerHTML;

  var dbRef_add_proses = firebase.database();
  // Isikan data kedalam firebase
  //var statusAlat = dbRef_add_proses.ref("deteksi_wajah/" + id_add_proses);
  var statusAlat = dbRef_add_proses.ref("deteksi_wajah/" + a);
  statusAlat.set({
      //id: parseInt(id_add_proses),
      id: (a),
      jarak_deteksi:jarak,
      suhu_ambient_c:a_suhu_c,
      suhu_ambient_f:a_suhu_f,
      suhu_c:suhu_c,
      suhu_f:suhu_f,
  });
  setTimeout(function(){    window.location.assign("multi.html"); }, 15000);  
  }
  
