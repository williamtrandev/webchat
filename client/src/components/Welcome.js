import Dog from "../assets/dog.gif";
function Welcome({ currentUser }) {
    return (
        <div className="w-full h-full flex flex-col justify-center items-center">
            <img className="w-[400px]" src={Dog} alt="Dog" />
            <h1 className="text-[4em]">
                Welcome, <span className="text-cyan-400">{currentUser.userName}</span>
            </h1>
			<p className="text-[3.5em]">Choose a user to start chatting</p>
        </div>
    );
}

export default Welcome;
