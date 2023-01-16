import { useState, useEffect, useRef } from "react";
import { BsSunFill, BsFillMoonStarsFill } from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./chat.css";
import { allUsersRoute, host } from "../utils/APIRoutes";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";
import { io } from "socket.io-client";
function Chat() {
    // Theme variables
    const [isDark, setDark] = useState(false);
    const navigate = useNavigate();
    const checkThemeWhenLoad = () => {
        const userTheme = localStorage.getItem("theme-chat-app");
        if (userTheme === null) {
            localStorage.setItem("theme-chat-app", "light");
        }
    };
    useEffect(() => {
        checkThemeWhenLoad();
    }, []);

    const [contacts, setContacts] = useState([]);
    const [currentUser, setCurrentUser] = useState(undefined);
    const [currentChat, setCurrentChat] = useState(undefined);
    const [isLoaded, setLoaded] = useState(false);
    const socket = useRef();
    useEffect(() => {
        const handle = async () => {
            if (!localStorage.getItem("chat-app-user")) {
                navigate("/");
            } else {
                setCurrentUser(
                    await JSON.parse(localStorage.getItem("chat-app-user"))
                );
                setLoaded(true);
            }
        };
        handle();
    }, []);
    useEffect(() => {
        if (currentUser) {
            socket.current = io(host);
            socket.current.emit("add-user", currentUser._id);
        }
    });
    useEffect(() => {
        const getdata = async () => {
            if (currentUser) {
                const data = await axios.get(
                    `${allUsersRoute}/${currentUser._id}`
                );
                setContacts(data.data);
            }
        };
        getdata();
    }, [currentUser]);
    const handleChatChange = (chat) => {
        setCurrentChat(chat);
    };
    console.log(contacts);
    // console.log(currentUser.avatarImage);
    const handleLogOut = async () => {
        localStorage.removeItem("chat-app-user");
        navigate("/");
    };
    return (
        <div
            className={
                "w-full h-screen overflow-hidden transition-all duration-200 " +
                (localStorage.getItem("theme-chat-app") === null
                    ? "light"
                    : localStorage.getItem("theme-chat-app"))
            }
        >
            <div className="navbar w-full h-[8%] border-b border-slate-300 flex items-center justify-end">
                <div
                    onClick={() => {
                        setDark(!isDark);
                        localStorage.setItem(
                            "theme-chat-app",
                            isDark ? "dark" : "light"
                        );
                    }}
                >
                    <label
                        className="toggle relative cursor-pointer flex justify-between items-center w-[100px] h-[50px] rounded-[50px]"
                        htmlFor="toggle"
                    >
                        <div className="flex items-center justify-center w-[50%]">
                            <BsSunFill className="w-full text-[20px] text-center iconSun z-[1]" />
                        </div>
                        <div className="flex items-center justify-center w-[50%]">
                            <BsFillMoonStarsFill className="w-[50%] text-[20px] text-center iconMoon z-[1]" />
                        </div>
                        <span className="spanBall absolute w-[45px] h-[45px] rounded-[50%] m-[2.5px] transition duration-300 ease-out"></span>
                    </label>
                </div>
                <div
                    className="rounded-[50%] w-[40px] h-[40px] bg-slate-400 mx-[30px]"
                    style={{
                        backgroundImage:
                            "url(" + currentUser?.avatarImage + ")",
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                    }}
                ></div>
                <div
                    className="flex mr-10 items-center cursor-pointer"
                    onClick={handleLogOut}
                >
                    <BiLogOut className="text-[2rem] iconLogOut" />
                    <p className="ml-2">Log Out</p>
                </div>
            </div>
            <div className="w-full h-[92%] flex items-center">
                <div className="w-[25%] h-full border-r border-slate-300 ">
                    <Contacts
                        contacts={contacts}
                        changeChat={handleChatChange}
                    />
                </div>
                <div className="w-[75%] h-full">
                    {isLoaded && currentChat === undefined ? (
                        <Welcome currentUser={currentUser} />
                    ) : (
                        <ChatContainer
                            currentChat={currentChat}
                            currentUser={currentUser}
                            socket={socket}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
export default Chat;
