"use client";

import {
  Card,
  CardContent,
  Typography,
  SxProps,
  Theme,
  IconButton,
  CardActions,
  CardActionArea,
  CardHeader,
  Chip,
  Divider,
  Button,
  Stack,
} from "@mui/material";
import React, { FC } from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import { useRouter } from "next/navigation";
import TicketType from "@/model/Ticket";
import { ApiUrls } from "@/app/lib/constants";
import { ClientFormatter, UserFormatter } from "@/app/lib/util/Formatters";
import useApi from "@/app/lib/hooks/useApi";
import { useSession } from "next-auth/react";

const TicketCard: FC<{ ticket: TicketType; onClick: (id: number) => void }> = ({
  ticket: {
    id,
    details,
    planned_solution_date,
    unregistered_client,
    client,
    user,
    printers,
    unregistered_printers,
  },
  onClick,
}) => {
  const { data: session } = useSession();
  const connector = useApi();
  const router = useRouter();
  const contact = client?.contacts && client?.contacts[0];
  const location = client?.name
    ? client.location
      ? `${client?.location?.x},${client?.location?.y}`
      : client?.address
    : unregistered_client?.location
    ? `${unregistered_client?.location?.x},${unregistered_client?.location?.y}`
    : unregistered_client?.address;

  const isTaken = user?.first_name && user.last_name ? true : false;

  const cardStyle: SxProps<Theme> = {
    position: "relative",
    minWidth: 400,
    maxWidth: 600,
  };

  const headerStyle: SxProps<Theme> = {
    borderLeft: `6px solid ${isTaken ? "#1E90FF" : "#f93c90"}`,
    backgroundColor: "#f8fafc",
  };

  const onTakeSolution = () => {
    connector.patch(`${ApiUrls.TakeTicket}`, {}, String(id)).then((res) => {
      window.location.reload();
    });
  };

  return (
    <Card sx={cardStyle} variant="elevation">
      <CardActionArea onClick={() => onClick(id)} sx={{ height: "100%" }}>
        <CardHeader
          title={client?.name ? client?.name : unregistered_client?.name}
          subheader={
            client?.name
              ? ClientFormatter.formatFullAddress(client)
              : unregistered_client?.address
          }
          sx={headerStyle}
        />
        <Divider />
        <CardContent
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            marginBottom: 5,
          }}
        >
          <Typography variant="h6" sx={{ marginBottom: 1 }}>
            {details}
          </Typography>
          <Stack>
            {printers?.map((printer) => (
              <Typography
                key={printer.id}
              >{`${printer.printer?.model?.printer_brand?.name} ${printer.printer?.model?.name} - ${printer.details}`}</Typography>
            ))}
            {unregistered_printers?.map((printer) => (
              <Typography
                key={printer.id}
              >{`${printer.unregistered_printer?.model} - ${printer.details}`}</Typography>
            ))}
          </Stack>
        </CardContent>
      </CardActionArea>
      <CardActions sx={{ position: "absolute", bottom: 0, left: 0 }}>
        <IconButton
          href={`https://maps.google.com/?q=${location}`}
          target="_blank"
          sx={{ zIndex: 2 }}
        >
          <LocationOnIcon color="secondary" />
        </IconButton>
        {contact && (
          <Button
            href={`tel:${contact.phone}`}
            startIcon={<PhoneIcon color="primary" />}
          >
            {contact.full_name}
          </Button>
        )}
      </CardActions>
      {user?.first_name ? (
        <Chip
          label={UserFormatter.formatFullName(user)}
          sx={{ position: "absolute", bottom: 0, right: 0, margin: 1 }}
          variant="outlined"
          color="success"
        />
      ) : (
        <Button
          sx={{ position: "absolute", bottom: 0, right: 0, margin: 1 }}
          variant="outlined"
          color="warning"
          onClick={onTakeSolution}
        >
          Preuzmi
        </Button>
      )}
    </Card>
  );
};

export default TicketCard;
