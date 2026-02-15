import bcrypt from "bcrypt";
import prisma from "../../config/prisma";
import { email } from "zod";

type RegisterInput = {
    name:string;
    phone_no:string;
    password:string;
    address:string;
    email:string;
};

// type loginInput ={
//     email:
// };

export const register = async(data:RegisterInput) =>{
    
    // Check Duplicate Email
    const existingEmail = await prisma.user.findUnique({
        where: {email: data.email}
    });
    if(existingEmail){
        throw new Error("Email already Registered");
    }
    
    // Check Duplicate Phone Number

    const existingPhone = await prisma.user.findFirst({
        where:{phone_no:data.phone_no}
    });
    if(existingPhone){
        throw new Error("Phone Number Already Registered");
    }

    // Hash Password
    const HashPassword = await bcrypt.hash(data.password,10);

    //create user safely 
    const user = await prisma.user.create({
        data:{
            name: data.name,
            phone_no: data.phone_no,
            email: data.email,
            address: data.address,
            password: data.password,

            verficationStatus: "PENDING"
        },
        select:{
            user_id:true,
            name:true,
            email:true,
            phone_no:true,
            verificationStatus: true,    
            created_at:true,

        }
    });
    return user;
}

export const login = async(data:any) =>{
  
}