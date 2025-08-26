import type { LoanStatus } from "../enums/loan-status.enum"

export interface Applicant {
  name: string
  email: string
  telephone: string
  totalLoan: string
}

export interface ApplicantWithoutTotal {
  name: string
  email: string
  telephone: string
}

export interface Loan {
  id: string
  amount: string
  maturityDate: string
  status: LoanStatus
  applicant: Applicant
  createdAt: string
}

export interface LoanForStaff {
  id: string
  amount: string
  maturityDate: string
  status: LoanStatus
  applicant: ApplicantWithoutTotal
  createdAt: string
}
