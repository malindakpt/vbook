import jwtDecode from "jwt-decode";
import { getCookie } from "typescript-cookie";

export class User {
  id?: number;
  name: string;
  identifier: string;
  country: string;
  email?: string;
  phone?: string;
  password?: string;

  constructor(usr: any) {
    this.id = usr.id;
    this.identifier = usr.identifier;
    this.name = usr.name;
    this.email = usr.email;
    this.phone = usr.phone;
    this.country = usr.country;
    this.password = usr.password;
  }

  public isValid() {
    return this.id && this.name && this.identifier && this.country;
  }

  public static getUserFromCookie() {
    const token = getCookie("access-token");

    if (!token) {
      return null;
    }
    try {
      const user = jwtDecode(token);
      const userObj = new User(user);
      if (userObj.isValid()) {
        return JSON.parse(JSON.stringify(userObj));
      }
    } catch (e) {
      return null;
    }
    return null;
  }
}
