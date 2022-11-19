import { FC, ReactNode } from "react";

export type SelectOption = {
    id: number;
    label: string;
    src?: string;
    Icon?: ReactNode;
    color?: 'inherit' | 'grey' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
}