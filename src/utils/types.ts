export type UserParams = {
    username: string;
    password: string;
}

export type PayloadParams = UserParams & { sub: number | string }