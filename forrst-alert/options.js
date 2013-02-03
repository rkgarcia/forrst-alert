/*
 *
 * @author Roberto Carlos García Luis rkgarcia@zonainter.org
 * @description Help with settings
 *
 */

var options;

window.addEventListener('load', function() {
  options = document.forms.options;
  console.log( options );
  if( localStorage.username != undefined ){
    options.frequency.value = localStorage.frequency;
    options.username.value = localStorage.username;
    options.token.value = (localStorage.token.length > 5 ) ? 'Authenticated' : 'Invalid';
  }
  options.username.onchange = function(){
    var password = prompt("Please type your password (showed during typing). This password is not saved.");
    validate_account( options.username.value , password );
  }
  options.frequency.onchange = function() {
    localStorage.frequency = options.frequency.value;
  };
});

function validate_account( user , password ){
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function(data) {
    if (xhr.readyState == 4){
      if (xhr.status == 200){
        result = JSON.parse( xhr.responseText );
        localStorage.username = options.username.value;
        localStorage.token = result.resp.token;
        window.location.reload();
      } else {
        localStorage.clear;
        options.username.value = '';
        alert( 'Your credentials are invalid, please retry' );
      }
    }
  }
  var url = 'https://forrst.com/api/v2/users/auth';
  xhr.open( 'POST' , url , true );
  xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
  xhr.send( 'email_or_username=' + user + '&password=' + password );
}
