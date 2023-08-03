"use client";

import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useRouter } from "next/navigation";
import {
  Alert,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  SxProps,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { EmailRegex } from "@/app/lib/util/Regex";
import { signIn } from "next-auth/react";
import { UIUrls } from "@/app/lib/constants";

const ContainerStyle: SxProps = {
  padding: "30px",
  marginTop: "20vh",
  borderRadius: "5px",
  boxShadow: "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
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

export default function LoginPage() {
  const [user, setUser] = React.useState({ email: "", password: "" });
  const [error, setError] = React.useState<string | null>(null);
  const router = useRouter();
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const onFormChange = (e: any) => {
    setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const onLogin = async () => {
    if (user.email === "" || user.password === "") {
      setError("Upišite email adresu i lozinku!");
      return;
    } else if (!EmailRegex.test(user.email)) {
      setError("Pogrešna email adresa!");
      return;
    }

    const result = await signIn("credentials", {
      email: user.email,
      password: user.password,
      redirect: false,
    });

    if (result?.error === null) {
      window.location.replace(UIUrls.Index);
    } else {
      setError("Pogrešna email adres ili lozinka!");
    }
  };

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
          Prijava
        </Typography>
        {error && (
          <Alert severity="error" sx={{ width: "100%", marginTop: "10px" }}>
            {error}
          </Alert>
        )}
        <Box sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            fullWidth
            id="email"
            label="Email adresa"
            name="email"
            autoComplete="email"
            autoFocus
            value={user.email}
            onChange={onFormChange}
          />
          <FormControl fullWidth>
            <InputLabel htmlFor="password">Zaporka</InputLabel>
            <OutlinedInput
              fullWidth
              name="password"
              label="Zaporka"
              id="password"
              autoComplete="password"
              value={user.password}
              onChange={onFormChange}
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={onLogin}
          >
            Prijavi se
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Zaboravljena lozinka?
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}
