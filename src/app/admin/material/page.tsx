"use client"

import { Alert, Button } from "@mui/material";
import { NextPage } from "next";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useReload } from "../../lib/hooks/useReload";
import FiltersBox from "../../components/container/reusable/FiltersBox";
import { ApiUrls, UIUrls } from "../../lib/constants";
import Table from "../../components/container/reusable/Table";
import { MaterialHeader } from "@/model/Material/Material";
import useApi from "@/app/lib/hooks/useApi";

export default function MaterialsPage() {
  const connector = useApi();
  const [searchValue, setSearchValue] = useState<string | null>(null);
  const { isReload, reload } = useReload();
  const router = useRouter();
  const [error, setError] = useState<boolean>(false);

  const onItemOpen = (id: string) => {
    router.push(`${UIUrls.Material}/${id}`);
  };

  const handleAdd = (event: React.MouseEvent<HTMLElement>) => {
    router.push(`${UIUrls.MaterialCreate}`);
  };

  const onItemEdit = (id: string) => {
    router.push(`${UIUrls.MaterialEdit}/${id}`);
  };

  const onItemDelete = async (id: string) => {
    try {
      await connector.Delete(ApiUrls.Material, id);
      setError(false);
      window.location.reload();
    } catch(e:any) {
      if(e.response.status === 400){
        setError(true);
      }
    }
  }

  return (
    <>
        {error && <Alert sx={{marginBottom: '20px'}} severity='error'>Ne možete izbrisati ovaj materijal jer se koristio u postojećem nalogu.</Alert>}
        <Button
          variant="outlined"
          sx={{ marginBottom: "20px" }}
          onClick={handleAdd}
        >
          Dodaj nove dijelove
        </Button>
        <FiltersBox setSearchValue={setSearchValue} disableDatePicker/>
        <Table
          dataUrl="/materials"
          headCells={MaterialHeader}
          reload={isReload}
          searchValue={searchValue}
          tableName="Dijelovi"
          redirectUrl={UIUrls.MaterialEdit}
          onActionButtonClickList={[
            { name: "Otvori", action: onItemOpen },
            {
              name: "Uredi",
              action: onItemEdit
            },
            {
              name: "Izbriši",
              action: onItemDelete
            },
          ]}
        />
    </>
  );
};
