import { useMutation } from "@tanstack/react-query";
import { signIn } from "../api/auth";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

export function Signin() {
    const emailRef = useRef<HTMLInputElement | null>(null)
    const passwordRef = useRef<HTMLInputElement| null>(null)
  const navigate = useNavigate();
  const { mutate:handleSignin } = useMutation({
    mutationFn: signIn,
    onSuccess: (data) => {
      const token = data.token;
      localStorage.setItem("token", token);
      navigate("/dashboard");
      },
      onError: () => {
        alert("signin not possible")
    }
  });
    function singin() {
        const email = emailRef.current?.value
        const password = passwordRef.current?.value

        if (!email || !password) {
            alert("All feilds should be filled");
            return
        }
        handleSignin({email,password})
    }
  return (
    <div className="h-screen flex justify-center bg-gray-200 w-screen items-center">
      <div className=" border rounded-xl bg-white min-w-48  p-8">
        <div className="flex justify-center items-center flex-col">
          <input className="border p-1" ref={emailRef} placeholder="Email" />
          <input
            className="border p-1"
            ref={passwordRef}
            placeholder="password"
          />
          <button className="border p-1 my-2" onClick={singin}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
