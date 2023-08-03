"use client"

import TicketCard from "@/app/components/container/reusable/TicketCard";
import { ApiUrls, UIUrls } from "@/app/lib/constants";
import useApi from "@/app/lib/hooks/useApi";
import TicketType from "@/model/Ticket";
import { Stack } from "@mui/system";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function TicketsPage() {
  const connector = useApi();
  const router = useRouter();
  const [tickets, setTickets] = useState<TicketType[]>([]);

  useEffect(() => {
    const controller = new AbortController();

    connector
      .get(ApiUrls.Tickets, controller)
      .then((res) => {
        setTickets(res.data.data);
      })
      .catch(console.error);

    return () => {
      controller.abort();
    };
  }, []);

  const onTicketClick = (id: number) => {
    router.push(`${UIUrls.Ticket}/${id}`);
  };

  return (
    <Stack direction="row" flexWrap="wrap" sx={{ gap: 2 }}>
      {tickets?.map((ticket) => {
        return (
          <TicketCard ticket={ticket} key={ticket.id} onClick={onTicketClick} />
        );
      })}
    </Stack>
  );
}
