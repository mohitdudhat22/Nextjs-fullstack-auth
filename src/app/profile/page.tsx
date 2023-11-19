"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";


export default function ProfilePage() {
  const router = useRouter();
  const [data,setData] = useState("nothing")
  const logout =async()=>{
    try {
      await axios.get('/api/users/logout');
      toast.success('Logout Successfully');
      router.push('./login');
    } catch (error:any) {
      console.log(error.message);
      toast.error(error.message)
    }
  }
  const getUserDetails = async()=>{
    const res = await axios.get('/api/users/me');
    console.log(res.data);
    setData(res.data.data._id)
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile</h1>
      <hr />
      <p>Profile page</p>
      <h2 className="p-3 rounded bg-green-500">{data === "nothing"? "nothing": <Link href = {`/profile/${data}`}>{data}</Link>}</h2>
      <button
      onClick={logout}
        className="p-2 border border-grey-300 rounded-lg mb-4 focus:outline-none focus:border-grey-600"
      >
        LogOut
      </button>
       <button
      onClick={getUserDetails}
        className="p-2 border border-grey-300 rounded-lg mb-4 focus:outline-none focus:border-grey-600"
      >
        GetUserDetails
      </button>
    </div>
  );
}
