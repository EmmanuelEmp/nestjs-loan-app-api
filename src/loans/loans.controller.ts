import { 
  Controller, 
  Get, 
  Delete, 
  UseGuards, 
  ForbiddenException, 
  Req, 
  Param, 
  Query 
} from "@nestjs/common"
import { AuthGuard } from "@nestjs/passport"
import { LoansService } from "./loans.service"
import { RolesGuard } from "../auth/guards/roles.guard"
import { Roles } from "../auth/decorators/roles.decorator"
import { UserRole } from "../common/enums/user-role.enum"
import { LoanStatus } from "../common/enums/loan-status.enum"

@Controller("loans")
@UseGuards(AuthGuard("jwt"))
export class LoansController {
  constructor(private readonly loansService: LoansService) {}

  @Get()
  getAllLoans(@Req() req: any, @Query("status") status?: LoanStatus) {
    const userRole = req.user?.role || UserRole.STAFF

    if (status) {
      return this.loansService.getLoansByStatus(status, userRole)
    }

    return this.loansService.getAllLoans(userRole)
  }

  @Get("expired")
  getExpiredLoans(@Req() req: any) {
    const userRole = req.user?.role || UserRole.STAFF
    return this.loansService.getExpiredLoans(userRole)
  }

  @Get(":userEmail/get")
  getLoansByUserEmail(
    @Param("userEmail") userEmail: string, 
    @Req() req: any
  ) {
    const userRole = req.user?.role || UserRole.STAFF
    return this.loansService.getLoansByUserEmail(userEmail, userRole)
  }

  @Delete(":loanId/delete")
  @UseGuards(RolesGuard)
  @Roles(UserRole.SUPERADMIN)
  deleteLoan(
    @Param("loanId") loanId: string, 
    @Req() req: any
  ) {
    if (req.user?.role !== UserRole.SUPERADMIN) {
      throw new ForbiddenException("Only super admin can delete loans")
    }
    return this.loansService.deleteLoan(loanId)
  }
}
