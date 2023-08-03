"use client"

import { Button } from "@mui/material";
import { NextPage } from "next";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useReload } from "../../lib/hooks/useReload";
import FiltersBox from "../../components/container/reusable/FiltersBox";
import { UIUrls } from "../../lib/constants";
import Table from "../../components/container/reusable/Table";
import { MaterialHeader } from "@/model/Material/Material";

export default function MaterialsPage() {
  const [searchValue, setSearchValue] = useState<string | null>(null);
  const { isReload, reload } = useReload();
  const router = useRouter();

  const onItemOpen = (id: string) => {
    router.push(`${UIUrls.Material}/${id}`);
  };

  const handleAdd = (event: React.MouseEvent<HTMLElement>) => {
    router.push(`${UIUrls.MaterialCreate}`);
  };

  const onItemEdit = (id: string) => {
    router.push(`${UIUrls.MaterialEdit}/${id}`);
  };

  return (
    <>
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
          redirectUrl={UIUrls.Material}
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
