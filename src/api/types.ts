export interface TicketDTO {
  id: number;
  event_id: number;
  type: string;
  status: string;
  price: number;
  created_at: string;
  updated_at: string;
}

export interface EventDTO {
  id: number;
  name: string;
  date: string;
  location: string | null;
  description: string;
  availableTickets: TicketDTO[];
  created_at: string;
  updated_at: string;
}

export interface Ticket {
  id: number;
  eventId: number;
  type: string;
  status: string;
  price: number;
  createdAt: string;
  updatedAt: string;
}

export interface Event {
  id: number;
  name: string;
  date: string;
  location: string | null;
  description: string;
  availableTickets: Ticket[];
  createdAt: string;
  updatedAt: string;
}

export interface Settings {
  siteName: string;
  supportEmail: string;
  maxTicketsPerOrder: number;
  updatedAt: string;
}

export type SettingsInput = Omit<Settings, 'updatedAt'>;

export const toTicket = (dto: TicketDTO): Ticket => ({
  id: dto.id,
  eventId: dto.event_id,
  type: dto.type,
  status: dto.status,
  price: dto.price,
  createdAt: dto.created_at,
  updatedAt: dto.updated_at,
});

export const toEvent = (dto: EventDTO): Event => ({
  id: dto.id,
  name: dto.name,
  date: dto.date,
  location: dto.location,
  description: dto.description,
  availableTickets: dto.availableTickets.map(toTicket),
  createdAt: dto.created_at,
  updatedAt: dto.updated_at,
});
