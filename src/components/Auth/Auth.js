import { useRef } from "react"
import './Auth.css'

export const Auth = ({ onChoose }) => {
    const waInstanceRef = useRef()
    const tokenRef = useRef()

    const onEnterClick = () => {
        const waInstance = waInstanceRef.current.value
        const token = tokenRef.current.value
        if (!waInstance || !token) {
            alert('Поля должны быть заполнены!')
            return;
        }
        onChoose(waInstance, token)

    }

    return <div className="Auth">
        <input ref={waInstanceRef} placeholder="waInstance" ></input>
        <input ref={tokenRef} placeholder="token" ></input>
        <button onClick={onEnterClick}>Войти</button>
    </div>
}