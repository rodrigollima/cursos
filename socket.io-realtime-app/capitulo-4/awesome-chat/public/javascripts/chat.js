var chatInfra = io.connect('/chat_infra'),
    chatCom   = io.connect('/chat_com');

var roomName = decodeURI(
    (RegExp("room" + '=' + '(.+?)(&|$)').exec(location.search)  || [, null])[1]
);


if (roomName) {
    chatInfra.emit('join_room', {'name':roomName});
    chatInfra.on("name_set", function (data) {
   // chatInfra.emit('join_room',{'name':roomName});
 
    chatInfra.on("user_entered", function (user) {
        $('#messages').append('<div class="systemMessage">' + user.name + ' has joined the rom.</div>');
    });

    chatInfra.on('message', function (message) {
        var message = JSON.parse(message);
	$('#messages').append('<div class="'+ message.type + '">' + message.message + '</div>');
    });

    chatCom.on('message', function (message) {
        var message = JSON.parse(message);
	$('#messages').append('<div class="' + message.type + '"><span class="name">' + message.username + ': </span>' +message.message + '</div>');
    });

    $('#nameForm').hide();
    $('.popup').hide();
    $('#messages').append('<div class="systemMessage">Hello ' + data.name + '</div>');

    $('#send').click(function() {
        var data = {
	    message:$('#message').val(),
	    type:'userMessage'
	};
        chatCom.send(JSON.stringify(data));
	$('#message').val();
    });
});
}

$(function () {
    $('#setname').click(function () {
        chatInfra.emit("set_name", {name:$('#nickname').val()});
    });
});

/*
var socket = io.connect('/');

socket.on('message', function (data) {
    data = JSON.parse(data);
    if (data.username) {
	$('#messages').append('<div class="'+data.type+ '"><span class="name">' + 
					     data.username + ":</span> " + 
					     data.message + '</div>');
    } else {
        $("#messages").append('<div class="'+data.type+'">' +data.message+ '</div>');
    }
});

socket.on('name_set', function(data) {
    $('#nameform').hide();
    $('.popup').hide();
    $('#messages').append('<div class="systemMessage">' + 'Hello '+data.name+'</div>');
});

socket.on('user_entered', function(user) {
    $('#messages').append('<div class"systemMessage">' + user.name + ' has joined the room.</div>');
});

$(function() {
    $("#send").click(function() {
	var data = {
	    message : $('#message').val(),
	    type: 'userMessage'
 	};

	socket.send(JSON.stringify(data));
	$('#message').val('');
    });

    $('#setname').click(function() {
        socket.emit('set_name', {name:$('#nickname').val()});
    });
});
*/
