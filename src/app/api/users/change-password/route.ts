import bcrypt from 'bcryptjs';
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const reqbody = await req.json();
        const { password, token } = reqbody;
        const user = await User.findOne({ ForgetPasswordToken: token });
        if (!user) {
            return NextResponse.json({ error: "Invalid token" }, { status: 400 });
        }

        //hash password
        const salt = await bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);
        user.password = hashedPassword;
        user.ForgetPasswordToken = undefined;
        user.ForgetPasswordTokenExpiry = undefined;
        await user.save();
        console.log("saved with password token\n", user);

        return NextResponse.json({ message: "Password Changed successfully", success: true });
    } catch (error: any) {
        return NextResponse.json({ error: error.message });
    }
}