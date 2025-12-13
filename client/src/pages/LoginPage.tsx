import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();

  const goToDashboard = () => {
    navigate("/landing");
    console.log("navigaete");
  };

  const leTest = () => {
    console.log("Hello I am a button");
  };
  return (
    <>
      <div className="text-white bg-[url('./assets/backgrounds/login_bg.jpg')] bg-cover flex  h-screen">
        <div className="w-full h-screen static bg-black/50 flex justify-end items-center">
          <div className="bg-black/50 h-full w-[41%] blur-xs flex flex-col">
            <p>TaskForge</p>
            <input
              type="text"
              className="bg-[--light-black] border-2 border-[--bright-O-action] rounded-md w-[75%] h-[5%] pl-5 mb-10"
              placeholder="email"
            />
            <input
              type="text"
              className="bg-[--light-black] border-2 border-[--bright-O-action] rounded-md w-[75%] h-[5%] pl-5"
              placeholder="password"
            />
            <button
              className="bg-[--bright-O-action] w-[70%] mb-10 mt-5"
              onClick={() => {
                goToDashboard();
                leTest();
              }}
            >
              Login
            </button>
            <button className="bg-[--light-black] w-[70%] border-2 border-[--bright-O-action]">
              Google
            </button>
            <p>OR</p>
            <button className="bg-[--light-black] w-[70%] border-2 border-[--bright-O-action]">
              Create new Account
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
