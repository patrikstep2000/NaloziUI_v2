import ClientType from "./Client/Client";
import UnregisteredClientType from "./Client/UnregisteredClient";
import TicketPrinterType from "./Printer/TicketPrinter";
import TicketUnregisteredPrinterType from "./Printer/TicketUnregisteredPrinter";
import UserType from "./User/User";

type TicketType={
    id:number,
    details:string,
    created_at:Date,
    planned_solution_date?:Date,
    unregistered_client?:Partial<UnregisteredClientType>,
    client?:Partial<ClientType>,
    unregistered_printers?:Partial<TicketUnregisteredPrinterType>[],
    printers?:Partial<TicketPrinterType>[],
    user?:Partial<UserType>,
}

export default TicketType;