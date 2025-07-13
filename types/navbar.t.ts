import { ReactNode } from "react";

export interface NavItem {
  title: string;
  href: string;
  icon: ReactNode;
  items?: Omit<NavItem, "icon">[];
}

export interface NavSection {
  title: string;
  items: NavItem[];
}