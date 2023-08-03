import { ClientFormatter } from "@/app/lib/util/Formatters";
import ContactType from "../Client/Contact";
import PrinterType from "../Printer/Printer";

export type Point={
    x:number,
    y:number
}

type ClientType={
    id:number,
    name:string,
    oib:string,
    erp:number,
    address:string,
    post_code:number,
    city:string,
    country:string,
    location?: Point,
    contacts?:Partial<ContactType>[],
    printers?:Partial<PrinterType>[]
}

export const ClientHeader = [
    { name: "name", label: "Ime", disablePadding: false, numeric: false },
    { name: "oib", label: "OIB", disablePadding: false, numeric: false },
    { name: "erp", label: "ERP", disablePadding: false, numeric: false },
    { name: "address", label: "Adresa", disablePadding: false, numeric: false, formatter: () => null, 
        optional: (client:ClientType) => ClientFormatter.formatFullAddress(client) }
  ]

export default ClientType;