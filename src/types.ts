import { LucideIcon } from 'lucide-react';

export interface Tool {
  id: string;
  name: string;
  icon: LucideIcon;
  component: React.ComponentType;
}

export interface Publication {
  title: string;
  authors: string[];
  journal: string;
  date: Date;
  doi: string;
}