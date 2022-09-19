export type UserParams = {
    username: string;
    password: string;
}

export type PayloadParams = UserParams & { sub: number | string }

export type UserProfileParams = {
    first_name: string;
    last_name: string;
    birth_date: string;
    email: string;
}