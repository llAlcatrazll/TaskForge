import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

export default function CreateAccountPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleCreateAccount = async () => {
    setError("");

    // 1️⃣ Create user in Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) {
      setError(authError.message);
      console.log("Auth signup error:", authError);
      return;
    }

    // 2️⃣ Insert extra info into profiles table
    const { data: profileData, error: profileError } = await supabase
      .from("users")
      .insert([
        {
          id: authData.user?.id, // link to auth.users.id
          username,
          email,
          status: "active",
        },
      ]);

    if (profileError) {
      setError(profileError.message);
      console.log("Profile insert error:", profileError);
      return;
    }

    console.log("Account created:", authData, profileData);
    navigate("/landing");
  };

  return (
    <div className="text-white bg-[url('./assets/backgrounds/login_bg.jpg')] bg-cover flex h-screen">
      <div className="w-full h-screen static bg-black/50 flex justify-end items-center">
        <div className="bg-black/50 h-full w-[41%] blur-xs flex flex-col items-center justify-center gap-5 p-10">
          <p className="text-3xl font-bold mb-5">Create Account</p>

          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="bg-[--light-black] border-2 border-[--bright-O-action] rounded-md w-[75%] h-[5%] pl-5"
            placeholder="Username"
          />
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
            onClick={handleCreateAccount}
          >
            Create Account
          </button>

          <button
            className="bg-[--light-black] w-[70%] py-2 border-2 border-[--bright-O-action] rounded-md"
            onClick={() => navigate("/login")}
          >
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
}
