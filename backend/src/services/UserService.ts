import UserRepository from '../repositories/UserRepository.ts';

class UserService {
  async findAll() {
    return UserRepository.findAll();
  }
}

export default new UserService();
