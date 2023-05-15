const API_ROOT = 'https://api.green-api.com/'

const request = async (method, path, data) => {
    const body = data ? JSON.stringify(data) : null
    const response = await fetch(API_ROOT + path, {
        method, body
    })
    try {
        return await response.json()
    } catch {
        return null
    }
}

/**
 * @typedef {{
 * receiptId:number,
 * body:{
 * "typeWebhook": "incomingMessageReceived",
 * "instanceData": {
 *   "idInstance": number;
 *   "wid": string;
 *   "typeInstance": "whatsapp";
 * };
 * "timestamp": number;
 * "idMessage": string;
 * "senderData": {
 *   "chatId": string;
 *   "sender": string;
 *   "chatName": string;
 *   "senderName": string;
 * };
 * "messageData": {
 *   "typeMessage": "textMessage";
 *   "textMessageData": {
 *     "textMessage": string;
 *   }
 * }}
 *}} Notification
 * 
 */

export const Api = {
    setCredentials(waInstance, token) {
        this.waInstance = waInstance;
        this.token = token;
    },
    sendMessage(message, to) {
        const url = `waInstance${this.waInstance}/SendMessage/${this.token}`
        const data = {
            "chatId": `${to}@c.us`,
            message
        }
        return request('POST', url, data)
    },
    /**
     * 
     * @returns {Promise<Notification>}
     */
    receiveMessages() {
        const url = `waInstance${this.waInstance}/ReceiveNotification/${this.token}`
        return request('GET', url)
    },
    deleteNotify(receiptId) {
        const url = `waInstance${this.waInstance}/DeleteNotification/${this.token}/${receiptId}`
        return request('DELETE', url)
    }
}