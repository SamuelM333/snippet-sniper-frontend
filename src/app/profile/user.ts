export class User {

    id: string;
    name: string;
    last_name: string;
    email: string;
    admin: number;

    constructor(id: string, name: string, last_name: string, email: string, admin: number) {
        this.id = id;
        this.name = name;
        this.last_name = last_name;
        this.email = email;
        this.admin = admin;
    }
}
