import { Chip } from "@mui/material";
import ClientType from "../Client/Client";
import CounterType from "../Counter";
import PrinterModelType from "./PrinterModel";
import PrinterStatusType from "./PrinterStatus";
import { PRINTER_STATUS } from "@/app/lib/constants";

type PrinterType = {
  id: number;
  serial_number: string;
  details: string;
  model: Partial<PrinterModelType>;
  status: Partial<PrinterStatusType>;
  client: Partial<ClientType>;
  all_counters?: CounterType[];
  deleted: boolean;
};

export const FullPrinterHeader = [
  {
    name: "model",
    label: "Model",
    disablePadding: false,
    numeric: false,
    formatter: (e: PrinterModelType) => `${e.printer_brand.name} ${e.name}`,
  },
  {
    name: "serial_number",
    label: "Serijski broj",
    disablePadding: false,
    numeric: false,
  },
  {
    name: "client",
    label: "Klijent",
    disablePadding: false,
    numeric: false,
    formatter: (e: Partial<ClientType>) => `${e?.name ? e?.name : '-'}`,
  },
  {
    name: "status",
    label: "Status",
    disablePadding: false,
    numeric: false,
    formatter: (e: Partial<PrinterStatusType>) => {
      return (
        <Chip
          label={e.name}
          size="small"
          color={e.id === PRINTER_STATUS.IN_RENT ? "primary" : e.id === PRINTER_STATUS.ON_CONDITION ? 'success' : e.id === PRINTER_STATUS.WRITE_OFF ? 'error' : 'secondary'}
        />
      );
    },
  },
];

export const PrinterHeader = [
  {
    name: "model",
    label: "Model",
    disablePadding: false,
    numeric: false,
    formatter: (e: PrinterModelType) => `${e.printer_brand.name} ${e.name}`,
  },
  {
    name: "serial_number",
    label: "Serijski broj",
    disablePadding: false,
    numeric: false,
  },
];

export default PrinterType;
