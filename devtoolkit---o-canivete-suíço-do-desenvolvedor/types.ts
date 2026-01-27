
import { LucideIcon } from 'lucide-react';

export type Category = 
  | 'Front-end Visual'
  | 'Assets'
  | 'JS & Lógica'
  | 'Back-end & Segurança'
  | 'Dados'
  | 'Infra'
  | 'Úteis';

export interface Tool {
  id: string;
  title: string;
  slug: string;
  category: Category;
  icon: string; // Icon name from Lucide
  description: string;
  isImplemented?: boolean;
}

export interface CategoryInfo {
  name: Category;
  icon: string;
}
