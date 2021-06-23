const httpServer = require("http").createServer();
const io = require("socket.io")(httpServer, {
    cors: {
        origin: "*",
        methods: "*",
    }
});
io.on("connection", async (socket) => {

    const ids = await io.allSockets().then(data =>socket.emit("allUsers",[...data]));

    console.log(ids); // ojIckSD2jqNzOqIrAGzL
    socket.on("message",(data)=>{
        console.log(data)
        socket.broadcast.emit("messageFromServer",data);
    })
    socket.on("messageToUser",(data)=>{
        console.log(data)
       const [msg,user]=data
        socket.broadcast.to(user).emit("messageFromServer",msg);
    })
    socket.on("joinRoom",(data)=>{
        console.log("your room is :"+data)
        socket.join(data);
    })

    socket.on("messageToRoom",(data)=>{
        console.log(data)
        const [msg,room]=data
        console.log(  socket.to(room).emit("messageFromServer",msg));
    })
});
httpServer.listen(5022);