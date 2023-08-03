"use client";

import ConfirmDialog from "@/app/components/container/reusable/ConfirmDialog";
import {
  OrderInfocard,
  ClientInfoCard,
  UnregisteredClientInfoCard,
} from "@/app/components/ui/InfoCards";
import { ApiUrls, UIUrls } from "@/app/lib/constants";
import useApi from "@/app/lib/hooks/useApi";
import {
  ConfirmDialogOptions,
  DialogResult,
} from "@/app/model/ConfirmDialogOptions";
import OrderType from "@/model/Order/Order";
import { SpeedDial, SpeedDialIcon, SpeedDialAction, Alert, Slide } from "@mui/material";
import { Box, Stack } from "@mui/system";
import { useEffect, useState } from "react";
import SaveIcon from "@mui/icons-material/Save";
import EditIcon from "@mui/icons-material/Edit";
import { useRouter } from "next/navigation";
import OrderTabs from "@/app/components/ui/OrderTabs";

export default function EditOrderPage({ params }: { params: { id: number } }) {
  const router = useRouter();
  const connector = useApi();
  const [order, setOrder] = useState<Partial<OrderType>>({});
  const [dialogOpen, setDialogOpen] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    connector
      .get(`${ApiUrls.Order}/${params.id}`, controller)
      .then((res) => setOrder(res.data))
      .catch(console.error);

    return () => {
      controller.abort();
    };
  }, []);

  const saveOrder = () => {
    connector
      .patch(ApiUrls.Order, order, String(order.id))
      .then(() => {
        setSuccess(true)
        setTimeout(() => {
          setSuccess(false)
        }, 3000);
      })
  };

  const signOrder = () => {
    setDialogOpen(true);
  };

  const onConfirm = (result: DialogResult) => {
    if(result === DialogResult.YES){
      connector
        .patch(ApiUrls.Order, order, String(order.id))
        .then(() => router.push(`${UIUrls.SignOrder}/${params.id}`))
        .catch(console.error);
    }
    else {
      setDialogOpen(false)
    }
  };

  const dialogOptions: ConfirmDialogOptions[] = [
    { name: "Potvrdi", result: DialogResult.YES },
    { name: "Odustani", result: DialogResult.NO },
  ];

  const actions = [
    { icon: <SaveIcon />, name: "Spremi", action: saveOrder },
    { icon: <EditIcon />, name: "Potpiši", action: signOrder },
  ];

  return (
    <Box sx={{position: 'relative', height: '90vh'}}>
      <Slide style={{position: 'absolute', top: -10, width: '100%'}} direction="down" in={success} mountOnEnter unmountOnExit>
        <Alert severity="success">Uspješno spremljeno!</Alert>
      </Slide>
      <ConfirmDialog
        open={dialogOpen}
        setOpen={setDialogOpen}
        message="Jeste li sigurni da želite potpisati radni nalog?"
        options={dialogOptions}
        onClick={onConfirm}
      />
      <SpeedDial
        ariaLabel="speed-dial"
        sx={{ position: "absolute", bottom: "16px", right: "16px" }}
        icon={<SpeedDialIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={() => action.action()}
          />
        ))}
      </SpeedDial>
      <Stack
        direction="row"
        flexWrap="wrap"
        justifyContent="space-between"
        sx={{ gap: "10px" }}
      >
        <OrderInfocard order={order} />
        {order?.client?.name ? (
          <ClientInfoCard client={order?.client} />
        ) : (
          <UnregisteredClientInfoCard client={order?.unregistered_client} />
        )}
      </Stack>
      <OrderTabs order={order} setOrder={setOrder} />
    </Box>
  );
}
