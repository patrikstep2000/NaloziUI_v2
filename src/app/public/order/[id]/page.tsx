"use client";

import SignatureImage from "@/app/components/container/reusable/SignatureImage";
import { ClientInfoCard, UnregisteredClientInfoCard, OrderInfocard } from "@/app/components/ui/InfoCards";
import { ApiUrls } from "@/app/lib/constants";
import useApi from "@/app/lib/hooks/useApi";
import { DateFormatter } from "@/app/lib/util/Formatters";
import OrderType from "@/model/Order/Order";
import { Box, Stack } from "@mui/system";
import { useEffect, useState } from "react";

export default function OrderPage({ params }: { params: { id: number } }) {
  const connector = useApi();
  const [order, setOrder] = useState<OrderType>();

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

  return (
    <Box>
      <Stack
        spacing={2}
        direction="row"
        justifyContent="space-between"
        marginBottom={3}
      >
        {order?.client?.name ? (
          <ClientInfoCard client={order?.client} />
        ) : (
          <UnregisteredClientInfoCard client={order?.unregistered_client} />
        )}
        <OrderInfocard order={order} />
      </Stack>
      <div>Opis radova:&nbsp; {order?.work_details}</div>
      <div>
        Početak radova:&nbsp;
        {DateFormatter.formatToLongString(order?.created_at)}
      </div>
      <div>
        Završetak radova:&nbsp;
        {DateFormatter.formatToLongString(order?.closed_at)}
      </div>
      <SignatureImage order={order} />
    </Box>
  );
}
