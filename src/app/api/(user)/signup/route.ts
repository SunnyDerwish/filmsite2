// First, import the necessary types from 'next'
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from "@/app/prismadb";
import bcrypt from "bcrypt";
import { randomUUID } from "crypto";
import { z } from "zod";
import { SignUpSchema } from "@/ZodSchema/UserSchema";
import nodemailer from "nodemailer";

// Then, use these types to type the `req` and `res` parameters
    async function handlePOST(req: Request, res: NextApiResponse) {
    console.log(req.method)
    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        return res.status(405).end(req.method);
    }
    
    try {

        const body = await req.json(); // Using req.body directly, assuming it's already parsed as JSON
        console.log(body.email)
        const parseResult = SignUpSchema.safeParse(body);
        if (!parseResult.success) {
            return new Response(JSON.stringify({ errorMessage: parseResult.error.message }), { status: 400, headers: { 'Content-Type': 'application/json' } });        }

        const userExist = await prisma.user.findUnique({
            where: {
                email: body.email
            }
        });

        if (userExist) {
            return new Response(JSON.stringify({ errorMessage: "Email already in use" }), { status: 400, headers: { 'Content-Type': 'application/json' } });        }

        const hashPassword = await bcrypt.hash(body.password, 10);

        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.USER_MAIL,
                pass: process.env.USER_PASSWORD
            }
        });

        const user = await prisma.user.create({
            data: {
                name: body.username,
                email: body.email,
                password: hashPassword
            }
        });

        const verificationToken = await prisma.activateToken.create({
            data: {
                token: `${randomUUID()}${randomUUID()}`.replace(/-/g, ''),
                userId: user.id
            }
        });

        const options = {
            from: process.env.USER_MAIL as string,
            to: user.email as string,
            subject: "Verify your email",
            html: `<a href="${process.env.NEXT_PUBLIC_URL}/api/activate/${verificationToken.token}">Click here to verify your email</a>`
        };

        await transport.sendMail(options);

        return new Response(JSON.stringify({ message: "User registered successfully, please check your email to activate your account" }), { status: 200, headers: { 'Content-Type': 'application/json' } });    } catch (error) {
        console.error(error);
    
        // Check if error is an instance of Error
        if (error instanceof Error) {
            return res.status(500).json({ errorMessage: "Error creating user", error: error.message });
        } else {
            // If the error is not an instance of Error, handle it generically.
            // You might not have access to a meaningful message in this case.
            return res.status(500).json({ errorMessage: error });
        }
    }
}
export { handlePOST as POST };