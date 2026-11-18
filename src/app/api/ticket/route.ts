import { NextResponse } from "next/server";
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";


export async function PATCH(request: Request) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        return NextResponse.json({ error: "Not authorized" }, { status: 401 })
    }

    const { id } = await request.json();

    const findTicket = await prisma.ticket.findFirst({
        where: {
            id: id as string
        }
    })

    if (!findTicket) {
        return NextResponse.json({ error: "Erro ao atualizado ticket" }, { status: 400 })
    }

    try {
        await prisma.ticket.update({
            where: {
                id: id as string
            },
            data: {
                status: "Fechado"
            }
        })
        return NextResponse.json({ message: "Chamado atualizado com sucesso" })
    } catch (err) {
        console.log(err)
    }
}


export async function POST(request: Request) {
    const { customerId, name, description } = await request.json();

    if (!customerId || !name || !description) {
        return NextResponse.json({ message: "Erro no cadastro" }, { status: 400 })
    }

    try {
        await prisma.ticket.create({
            data:{
                name: name,
                description: description,
                status: "ABERTO",
                customerId: customerId
            }
        })

        return NextResponse.json ({message:"Registro concluido"})
    } catch (err) {
        console.log(err)
        return NextResponse.json({ message: "Erro no cadastro do ticket" }, { status: 400 })

    }

}