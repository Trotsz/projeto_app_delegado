import userRepository from '../repositories/UserRepository.ts';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class UserService {
  async create(data: any) {
    const hashedPassword = await bcrypt.hash(data.hashedPassword, 10);
    return userRepository.create({ ...data, hashedPassword });
  }

  async login(data: any) {
    const user = await this.findByEmail(data.email);
    if (user == null) throw new Error('There is no registered user with that email');
    const res = await bcrypt.compare(data.password, user.hashedPassword);
    if (res == null) throw new Error('Invalid credentials');

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
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
