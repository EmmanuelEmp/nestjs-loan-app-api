import { SetMetadata } from "@nestjs/common"
import type { UserRole } from "../../common/enums/user-role.enum"

export const Roles = (...roles: UserRole[]) => SetMetadata("roles", roles)
