import { Config } from 'ziggy-js';

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
}

export interface Image {
    id: number;
    filename: string;
    path: string;
    alt?: string;
}

export interface Muscle {
    id: number;
    name: string;
    image?: Image;
}

export interface MuscleForm {
    name: string;
    imageId?: number;
}

export interface ImageForm {
    image?: File;
    alt?: string;
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
    ziggy: Config & { location: string };
};
