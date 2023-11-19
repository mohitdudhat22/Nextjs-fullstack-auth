"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function LoginPage() {
  const [verifyed, setverifyed] = React.useState(true);
  const router = useRouter();
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const [cpassword, setCPassword] = React.useState("");
  const [token ,setToken] = React.useState("")

  const verifyPasswordToken = async ()=>{
    try{
      await axios.post("/api/users/verifypassword", {token});
      setverifyed(true);
  }catch(error:any){
      console.log(error.response.data);
      
  }
  }
  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];   
    setToken(urlToken) 
    
    if(urlToken.length > 0){
      verifyPasswordToken();      
  }
  }, []); 
   useEffect(() => {    
    if(token.length > 0){
      verifyPasswordToken();      
  }
  }, [token]);
  const ChangePassword = async () => {
    if(cpassword === password) {
      
      try {
        console.log("Password change in progress");
      await axios.post(`/api/users/change-password`,{password,token});
      alert("Password changed");
      } catch (error:any) {
        console.log(error.response.data);
      }
      
    }else{
      alert("Invalid Password")
    }
  }
  return (
    <>
   <div className="flex flex-col items-center justify-center min-h-screen py-2">
      {verifyed && (<><h1>{loading ? "Processing" : "Login"}</h1>
      <hr />

      <label htmlFor="password">password</label>
      <input
        className="p-2 border border-grey-300 rounded-lg mb-4 focus:outline-none focus:border-grey-600 text-black"
        type="password"
        id="password"
        placeholder="password"
        onChange={(e) => setPassword( e.target.value)}
      />
      <label htmlFor="cpassword">Confirm Password</label>
      <input
        className="p-2 border border-grey-300 rounded-lg mb-4 focus:outline-none focus:border-grey-600 text-black"
        type="cpassword"
        id="cpassword"
        placeholder="password"
        onChange={(e) => setCPassword( e.target.value)}
        
      />
      <button
        onClick={()=> ChangePassword()}
        className="p-2 border border-grey-300 rounded-lg mb-4 focus:outline-none focus:border-grey-600"
      >
       Change Password
      </button>
      <Link href="/signup">Visit Signup Page</Link>
      <Link href="/resetpassword">
        Send Reset Password Link
      </Link></>)}
      {!verifyed && <div>
        Token Verification Failed</div>}
    </div>
    </>
  );
}
