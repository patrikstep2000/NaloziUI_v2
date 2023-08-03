"use client"

import FiltersBox from "@/app/components/container/reusable/FiltersBox";
import Table from "@/app/components/container/reusable/Table";
import { UIUrls } from "@/app/lib/constants";
import { useReload } from "@/app/lib/hooks/useReload";
import { FullPrinterHeader } from "@/model/Printer/Printer";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function PrintersPage() {
  const [searchValue, setSearchValue] = useState<string | null>(null);
  const { isReload, reload } = useReload();
  const router = useRouter();

  const onItemOpen = (id: string) => {
    router.push(`${UIUrls.Printer}/${id}`);
  };

  const onItemEdit = (id: string) => {
    router.push(`${UIUrls.PrinterEdit}/${id}`);
  };

  return (
    <>
        <FiltersBox setSearchValue={setSearchValue} disableDatePicker/>
        <Table
          dataUrl="/printers"
          headCells={FullPrinterHeader}
          reload={isReload}
          searchValue={searchValue}
          tableName="Pisači"
          redirectUrl={UIUrls.Printer}
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
