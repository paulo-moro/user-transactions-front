import { ReactNode } from "react";

export interface Ichildrentype {
  children: ReactNode;
}

export interface Itype {
  id: number;
  description: string;
  nature: string;
  signal: string;
}

export interface ITransaction {
  id: number;
  transaction_date: string;
  transaction_time: string;
  amount: string;
  CPF: number;
  card: string;
  shop_rep: string;
  shop_name: string;
  type: Itype;
  user: string;
}

export interface ItransactionParcial {
  transaction_date?: string;
  transaction_time?: string;
  amount?: string;
  CPF?: number;
  card?: string;
  shop_rep?: string;
  shop_name?: string;
  type?: Itype;
}
