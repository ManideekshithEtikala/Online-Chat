const io=require('socket.io')(8000,{
    cors:{
        origin:'http://127.0.0.1:5500',
        credentials:true
    }
})
let users={}
io.on('connection',(socket)=>{
    socket.on("new-user-joined",(name)=>{
        users[socket.id]=name
        socket.broadcast.emit('user-joined',name)
    })
    socket.on("send",(message)=>{
        socket.broadcast.emit('recieve',{message:message,name:users[socket.id]})
    })
    // to handle if a user is disconnected
    socket.on('disconnect',(message)=>{
        socket.broadcast.emit("disconnected",users[socket.id])
        delete users[socket.id]
    })
})