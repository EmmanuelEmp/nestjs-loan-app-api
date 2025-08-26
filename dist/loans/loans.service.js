"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoansService = void 0;
const common_1 = require("@nestjs/common");
const user_role_enum_1 = require("../common/enums/user-role.enum");
const loansData = require("../data/loans.json");
let LoansService = class LoansService {
    constructor() {
        this.loans = loansData;
    }
    getAllLoans(userRole) {
        if (userRole === user_role_enum_1.UserRole.STAFF) {
            return this.loans.map((loan) => {
                const { totalLoan, ...applicantWithoutTotal } = loan.applicant;
                return {
                    ...loan,
                    applicant: applicantWithoutTotal,
                };
            });
        }
        return this.loans;
    }
    getLoansByStatus(status, userRole) {
        const filteredLoans = this.loans.filter((loan) => loan.status === status);
        if (userRole === user_role_enum_1.UserRole.STAFF) {
            return filteredLoans.map((loan) => {
                const { totalLoan, ...applicantWithoutTotal } = loan.applicant;
                return {
                    ...loan,
                    applicant: applicantWithoutTotal,
                };
            });
        }
        return filteredLoans;
    }
    getLoansByUserEmail(email, userRole) {
        const userLoans = this.loans.filter((loan) => loan.applicant.email === email);
        if (userRole === user_role_enum_1.UserRole.STAFF) {
            return {
                loans: userLoans.map((loan) => {
                    const { totalLoan, ...applicantWithoutTotal } = loan.applicant;
                    return {
                        ...loan,
                        applicant: applicantWithoutTotal,
                    };
                }),
            };
        }
        return { loans: userLoans };
    }
    getExpiredLoans(userRole) {
        const now = new Date();
        const expiredLoans = this.loans.filter((loan) => {
            const maturityDate = new Date(loan.maturityDate);
            return maturityDate < now;
        });
        if (userRole === user_role_enum_1.UserRole.STAFF) {
            return expiredLoans.map((loan) => {
                const { totalLoan, ...applicantWithoutTotal } = loan.applicant;
                return {
                    ...loan,
                    applicant: applicantWithoutTotal,
                };
            });
        }
        return expiredLoans;
    }
    deleteLoan(loanId) {
        const loanIndex = this.loans.findIndex((loan) => loan.id === loanId);
        if (loanIndex === -1) {
            throw new common_1.NotFoundException("Loan not found");
        }
        return { message: `Loan ${loanId} has been deleted successfully` };
    }
};
exports.LoansService = LoansService;
exports.LoansService = LoansService = __decorate([
    (0, common_1.Injectable)()
], LoansService);
//# sourceMappingURL=loans.service.js.map