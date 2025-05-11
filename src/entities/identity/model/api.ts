import {useDeleteData} from '@shared/lib/hooks/api/use-delete-data';
import {usePostData} from '@shared/lib/hooks/api/use-post-data';
import {Endpoints} from '../config/endoints';
import ICreateTokenResponse from '../types/create-token-response';
import ICreateTokenResponseParams from '../types/create-token-response-params';

export const useCreateToken = () => {
    const {
        mutateAsync,
        error,
        isPending,
        isError,
    } = usePostData<ICreateTokenResponse, ICreateTokenResponseParams>({
        url: Endpoints.Token,
    });

    return {
        mutateToken: mutateAsync,
        errorToken: error?.response,
        isPendingToken: isPending,
        isErrorToken: isError,
    };
};

export const useDeleteToken = () => {
    const {
        mutateAsync,
        error,
        isPending,
        isError,
    } = useDeleteData({
        url: Endpoints.Token,
    });

    return {
        deleteToken: mutateAsync,
        errorDeleteToken: error?.response,
        isPendingDeleteToken: isPending,
        isErrorDeleteToken: isError,
    };
};
