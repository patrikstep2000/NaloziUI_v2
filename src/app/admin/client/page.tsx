"use client"

import FiltersBox from "@/app/components/container/reusable/FiltersBox";
import Table from "@/app/components/container/reusable/Table";
import { UIUrls } from "@/app/lib/constants";
import { useReload } from "@/app/lib/hooks/useReload";
import { ClientHeader } from "@/model/Client/Client";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ClientsPage() {
  const [searchValue, setSearchValue] = useState<string | null>(null);
  const { isReload, reload } = useReload();
  const router = useRouter();

  const onItemOpen = (id: string) => {
    router.push(`${UIUrls.Client}/${id}`);
  };

  const handleAdd = (event: React.MouseEvent<HTMLElement>) => {
    router.push(`${UIUrls.ClientCreate}`);
  };

  const onItemEdit = (id: string) => {
    router.push(`${UIUrls.ClientEdit}/${id}`);
  };

  return (
    <>
        <Button
          variant="outlined"
          sx={{ marginBottom: "20px" }}
          onClick={handleAdd}
        >
          Dodaj novog klijenta
        </Button>
        <FiltersBox setSearchValue={setSearchValue} disableDatePicker/>
        <Table
          dataUrl="/clients"
          headCells={ClientHeader}
          reload={isReload}
          searchValue={searchValue}
          tableName="Klijenti"
          redirectUrl={UIUrls.Client}
          onActionButtonClickList={[
            { name: "Otvori", action: onItemOpen },
            {
              name: "Uredi",
              action: onItemEdit
            },
          ]}
        />
    </>
  );
};
