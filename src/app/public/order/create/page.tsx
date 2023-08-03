"use client";

import RegisteredClientForm from "@/app/components/ui/forms/RegisteredClientForm";
import UnregisteredClientForm from "@/app/components/ui/forms/UnregisteredClientForm";
import { ApiUrls, UIUrls } from "@/app/lib/constants";
import useApi from "@/app/lib/hooks/useApi";
import OrderType from "@/model/Order/Order";
import {
  Paper,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
} from "@mui/material";
import { Container, Stack } from "@mui/system";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const initOrder: OrderType = {
  user: { id: "0" },
  client: undefined,
  unregistered_client: undefined,
  printers: [],
  unregistered_printers: [],
};

export default function CreateOrderPage() {
  const connector = useApi();
  const { data: session } = useSession();
  const router = useRouter();
  const [isRegistered, setIsRegistered] = useState(true);
  const [order, setOrder] = useState<OrderType>(initOrder);

  useEffect(() => {
    if(session?.user){
      setOrder(prev => ({...prev, user: {
        id: session?.user.id
      }}))
    }
  }, [session?.user])

  const onRadioGroupChange = (event: React.SyntheticEvent<Element, Event>) => {
    const registered =
      (event.target as HTMLInputElement).value === "registrirani";
    setOrder({
      ...initOrder,
      printers: registered ? [] : undefined,
    });
    setIsRegistered(registered);
  };

  const onCreateOrder = async (event: React.SyntheticEvent<Element, Event>) => {
    connector
      .post(ApiUrls.CreateOrder, order)
      .then((res) => router.push(`${UIUrls.OrderEdit}/${res.data}`))
      .catch(console.error);
  };

  return (
    <Container>
      <Paper variant="outlined" sx={{ padding: "10px", marginTop: "15px" }}>
        <Stack direction="column">
          <Typography sx={{ margin: "15px 15px 0 15px" }}>Klijent:</Typography>
          <RadioGroup
            row
            defaultValue="registrirani"
            sx={{ margin: "15px" }}
            onChange={onRadioGroupChange}
          >
            <FormControlLabel
              value="registrirani"
              control={<Radio />}
              label="Registrirani"
            />
            <FormControlLabel
              value="neregistrirani"
              control={<Radio />}
              label="Neregistrirani"
            />
          </RadioGroup>
        </Stack>
        {isRegistered ? (
          <RegisteredClientForm order={order} setOrder={setOrder} />
        ) : (
          <UnregisteredClientForm order={order} setOrder={setOrder} />
        )}
      </Paper>

      {order.client || order.unregistered_client ? (
        <Button
          variant="outlined"
          size="large"
          sx={{ margin: "15px 0" }}
          onClick={onCreateOrder}
        >
          Otvori novi radni nalog
        </Button>
      ) : null}
    </Container>
  );
}
