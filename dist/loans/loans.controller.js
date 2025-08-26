"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoansController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const loans_service_1 = require("./loans.service");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const user_role_enum_1 = require("../common/enums/user-role.enum");
const loan_status_enum_1 = require("../common/enums/loan-status.enum");
let LoansController = class LoansController {
    constructor(loansService) {
        this.loansService = loansService;
    }
    getAllLoans(req, status) {
        const userRole = req.user?.role || user_role_enum_1.UserRole.STAFF;
        if (status) {
            return this.loansService.getLoansByStatus(status, userRole);
        }
        return this.loansService.getAllLoans(userRole);
    }
    getExpiredLoans(req) {
        const userRole = req.user?.role || user_role_enum_1.UserRole.STAFF;
        return this.loansService.getExpiredLoans(userRole);
    }
    getLoansByUserEmail(userEmail, req) {
        const userRole = req.user?.role || user_role_enum_1.UserRole.STAFF;
        return this.loansService.getLoansByUserEmail(userEmail, userRole);
    }
    deleteLoan(loanId, req) {
        if (req.user?.role !== user_role_enum_1.UserRole.SUPERADMIN) {
            throw new common_1.ForbiddenException("Only super admin can delete loans");
        }
        return this.loansService.deleteLoan(loanId);
    }
};
exports.LoansController = LoansController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)("status")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], LoansController.prototype, "getAllLoans", null);
__decorate([
    (0, common_1.Get)("expired"),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], LoansController.prototype, "getExpiredLoans", null);
__decorate([
    (0, common_1.Get)(":userEmail/get"),
    __param(0, (0, common_1.Param)("userEmail")),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], LoansController.prototype, "getLoansByUserEmail", null);
__decorate([
    (0, common_1.Delete)(":loanId/delete"),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.SUPERADMIN),
    __param(0, (0, common_1.Param)("loanId")),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], LoansController.prototype, "deleteLoan", null);
exports.LoansController = LoansController = __decorate([
    (0, common_1.Controller)("loans"),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt")),
    __metadata("design:paramtypes", [loans_service_1.LoansService])
], LoansController);
//# sourceMappingURL=loans.controller.js.map