import React from "react";

export type AuthorizationInputs = (target: React.ChangeEvent<HTMLInputElement>) => void;

export interface Params {
    name?: string;
    room?: string;
}