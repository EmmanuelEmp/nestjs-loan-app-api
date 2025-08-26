import type { Loan, LoanForStaff } from "../common/interfaces/loan.interface";
import type { LoanStatus } from "../common/enums/loan-status.enum";
import { UserRole } from "../common/enums/user-role.enum";
export declare class LoansService {
    private readonly loans;
    getAllLoans(userRole: UserRole): Loan[] | LoanForStaff[];
    getLoansByStatus(status: LoanStatus, userRole: UserRole): Loan[] | LoanForStaff[];
    getLoansByUserEmail(email: string, userRole: UserRole): {
        loans: Loan[] | LoanForStaff[];
    };
    getExpiredLoans(userRole: UserRole): Loan[] | LoanForStaff[];
    deleteLoan(loanId: string): {
        message: string;
    };
}
