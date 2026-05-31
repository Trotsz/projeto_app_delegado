import userRepository from '../repositories/UserRepository.ts';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class UserService {
  async create(data: any) {
    if (data.password.length < 6) throw new Error('Your password must contain at least 6 digits');

    let containsNumber = false;
    const plen = data.password.length;
    for (let i = 0; i < plen; i++) {
      const asciiCode = data.password.charCodeAt(i);
      if (asciiCode >= 48 && asciiCode <= 57) {
        containsNumber = true;
        break;
      }
    }
    if (!containsNumber) throw new Error('Your password must contain at least 1 number');

    const hashedPassword = await bcrypt.hash(data.password, 10);
    return userRepository.create({
      name: data.name,
      email: data.email,
      role: data.role ?? 'USER',
      hashedPassword,
    });
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
}

export default new UserService();
