export type LoginInput = {
    email: string;
    password: string;
}

export type LoginOutput = {
    accessToken: string
    success: boolean
    message: string
    user: User
}

export type GetUserOutput = {
    success: boolean
    message: string
    user: User
}

export type RegisterInput = {
    name: string
    email: string
    password: string
}

export type RegisterOutput = {
    success: boolean
    message: string
    accessToken: string
}


export type User = {
    id: number
    email: string
    name: string
    createdAt: string
}