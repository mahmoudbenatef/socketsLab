var express = require("express")
var cors = require('cors')
var app = express();
app.use(express.json())
app.use(cors())
const subscribers = {}
app.get('/messages/', function (req, res, next) {
    console.log("requesting")
    let n = Date.now()+Math.floor(Math.random() * 10);
    subscribers[n]= res
    req.on('close',()=>{
        delete subscribers[n];
    })
    console.log(subscribers.length)
})

app.post('/messages/', function (req, res, next) {

    console.log(subscribers.length)
    Object.keys(subscribers).forEach(subscriberKey =>{
        console.log("inside out ")
        subscribers[subscriberKey].status(200).json({message:req.body.message})
        delete subscribers[subscriberKey]
    })
    console.log(subscribers)
    return res.json({msg:"saved"})
})

const port = 3013
app.listen(port,(err)=>{
    if (err) console.log("error in connecting")
    else
        console.log("connected successfully on port "+port)
})
