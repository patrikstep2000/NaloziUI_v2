import { ApiUrls } from "@/app/lib/constants";
import {
  OrderPrinterAutocompleteFormatter,
  OrderUnregisteredPrinterAutocompleteFormatter,
} from "@/app/lib/util/AutocompleteFormatter";
import { NumbersAboveZeroRegex } from "@/app/lib/util/Regex";
import MaterialType from "@/model/Material/MaterialType";
import OrderMaterialType from "@/model/Material/OrderMaterial";
import OrderType from "@/model/Order/Order";
import OrderPrinterType from "@/model/Printer/OrderPrinter";
import OrderUnregisteredPrinterType from "@/model/Printer/OrderUnregisteredPrinter";
import PrinterType from "@/model/Printer/PrinterType";
import UnregisteredPrinterType from "@/model/Printer/UnregisteredPrinter";
import { Stack } from "@mui/material";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from "react";
import OrderPrinterAccordion from "../../accordions/OrderPrinterAccordion";
import useApi from "@/app/lib/hooks/useApi";

const OrderPrintersTab: React.FC<{
  order: Partial<OrderType>;
  setOrder: Dispatch<SetStateAction<Partial<OrderType>>>;
}> = ({ order, setOrder }) => {
  const connector = useApi();
  const [materials, setMaterials] = useState<Partial<MaterialType>[]>([]);
  const [fullMaterials, setFullMaterials] = useState<Partial<MaterialType>[]>(
    []
  );
  const [material, setMaterial] = useState<MaterialType>();
  const [amount, setAmount] = useState<string>("");
  const orderMaterial: Partial<OrderMaterialType> = useMemo(
    () => ({
      material: material,
      amount: Number(amount),
    }),
    [material, amount]
  );
  const [materialLoading, setMaterialLoading] = useState(false);
  const [expanded, setExpanded] = useState<number | undefined>(0);

  useEffect(() => {
    const controller = new AbortController();
    (async () => {
      setMaterialLoading(true);

      await connector
        .get(`${ApiUrls.Material}`, controller)
        .then((result) => {
          setMaterials(result.data.data);
          setFullMaterials(result.data.data);
        })
        .catch(console.error);

      setMaterialLoading(false);
    })();

    return () => {
      controller.abort();
    };
  }, []);

  const onAccordionChange =
    (printer?: Partial<OrderPrinterType | OrderUnregisteredPrinterType>) =>
    (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? printer?.id : 0);
      setMaterials(
        fullMaterials.filter((material) => {
          let valid = true;
          printer?.material?.forEach((m) => {
            if (m.material?.id === material?.id) valid = false;
          });
          return valid;
        })
      );
    };

  const onPrinterMaterialAmountChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const regex = NumbersAboveZeroRegex;
    const amount = event.target.value;

    if (regex.test(amount)) setAmount(amount);
  };

  const onPrinterMaterialChange = (
    event: React.SyntheticEvent,
    value?: any
  ) => {
    setMaterial(value);
  };

  const onPrinterMaterialAdd =
    (isRegistered: boolean, printer_id?: number) =>
    (event: React.SyntheticEvent) => {
      if (!amount || amount === "" || !material || !material) return;
      setOrder((prev: Partial<OrderType>) => {
        if (!prev.printers || !prev.unregistered_printers || !printer_id)
          return prev;

        const printers = isRegistered
          ? prev.printers.map((p) => {
              if (!p.material) return p;

              return p.id === printer_id
                ? {
                    ...p,
                    material: [...p.material, orderMaterial],
                  }
                : p;
            })
          : prev.printers;

        const unregisteredPrinters = !isRegistered
          ? prev.unregistered_printers.map((p) => {
              if (!p.material) return p;

              return p.id === printer_id
                ? {
                    ...p,
                    material: [...p.material, orderMaterial],
                  }
                : p;
            })
          : prev.unregistered_printers;

        return {
          ...prev,
          printers: printers,
          unregistered_printers: unregisteredPrinters,
        };
      });

      setMaterials((prev) => prev.filter((m) => m?.id !== material?.id));
      setMaterial(undefined);
      setAmount("");
    };

  const onPrinterMaterialRemove = (
    material: Partial<OrderMaterialType>,
    printer?: Partial<PrinterType | UnregisteredPrinterType>,
    isRegistered?: boolean
  ) => {
    setOrder((prev: Partial<OrderType>) => {
      if (!prev.printers) return prev;

      const printers = isRegistered
        ? prev.printers.map((p) => {
            return p.printer?.id === printer?.id
              ? {
                  ...p,
                  material: p.material?.filter(
                    (m) => m.material?.id !== material.material?.id
                  ),
                }
              : p;
          })
        : prev.printers;

      const unregistered_printers = !isRegistered
        ? prev.unregistered_printers?.map((p) => {
            return p.printer?.id === printer?.id
              ? {
                  ...p,
                  material: p.material?.filter(
                    (m) => m.material?.id !== material.material?.id
                  ),
                }
              : p;
          })
        : prev.unregistered_printers;

      return {
        ...prev,
        printers: printers,
        unregistered_printers: unregistered_printers,
      };
    });
    setMaterials((prev) => {
      if (!material.material) return prev;
      return [...prev, material.material];
    });
  };

  return (
    <Stack>
      {!!order.printers?.length &&
        order.printers?.map((p) => (
          <OrderPrinterAccordion
            key={`${p.printer?.serial_number}${p.id}`}
            printer={p}
            expanded={expanded}
            isRegistered={true}
            material={material}
            materials={materials}
            materialLoading={materialLoading}
            amount={amount}
            formatter={OrderPrinterAutocompleteFormatter}
            onAccordionChange={onAccordionChange}
            onMaterialChange={onPrinterMaterialChange}
            onMaterialAmountChange={onPrinterMaterialAmountChange}
            onMaterialAdd={onPrinterMaterialAdd}
            onMaterialRemove={onPrinterMaterialRemove}
            setOrder={setOrder}
          />
        ))}
      {!!order.unregistered_printers?.length &&
        order.unregistered_printers?.map((p) => (
          <OrderPrinterAccordion
            key={`${p.printer?.serial_number}${p.id}`}
            printer={p}
            expanded={expanded}
            isRegistered={false}
            material={material}
            materials={materials}
            materialLoading={materialLoading}
            amount={amount}
            formatter={OrderUnregisteredPrinterAutocompleteFormatter}
            onAccordionChange={onAccordionChange}
            onMaterialChange={onPrinterMaterialChange}
            onMaterialAmountChange={onPrinterMaterialAmountChange}
            onMaterialAdd={onPrinterMaterialAdd}
            onMaterialRemove={onPrinterMaterialRemove}
            setOrder={setOrder}
          />
        ))}
    </Stack>
  );
};

export default OrderPrintersTab;
