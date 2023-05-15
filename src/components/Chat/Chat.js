import { useEffect, useRef } from 'react'
import './Chat.css'
import { Message } from './Message/Message'
export const Chat = ({ messages }) => {
    const messagesEndRef = useRef()

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages]);

    return <div className="Chat">
        {messages.map((message, i) => (<Message key={'msg' + i} text={message.text} type={message.type} date={message.date} ></Message>))}
        <div ref={messagesEndRef} />
    </div>
}