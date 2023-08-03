import { OrderPrinterAutocompleteFormatter, OrderUnregisteredPrinterAutocompleteFormatter } from "@/app/lib/util/AutocompleteFormatter";
import OrderType from "@/model/Order/Order";
import OrderPrinterType from "@/model/Printer/OrderPrinter";
import OrderUnregisteredPrinterType from "@/model/Printer/OrderUnregisteredPrinter";
import { Stack } from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";
import OrderCounterAccordion from "../../accordions/OrderCounterAccordion";
const OrderCountersTab: React.FC<{
    order: Partial<OrderType>;
    setOrder: Dispatch<SetStateAction<Partial<OrderType>>>;
}> = ({order, setOrder}) => {
    const [expanded, setExpanded] = useState<number>();

    const onAccordionChange =
    (printer?: Partial<OrderPrinterType | OrderUnregisteredPrinterType>) =>
    (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? printer?.id : 0);
    };
    
    return (
        <Stack>
            {!!order.printers?.length && 
            order.printers.map((p) => <OrderCounterAccordion
                key={p.printer?.serial_number}
                printer={p}
                setOrder={setOrder}
                expanded={expanded}  
                onChange={onAccordionChange}
                formatter={OrderPrinterAutocompleteFormatter}
                isRegistered={true}
            />)}
            {!!order.unregistered_printers?.length && 
            order.unregistered_printers.map((p) => <OrderCounterAccordion
                key={p.printer?.serial_number}
                printer={p}
                setOrder={setOrder}
                expanded={expanded}  
                onChange={onAccordionChange}
                formatter={OrderUnregisteredPrinterAutocompleteFormatter}
                isRegistered={false}
            />)}
        </Stack>
    )
}

export default OrderCountersTab