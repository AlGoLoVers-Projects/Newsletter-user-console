import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {GroupListData, GroupMember} from "../api/groups.slice";

const groupsSlice = createSlice({
    name: 'group-data',
    initialState: {
        groups: [] as GroupListData,
    },
    reducers: {
        setGroupData: (state, action: PayloadAction<GroupListData>) => {
            state.groups = action.payload;
        },
        updateGroupName: (state, action: PayloadAction<{ groupId: string; groupName: string }>) => {
            const groupToUpdate = state.groups.find((group) => group.id === action.payload.groupId);
            if (groupToUpdate) {
                groupToUpdate.groupName = action.payload.groupName;
            }
        },
        updateGroupDescription: (state, action: PayloadAction<{ groupId: string; groupDescription: string }>) => {
            const groupToUpdate = state.groups.find((group) => group.id === action.payload.groupId);
            if (groupToUpdate) {
                groupToUpdate.groupDescription = action.payload.groupDescription;
            }
        },
        addGroupMember: (state, action: PayloadAction<{ groupId: string; member: GroupMember }>) => {
            const groupToUpdate = state.groups.find((group) => group.id === action.payload.groupId);
            if (groupToUpdate) {
                groupToUpdate.groupMembers.push(action.payload.member);
            }
        },
        removeGroupMember: (state, action: PayloadAction<{ groupId: string; userId: string }>) => {
            const groupToUpdate = state.groups.find((group) => group.id === action.payload.groupId);
            if (groupToUpdate) {
                groupToUpdate.groupMembers = groupToUpdate.groupMembers.filter(
                    (member) => member.user.emailAddress !== action.payload.userId
                );
            }
        },
        setEditAccess: (state, action: PayloadAction<{ groupId: string; userId: string; hasEditAccess: boolean }>) => {
            const groupToUpdate = state.groups.find((group) => group.id === action.payload.groupId);
            if (groupToUpdate) {
                const memberToUpdate = groupToUpdate.groupMembers.find(
                    (member) => member.user.emailAddress === action.payload.userId
                );
                if (memberToUpdate) {
                    memberToUpdate.hasEditAccess = action.payload.hasEditAccess;
                }
            }
        },
    },
});

export const {
    setGroupData,
    updateGroupName,
    updateGroupDescription,
    addGroupMember,
    removeGroupMember,
    setEditAccess,
} = groupsSlice.actions;

export const selectGroupData = (state: { groupData: { groups: GroupListData } }) => state.groupData.groups;

export default groupsSlice.reducer;