import ticketIF from "./ticketIF"

export default interface userData {
    email: string;
    password: string;
    tickets: [ticketIF]
  }
