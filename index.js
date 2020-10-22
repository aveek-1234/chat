var io= require('socket.io')( 'process.env.PORT' || '8000');
var users ={};
io.on('connection',socket=>{
    socket.on('new-user-joined',name=>{
        console.log("New user ",name)
        users[socket.id]=name;
        socket.broadcast.emit('User-Joined',name)
    })
    socket.on('send',message=>{
        socket.broadcast.emit('recieve',{message:message,name:users[socket.id]})
    });
    socket.on('disconnect',message=>{
        socket.broadcast.emit('left',users[socket.id]);
        delete users[socket.id];
    });
})
