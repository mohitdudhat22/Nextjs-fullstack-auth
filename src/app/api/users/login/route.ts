import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
connect();
export async function POST(request : NextRequest , response: NextResponse){
    try {
        const reqBody = await request.json();
        const {email, password} = reqBody;

        // Check if user does not exists
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ error: 'User does not exists' }, { status: 400 });
        }

        //Check if password is correct
        const validPassword = bcrypt.compareSync(password, user.password);
        if(!validPassword){
            return NextResponse.json({error:"Invalid password", status: 400});
        }

        //create token data
        const tokenData = {
            id: user._id,
            username: user.username,
            email:user.email
        }

        //create token
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: '1d' });
        const response = NextResponse.json({message:"Login successful",success:true});
        response.cookies.set("token",token,{httpOnly:true});
        return response;
    } catch (error:any) {
        NextResponse.json({error:error.message}, {status:500})
    }
}