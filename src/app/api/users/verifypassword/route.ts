import  User  from '@/models/userModel';
import { connect } from '@/dbConfig/dbConfig';
import { NextRequest, NextResponse } from 'next/server';
connect();
console.log("running");

export async function POST (request:NextRequest, response:NextResponse){
    try {
        const reqBody = await request.json();
        
        const {token} = reqBody;
        console.log(token);
        
      const user  = await User.findOne({ForgetPasswordToken : token,ForgetPasswordTokenExpiry : {$gt :Date.now()}})
        if(!user){
            return NextResponse.json({error:"Invalid token"},{status:400});
        }
        console.log("saved with password token\n",user);
        
        return NextResponse.json({message:"Token verified successfully",success:true});

        
    }catch(error:any){
        return NextResponse.json({error:error.message});
    }
}