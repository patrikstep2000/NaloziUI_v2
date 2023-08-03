"use client";

import { Button } from "@mui/material";
import { NextPage } from "next";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { OrderHeader } from "@/model/Order/Order";
import FiltersBox from "@/app/components/container/reusable/FiltersBox";
import { UIUrls } from "@/app/lib/constants";
import { useReload } from "@/app/lib/hooks/useReload";
import Table from "@/app/components/container/reusable/Table";

export default function OrdersPage() {
  const [searchValue, setSearchValue] = useState(null);
  const { isReload, reload } = useReload();
  const router = useRouter();

  const onItemOpen = (id: string) => {
    router.push(`${UIUrls.Order}/${id}`);
  };

  const handleAdd = (event: React.MouseEvent<HTMLElement>) => {
    router.push(`${UIUrls.OrderCreate}`);
  };

  const onItemEdit = (id: string) => {
    router.push(`${UIUrls.OrderEdit}/${id}`);
  };

  const onItemSign = (id: string) => {
    router.push(`${UIUrls.SignOrder}/${id}`);
  };

  return (
    <>
      <Button
        variant="outlined"
        sx={{ marginBottom: "20px" }}
        onClick={handleAdd}
      >
        Dodaj novi radni nalog
      </Button>
      <FiltersBox setSearchValue={setSearchValue} />
      <Table
        dataUrl="/orders"
        headCells={OrderHeader}
        reload={isReload}
        searchValue={searchValue}
        tableName="Nalozi"
        redirectUrl={UIUrls.Order}
        onActionButtonClickList={[
          { name: "Otvori", action: onItemOpen },
          {
            name: "Potpiši",
            action: onItemSign,
            field: "status",
            formatter: (value: { name: string }) => {
              if (value.name === "Potpisan") {
                return value.name;
              }
              return "Potpiši";
            },
            disabled: (value: { name: string }) => {
              return value.name === "Potpisan";
            },
          },
          {
            name: "Uredi",
            action: onItemEdit,
            field: "status",
            disabled: (value: { name: string }) => {
              return value.name === "Potpisan";
            },
          },
        ]}
      />
    </>
  );
};
