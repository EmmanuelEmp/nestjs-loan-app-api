import { Injectable, NotFoundException } from "@nestjs/common"
import type { Loan, LoanForStaff } from "../common/interfaces/loan.interface"
import type { LoanStatus } from "../common/enums/loan-status.enum"
import { UserRole } from "../common/enums/user-role.enum"
import * as loansData from "../data/loans.json"

@Injectable()
export class LoansService {
  private readonly loans: Loan[] = loansData as Loan[]

  getAllLoans(userRole: UserRole): Loan[] | LoanForStaff[] {
    if (userRole === UserRole.STAFF) {
      return this.loans.map((loan) => {
        const { totalLoan, ...applicantWithoutTotal } = loan.applicant
        return {
          ...loan,
          applicant: applicantWithoutTotal,
        }
      }) as LoanForStaff[]
    }
    return this.loans
  }

  getLoansByStatus(status: LoanStatus, userRole: UserRole): Loan[] | LoanForStaff[] {
    const filteredLoans = this.loans.filter((loan) => loan.status === status)

    if (userRole === UserRole.STAFF) {
      return filteredLoans.map((loan) => {
        const { totalLoan, ...applicantWithoutTotal } = loan.applicant
        return {
          ...loan,
          applicant: applicantWithoutTotal,
        }
      }) as LoanForStaff[]
    }
    return filteredLoans
  }

  getLoansByUserEmail(email: string, userRole: UserRole): { loans: Loan[] | LoanForStaff[] } {
    const userLoans = this.loans.filter((loan) => loan.applicant.email === email)

    if (userRole === UserRole.STAFF) {
      return {
        loans: userLoans.map((loan) => {
          const { totalLoan, ...applicantWithoutTotal } = loan.applicant
          return {
            ...loan,
            applicant: applicantWithoutTotal,
          }
        }) as LoanForStaff[],
      }
    }

    return { loans: userLoans }
  }

  getExpiredLoans(userRole: UserRole): Loan[] | LoanForStaff[] {
    const now = new Date()
    const expiredLoans = this.loans.filter((loan) => {
      const maturityDate = new Date(loan.maturityDate)
      return maturityDate < now
    })

    if (userRole === UserRole.STAFF) {
      return expiredLoans.map((loan) => {
        const { totalLoan, ...applicantWithoutTotal } = loan.applicant
        return {
          ...loan,
          applicant: applicantWithoutTotal,
        }
      }) as LoanForStaff[]
    }
    return expiredLoans
  }

  deleteLoan(loanId: string): { message: string } {
    const loanIndex = this.loans.findIndex((loan) => loan.id === loanId)

    if (loanIndex === -1) {
      throw new NotFoundException("Loan not found")
    }

    // In a real application, you would delete from database
    // For this demo, we'll just return success message
    return { message: `Loan ${loanId} has been deleted successfully` }
  }
}
