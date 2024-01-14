import React from "react";

export type AuthorizationInputs = (target: React.ChangeEvent<HTMLInputElement>) => void;

export interface Params {
    name?: string;
    room?: string;
}

export interface Messages {
    name?: string;
    message?: string;
}