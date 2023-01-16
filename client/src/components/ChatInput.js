import { useState } from "react";
import Picker from "emoji-picker-react";
import { MdInsertEmoticon, MdSend } from "react-icons/md";
function ChatInput({handleSendMsg}) {
    const [msg, setMsg] = useState("");
    // const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    // const handleEmojiClick = (event, emojiObject) => {
    //     let message = msg;
    //     message += emojiObject.emoji;
    //     setMsg(message);
    // };
    const sendChat = (e) => {
        e.preventDefault();
        if (msg.length > 0) {
            handleSendMsg(msg);
            setMsg("");
        }
    };
    return (
        <div className="w-full flex items-center justify-center">
            <form
                className="border border-slate-600 w-[90%] flex items-center justify-around rounded-[2rem]"
                onSubmit={(event) => sendChat(event)}
            >
                <input
                    className="p-2 w-[80%] focus:outline-none bg-transparent"
                    type="text"
                    placeholder="Aa"
                    value={msg}
                    onChange={(e) => setMsg(e.target.value)}
                ></input>

                <button
                    type="submit"
                    className="text-[1.5rem] cursor-pointer"
                    onClick={(e) => sendChat(e)}
                >
                    <MdSend className="iconSend"/>
                </button>
            </form>
        </div>
    );
}

export default ChatInput;
