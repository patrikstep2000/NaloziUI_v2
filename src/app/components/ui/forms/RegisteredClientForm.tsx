"use client";

import { ApiUrls } from "@/app/lib/constants";
import {
  ClientAutocompleteFormatter,
  PrinterAutocompleteFormatter,
} from "@/app/lib/util/AutocompleteFormatter";
import ClientType from "@/model/Client/Client";
import OrderType from "@/model/Order/Order";
import OrderPrinterType, {
  OrderPrinterHeader,
} from "@/model/Printer/OrderPrinter";
import OrderUnregisteredPrinterType, {
  OrderUnregisteredPrinterHeader,
} from "@/model/Printer/OrderUnregisteredPrinter";
import PrinterType from "@/model/Printer/PrinterType";
import { TextField, Stack, Button, Typography } from "@mui/material";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import AdvancedAutocomplete from "../../container/reusable/AdvancedAutocomplete";
import SimpleTable from "../../container/reusable/SimpleTable";
import useApi from "@/app/lib/hooks/useApi";

const RegisteredClientForm: React.FC<{
  order: OrderType;
  setOrder: Dispatch<SetStateAction<OrderType>>;
}> = ({ order, setOrder }) => {
  const connector = useApi();

  const [clients, setClients] = useState<ClientType[]>([]);
  const [clientLoading, setClientLoading] = useState(false);

  const [printers, setPrinters] = useState<Partial<PrinterType>[]>([]);
  const [printerLoading, setPrinterLoading] = useState(false);

  const [printerInput, setPrinterInput] = useState("");
  const [printer, setPrinter] = useState<Partial<PrinterType> | undefined>(
    undefined
  );

  const [modelValue, setModelValue] = useState("");
  const [serialNumberValue, setSerialNumberValue] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    setClientLoading(true);

    connector
      .get(ApiUrls.Clients, controller)
      .then((res) => setClients(res.data.data))
      .catch(console.error);

    setClientLoading(false);

    return () => {
      controller.abort();
    };
  }, []);

  const onClientChange = (
    event: React.SyntheticEvent<Element, Event>,
    value?: any
  ) => {
    if (!value) return;

    setPrinterLoading(true);

    connector
      .get(`${ApiUrls.PrintersByClient}/${value?.id}`)
      .then((res) => {
        setPrinters(res.data);
        setPrinterLoading(false);
        setOrder(prev => ({...prev, printers: [], unregistered_printers: []}))
      })
      .catch(console.error);

    setOrder((prev: OrderType) => {
      return {
        ...prev,
        client: value,
      };
    });
  };

  //registered printer handlers
  const onPrinterChange = (
    event: React.SyntheticEvent<Element, Event>,
    value?: any
  ) => {
    setPrinter(value);
  };

  const onPrinterInput = (
    event: React.SyntheticEvent<Element, Event>,
    value?: any
  ) => setPrinterInput(value);

  const onPrinterAdd = (event: React.SyntheticEvent<Element, Event>) => {
    setOrder((prev: OrderType) => {
      if (!prev.printers || !printer) return prev;

      let valid = true;
      prev.printers.forEach((p) => {
        if (p.printer?.id === printer.id) {
          valid = false;
        }
      });

      if (valid) {
        setPrinters((previous: Partial<PrinterType>[]) => {
          return previous.filter((p) => p.id !== printer.id);
        });
        setPrinterInput("");
        setPrinter(undefined);

        return {
          ...prev,
          printers: [...prev.printers, { printer: printer }],
        };
      }
      return prev;
    });
  };

  const onRemoveRegisteredPrinter = (printer: OrderPrinterType) => {
    setPrinters((prev: Partial<PrinterType>[]) => {
      return [...prev, printer.printer];
    });
    setOrder((prev: OrderType) => {
      return {
        ...prev,
        printers: prev.printers?.filter((p) => {
          return p.printer?.id !== printer.printer.id;
        }),
      };
    });
  };

  //unregistered printer handlers

  const onModelInput = (event: React.SyntheticEvent<Element, Event>) =>
    setModelValue((event.target as HTMLInputElement).value);

  const onSerialNumberInput = (event: React.SyntheticEvent<Element, Event>) =>
    setSerialNumberValue((event.target as HTMLInputElement).value);

  const onUnregisteredPrinterAdd = (
    event: React.SyntheticEvent<Element, Event>
  ) => {
    setOrder((prev: OrderType) => {
      if (
        !prev.unregistered_printers ||
        modelValue === "" ||
        serialNumberValue === ""
      )
        return prev;

      let valid = true;
      prev.unregistered_printers?.forEach((p) => {
        if (
          p.printer?.serial_number === serialNumberValue &&
          p.printer.model === modelValue
        ) {
          valid = false;
        }
      });

      valid && setModelValue("");
      valid && setSerialNumberValue("");
      return valid
        ? {
            ...prev,
            unregistered_printers: [
              ...prev.unregistered_printers,
              {
                printer: {
                  model: modelValue,
                  serial_number: serialNumberValue,
                },
              },
            ],
          }
        : prev;
    });
  };

  const onRemoveUnregisteredPrinter = (
    printer: OrderUnregisteredPrinterType
  ) => {
    setOrder((prev: OrderType) => {
      return {
        ...prev,
        unregistered_printers: prev.unregistered_printers?.filter((p) => {
          return (
            p.printer?.model !== printer.printer.model &&
            p.printer?.serial_number !== printer.printer.serial_number
          );
        }),
      };
    });
  };

  return (
    <>
      <AdvancedAutocomplete
        addKey="klijent-autocomplete"
        label="Klijent"
        sx={{ margin: "15px" }}
        formatter={ClientAutocompleteFormatter}
        options={clients}
        onChange={onClientChange}
        loading={clientLoading}
      />
      {order.client ? (
        <>
          <Stack direction="row">
            <AdvancedAutocomplete
              addKey="printer-autocomplete"
              label="Printer"
              sx={{ width: "90%", margin: "15px" }}
              options={printers}
              onChange={onPrinterChange}
              option={printer || null}
              inputValue={printerInput || ""}
              onInputChange={onPrinterInput}
              formatter={PrinterAutocompleteFormatter}
              loading={printerLoading}
            />
            <Button
              onClick={onPrinterAdd}
              sx={{ width: "10%", margin: "15px" }}
              variant="outlined"
              color="success"
            >
              Dodaj
            </Button>
          </Stack>

          <Typography sx={{ margin: "10px 0 0 15px" }}>
            Neregistrirani printer
          </Typography>
          <Stack direction="row">
            <TextField
              sx={{ width: "45%", margin: "15px" }}
              label="Model"
              onInput={onModelInput}
              value={modelValue}
            />
            <TextField
              sx={{ width: "45%", margin: "15px" }}
              label="Serijski broj"
              onInput={onSerialNumberInput}
              value={serialNumberValue}
            />
            <Button
              onClick={onUnregisteredPrinterAdd}
              sx={{ width: "10%", margin: "15px" }}
              variant="outlined"
              color="success"
            >
              Dodaj
            </Button>
          </Stack>

          <Stack direction="column" sx={{ margin: "15px" }}>
            {!!order.printers?.length && (
              <SimpleTable
                headCells={OrderPrinterHeader}
                rows={order.printers}
                tableName="Registrirani"
                removable={true}
                removeFunction={onRemoveRegisteredPrinter}
              />
            )}
            {!!order.unregistered_printers?.length && (
              <SimpleTable
                headCells={OrderUnregisteredPrinterHeader}
                rows={order.unregistered_printers}
                tableName="Neregistrirani"
                removable={true}
                removeFunction={onRemoveUnregisteredPrinter}
              />
            )}
          </Stack>
        </>
      ) : null}
    </>
  );
};

export default RegisteredClientForm;
