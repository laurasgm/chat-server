//En palabras simples, este sera el servidor


const express = require('express');
const app = express();

const path = require('path');//para hacer el join entre la direccion raiz de la carpeta y su subcarpeta public

//settings
app.set('port', process.env.PORT || 3000);//tome el puerto que esta configurado en el SO sino tome el 3000


//static file: lo que esta en la carpeta public el html y css
app.use(express.static(path.join(__dirname, 'public' )));
// si en el localhost:3000 sale cannot/GET esta diciendo que nuestro servidor no tiene rutas configuradas



//inicializamos el servidor y se lo pasamos arriba a socketIO (este necesita ese servidor ya inicializado)
const server = app.listen(app.get('port'), () =>{
    console.log('server on port', app.get('port'))
});


//websockets
//cuando alguien se conecte vamos a iniciar el codigo
const socketIO = require('socket.io');
const io = socketIO(server);

// cuando haya una conexion haga esto
io.on('connection', (socket) => {
    console.log("new connection", socket.id);

    //recibe el mensaje del cliente y emite el data a todos
    socket.on('chat:message', (data) =>{
        io.sockets.emit('chat:message', data)//-1-(ver en chat.js)
    });

    //recibe el typing del teclado desde el cliente y emite a todos menos al propio (por eso broadcast)
    socket.on('chat:typing', (data) =>{
        socket.broadcast.emit('chat:typing', data);//-2-(ver en chat.js)
    });
});









