var express = require("express")
var cors = require('cors')
var app = express();
// view engine setup
app.use(express.json())
app.use(cors())
let messages = []
app.get('/messages/', function (req, res, next) {
    res.json({messages})
})
app.get('/messages/:time', function (req, res, next) {
    const time = req.params.time
    res.json({messages:messages.filter(message=> message.time>time)})
})
app.post('/messages/', function (req, res, next) {
    let n = Date.now();
    let message = {}
    message.time = n
    message.body = req.body.message
    messages.push(message)
    res.json({msg:"saved success"})
})
app.listen(3012,(err)=>{
    if (err) console.log("error in connecting")
    else
        console.log("connected successfully on port 3000")
})
