import './App.css';
import {React, useState, useEffect} from "react"
function App() {
    const [message , setMessage]=useState('')
    const [messages , setMessages]=useState([])
    // solve set interval inside use effect
useEffect(()=>{
    console.log("in effect")
    fetch('http://127.0.0.1:3013/messages/')
        .then(response => response.json())
        .then(json => {
            setMessages(messages.concat(json.message))
        })
    // eslint-disable-next-line
},[messages])
    const saveMessage = (e)=>{
        if(e.keyCode == 13){
            fetch('http://127.0.0.1:3013/messages', {
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
            messages.map(msg => <li key={msg} > {msg}</li>  )
        }
    </ul>
</>
  );
}
export default App;
