
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
        return NextResponse.json({ message: "Não autorizado" }, { status: 401 });
    }

    try {
        const { name, email, phone, address } = await request.json();
        await prisma.customer.create({
            data: {
                name,
                email,
                phone,
                address: address ?? "",
                userId: session.user.id,
            },
        });
        return NextResponse.json(
            { message: "Cliente cadastrado com sucesso" },
            { status: 201 },
        );
    } catch (error) {
        console.error("Erro na criação de novo cliente:", error);
        const message =
            error instanceof Error ? error.message : "Erro desconhecido";
        return NextResponse.json({ message }, { status: 400 });
    }
}


export async function DELETE(request:Request){
    const session = await getServerSession(authOptions);

    if (!session?.user) {
        return NextResponse.json({ message: "Não autorizado" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const customerId = searchParams.get("id");

    if (!customerId || !/^[a-f\d]{24}$/i.test(customerId)) {
        return NextResponse.json({ message: "ID de cliente inválido" }, { status: 400 });
    }

    try {
        const result = await prisma.customer.deleteMany({
            where: {
                id: customerId,
                userId: session.user.id,
            },
        });

        if (result.count === 0) {
            return NextResponse.json({ message: "Cliente não encontrado" }, { status: 404 });
        }

        return NextResponse.json({ message: "Cliente deletado com sucesso" });
    } catch (error) {
        console.error("Erro ao deletar cliente:", error);
        return NextResponse.json({ message: "Erro ao deletar cliente" }, { status: 400 });
    }
}


export async function GET (request: Request){
    const {searchParams} = new URL(request.url);
    const customerEmail = searchParams.get("email") 

    if (!customerEmail || customerEmail === ""){
        return NextResponse.json({message:"E-mail nulo"},{status:400})
    }

    try{    
        const customer = await prisma.customer.findFirst({
            where:{
                email:customerEmail
            }

        })

            return NextResponse.json(customer)

    }catch(err){
        return Response.json({message: "Cliente não encontrado"}, {status:400})
    }

    return Response.json({message: "recebido"})
}