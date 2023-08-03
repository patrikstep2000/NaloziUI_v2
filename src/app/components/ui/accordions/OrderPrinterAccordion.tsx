import { AutocompleteFormatter, MaterialAutocompleteFormatter } from "@/app/lib/util/AutocompleteFormatter";
import MaterialType from "@/model/Material/MaterialType";
import OrderMaterialType, { OrderMaterialHeader } from "@/model/Material/OrderMaterial";
import OrderType from "@/model/Order/Order";
import OrderPrinterType from "@/model/Printer/OrderPrinter";
import OrderUnregisteredPrinterType from "@/model/Printer/OrderUnregisteredPrinter";
import PrinterType from "@/model/Printer/PrinterType";
import UnregisteredPrinterType from "@/model/Printer/UnregisteredPrinter";
import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  Stack,
  TextField,
  IconButton,
} from "@mui/material";
import { useState } from "react";
import AdvancedAutocomplete from "../../container/reusable/AdvancedAutocomplete";
import SimpleTable from "../../container/reusable/SimpleTable";
import AddBoxIcon from "@mui/icons-material/AddBox";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const OrderPrinterAccordion: React.FC<{
  printer: Partial<OrderPrinterType | OrderUnregisteredPrinterType>;
  expanded: number | undefined;
  isRegistered: boolean;
  material: MaterialType | undefined;
  materials: Partial<MaterialType>[];
  materialLoading: boolean;
  amount: string;
  formatter: AutocompleteFormatter;
  onAccordionChange: (
    printer?: Partial<OrderPrinterType | OrderUnregisteredPrinterType>
  ) => (event: React.SyntheticEvent, isExpanded: boolean) => void;
  onMaterialChange: (event: React.SyntheticEvent, value?: any) => void;
  onMaterialAmountChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onMaterialAdd: (
    isRegistered: boolean,
    printer_id?: number
  ) => (event: React.SyntheticEvent) => void;
  onMaterialRemove: (
    material: Partial<OrderMaterialType>,
    printer?: Partial<PrinterType | UnregisteredPrinterType>,
    isRegistered?: boolean
  ) => void;
  setOrder: Function;
}> = ({
  printer,
  expanded,
  isRegistered,
  material,
  materials,
  materialLoading,
  amount,
  formatter,
  onAccordionChange,
  onMaterialChange,
  onMaterialAmountChange,
  onMaterialAdd,
  onMaterialRemove,
  setOrder
}) => {

  const onWorkDetailsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOrder((prev:Partial<OrderType>) => {
      switch(isRegistered){
          case true:
            return {
              ...prev,
              printers: prev.printers?.map(p => {
                if(p.printer?.id === printer.printer?.id){
                  return {
                    ...p,
                    work_details: event.target.value
                  }
                }
                return p
              })
            }
          case false:
            return {
              ...prev,
              unregistered_printers: prev.unregistered_printers?.map(p => {
                if(p.printer?.id === printer.printer?.id){
                  return {
                    ...p,
                    work_details: event.target.value
                  }
                }
                return p
              })
            }
      }
    })
  }

  return (
    <Accordion
      variant="outlined"
      expanded={expanded === printer.id}
      onChange={onAccordionChange(printer)}
      key={`${printer?.printer?.serial_number}${printer.id}`}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>{formatter.format(printer)}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Stack spacing={3} justifyContent="center" alignItems="center">
          <TextField label="Opis" fullWidth value={printer.work_details || ""} onChange={onWorkDetailsChange}/>
          <Stack direction="row" spacing={1} width="100%">
            <MaterialAutocomplete
              material={material}
              materials={materials}
              onLoading={materialLoading}
              onChange={onMaterialChange}
            />
            <TextField
              type="text"
              label="Količina"
              value={amount || ""}
              onChange={onMaterialAmountChange}
            />
            <IconButton
              sx={{ width: "55px" }}
              onClick={onMaterialAdd(isRegistered, printer.id)}
            >
              <AddBoxIcon fontSize="large" color="primary" />
            </IconButton>
          </Stack>
          {!!printer.material?.length && (
            <SimpleTable
              rows={printer?.material}
              headCells={OrderMaterialHeader}
              removable
              removeFunction={onMaterialRemove}
              parent={printer.printer}
              tag={isRegistered}
            />
          )}
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};

const MaterialAutocomplete: React.FC<{
  material: Partial<MaterialType> | undefined;
  materials: Partial<MaterialType>[];
  onLoading: boolean;
  onChange: (event: React.SyntheticEvent, value?: any) => void;
}> = ({
  material,
  materials,
  onLoading: materialLoading,
  onChange: onPrinterMaterialChange,
}) => {
  const [materialInput, setMaterialInput] = useState<string>("");

  const onPrinterMaterialInput = (
    event: React.SyntheticEvent<Element, Event>,
    value?: any
  ) => {
    setMaterialInput(value);
  };

  return (
    <>
      <AdvancedAutocomplete
        label="Materijali"
        formatter={MaterialAutocompleteFormatter}
        loading={materialLoading}
        options={materials}
        option={material || null}
        onInputChange={onPrinterMaterialInput}
        inputValue={materialInput || ""}
        onChange={onPrinterMaterialChange}
        sx={{ width: "80%" }}
      />
    </>
  );
};

export default OrderPrinterAccordion;
