import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
    username:{
        type: 'String',
        required: [true , "Please enter a username"],
        unique: true,
    },
    email:{
        type: 'String',
        required: [true , "Please enter a email address"],
        unique: true,
    },
    password:{
        type: 'String',
        required: [true , "Please enter a password"]
    },
    isVerify:{
        type: 'Boolean',
        default: false
    },
    isAdmin:{
        type: 'Boolean',
        default: false
    },
    VerifyToken : String,
    VerifyTokenExpiry : Date,
    ForgetPasswordToken : String,
    ForgetPasswordTokenExpiry : Date, 

})
const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;