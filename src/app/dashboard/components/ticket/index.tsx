"use client"

import { CustomerProps } from "@/utils/curstomer.type";
import { TicketProps } from "@/utils/ticket.type"
import { FiCheckSquare, FiFile, FiTrash2 } from "react-icons/fi"
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";
import { modalContext } from "@/providers/modal";
import { useContext } from "react";



interface TicketItemProps{
    ticket:TicketProps;
    customer: CustomerProps | null;
}


export function TicketItem({ticket, customer}:TicketItemProps){
    const router = useRouter();
    const {handleModalVisible, setDetailTicket} = useContext(modalContext)

    async function handleChangeStatus(){
        try{
            const response = await api.patch("/api/ticket",{
                id: ticket.id
            })

            router.refresh();

        }catch (err){
            console.log(err)
        }
    }

    function handleOpenModal(){
        handleModalVisible();
        setDetailTicket({
            customer: customer,
            ticket: ticket
        })
    }


    return(
        <>
            <tr className="border-2 border-b-slate-200 h-16 last:border-b-0 bg-slate-50 hover:bg-slate-300 duration-300">
                <td className="text-left pl-1">
                    {ticket.name}
                </td>

                <td className="text-left hidden sm:table-cell">
                    {ticket.created_at?.toLocaleDateString("pt-br")}
                </td>

                <td className="text-left">
                    <span className="bg-green-500 px-2 py-1 rounded">{ticket.status}</span>
                </td>

                <td className="text-left">
                    <button className="mr-6">
                        <FiCheckSquare size={24} color="rgb(21, 247, 0)" onClick={handleChangeStatus}/>
                    </button>

                    <button className="mr-3">
                        <FiFile size={24} color="#7375fc" onClick={handleOpenModal}/>
                    </button>
                </td>
            </tr>
        </>
    )
}