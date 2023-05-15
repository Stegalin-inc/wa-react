import { useEffect, useRef, useState } from "react"
import { Api } from "../../util/Api"
import { Chat } from "../Chat/Chat"
import { MESSAGE_TYPE } from "../Chat/Message/Message"
import { ChatTextField } from "../ChatTextField/ChatTextField"
import { Topbar } from "../Topbar/Topbar"

export const ChatView = () => {
    const [messages, setMessages] = useState([])
    const [render, setRender] = useState(0)

    const [phone, setPhone] = useState('')
    const phoneRef = useRef()

    const fetchMessage = async () => {
        const response = await Api.receiveMessages()
        if (!response) return;
        const { receiptId, body } = response
        await Api.deleteNotify(receiptId)
        if (body.typeWebhook !== 'incomingMessageReceived') return;
        if (body.messageData.typeMessage !== 'textMessage') return;
        if (body.senderData.chatId.substring(0, phone.length) !== phone) return;
        const newMessage = {
            text: body.messageData.textMessageData.textMessage,
            type: MESSAGE_TYPE.INCOME,
            date: new Date(body.timestamp * 1000),
        }
        setMessages([...messages, newMessage])
    }

    const listen = async () => {
        await fetchMessage()
        //force rerender
        setRender(render + 1)
    }

    useEffect(() => { if (phone) listen() }, [phone, render])

    const onSend = (text) => {
        const newMessage = {
            text,
            type: MESSAGE_TYPE.OUTCOME,
            date: new Date(),
        }
        Api.sendMessage(text, phone)
        setMessages([...messages, newMessage])
    }

    const toChatClick = () => {
        const { value } = phoneRef.current
        if (value) setPhone(value)
        else alert('Номер должен быть заполнен')
    }

    return (
        <div className="App">
            {!phone ? <>
                <input ref={phoneRef} placeholder="Телефон" />
                <button onClick={toChatClick}>Перейти в чат</button>
            </> :
                <>
                    <Topbar title={phone} />
                    <Chat messages={messages} />
                    <ChatTextField onSend={onSend} />
                </>}
        </div>
    );
}