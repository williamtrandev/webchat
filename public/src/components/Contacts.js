import { useState, useEffect } from "react";
import "./contact.css";
function Contacts({ contacts, changeChat }) {
    const [currentUserName, setCurrentUserName] = useState(undefined);
    const [currentUserImage, setCurrentUserImage] = useState(undefined);
    const [currentSelected, setCurrentSelected] = useState(undefined);
    useEffect(() => {
        const handle = async () => {
            const data = await JSON.parse(
                localStorage.getItem("chat-app-user")
            );
            setCurrentUserName(data.userName);
            setCurrentUserImage(data.avatarImage);
        };
        handle();
    }, []);
    const changeCurrentChat = (index, contact) => {
        setCurrentSelected(index);
        changeChat(contact);
    };
    console.log(currentUserName);
    return (
        <>
            {currentUserImage && currentUserName && (
                <div className="contact-wrapper overflow-auto h-full">
                    {/* <div>
                        <h3>Thanh Chat</h3>
                    </div> */}
                    <div className="p-[20px] contacts">
                        {contacts.map((contact, index) => {
                            return (
                                <div
                                    key={contact._id}
                                    className={`flex items-center cursor-pointer contact p-[10px] rounded-[10px] mb-[20px] ${
                                        index === currentSelected
                                            ? "selected"
                                            : ""
                                    }`}
                                    onClick={() =>
                                        changeCurrentChat(index, contact)
                                    }
                                >
                                    <div className="w-[80px] h-[80px] rounded-[50%]">
                                        <img
                                            className="w-full h-full rounded-[50%] object-cover"
                                            src={`${contact.avatarImage}`}
                                            alt=""
                                        />
                                    </div>
                                    <div className="ml-[30px] username">
                                        <h3 className="text-[1.2rem]">{contact.userName}</h3>
                                    </div>
                                </div>
                            );
                        })}
                        
                    </div>
                    {/* <div className="">
                        <div className="avatar">
                            <img src={currentUserImage} />
                        </div>
                        <div>
                            <h3>{currentUserName}</h3>
                        </div>
                    </div> */}
                </div>
            )}
        </>
    );
}

export default Contacts;
