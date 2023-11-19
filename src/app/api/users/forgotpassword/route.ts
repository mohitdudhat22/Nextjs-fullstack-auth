import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/helpers/mailer';

export async function POST(req: NextRequest, res: NextResponse) {

    try {
        const reqBody = await req.json();
        const { email } = reqBody;
        const user = await User.findOne({ email: email });
        console.log(user);


        if (!user) {
            return NextResponse.json({ error: "Invalid token" }, { status: 400 });
        }
        const userId = user._id.toString();
        console.log(userId);

        sendEmail({ email, emailType: "RESET", userId });
        return NextResponse.json({ message: "Reset Mail Sended Successfully", success: true });
    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}