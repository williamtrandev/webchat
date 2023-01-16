import ChatInput from "./ChatInput";
import { sendMessageRoute, getMessageRoute } from "../utils/APIRoutes";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./ChatContainer.css";
import { v4 as uuidv4 } from "uuid";
function ChatContainer({ currentChat, currentUser, socket }) {
    const [messages, setMessages] = useState([]);
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const scrollRef = useRef();
    const handleSendMsg = async (msg) => {
        await axios.post(sendMessageRoute, {
            from: currentUser._id,
            to: currentChat._id,
            message: msg,
        });
        socket.current.emit("send-msg", {
            to: currentChat._id,
            from: currentUser._id,
            message: msg,
        });
        const msgs = [...messages];
        msgs.push({ fromSelf: true, message: msg });
        setMessages(msgs);
    };
    useEffect(() => {
        if (socket.current) {
            socket.current.on("msg-receive", (msg) => {
                setArrivalMessage({ fromSelf: false, message: msg });
            });
        }
    }, []);
    useEffect(() => {
        arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
    }, [arrivalMessage]);
    useEffect(() => {
        scrollRef.current?.scrollIntoView({ bahaviour: "smooth" });
    }, [messages]);
    useEffect(() => {
        const getAllMessages = async () => {
            const response = await axios.post(getMessageRoute, {
                from: currentUser?._id,
                to: currentChat?._id,
            });
            setMessages(response.data);
        };
        getAllMessages();
    }, [currentChat]);
    return (
        <>
            {currentChat && (
                <div className="h-full">
                    <div className="chat-header flex justify-between items-center py-2 px-8 border-b border-slate-300">
                        <div className="user-details flex items-center gap-4">
                            <div className="avatar">
                                <img
                                    src={currentChat?.avatarImage}
                                    className="w-[3.5rem] h-[3.5rem] rounded-[50%] object-cover"
                                ></img>
                            </div>
                            <div className="username">
                                <h3 className="text-[1.2rem]">{currentChat?.userName}</h3>
                            </div>
                        </div>
                    </div>
                    {/* <Messages></Messages> */}
                    <div className="chatmessage py-4 px-8 flex flex-col gap-4 overflow-auto h-[80%]">
                        {messages.map((message) => {
                            return (
                                <div ref={scrollRef} key={uuidv4()}>
                                    <div
                                        className={`message flex items-center ${
                                            message.fromSelf
                                                ? "sended justify-end"
                                                : "received justify-start"
                                        }`}
                                    >
                                        <div className="content max-w-[40%] break-words p-4 text-[1.1rem] rounded-[1rem]">
                                            <p>{message.message}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <ChatInput handleSendMsg={handleSendMsg} />
                </div>
            )}
        </>
    );
}

export default ChatContainer;
