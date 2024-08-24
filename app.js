const express= require('express')
const app =express();
const socketIo=require('socket.io');
const http=require('http');
const path = require('path');
const server=http.createServer(app);
const io=socketIo(server);

app.set('view engine','ejs');
app.use(express.static(path.join(__dirname,'Public')));

io.on('connection',function(socket){
    console.log('connected');
    socket.on('send-location',function (data){
        io.emit('receive-location',{id:socket.id,...data})
    })
    socket.on('disconnect',()=>{
        io.emit('user-disconnected',socket.id)
    })
})
app.get('/', function (req,res){
    res.render("index");
    
});

server.listen(3000);