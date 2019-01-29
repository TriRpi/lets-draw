var config = require(__dirname + '/config');
var express = require('express');

var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(config.port);

app.use(express.static(__dirname + '/public'));
app.get('/', function (req, res) {
    res.sendfile(__dirname + '/public/index.html');
});

console.log(' * Running on http://' + config.server + ':' + config.port.toString());

io.sockets.on('connection', function (socket) {
    console.log('[*] info: new connection ' + socket.id);
    client_setting = {
        thickness: 30,
        color: [255,255,255]
    };

    socket.on('mouse', function (data) {
        all_data = {
            x: data.x,
            y: data.y,
            color: client_setting.color,
            thickness: client_setting.thickness
        }
        socket.broadcast.emit('mouse', all_data);
    });
    socket.on('changeSlider', function (data) {
        if (data.thickness <= 50) {
            client_setting = {
                thickness: data.thickness,
                color: data.color
            };
        }
    });
});
