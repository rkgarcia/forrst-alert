/*
 *
 * @author Roberto Carlos García Luis rkgarcia@zonainter.org
 * @description Main file, with revision of notifications
 *
 */

var nNotif = 0;

if( localStorage.token != undefined ){
  if( localStorage.token.length > 5 ){
    if( localStorage.frequency == undefined ){
      localStorage.frequency = 5;
    }
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
        likes = notifications.like;
        comments = notifications.new_comment;
        replies = notifications.comment_reply;
        var count = 0;
        for ( notif in likes ){count++;}
        var nLikes = count;
        for ( notif in comments ){count++;}
        var nComment = count - nLikes;
        for ( notif in replies ){count++;}
        nReplies = count - nComment - nLikes;
        if( count > 0 ){
          show('You have ' + count + ' notifications. Likes: '+ nLikes + ' Comments: ' + nComment + ' Replies: ' + nReplies );
        }
      }
    }
  }
  var url = 'https://forrst.com/api/v2/notifications?access_token='+localStorage.token;
  xhr.open( 'GET' , url , true );
  xhr.send();
}

function show( data ) {
  if( nNotif < 1 ){
    nNotif = 1;
    var notification = window.webkitNotifications.createNotification(
      'img/48.png',
      'Forrst',
      data
    );
    notification.onclick = function(){
      nNotif = 0;
      window.open("http://forrst.com/feed?r=mb","forrstnotifications");
      notification.close();
    }
    notification.onclose = function(){
      nNotif = 0;
    }
    notification.show();
  }
}
