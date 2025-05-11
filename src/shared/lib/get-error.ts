import {AxiosError} from 'axios';
import * as v from 'valibot';

export const getError = (error: unknown): Record<string, string> => {
    if (error instanceof v.ValiError) {
        return error.issues.reduce((acc, issue) => {
            if (issue.path[0].key) {
                acc[issue.path[0].key] = issue.message;
            }

            return acc;
        }, {} as Record<string, string>);
    }

    if (error instanceof Error) {
        return {
            errorMessage: error.message,
        };
    }

    if (error instanceof AxiosError) {
        return error.response?.data;
    }

    return {
        errorMessage: 'Произошла ошибка',
    };
};
