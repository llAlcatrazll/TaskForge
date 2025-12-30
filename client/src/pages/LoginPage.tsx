import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { supabase } from "../supabaseClient"; // adjust path if needed
import { supabase } from "../lib/supabase";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  // const navigate = useNavigate();

  // const goToLogin = useCallback(() => {
  //   navigate("/");
  // }, [navigate]);
  const handleLogin = async () => {
    setError(""); // reset error
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      console.log("Login error:", error);
    } else {
      console.log("Login successful:", data);
      navigate("/landing");
    }
  };
  const createNewAccount = useCallback(() => {
    navigate("/create_account");
  }, [navigate]);

  return (
    <div className="text-white bg-[url('./assets/backgrounds/login_bg.jpg')] bg-cover flex h-screen">
      <div className="w-full h-screen static bg-black/50 flex justify-end items-center">
        <div className="bg-black/50 h-full w-[41%] blur-xs flex flex-col items-center justify-center gap-5 p-10">
          <p className="text-3xl font-bold mb-5">TaskForge</p>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-[--light-black] border-2 border-[--bright-O-action] rounded-md w-[75%] h-[5%] pl-5"
            placeholder="Email"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-[--light-black] border-2 border-[--bright-O-action] rounded-md w-[75%] h-[5%] pl-5"
            placeholder="Password"
          />

          {error && <p className="text-red-500">{error}</p>}

          <button
            className="bg-[--bright-O-action] w-[70%] py-2 mt-5 rounded-md"
            onClick={handleLogin}
          >
            Login
          </button>

          <button className="bg-[--light-black] w-[70%] py-2 border-2 border-[--bright-O-action] rounded-md">
            Login with Google
          </button>

          <p>OR</p>

          <button
            className="bg-[--light-black] w-[70%] py-2 border-2 border-[--bright-O-action] rounded-md"
            onClick={createNewAccount}
          >
            Create new Account
            {/* navigate to Create_AccountPage */}
          </button>
        </div>
      </div>
    </div>
  );
}
