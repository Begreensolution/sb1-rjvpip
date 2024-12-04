import { Practice } from '../../practices/types';

export type ClientType = 'company' | 'individual' | 'studio';

export interface ClientContact {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  primary: boolean;
}

export interface ClientAddress {
  street: string;
  city: string;
  province: string;
  postalCode: string;
  country: string;
}

export interface BaseClient {
  id: string;
  type: ClientType;
  name: string;
  email: string;
  phone: string;
  fiscalCode: string;
  address: ClientAddress;
  status: 'active' | 'inactive';
  category: 'standard' | 'premium' | 'vip';
  assignedTo: string[];
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
  practices: Practice[];
}

export interface CompanyClient extends BaseClient {
  type: 'company';
  vatNumber: string;
  legalName: string;
  industry: string;
  contacts: ClientContact[];
  employees: number;
  subsidiaries?: CompanyClient[];
  parentCompany?: string;
  payrollEmployees?: number;
}

export interface IndividualClient extends BaseClient {
  type: 'individual';
  lastName: string;
  dateOfBirth: Date;
  occupation: string;
  employer?: string;
}

export interface StudioClient extends BaseClient {
  type: 'studio';
  referralPartner: string;
  specialization: string;
  associates: ClientContact[];
  clientCount: number;
  managedPractices: Practice[];
}

export type Client = CompanyClient | IndividualClient | StudioClient;

export interface ClientFilter {
  type?: ClientType[];
  category?: string[];
  status?: string[];
  assignedTo?: string[];
  search?: string;
}

export interface ClientStats {
  totalClients: number;
  activeClients: number;
  practicesInProgress: number;
  practicesCompleted: number;
  revenueThisMonth: number;
  revenueLastMonth: number;
}