import  User  from '@/models/userModel';
import { connect } from '@/dbConfig/dbConfig';
import { NextRequest, NextResponse } from 'next/server';
connect();
export async function POST (request:NextRequest, response:NextResponse){
    try {
        const reqBody = await request.json();
        const {token} = reqBody;
        console.log(Date.now());
        console.log(Date.now()+3600000);
        
      const user  = await User.findOne({VerifyToken : token,VerifyTokenExpiry : {$gt :Date.now()}})
        if(!user){
            return NextResponse.json({error:"Invalid token"},{status:400});
        }
        console.log(user);
        user.isVerify = true;
        user.VerifyToken = undefined;
        user.VerifyTokenExpiry = undefined;
        await user.save();
        return NextResponse.json({message:"Email verified successfully",success:true});

        
    }catch(error:any){
        return NextResponse.json({error:error.message});
    }
}