export interface CompanySettings {
  id_display: string;
  timezone: string;
  language: string;
  time_format: "12" | "24";
  date_format: string;
  currency: string;
}
