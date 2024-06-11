'use server';

import { prisma } from "@/lib/prisma";
import { RegisterSchema, registerSchema } from "@/lib/schemas/registerSchema";
import { ActionResult } from "@/types";
import { User } from "@prisma/client";
import bcrypt from 'bcryptjs';
import { error } from "console";

export async function registerUser(data: RegisterSchema): Promise<ActionResult<User>> {
    try {
        const validated = registerSchema.safeParse(data);

        if (!validated.success) {
            return { status: 'error', error: validated.error.errors }
        }

        const { name, email, password } = validated.data;

        const hashedPassword = await bcrypt.hash(password, 10);

        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (existingUser) return { status: 'error', error: 'Email already exist' }

        const user = await prisma.user.create({
            data: {
                name, email, passwordHash: hashedPassword
            }
        })

        return {status: 'success', data: user};
    } catch (error) {
        console.log(error);
        return {status: 'error', error: 'Server Error!'}
    }

}