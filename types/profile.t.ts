export interface ProfileInfo {
  id: string;
  fullName: string;
  avatarUrl: string;
  role: string;
  startDate: string; // ISO, e.g. '2025-06-05'
  birthDate: string;
  pinCode: string;
  tabNumber: string;
  email: string;
  phone: string;
  homePhone?: string;
  address: string;
  ledgerAccount?: string;
  telegramBotCode?: string;
  position: string;
}
