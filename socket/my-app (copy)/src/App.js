import './App.css';
import {React, useState, useEffect} from "react"
import { io } from "socket.io-client";
import { Widget,addResponseMessage } from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';

const ENDPOINT = "http://127.0.0.1:5022"
function App() {
    const [user , setUser]=useState('')
    const [users , setUsers]=useState([])
    const socket = io(ENDPOINT);

    // solve set interval inside use effect
    useEffect(() => {
        socket.on("messageFromServer", data => {
            addResponseMessage(data)
        });
            socket.on("allUsers", data => {
                setUsers(data)
            });
            return ( ()=>{
            });
        },
        []
    );
    const handleNewUserMessage = (newMessage) => {
        socket.emit('messageToUser',[newMessage,user])
    };

  return (
<>
    <ul>
        {
            users.map((user)=><li key={user}>{user}</li>)
        }
    </ul>
    <Widget handleNewUserMessage={handleNewUserMessage} />

    <input type="text" value={user} onChange={(e)=>setUser(e.target.value)} />


    </>
  );
}
export default App;
