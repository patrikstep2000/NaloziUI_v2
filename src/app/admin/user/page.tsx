"use client"

import { NextPage } from "next";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@mui/material";
import { useReload } from "@/app/lib/hooks/useReload";
import FiltersBox from "@/app/components/container/reusable/FiltersBox";
import { UIUrls } from "@/app/lib/constants";
import { UserHeader } from "@/model/User/User";
import Table from "@/app/components/container/reusable/Table";

const Users: NextPage = () => {
  const [searchValue, setSearchValue] = useState<string | null>(null);
  const { isReload, reload } = useReload();
  const router = useRouter();

  const onItemOpen = (id: string) => {
    router.push(`${UIUrls.User}/${id}`);
  };

  const handleAdd = (event: React.MouseEvent<HTMLElement>) => {
    router.push(`${UIUrls.UserCreate}`);
  };

  const onItemEdit = (id: string) => {
    router.push(`${UIUrls.UserEdit}/${id}`);
  };

  return (
    <>
        <Button
          variant="outlined"
          sx={{ marginBottom: "20px" }}
          onClick={handleAdd}
        >
          Dodaj novog korisnika
        </Button>
        <FiltersBox setSearchValue={setSearchValue} disableDatePicker />
        <Table
          dataUrl="/users"
          headCells={UserHeader}
          reload={isReload}
          searchValue={searchValue}
          tableName="Korisnici"
          redirectUrl={UIUrls.User}
          onActionButtonClickList={[
            { name: "Otvori", action: onItemOpen },
            {
              name: "Uredi",
              action: onItemEdit,
            },
          ]}
        />
    </>
  );
};

export default Users;
