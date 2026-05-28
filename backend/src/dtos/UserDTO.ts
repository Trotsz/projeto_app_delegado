export class UserDTO {
  private name: string;
  private email: string;

  constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
  }

  getName() {
    return this.name;
  }
  getEmail() {
    return this.email;
  }

  static fromUser(user: any) {
    return new UserDTO(user.name, user.email);
  }
}
