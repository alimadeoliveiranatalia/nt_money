import * as Dialog from "@radix-ui/react-dialog";
import { Overlay, Content, CloseButton, TransactionType, TransactionTypeButton } from "./styles";
import { ArrowCircleUp, X, ArrowCircleDown } from "phosphor-react";
import * as zod from "zod";
import { useForm } from "react-hook-form";

const newTransactionFormSchema = zod.object({
    description: zod.string(),
    price: zod.number(),
    category: zod.string(),
    type: zod.enum(['income', 'outcome'])
});

type NewTransactionFormInputs = zod.infer<typeof newTransactionFormSchema>;

export function NewTransactionModal(){
    const { register, handleSubmit, formState: { isSubmitting }} = useForm<NewTransactionFormInputs>();

    function handleNewCreateTransaction(data: NewTransactionFormInputs){
        console.log(data);
    }

    return (
        <Dialog.Portal>
            <Overlay/>
            <Content>
                <Dialog.Title>Nova Transação</Dialog.Title>
                <CloseButton>
                    <X size={24}/>
                </CloseButton>
                <form onSubmit={handleSubmit(handleNewCreateTransaction)}>
                    <input type="text" placeholder="Descrição" required {...register('description')}/>

                    <input type="number" placeholder="Preço" required {...register('price', { valueAsNumber: true })}/>

                    <input type="text" placeholder="Categoria" required {...register('category')}/>
                    <TransactionType>
                        <TransactionTypeButton variant="income" value="income">
                            <ArrowCircleUp size={24} />
                            Entrada
                        </TransactionTypeButton>
                        <TransactionTypeButton variant="outcome" value="outcome">
                            <ArrowCircleDown size={24} />
                            Saída
                        </TransactionTypeButton>
                    </TransactionType>
                    <button type="submit" disabled={isSubmitting}>Cadastrar</button>
                </form>
            </Content>
        </Dialog.Portal>
    )
}