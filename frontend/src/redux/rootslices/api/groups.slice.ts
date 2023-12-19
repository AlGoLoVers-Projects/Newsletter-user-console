import {Result} from "../../../types/result";
import {baseApiSlice} from "./base.slice";

export type User = {
    displayName: string;
    emailAddress: string;
    profilePicture: string | null;
    authorities: string[];
};

export type GroupMember = {
    user: User;
    hasEditAccess: boolean;
};

export type GroupOwner = User;

export type GroupData = {
    id: string;
    groupName: string;
    groupDescription: string;
    groupOwner: GroupOwner;
    groupMembers: GroupMember[];
    updatedAt: string | null;
};

export type GroupDataRequest = {
    groupName: string,
    groupDescription: string
}

export type GroupIdRequest = {
    groupId: string
}

export type GroupEditRequest = GroupDataRequest & GroupIdRequest;

export type GroupResponse = GroupData[];

export const groupsSlice = baseApiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getGroups: builder.mutation<Result<GroupResponse>, null>({
            query: () => ({
                url: '/api/group/listAllGroups',
                method: 'GET',
            }),
        }),
        newGroup: builder.mutation<Result<string>, GroupDataRequest>({
            query: (data) => ({
                url: '/api/group/provisionNewGroup',
                method: 'POST',
                body: data
            }),
        }),
        editGroup: builder.mutation<Result<string>, GroupEditRequest>({
            query: (data) => ({
                url: '/api/group/editGroupInformation',
                method: 'PUT',
                body: data
            }),
        }),
        deleteGroup: builder.mutation<Result<string>, GroupIdRequest>({
            query: (data) => ({
                url: '/api/group/deleteGroup',
                method: 'DELETE',
                body: data
            }),
        }),
    }),
});

export const {useGetGroupsMutation, useNewGroupMutation, useEditGroupMutation, useDeleteGroupMutation} = groupsSlice;