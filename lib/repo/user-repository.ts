import fs from 'fs'
import { join } from 'path'
import { v4 } from 'uuid'
import { genSalt, hash } from 'bcryptjs'

import type { User } from '~/model/User'

import users from '~/db/users.json'

type CreateUserDto = {
    email: string
    password: string
}

type UpdateUserDto = Omit<Partial<User>, 'id'>

class UserRepositoryClass {
    public async findBy(body: string, by: string) {
        return users.find((user) => user[by] === body)
    }

    public async findById(id: string) {
        return users.find((user) => user.id === id)
    }

    public async create(createUser: CreateUserDto) {
        const password = await this.hashPassword(createUser.password)
        const user = { id: v4(), twoFA: false, ...createUser, password }
        // @ts-ignore
        users.push(user)
        this.save()

        return user
    }

    public async update(id: string, updateUser: UpdateUserDto) {
        const idx = users.findIndex((user) => user.id === id)

        if (idx === -1) {
            throw new Error('There are no user with same id')
        }

        const password = updateUser.password
            ? await this.hashPassword(updateUser.password)
            : users[idx].password

        // @ts-ignore
        users[idx] = { ...users[idx], ...updateUser, password }
        this.save()

        return users[idx]
    }

    private async hashPassword(password: string) {
        const salt = await genSalt(10)
        return await hash(password, salt)
    }

    private async save() {
        fs.writeFileSync('db/users.json', JSON.stringify(users, null, 4))
    }
}

const UserRepository = new UserRepositoryClass()

export { UserRepository }
