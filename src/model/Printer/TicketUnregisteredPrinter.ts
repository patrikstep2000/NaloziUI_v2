import UnregisteredPrinterType from "./UnregisteredPrinter"

type TicketUnregisteredPrinterType={
    id:number,
    details?:string,
    unregistered_printer:Partial<UnregisteredPrinterType>
}

export const TicketUnregisteredPrinterHeader = [
    { name: "unregistered_printer", label: "Printer", disablePadding: false, numeric: false, formatter: () => null, 
    optional: (e:TicketUnregisteredPrinterType) => `${e.unregistered_printer.model} - ${e.details}`
}
]

export default TicketUnregisteredPrinterType