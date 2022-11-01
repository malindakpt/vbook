export class User {
    id?: number;
    firstName: string;
    email: string | null;
    phone: string | null;
    country: string;
    password?: string;

    constructor(usr: any) {
        this.id = usr.id;
        this.firstName = usr.firstName;
        this.email = usr.email;
        this.phone = usr.phone;
        this.country = usr.country;
        this.password = usr.password;
    }

    public isValid() {
        return this.id && this.firstName && (this.email || this.phone ) && this.country;
    }
}