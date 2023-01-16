import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { setAvatarRoute } from "../utils/APIRoutes";
function SetAvatar() {
    const navigate = useNavigate();
    const changeAvatar = (e) => {
        // const preview = document.querySelector("img");
        // const file = document.querySelector("input[type=file]").files[0];
        const file = e.target.files[0];

        const reader = new FileReader();

        reader.addEventListener(
            "load",
            () => {
                // convert image file to base64 string
                setAva(reader.result);
                localStorage.setItem("avaHomeSP4", reader.result);
            },
            false
        );
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const [ava, setAva] = useState(
        "https://top10camau.vn/wp-content/uploads/2022/10/avatar-meo-cute-1.jpg"
    );
    // Xoa anh trong bo nho moi lan doi anh
    useEffect(() => {
        return () => {
            ava && URL.revokeObjectURL(ava);
        };
    }, [ava]);
    const setProfileImage = async () => {
        const user = await JSON.parse(localStorage.getItem("chat-app-user"));
        const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
            image: ava,
        });
        user.isAvatarImageSet = false;
        user.avatarImage = ava;
        localStorage.setItem("chat-app-user", JSON.stringify(user));
        navigate("/chat");
    };
    const [isChoose, setChoose] = useState(false);
    return !isChoose ? (
        <div className="flex flex-col justify-center items-center w-full h-screen">
            <p className="text-[30px] mb-[30px]">Do you want to set avatar?</p>
            <div className="">
                <button
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mr-[50px]"
                    onClick={() => setChoose(true)}
                >
                    Yes
                </button>
                <Link to={"/chat"}>
                    <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        No
                    </button>
                </Link>
            </div>
        </div>
    ) : (
        <div className="flex flex-col justify-center items-center w-full h-screen">
            <p className="text-[40px] mb-[40px]">Choose your own avatar</p>
            <div className="w-[300px] h-[300px] rounded-[50%] bg-slate-300 relative z-10">
                <input
                    type={"file"}
                    accept="image/*"
                    className="absolute opacity-0 top-0 left-0 w-full h-full cursor-pointer"
                    onChange={changeAvatar}
                ></input>
                <img
                    className="object-cover rounded-[50%] w-full h-full"
                    src={ava}
                    alt="avatar"
                />
            </div>
            <button
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-[40px]"
                onClick={setProfileImage}
            >
                Set Avatar
            </button>
        </div>
    );
}

export default SetAvatar;
