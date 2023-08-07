"use client";

import { ApiUrls, UIUrls } from "@/app/lib/constants";
import useApi from "@/app/lib/hooks/useApi";
import MaterialType from "@/model/Material/Material";
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

export default function EditMaterialPage({
  params,
}: {
  params: { id: number };
}) {
  const router = useRouter();
  const connector = useApi();
  const [material, setMaterial] = useState<Partial<MaterialType>>();
  const [error, setError] = useState(false);
  const [materialTypes, setMaterialTypes] = useState<MaterialTypeType[]>([]);

  useEffect(() => {
    const controller = new AbortController();

    connector
      .get(`${ApiUrls.Material}/${params.id}`, controller)
      .then((res) => setMaterial(res.data))
      .catch(console.error);

    connector
      .get(ApiUrls.MaterialTypes, controller)
      .then((res) => setMaterialTypes(res.data))
      .catch(console.error);

    return () => {
      controller.abort();
    };
  }, []);

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMaterial((prev) => ({ ...prev, name: event.target.value as string }));
  };

  const onTypeChange = (event: SelectChangeEvent) => {
    setMaterial((prev) => ({
      ...prev,
      type: { ...prev?.type, id: Number(event.target.value) },
    }));
  };

  const onSave = () => {
    if (material?.name === "" || material?.type?.name === "") {
      setError(true);
      return;
    }

    connector
      .patch(ApiUrls.Material, material, String(params.id))
      .then(() => {
        console.log("gotov")
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
      <TextField
        label="Naziv"
        fullWidth
        value={material?.name || ""}
        onChange={onNameChange}
        sx={{ marginBottom: "20px" }}
      />
      {!!materialTypes.length && (
        <FormControl fullWidth sx={{ marginBottom: "20px" }}>
          <InputLabel id="tip-select-label">Tip</InputLabel>
          <Select
            id="tip-select"
            value={String(material?.type?.id)}
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
      <Button onClick={onSave}>Spremi</Button>
    </Container>
  );
}
