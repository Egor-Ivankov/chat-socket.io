import React from "react";

export type AuthorizationInputs = (target: React.ChangeEvent<HTMLInputElement>) => void;

export interface Params {
    name?: string;
    room?: string;
}

export type MessagesType = {
    message: string;
    user: {
        name: string,
    }
}

export type MessagesProps = {
    messages: MessagesType[];
    name: string | undefined;
}

export type EmojiClick = (data: { emoji: string}) => void;

