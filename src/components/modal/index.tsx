"use client"

import { useContext } from "react"
import { modalContext } from "@/providers/modal"

export function ModalTicket() {
    const { handleModalVisible, ticket } = useContext(modalContext)

    return (
        <section
            className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/70 p-4 "
            onClick={handleModalVisible}
        >
            <article
                role="dialog"
                aria-modal="true"
                aria-labelledby="ticket-modal-title"
                className="max-h-full w-full max-w-2xl overflow-y-auto rounded bg-white p-3 shadow-2xl"
                onClick={(event) => event.stopPropagation()}
            >
                <header className="mb-4 flex items-center justify-between gap-4">
                    <h1 id="ticket-modal-title" className="font-bold text-lg md:text-2xl">
                        Detalhes do chamado
                    </h1>
                    <button
                        type="button"
                        className="rounded bg-red-500 p-1 text-white cursor-pointer"
                        onClick={handleModalVisible}

                    >
                        Fechar
                    </button>
                </header>

                <div className="mb-2 flex flex-wrap gap-1">
                    <h2 className="font-bold">Nome:</h2>
                    <p>{ticket?.ticket.name}</p>
                </div>

                <div className="mb-2 flex flex-col flex-wrap gap-1">
                    <h2 className="font-bold">Descrição:</h2>
                    <p>{ticket?.ticket.description}</p>
                </div>

                <div className="my-4 w-full border-t-[1.5px]">
                    <h2 className="mb-4 text-lg font-bold">Detalhes do cliente</h2>
                </div>
                <div className="mb-2 flex flex-wrap gap-1">
                    <h2 className="font-bold">Nome:</h2>
                    <p>{ticket?.customer?.name}</p>
                </div>
                <div className="mb-2 flex flex-wrap gap-1">
                    <h2 className="font-bold">Telefone:</h2>
                    <p>{ticket?.customer?.phone}</p>
                </div>
                <div className="mb-2 flex flex-wrap gap-1">
                    <h2 className="font-bold">E-mail:</h2>
                    <p>{ticket?.customer?.email}</p>
                </div>
                {ticket?.customer?.address && (
                    <div className="mb-2 flex flex-wrap gap-1">
                        <h2 className="font-bold">Endereço:</h2>
                        <p>{ticket?.customer?.address}</p>
                    </div>
                )}
            </article>
        </section>
    )
}
