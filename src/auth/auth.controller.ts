import { Controller, Post, UseGuards } from "@nestjs/common"
import { AuthGuard } from "@nestjs/passport"
import type { AuthService } from "./auth.service"

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard("local"))
  @Post("login")
  async login(req: any) {
    return this.authService.login(req.user)
  }

  @Post("logout")
  async logout() {
    return this.authService.logout()
  }
}
