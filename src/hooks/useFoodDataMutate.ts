import { useMutation, UseMutationResult, InvalidateQueryFilters, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { FoodData } from "../interface/FoodData";

const postData = async (data: FoodData): Promise<AxiosResponse<any>> => {
    const response = await axios.post("http://localhost:8080/food", data);
    return response;
};

export function useFoodDataMutate(): UseMutationResult<AxiosResponse<any, any>, Error, FoodData, unknown> {
    const queryClient = useQueryClient();
    const mutate = useMutation<AxiosResponse<any, any>, Error, FoodData, unknown>({
        mutationFn: postData,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries(["food-data"] as InvalidateQueryFilters);
        }
    });

    return mutate;
}
