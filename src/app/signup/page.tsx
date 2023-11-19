"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup success", response.data);
      router.push("/login");
    } catch (error: any) {
      toast.error(error.message);
      console.log("Signup failed : ", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{loading ? "Processing" : "Signup"}</h1>
      <hr />
      <label htmlFor="username">username</label>
      <input
        className="p-2 border border-grey-300 rounded-lg mb-4 focus:outline-none focus:border-grey-600 text-black "
        type="text"
        id="username"
        placeholder="username"
        onChange={(e) => setUser({ ...user, username: e.target.value })}
      />
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
        className="p-2 border border-grey-300 rounded-lg mb-4 focus:outline-none focus:border-grey-600"
        onClick={onSignup}
      >
        {buttonDisabled ? "No Signup" : "Signup"}
      </button>
      <Link href="/login">Visit Login Page</Link>
    </div>
  );
}
