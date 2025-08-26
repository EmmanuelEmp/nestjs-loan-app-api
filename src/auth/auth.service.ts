import { Injectable } from "@nestjs/common"
import type { JwtService } from "@nestjs/jwt"
import * as bcrypt from "bcryptjs"
import type { User } from "../common/interfaces/user.interface"
import * as staffData from "../data/staff.json"

@Injectable()
export class AuthService {
  private readonly users: User[] = staffData as User[]

  constructor(private jwtService: JwtService) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = this.users.find((u) => u.email === email)
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password: _, ...result } = user
      return result
    }
    return null
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id, role: user.role }
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    }
  }

  async logout(): Promise<{ message: string }> {
    return { message: "Successfully logged out" }
  }
}
