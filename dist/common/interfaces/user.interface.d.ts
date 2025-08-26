import type { UserRole } from "../enums/user-role.enum";
export interface User {
    id: string;
    email: string;
    password: string;
    role: UserRole;
    name: string;
}
