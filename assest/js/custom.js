onload = createCaptcha();
function createCaptcha() {
  //boş div oluşturuyoruz
  document.getElementById("captcha").innerHTML = "";
  //karakter kümesini oluşturuyoruz
  var charsArray =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var lengthOtp = 6;
  var captcha = [];
  for (var i = 0; i < lengthOtp; i++) {
    //aşağıdaki kod karakterin tekrarına izin vermez
    var index = Math.floor(Math.random() * charsArray.length + 1); //diziden sonraki karakteri al
    if (captcha.indexOf(charsArray[index]) == -1) {
      captcha.push(charsArray[index]);
    } else {
      i--;
    }
  }
  var canv = document.createElement("canvas");
  canv.id = "captcha";
  canv.width = 120;
  canv.height = 60;
  var ctx = canv.getContext("2d");
  ctx.font = "25px Georgia";
  ctx.textAlign = "center";
  ctx.strokeText(captcha.join(""), canv.width / 2, canv.height / 2);
  //captcha'yı saklıyoruz, böylece özel gereksinimlerinize göre başka bir yere kaydedip doğrulayabilirsiniz.
  code = captcha.join("");
  //console.log(code);
  document.getElementById("captcha").appendChild(canv); // tuvali captchanın içine ekliyoruz
}

//Kod doğrulama işlemi
function validateCaptcha() {
  event.preventDefault();
  console.log(document.getElementById("cpatchaTextBox").value);
  if (document.getElementById("cpatchaTextBox").value == code) {
    Swal.fire({
      title: "Başarılı!",
      text: "Kodunuz Doğru!",
      icon: "success",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Tamam",
    }).then((result) => {
      if (result.isConfirmed) {
        location.reload();
      }
    });
  } else {
    createCaptcha();
    Swal.fire({
      position: "center",
      icon: "error",
      title: "Doğrulama Kodu Yanlış!",
      text: "Lütfen Doğrulama Kodunu Doğru Giriniz!",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Tamam",
    }).then((result) => {
      if (result.isConfirmed) {
      }
    });
  }
}
