import userRepository from '../repositories/UserRepository.ts';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class UserService {
  async create(data: any) {
    if (data.password.length < 8) throw new Error('Sua senha deve conter pelo menos 8 caracteres');

    const plen = data.password.length;

    let containsNumber = false;
    for (let i = 0; i < plen; i++) {
      const asciiCode = data.password.charCodeAt(i);
      if (asciiCode >= 48 && asciiCode <= 57) {
        containsNumber = true;
        break;
      }
    }
    if (!containsNumber) throw new Error('Sua senha deve conter pelo menos 1 número');

    let containsUCLetter = false;
    for (let i = 0; i < plen; i++) {
      const asciiCode = data.password.charCodeAt(i);
      if (asciiCode >= 65 && asciiCode <= 90) {
        containsUCLetter = true;
        break;
      }
    }
    if (!containsUCLetter) throw new Error('Sua senha deve conter pelo menos 1 letra maiúscula');

    const hashedPassword = await bcrypt.hash(data.password, 10);
    try {
      return await userRepository.create({
        name: data.name,
        email: data.email,
        role: data.role ?? 'USER',
        hashedPassword,
      });
    } catch (err: any) {
      if (err?.code === 'P2002' || err?.message?.includes('Unique constraint')) {
        throw new Error('Este email já está cadastrado');
      }
      throw err;
    }
  }

  async login(data: any) {
    const user = await this.findByEmail(data.email);
    if (user == null) throw new Error('There is no registered user with that email');

    const hashedPassword = user.hashedPassword;
    if (hashedPassword == null) throw new Error('Invalid credentials');

    const isValid = await bcrypt.compare(data.password, hashedPassword);
    if (!isValid) throw new Error('Invalid credentials');

    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error('Server misconfiguration');

    const token = jwt.sign(
      { id: user.id, name: user.name, email: user.email, role: user.role },
      secret,
      { expiresIn: '4d' },
    );

    return { token, user: { id: user.id, name: user.name, email: user.email, role: user.role } };
  }

  async findAll() {
    return userRepository.findAll();
  }

  async findByEmail(email: string | string[] | undefined) {
    return userRepository.findByEmail(email);
  }

  async update(id: string, data: { name?: string }) {
    return userRepository.update(id, data);
  }

  async changePassword(id: string, currentPassword: string, newPassword: string) {
    const user = await userRepository.findById(id);
    if (!user || !user.hashedPassword) throw new Error('Usuário não encontrado');

    const isValid = await bcrypt.compare(currentPassword, user.hashedPassword);
    if (!isValid) throw new Error('Senha atual incorreta');

    if (newPassword.length < 8) throw new Error('Sua senha deve conter pelo menos 8 caracteres');

    let containsNumber = false;
    for (let i = 0; i < newPassword.length; i++) {
      const asciiCode = newPassword.charCodeAt(i);
      if (asciiCode >= 48 && asciiCode <= 57) {
        containsNumber = true;
        break;
      }
    }
    if (!containsNumber) throw new Error('Sua senha deve conter pelo menos 1 número');

    let containsUCLetter = false;
    for (let i = 0; i < newPassword.length; i++) {
      const asciiCode = newPassword.charCodeAt(i);
      if (asciiCode >= 65 && asciiCode <= 90) {
        containsUCLetter = true;
        break;
      }
    }
    if (!containsUCLetter) throw new Error('Sua senha deve conter pelo menos 1 letra maiúscula');

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    return userRepository.update(id, { hashedPassword });
  }
}

export default new UserService();
