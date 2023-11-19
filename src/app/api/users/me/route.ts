import { connect } from "@/dbConfig/dbConfig";
import { getDataFormToken } from "@/helpers/getDataFromToken";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request : NextRequest){
    try {
        const userID = await getDataFormToken(request);
        const user = await User.findById(userID).select("-password");
        console.log(user);
        
        return NextResponse.json({message:"User Found",data:user})
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:400})
    }
}