import { ReactNode } from "react";

export interface NavItem {
  title: string;
  href: string;
  icon: ReactNode;
}

export interface NavSection {
  title: string;
  items: NavItem[];
}