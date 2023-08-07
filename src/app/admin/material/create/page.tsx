"use client";

import { ApiUrls, UIUrls } from "@/app/lib/constants";
import useApi from "@/app/lib/hooks/useApi";
import MaterialTypeType from "@/model/Material/MaterialType";
import {
  Alert,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { Container } from "@mui/system";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CreateMaterialPage() {
  const router = useRouter();
  const connector = useApi();
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [error, setError] = useState(false);
  const [materialTypes, setMaterialTypes] = useState<MaterialTypeType[]>([]);

  useEffect(() => {
    const controller = new AbortController();

    connector
      .get(ApiUrls.MaterialTypes, controller)
      .then((res) => setMaterialTypes(res.data))
      .catch(console.error);

    return () => {
      controller.abort();
    };
  }, []);

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value as string);
  };

  const onTypeChange = (event: SelectChangeEvent) => {
    setType(event.target.value as string);
  };

  const onCreate = () => {
    if (name === "" || type === "") {
      setError(true);
      return;
    }
    connector
      .post(ApiUrls.Material, { name, type: { id: type } })
      .then(() => {
        setError(false);
        router.push(UIUrls.Material);
      })
      .catch(console.error);
  };

  return (
    <Container>
      {error && (
        <Alert sx={{ marginBottom: "20px" }} severity="error">
          Unesite sve podatke za kreiranje materijala.
        </Alert>
      )}
      {}
      <TextField
        label="Naziv"
        fullWidth
        value={name}
        onChange={onNameChange}
        sx={{ marginBottom: "20px" }}
      />
      {!!materialTypes.length && (
        <FormControl fullWidth sx={{ marginBottom: "20px" }}>
          <InputLabel id="tip-select-label">Tip</InputLabel>
          <Select
            id="tip-select"
            value={type}
            label="Tip"
            onChange={onTypeChange}
          >
            {materialTypes.map((type) => (
              <MenuItem key={type.id} value={type.id}>
                {type.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
      <Button onClick={onCreate}>Kreiraj</Button>
    </Container>
  );
}
