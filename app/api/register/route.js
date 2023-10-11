import bcrypt from 'bcrypt';
import prisma from "../../libs/prismadb"
import { NextResponse, NextRequest } from 'next/server';

export async function POST(request) {
    const { name, email, password } = await request.json();
    /* if (!name || !email || !password) {
        return new NextResponse('Missing Fields', {
            status: 400
        })
    } */

    console.log(name, email, password);

    if (!name) {
        return new NextResponse('Missing name Field', {
            status: 400
        })
    }

    if(!email) {
        return new NextResponse('Missing email Field', {
            status: 400
        })
    }

    if(!password) {
        return new NextResponse('Missing password Field', {
            status: 400
        })
    }

    const exist = await prisma.user.findUnique({
        where: {
            email: email
        }
    });
    if (exist)
        throw new Error('Email already exists');

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: {
            name: name,
            email: email,
            hashedPassword
        }
    });

    return NextResponse.json(user);
}