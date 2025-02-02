import React, { useState, useEffect } from "react";
import axios from "axios";
import Message from "./Message";

const Chat = ({ idInstance, apiTokenInstance }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    // Отправка сообщения
    const sendMessage = async () => {
        if (!newMessage || !phoneNumber) return;

        try {
            const response = await axios.post(
                `https://api.green-api.com/waInstance${idInstance}/SendMessage/${apiTokenInstance}`,
                {
                    chatId: `${phoneNumber}@c.us`,
                    message: newMessage,
                }
            );
            // Добавляем отправленное сообщение в список
            setMessages([...messages, { text: newMessage, isSender: true }]);
            setNewMessage(""); // Очищаем поле ввода
            console.log("Сообщение отправлено:", response.data);
        } catch (error) {
            console.error("Ошибка отправки сообщения:", error);
        }
    };

    // Получение сообщений
    const receiveMessage = async () => {
        try {
            const response = await axios.get(
                `https://api.green-api.com/waInstance${idInstance}/ReceiveNotification/${apiTokenInstance}`
            );
            if (response.data) {
                const messageData = response.data.body.messageData;
                if (messageData && messageData.textMessageData) {
                    // Добавляем полученное сообщение в список
                    setMessages((prev) => [
                        ...prev,
                        { text: messageData.textMessageData.textMessage, isSender: false },
                    ]);
                }
                // Удаляем уведомление после обработки
                await axios.delete(
                    `https://api.green-api.com/waInstance${idInstance}/DeleteNotification/${apiTokenInstance}/${response.data.receiptId}`
                );
            }
        } catch (error) {
            console.error("Ошибка получения сообщения:", error);
        }
    };

    // Периодическая проверка новых сообщений
    useEffect(() => {
        const interval = setInterval(receiveMessage, 5000); // Проверка каждые 5 секунд
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="chat">
            <h2>WhatsApp Chat</h2>
            <div>
                <label>Номер телефона получателя:</label>
                <input
                    type="text"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="79991234567"
                />
            </div>
            <div className="messages">
                {messages.map((msg, index) => (
                    <Message key={index} text={msg.text} isSender={msg.isSender} />
                ))}
            </div>
            <div className="input-area">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Введите сообщение..."
                    onKeyPress={(e) => e.key === "Enter" && sendMessage()} // Отправка по Enter
                />
                <button onClick={sendMessage}>Отправить</button>
            </div>
        </div>
    );
};

export default Chat;