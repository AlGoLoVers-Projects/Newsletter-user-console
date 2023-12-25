import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import {Invitation} from "../../redux/rootslices/api/invitations.slice";


interface InvitationsState {
    invitations: Invitation[];
}

// Actions
export enum InvitationsActionType {
    SET_INVITATIONS = 'SET_INVITATIONS',
    ADD_INVITATION = 'ADD_INVITATION',
    REMOVE_INVITATION = 'REMOVE_INVITATION',
}

type SetInvitationsAction = {
    type: InvitationsActionType.SET_INVITATIONS;
    payload: Invitation[];
};

type AddInvitationAction = {
    type: InvitationsActionType.ADD_INVITATION;
    payload: Invitation;
};

type RemoveInvitationAction = {
    type: InvitationsActionType.REMOVE_INVITATION;
    payload: string; // email address
};

type InvitationsAction = SetInvitationsAction | AddInvitationAction | RemoveInvitationAction;

const invitationsReducer = (state: InvitationsState, action: InvitationsAction): InvitationsState => {
    switch (action.type) {
        case InvitationsActionType.SET_INVITATIONS:
            return { ...state, invitations: action.payload };
        case InvitationsActionType.ADD_INVITATION:
            return { ...state, invitations: [...state.invitations, action.payload] };
        case InvitationsActionType.REMOVE_INVITATION:
            return { ...state, invitations: state.invitations.filter(invitation => invitation.id.emailAddress !== action.payload) };
        default:
            return state;
    }
};

type InvitationsContextType = {
    state: InvitationsState;
    dispatch: React.Dispatch<InvitationsAction>;
};

const InvitationsContext = createContext<InvitationsContextType | undefined>(undefined);

type InvitationsProviderProps = {
    children: ReactNode;
};

export const InvitationsProvider: React.FC<InvitationsProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(invitationsReducer, { invitations: [] });

    return (
        <InvitationsContext.Provider value={{ state, dispatch }}>
            {children}
        </InvitationsContext.Provider>
    );
};

export const useInvitations = () => {
    const context = useContext(InvitationsContext);
    if (!context) {
        throw new Error('useInvitations must be used within an InvitationsProvider');
    }
    return context;
};