import prisma from "@/app/prismadb";
import bcrypt from "bcrypt";
import { randomUUID } from "crypto";
import { z } from "zod";
import { SignUpSchema } from "@/ZodSchema/UserSchema";
import nodemailer from "nodemailer";

type SignupSchemaT = z.infer<typeof SignUpSchema>;

export async function POST(request: Request) {
    const body: SignupSchemaT = await request.json();

    // Validate request body against SignUpSchema
    const parseResult = SignUpSchema.safeParse(body);
    if (!parseResult.success) {
        return new Response(JSON.stringify({ errorMessage: "Data provided is not valid" }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    // Check if user already exists
    const userExist = await prisma.user.findUnique({
        where: {
            email: body.email
        }
    });

    if (userExist) {
        return new Response(JSON.stringify({ errorMessage: "Email is associated with another account" }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    // Hash password
    const hashPassword = await bcrypt.hash(body.password, 10);

    // Set up nodemailer transport
    var transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.USER_MAIL,
            pass: process.env.USER_PASSWORD
        }
    });

    try {
        // Create user
        const user = await prisma.user.create({
            data: {
                name: body.username,
                email: body.email,
                password: hashPassword
            }
        });

        // Create activation token
        const verificationToken = await prisma.activateToken.create({
            data: {
                token: `${randomUUID()}${randomUUID()}`.replace(/-/g, ''),
                userId: user.id
            }
        });

        // Email options
        const options = {
            from: process.env.USER_MAIL,
            to: user.email as string,
            subject: "Verify your email",
            html: `<a href="${process.env.NEXT_PUBLIC_URL}/api/activate/${verificationToken.token}">Click here to verify your email</a>`
        };

        // Verify transport and send email
        transport.verify(function (error, success) {
            if (error) {
                console.log(error);
            } else {
                console.log("Server is good to send email");
            }
        });

        await transport.sendMail(options);

        return new Response(JSON.stringify({ message: "User registered successfully, please check your email to activate your account" }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ errorMessage: "Error creating user", error }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }
}
