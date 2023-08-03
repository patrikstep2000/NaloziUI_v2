import { AutocompleteFormatter } from "@/app/lib/util/AutocompleteFormatter";
import CounterType from "@/model/Counter";
import OrderType from "@/model/Order/Order";
import OrderPrinterType from "@/model/Printer/OrderPrinter";
import OrderUnregisteredPrinterType from "@/model/Printer/OrderUnregisteredPrinter";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import CounterInput from "../inputs/counterInputs/CounterInput";
import UnregisteredCounterInput from "../inputs/counterInputs/UnregisteredCounterInput";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const OrderCounterAccordion: React.FC<{
  printer: Partial<OrderPrinterType | OrderUnregisteredPrinterType>;
  setOrder: Dispatch<SetStateAction<Partial<OrderType>>>;
  isRegistered: boolean;
  expanded: number | undefined;
  onChange: (
    printer?: Partial<OrderPrinterType | OrderUnregisteredPrinterType>
  ) => (event: React.SyntheticEvent, isExpanded: boolean) => void;
  formatter: AutocompleteFormatter;
}> = ({ printer, setOrder, isRegistered, expanded, onChange, formatter }) => {

  const setCounter =
    (counter: Partial<CounterType>, printerId: number, registered: boolean) => {
      console.log(counter)
      setOrder((prev: Partial<OrderType>) => {
        switch(registered){
          case true:
            return {
              ...prev,
              printers: prev.printers?.map(printer => {
                if(printer.printer?.id !== printerId) return printer

                return {
                  ...printer,
                  counter: counter
                }
              })
            };
          case false:
            return {
              ...prev,
              unregistered_printers: prev.unregistered_printers?.map(printer => {
                if(printer.printer?.id !== printerId) return printer

                return {
                  ...printer,
                  counter: counter
                }
              })
            };
        }
      });
    };

  return (
    <Accordion
      variant="outlined"
      expanded={expanded === printer.id}
      onChange={onChange(printer)}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>{formatter.format(printer)}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {isRegistered ? (
          <CounterInput
            printer={printer as OrderPrinterType}
            onCounterAdd={setCounter}
          />
        ) : (
          <UnregisteredCounterInput
            printer={printer as OrderUnregisteredPrinterType}
            onCounterAdd={setCounter}  
          />
        )}
      </AccordionDetails>
    </Accordion>
  );
};

export default OrderCounterAccordion;
