import { useRef } from 'react'
import './ChatTextField.css'
export const ChatTextField = ({ onSend }) => {
    const inputRef = useRef()

    const onSendClick = () => {
        if (inputRef.current.value) {
            onSend(inputRef.current.value)
            inputRef.current.value = ''
        }
    }

    const checkEnter = (e) => {
        if (e.keyCode === 13) onSendClick()
    }

    return <div className="ChatTextField">
        <div className="input-wrapper">
            <input onKeyUp={checkEnter} ref={inputRef} placeholder='Введите сообщение'>
            </input>
        </div>
        <button onClick={onSendClick}>Отправить</button>
    </div>
}