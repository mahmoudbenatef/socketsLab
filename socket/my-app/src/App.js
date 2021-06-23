import './App.css';
import {React, useEffect} from "react"
import { io } from "socket.io-client";
import { Widget,addResponseMessage } from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';

// const socket = io("http://127.0.0.1:5000");
const ENDPOINT = "http://127.0.0.1:5022"
const socket =  io(ENDPOINT);
function App() {
    useEffect(() => {
        socket.on("messageFromServer", data => {
            addResponseMessage(data)
        });
            return ( ()=>{
            });
        },
        []
    );
    const handleNewUserMessage = (newMessage) => {
        socket.emit('message',newMessage)
    };
  return (
<>
    <Widget handleNewUserMessage={handleNewUserMessage} />
    </>
  );
}
export default App;
