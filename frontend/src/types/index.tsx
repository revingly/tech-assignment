export interface User {
    email: string;
    name: string;
}

export interface LoginData {
    email: string;
    password: string;
}

export interface RegistrationData {
    name: string,
    email: string;
    password: string;
    password_confirmation: string
}

export enum AuthStatus {
    SignedOut,
    SignedIn
}

export interface IAuth {
    authStatus?: AuthStatus;
    signIn?: any;
    signOut?: any;
}

export type Props = {
    children?: React.ReactNode;
};

export interface MovieProps {
    id: number,
    title: string,
    poster_path: string
}

export interface MoviesHttpResponseProps {
    page: number,
    results: MovieProps[],
    total_pages: number,
    total_results: number
}
