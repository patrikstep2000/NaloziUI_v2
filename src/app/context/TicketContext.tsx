"use client"

import TicketType from "@/model/Ticket";
import { FC, ReactNode, createContext, useContext, useState } from "react";

const TicketContext = createContext<{
    ticket: Partial<TicketType | null>;
    setTicket: Function | null;
  }>({ ticket: null, setTicket: null });

export const TicketProvider: FC<{children: ReactNode}> = ({children}) => {
  const [ticket, setTicket] = useState<TicketType | null>(null);

  return <TicketContext.Provider value={{ticket, setTicket}}>
    {children}
  </TicketContext.Provider>
};

export const useTicketContext = () => useContext(TicketContext);