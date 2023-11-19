"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function LoginPage() {
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });
  const router = useRouter();
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const onLogin = async () => {
    try{
      setLoading(true);
      const response = await axios.post('/api/users/login', user);
      console.log("Login successful",response.data);
      toast.success("Login successful");
      router.push('/profile/');
      
    }catch(error:any){
      toast.error(error.message);
      console.log("Login failed : ", error);
    }finally{
      setLoading(false)
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{loading ? "Processing" : "Login"}</h1>
      <hr />

      <label htmlFor="email">email</label>
      <input
        className="p-2 border border-grey-300 rounded-lg mb-4 focus:outline-none focus:border-grey-600 text-black"
        type="email"
        id="email"
        placeholder="email"
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />
      <label htmlFor="password">password</label>
      <input
        className="p-2 border border-grey-300 rounded-lg mb-4 focus:outline-none focus:border-grey-600 text-black"
        type="password"
        id="password"
        placeholder="password"
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />
      <button
        onClick={onLogin}
        className="p-2 border border-grey-300 rounded-lg mb-4 focus:outline-none focus:border-grey-600"
      >
        Login here
      </button>
      <Link href="/signup">Visit Signup Page</Link>
      <Link href="/forgotpassword">
        Forgot Password
      </Link>
    </div>
  );
}
