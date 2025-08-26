import { Injectable } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import * as bcrypt from "bcryptjs"
import type { User } from "../common/interfaces/user.interface"
import * as staffData from "../data/staff.json"

@Injectable()
export class AuthService {
  private readonly users: User[] = staffData as User[]

  constructor(private jwtService: JwtService) {}

  async validateUser(email: string, password: string): Promise<any> {
    console.log("Login attempt for email:", email)
    console.log(
      "Available users:",
      this.users.map((u) => u.email),
    )

    const user = this.users.find((u) => u.email === email)
    console.log("User found:", !!user)

    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password)
      console.log("Password match:", passwordMatch)
      console.log("Provided password:", password)
      console.log("Stored hash:", user.password)

      if (passwordMatch) {
        const { password: _, ...result } = user
        return result
      }
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
