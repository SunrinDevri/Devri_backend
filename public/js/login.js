var login_btn = document.getElementsByClassName('login')[0];
login_btn.addEventListener('click', login, false);

function login() {
  var form = document.createElement("form");
  var pin = document.createElement("input");
  var code = document.createElement("input");

  form.setAttribute("method", "post");
  form.setAttribute("action", "./");

  pin.setAttribute("name", "pin");
  pin.setAttribute("value", document.getElementById("pin").value);

  code.setAttribute("name", "code");
  code.setAttribute("value", document.getElementById("code").value);

  form.appendChild(pin);
  form.appendChild(code);

  form.sumbit();
}
