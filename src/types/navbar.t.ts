import { ReactNode } from "react";

export interface NavSubItem {
  title: string;
  href: string;
}

export interface NavItem {
  title: string;
  href: string;
  icon: ReactNode;
  items?: NavSubItem[];
}

export interface NavSection {
  title: string;
  items: NavItem[];
}
