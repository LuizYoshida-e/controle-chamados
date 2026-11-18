import { Input } from "@/app/dashboard/components/input"
import z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { api } from "@/lib/api"
import { CustomerDataInfo } from "../../page"

const schema = z.object({
    name:z.string().min(1,"o nome do chamado é obrigatório"),
    description:z.string().min(1,"Descreva um pouco sobre o seu problema")
})

type FormTicketData = z.infer<typeof schema>

interface FormTicketProps{
    customer:CustomerDataInfo
}

export function FormTicket({customer}:FormTicketProps){
    const {register,setValue, handleSubmit, formState:{errors}} = useForm<FormTicketData>({
        resolver: zodResolver(schema)
    })

    async function handleRegisterTicket(data:FormTicketData){
        const response = await api.post("/api/ticket",{
            name: data.name,
            description: data.description,
            customerId: customer.id

        })

        setValue("name","")
        setValue("description","")
    }

    return(
        <form className="bg-slate-200 mt-6 px-4 py-6 rounded-2" onSubmit={handleSubmit(handleRegisterTicket)} >
            <label className="mb-1 font-medium text-lg">
                <Input
                register={register}
                type="text"
                placeholder="Digite o nome do chamado"
                name="name"
                error={errors.name?.message}
                >
                </Input>
            </label>
            <label>Descreva o problema</label>
            <textarea 
            className="w-full border-2 rounded-md h-24 resize:none mb-2 px-2 "
            placeholder="Descreva seu problema"
            id="description"
            {...register("description")}
            ></textarea>
            {errors.description?.message && <p className="text-red-400 my-1">{errors.description?.message}</p>}
            <button type="submit" className="bg-blue-500 rounded-md w-full h-11 px-2 font-bold">Cadastrar</button>
        </form>
    )
}