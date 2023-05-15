import './Message.css'

/**
 * @enum {string}
 */
export const MESSAGE_TYPE = {
    INCOME: 'income',
    OUTCOME: 'outcome',
}

/**
 * @typedef MessageProps
 * @prop {MESSAGE_TYPE} type
 * @prop {string} text
 * @prop {Date} date
 */

const getTimeString = (date) => date.toTimeString().substr(0, 5)

/**
 * 
 * @param {MessageProps} props 
 */
export const Message = ({ type, text, date }) => {
    return (
        <div className={`Message ${type}`}>
            {text}
            <span className="message-time">{getTimeString(date)}</span>
        </div>
    )
}