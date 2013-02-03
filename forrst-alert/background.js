/*
 *
 * @author Roberto Carlos García Luis rkgarcia@zonainter.org
 * @description Main file, with revision of notifications
 *
 */

var notificationsclicked = false;

if( localStorage.token != undefined ){
  if( localStorage.token.length > 5 ){
    check_notifications();
    setInterval( function(){check_notifications();} , 1000 * ( localStorage.frequency * 60) );
  }
}

function check_notifications(){
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function(data) {
    if (xhr.readyState == 4){
      if (xhr.status == 200){
        var items = JSON.parse( xhr.responseText );
        notifications = items.resp.items;
        if( notifications.length > 0 ){
          if( !notificationsclicked ){
            show();
          }
        }else{
          notificationsclicked = false;
        }
      }
    }
  }
  var url = 'https://forrst.com/api/v2/notifications?access_token='+localStorage.token;
  xhr.open( 'GET' , url , true );
  xhr.send();
}

function show() {
  var notification = window.webkitNotifications.createNotification(
    '48.png',
    'Forrst',
    'You have new notifications.'
  );
  notification.onclick = function(){
    notificationsclicked = true;
    window.open("http://forrst.com/feed?r=mb","forrstnotifications");
    notification.close();
  }
  notification.show();
}
