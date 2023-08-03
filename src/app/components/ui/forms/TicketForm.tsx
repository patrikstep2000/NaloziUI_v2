"use client"

import { FC, useEffect, useState } from "react";
import {
  Alert,
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Typography,
} from "@mui/material";
import { ClientInfoCard, UnregisteredClientInfoCard } from "../InfoCards";
import { ApiUrls } from "@/app/lib/constants";
import { TicketPrinterHeader } from "@/model/Printer/TicketPrinter";
import { TicketUnregisteredPrinterHeader } from "@/model/Printer/TicketUnregisteredPrinter";
import TicketType from "@/model/Ticket";
import SimpleTable from "../../container/reusable/SimpleTable";
import useApi from "@/app/lib/hooks/useApi";

const TicketForm: FC<{ id: number }> = ({ id }) => {
  const connector = useApi();
  const [ticket, setTicket] = useState<TicketType>();

  useEffect(() => {
    const controller = new AbortController();
    if (id) {
      connector
        .get(`${ApiUrls.Ticket}/${id}`, controller)
        .then((res) => {
          setTicket(res.data);
        })
        .catch(console.error);
    }

    return () => {
      controller.abort();
    };
  }, [id]);

  return ticket ? (
    <Box>
      {!ticket.user?.first_name && (
        <Alert
          sx={{ marginBottom: "20px", maxWidth: "400px" }}
          severity="info"
          action={<Button>Preuzmi</Button>}
        >
          Tiket nema rješavatelja.
        </Alert>
      )}
      <Box sx={{ maxWidth: "400px", marginBottom: "20px" }}>
        {ticket.client?.name ? (
          <ClientInfoCard client={ticket.client} />
        ) : (
          <UnregisteredClientInfoCard client={ticket.unregistered_client} />
        )}
      </Box>

      <Box
        sx={{ border: "1px solid #ddd", borderRadius: "5px", padding: "20px" }}
      >
        <Typography variant="h6">{ticket.details}</Typography>
        {!!ticket.printers?.length && (
          <SimpleTable
            rows={ticket.printers}
            headCells={TicketPrinterHeader}
            disableHeader
            tableName="Registrirani printeri"
          />
        )}
        {!!ticket.unregistered_printers?.length && (
          <SimpleTable
            rows={ticket.unregistered_printers}
            headCells={TicketUnregisteredPrinterHeader}
            disableHeader
            tableName="Neregistrirani printeri"
          />
        )}
      </Box>
    </Box>
  ) : (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={true}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default TicketForm;
