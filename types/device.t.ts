export interface Device {
  id: number;
  device_id: string;
  device_type: string; // например "Entrance" или "Exit"
  name: string; // человекочитаемое название
  ip_address: string;
  location: string; // адрес или название филиала
  is_active: boolean;
  branch: number; // ID филиала
  created_at: string; // ISO-дата создания
  updated_at: string; // ISO-дата последнего апдейта
}
