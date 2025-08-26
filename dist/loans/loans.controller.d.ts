import { LoansService } from "./loans.service";
import { LoanStatus } from "../common/enums/loan-status.enum";
export declare class LoansController {
    private readonly loansService;
    constructor(loansService: LoansService);
    getAllLoans(req: any, status?: LoanStatus): import("../common/interfaces/loan.interface").Loan[] | import("../common/interfaces/loan.interface").LoanForStaff[];
    getExpiredLoans(req: any): import("../common/interfaces/loan.interface").Loan[] | import("../common/interfaces/loan.interface").LoanForStaff[];
    getLoansByUserEmail(userEmail: string, req: any): {
        loans: import("../common/interfaces/loan.interface").Loan[] | import("../common/interfaces/loan.interface").LoanForStaff[];
    };
    deleteLoan(loanId: string, req: any): {
        message: string;
    };
}
