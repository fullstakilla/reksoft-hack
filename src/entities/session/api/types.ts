export type LoginRequest = {
    phoneOrEmail: string,
    password: string,
}

export type RegisterRequest = {
    name: string,
    surname: string,
    patronymic: string,
    phone: string,
    email: string,
    password: string,
    roleId: roleIdType
}

export type AuthResponse = {
    token: string,
}