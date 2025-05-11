import {useMutation, UseMutationOptions} from '@tanstack/react-query';
import {AxiosError} from 'axios';
import {apiBaseClient} from '@shared/api/base-client';

interface IParams<Response, Data = void> {
    url: string;
    options?: Omit<UseMutationOptions<Response, AxiosError, Data>, 'mutationKey' | 'mutationFn'>;
}

export const useDeleteData = <Response, Data = void>({
    url,
    options,
}: IParams<Response, Data>) => {
    return useMutation<Response, AxiosError, Data>({
        mutationKey: ['MUTATION_KEY_' + url],
        mutationFn: async (data?: Data) => {
            const response = await apiBaseClient.delete<Response>(url, {data});
            return response.data;
        },
        ...options,
    });
};
