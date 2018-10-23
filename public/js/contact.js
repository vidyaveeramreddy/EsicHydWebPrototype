document.getElementById('send-msg').addEventListener('click',function(){

});

function _(id){
  return document.getElementById(id);
}

function rotc(str) {
  var input = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890';
  var output = 'NOPQRSTUVWXYZABCDEFGHIJKLMnopqrstuvwxyzabcdefghijklm0987654321';
  var index = x => input.indexOf(x);
  var translate = x => index(x) > -1 ? output[index(x)] : x;
  return str.split('').map(translate).join('');
}

function sendEmail() {
  var name = _("name-msg").value;
  var email = _("email-msg").value;
  // var email1 = _("email").value;
  var subject = _("subject-msg").value;
  var message = _("message-msg").value;
  var err = _('err-msg');


  if (name == null || name == "") {
    err.style.color = "red";
    err.innerHTML = "<strong>Please enter your name</strong>";
  }
  if (email == null || email == "") {
    err.style.color = "red";
    err.innerHTML = "<strong>Please enter your email</strong>";
  }
  if (subject == null || subject == "") {
    err.style.color = "red";
    err.innerHTML = "<strong>Please enter your subject number</strong>";
  }
  if (message == null || message == "") {
    err.style.color = "red";
    err.innerHTML = "<strong>Please enter your message</strong>";
  }

  if (name != null && name != "") {
    if (email != null && email != "") {
      if (subject != null && subject != "") {
        if (message != null && message != "") {
          var formattedBody = "Name: " + name + "\n" + "subject: " + subject + "\n" + "Email: " + email + "\n\n" + "Message: " + message;
          _("send-msg").disabled = true;
          var ms= message.replace(/(\r\n|\n|\r)/gm, '%0D%0A');
          var ms1 = message.replace(/\n/g,'<br/>');
          console.log(ms);
          $.post("/send?n=" + rotc(name) + "&e=" + rotc(email) + "&s=" + rotc(subject) + "&m=" + ms1).then(function () {
            alert("Successfully sent message!");
            window.location = "/";

          }).fail(function () {
            alert("Error encountered while sending message");
          });


        } else {
          _("body-form-info").style.color = "red";
          _("body-form-info").innerHTML = "<strong>Please enter your message</strong>";
        }
      } else {
        _("subject-form-info").style.color = "red";
        _("subject-form-info").innerHTML = "<strong>Please enter your subject number</strong>";
      }
    } else {
      _("email-form-info").style.color = "red";
      _("email-form-info").innerHTML = "<strong>Please enter your email</strong>";
    }
  } else {
    _("name-form-info").style.color = "red";
    _("name-form-info").innerHTML = "<strong>Please enter your name</strong>";
  }

}
_("send-msg").addEventListener('click', function () {
  sendEmail();
  // alert('hey');
  

});
