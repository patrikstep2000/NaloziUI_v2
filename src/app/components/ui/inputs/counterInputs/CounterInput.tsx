import { PRINTER_TYPE } from "@/app/lib/constants";
import { NumbersAboveZeroRegex } from "@/app/lib/util/Regex";
import CounterType from "@/model/Counter";
import OrderPrinterType from "@/model/Printer/OrderPrinter";
import PrinterType from "@/model/Printer/Printer";
import { Stack, TextField } from "@mui/material";
import { useState } from "react";

const CounterInput: React.FC<{
  printer: Partial<OrderPrinterType>;
  onCounterAdd: (
    counter: Partial<CounterType>,
    printerId: number,
    registered: boolean
  ) => void;
}> = ({ printer, onCounterAdd }) => {
  const [bwInput, setBwInput] = useState(
    printer.counter?.bw_prints ? String(printer.counter?.bw_prints) : ""
  );
  const [colInput, setColInput] = useState(
    printer.counter?.color_prints ? String(printer.counter?.color_prints) : ""
  );

  const onBwChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const regex = NumbersAboveZeroRegex;
    const bwPrints = event.target.value;

    if (regex.test(bwPrints)) {
      setBwInput(bwPrints);
      onCounterAdd({bw_prints:Number(bwPrints), color_prints:Number(colInput)}, Number(printer.printer?.id), true);
    }
  };

  const onColChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const regex = NumbersAboveZeroRegex;
    const colPrints = event.target.value;

    if (regex.test(colPrints)){
      setColInput(colPrints)
      onCounterAdd({bw_prints:Number(bwInput), color_prints:Number(colPrints)}, Number(printer.printer?.id), true);
    }
  };

  return (
    <Stack spacing={1} width="100%">
      {printer?.printer?.model?.type?.id === PRINTER_TYPE.BW ? (
        <TextField
          id="bw-input"
          value={bwInput}
          label="Crno-Bijelo"
          onChange={onBwChange}
          fullWidth
        />
      ) : (
        <Stack spacing={1} alignItems="center">
          <TextField
            id="bw-input"
            value={bwInput}
            label="Crno-Bijelo"
            onChange={onBwChange}
            fullWidth
          />
          <TextField
            id="col-input"
            value={colInput}
            label="Boja"
            onChange={onColChange}
            fullWidth
          />
        </Stack>
      )}
    </Stack>
  );
};

export default CounterInput;
