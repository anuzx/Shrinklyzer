import { useMutation } from "@tanstack/react-query";
import { signUp } from "../api/auth";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

export function Signup() {
  const nameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const navigate = useNavigate();

  const { mutate: handleSignup, error } = useMutation({
    mutationFn: signUp,
    onSuccess: () => {
      alert("signup successfull");
      navigate("/signin");
      },

  });
  if (error) {
    alert("signup failed");
  }
    function signup() {
        const name = nameRef.current?.value
        const password = passwordRef.current?.value;
        const email = emailRef.current?.value;

        if (!name || !password || !email) {
            alert("all fields required")
            return
        }
        handleSignup({email , name , password})
    }
  return (
    <div className="h-screen flex justify-center bg-gray-200 w-screen items-center ">
      <div className="flex justify-center items-center flex-col bg-white min-w-48 p-8 rounded-xl">
        <input className="border p-1" ref={emailRef} placeholder="Email" />
        <input className="border p-1" ref={nameRef} placeholder="username" />
        <input className="border p-1" ref={passwordRef} placeholder="password" />
        <button className="border my-2" onClick={signup}>
          Submit
        </button>
      </div>
    </div>
  );
}


