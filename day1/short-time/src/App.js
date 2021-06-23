import './App.css';
import {React, useState, useEffect} from "react"
function App() {
    const [message , setMessage]=useState('')
    const [messages , setMessages]=useState([])


useEffect(()=>{
    console.log("new interval")
       const timer = setInterval( ()=>{
               console.log(messages)
            let lastTime =0;
            if (messages.length > 0)
            {
                lastTime = ((messages[messages.length-1])["time"])
            }
            fetch('http://127.0.0.1:3012/messages/'+lastTime)
                .then(response => response.json())
                .then(json => {
                    if (json.messages.length>0)
                    setMessages(messages.concat(json.messages))
                })
        },
            3000)
    return () => {
        clearInterval(timer);
    };
},[messages])


    const saveMessage = (e)=>{
        if(e.keyCode == 13){
            fetch('http://127.0.0.1:3012/messages', {
            method: 'POST',
            body: JSON.stringify({
                message: message,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((json) => setMessage(""));
    }}
  return (
<>
  <input type="text" value={message} onChange={(e)=>setMessage(e.target.value)} onKeyUp={saveMessage}/>
    <ul>
        {
            messages.map(message => <li key={message.time}> {message.body}</li>)
        }
    </ul>
</>
  );
}
export default App;
