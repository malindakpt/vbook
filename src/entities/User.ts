export class User {
  id: string;
  email: string;
  name: string;
  authProvider: 'google' | 'facebook' | 'ownAcc';

  constructor(
    id: string,
    email: string,
    name: string,
    authProvider: 'google' | 'facebook' | 'ownAcc'
  ) {
    this.id = id;
    this.email = email;
    this.name = name;
    this.authProvider = authProvider;
  }
}
