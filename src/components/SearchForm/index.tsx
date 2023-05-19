import { MagnifyingGlass } from "phosphor-react";
import { SearchFormContainer } from "./styles";
import { useForm } from "react-hook-form";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const searchFormSchema = zod.object({
    query: zod.string(),
});

type SearchFormInputs = zod.infer<typeof searchFormSchema>;

export function SearchForm(){
    const { 
        register,
        handleSubmit,
        formState: { isSubmitting }
    } = useForm<SearchFormInputs>({
        resolver: zodResolver(searchFormSchema)
    });

    function handleSearchTransaction(data: SearchFormInputs){
        console.log(data)
    }

    return (
        <SearchFormContainer onSubmit={handleSubmit(handleSearchTransaction)}>
            <input
                type="text"
                placeholder="Busque por transações"
                {...register("query")} 
            />

            <button type="submit" disabled={isSubmitting}>
                <MagnifyingGlass size={20} />
                Buscar
            </button>

        </SearchFormContainer>
    )
}