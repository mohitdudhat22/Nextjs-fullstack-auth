"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function LoginPage() {
  const [email, setEmail] = React.useState<any>("");
  const router = useRouter();
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

const sendResetLink = async (email:string) => {
    try {
        await axios.post(`/api/users/forgotpassword`, {email});
    } catch (error:any) {
        console.log(error.response.data);
    }
}
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
        onChange={(e) => setEmail( e.target.value )}
      />
      <button
      onClick={()=>sendResetLink(email)}
        className="p-2 border border-grey-300 rounded-lg mb-4 focus:outline-none focus:border-grey-600"
      >
         Send Reset Password Link
      </button>
      <Link href="/signup">Visit Signup Page</Link>
      <Link href="/resetpassword">
        Send Reset Password Link
      </Link>
    </div>
  );
}
