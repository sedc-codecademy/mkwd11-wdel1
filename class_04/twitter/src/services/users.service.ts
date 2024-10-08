import { UserCreateModel } from './../db/schemas/user.schema';
import { create, findByUsername } from '../repositories/users.repository';
import bcrypt from 'bcrypt';

export async function getUserByUsername(username: string) {
	return findByUsername(username);
}

export async function createUser(userData: UserCreateModel) {
	const existingUser = await getUserByUsername(userData.username);

	if (existingUser) {
		throw new Error('User already exists');
	}

	const userWithEncryptedPassword: UserCreateModel = {
		...userData,
		password: bcrypt.hashSync(userData.password, 10),
	};

	return create(userWithEncryptedPassword);
}
