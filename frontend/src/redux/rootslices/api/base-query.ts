import {fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const baseAuthenticatedQuery = fetchBaseQuery({
    baseUrl: '/',
    prepareHeaders: (headers, {getState}) => {
        const token = (getState() as any).auth.token

        if (token) {
            headers.set('Authorization', `${token}`)
        }

        return headers
    },
})