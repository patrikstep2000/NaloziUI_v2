"use client";

import {
  Box,
  Button,
  Container,
  CssBaseline,
  Paper,
  Stack,
  TextField,
  createTheme,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import ReactSignatureCanvas from "react-signature-canvas";
import { ThemeProvider } from "styled-components";
import CreateIcon from "@mui/icons-material/Create";
import CheckIcon from "@mui/icons-material/Check";
import Signature from "@/app/components/container/reusable/Signature";
import { ApiUrls, ORDER_STATUS, UIUrls } from "@/app/lib/constants";
import OrderType from "@/model/Order/Order";
import useApi from "@/app/lib/hooks/useApi";

const theme = createTheme();

export default function SignOrderPage({ params }: { params: { id: number } }) {
  const connector = useApi();
  const router = useRouter();

  const [order, setOrder] = useState<Partial<OrderType>>({});
  const [signatureVisible, setSignatureVisible] = useState(false);
  const signatureRef = useRef<ReactSignatureCanvas | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    connector
      .get(`${ApiUrls.Order}/${params.id}`, controller)
      .then((result) => {
        if (result.data.status.id == ORDER_STATUS.Potpisan) {
          router.push(`${UIUrls.Order}/${result.data.id}`);
          return;
        }

        setOrder(result.data);
      })
      .catch(console.error);

    return () => {
      controller.abort();
    };
  }, []);

  const onSigned = () => {
    setOrder((prev) => ({
      ...prev,
      signature: signatureRef.current?.getTrimmedCanvas().toDataURL(),
    }));
  };

  const onSignClick = () => setSignatureVisible(true);

  const onFormChange = (e: any) => {
    setOrder((prev) => ({ ...prev, signed_name: e.target.value }));
  };

  const onConfirm = () => {
    connector
      .post(`${ApiUrls.SignOrder}/${order.id}`, {
        signed_name: order.signed_name,
        signature: order.signature,
      })
      .then(() => router.push(`${UIUrls.Order}/${order.id}`));
  };

  return (
    <ThemeProvider theme={theme}>
      <Container
        component="main"
        maxWidth="md"
        sx={{ alignItems: "center", display: "flex", justifyContent: "center" }}
      >
        <CssBaseline />
        <Signature
          visible={signatureVisible}
          setVisible={setSignatureVisible}
          signatureRef={signatureRef}
          onSigned={onSigned}
        />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "70%",
          }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="signature_name"
            label="Ime i prezime"
            name="signature_name"
            autoFocus
            value={order.signed_name || ""}
            onChange={onFormChange}
          />
          <Stack spacing={2} alignItems="center">
            {order.signature ? (
              <>
                <Paper
                  component="img"
                  sx={{ width: "400px", height: "250px" }}
                  elevation={2}
                  src={order.signature}
                ></Paper>
                <Stack alignItems="center" spacing={2}>
                  <Button endIcon={<CheckIcon />} onClick={onConfirm}>
                    Potvrdi
                  </Button>
                  <Button endIcon={<CreateIcon />} onClick={onSignClick}>
                    Potpiši ponovo
                  </Button>
                </Stack>
              </>
            ) : (
              <Button
                variant="outlined"
                onClick={onSignClick}
                endIcon={<CreateIcon />}
              >
                Potpiši
              </Button>
            )}
          </Stack>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
