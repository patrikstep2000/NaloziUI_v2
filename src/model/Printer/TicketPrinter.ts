import PrinterType from "./Printer"

type TicketPrinterType={
    id:number,
    details?:string,
    printer:Partial<PrinterType>
}

export const TicketPrinterHeader = [
    { name: "printer", label: "Printer", disablePadding: false, numeric: false, formatter: () => null, 
        optional: (e:TicketPrinterType) => `${e.printer.model?.printer_brand?.name} ${e.printer.model?.name} - ${e.details}`
    }
]

export default TicketPrinterType