"use client";

import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { SxProps } from "@mui/material";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const ContainerStyle: SxProps = {
  padding: "30px",
  marginTop: "20vh",
  borderRadius: "5px",
  boxShadow:
    "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
};

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="#">
        Best copy d.o.o
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function LogoutPage() {
    const router = useRouter();

    const onCancel = () => {
        router.back();
    }

  return (
    <Container component="main" maxWidth="xs" sx={ContainerStyle}>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Odjava
        </Typography>
        <Box sx={{ mt: 1 }}>
          <Typography>Jeste li sigurni da se želite odjaviti?</Typography>
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={() => signOut()}
          >
            Odjavi se
          </Button>
          <Button
            fullWidth
            variant="outlined"
            onClick={onCancel}
          >
            Odustani
          </Button>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}
