import { v4 } from 'uuid'
import { hashSync } from 'bcryptjs'

import type { User } from '~/model/User'

type CreateUserDto = {
    email: string
    password: string
}

type UpdateUserDto = Omit<Partial<User>, 'id'>

class UserRepositoryClass {
    private users: User[]

    constructor() {
        this.users = [
            {
                id: v4(),
                name: 'Vadzim Zakharov',
                email: 'zakharovvadzim@yandex.by',
                password: this.hashPassword('123'),
                twoFA: false,
            },
        ]
    }

    public async findBy(body: string, by: string) {
        return this.users.find((user) => user[by] === body)
    }

    public async findById(id: string) {
        return this.users.find((user) => user.id === id)
    }

    public async create(createUser: CreateUserDto) {
        const password = await this.hashPassword(createUser.password)
        const user = { id: v4(), twoFA: false, ...createUser, password }

        this.users.push(user)

        return user
    }

    public async update(id: string, updateUser: UpdateUserDto) {
        const idx = this.users.findIndex((user) => user.id === id)

        if (idx === -1) {
            throw new Error('There are no user with same id')
        }

        const password = updateUser.password
            ? await this.hashPassword(updateUser.password)
            : this.users[idx].password

        this.users[idx] = { ...this.users[idx], ...updateUser, password }

        return this.users[idx]
    }

    private hashPassword(password: string) {
        return hashSync(password, 10)
    }
}

const UserRepository = new UserRepositoryClass()

export { UserRepository }
