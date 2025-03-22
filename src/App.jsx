import React, { useEffect, useState } from "react"
import IO from "socket.io-client"
import Auth from './Components/auth'
import Chat from './Components/Chat'

import "../public/css/common.css"
import "../public/css/style.css"
import { Route, Routes } from "react-router-dom"

let backend_api = 'https://chat-backend-4jgm.onrender.com'

const socket = IO.connect(backend_api)
const pvSocket = IO.connect(`${backend_api}/pvs`)

function App() {
  const [pvs, setPvs] = useState([])
  const [messages, setMessages] = useState([])

  useEffect(() => {
    socket.on("privateChats", pvs => {
      setPvs([...pvs])
      console.log(pvs)
    })
    confirmNewMessage()
    confirmRemoveMsg()
  }, [])

  const joinToChat = (sender, receiver) => {
    console.log('new Pv ->' , {sender, receiver})
    pvSocket.emit('joining', {
      sender,
      receiver
    })
    setMessages([])
  }

  const sendMsg = (message, sender, receiver) => {
    // console.log('new Msg -> ' , {message,sender , receiver})
    pvSocket.emit('newMsg', {
      message,
      pv: {
        sender,
        receiver
      }
    })
  }

  const confirmNewMessage = () => {
    pvSocket.on('confirmMsg' , data => {
      console.log('new Msg ->' , data)
      setMessages(prevChats => [...prevChats , data])
    })
  }

  const removeMsg = msgID => {
    console.log('remove msgID ->' , msgID)
    pvSocket.emit('removeMsg' , {msgID})
  }
  
  const confirmRemoveMsg = () => {
    pvSocket.on('confirmRemoveMsg' , data => {
      console.log('removed Msg ->' , data)
      setMessages(message => message.filter(message => message.msgID !== data.msgID))
    })
    
  } 


  return (
    <Routes>
      <Route path="/" element={<Chat pvs={pvs} joinToChat={joinToChat} sendMsg={sendMsg} messages={messages} removeMsg={removeMsg} />} />
      <Route path="/auth" element={<Auth />} />
    </Routes>
  )
}

export default App;