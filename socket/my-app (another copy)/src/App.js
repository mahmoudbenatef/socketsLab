import './App.css';
import {React, useState, useEffect} from "react"
import { io } from "socket.io-client";
import { Widget,addResponseMessage } from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';

const ENDPOINT = "http://127.0.0.1:5022"
const socket = io(ENDPOINT);
function App() {
    const [room , setRoom]=useState('')

    // solve set interval inside use effect
    useEffect(() => {
        socket.on("messageFromServer", data => {
            console.log("here")
            addResponseMessage(data)
        });
         return ( ()=>{
            });
        },
        []
    );
    const sendMessageToRoom = (newMessage) => {
        socket.emit('messageToRoom',[newMessage,room])
    };
    const joinRoom = (e)=>{
        if(e.keyCode == 13){
            socket.emit('joinRoom',room)
        }}

  return (
<>
    <Widget handleNewUserMessage={sendMessageToRoom} />
    <input type="text" value={room} onChange={(e)=>setRoom(e.target.value)}  onKeyUp={joinRoom} />
    <h1>Your room : {room}</h1>


    </>
  );
}
export default App;
