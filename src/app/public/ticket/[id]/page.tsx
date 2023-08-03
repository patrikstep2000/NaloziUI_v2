import TicketForm from "@/app/components/ui/forms/TicketForm";
import { TicketProvider } from "@/app/context/TicketContext";

export default function TicketPage({ params }: { params: { id: number } }){
    return (
        <TicketProvider>
            <TicketForm id={params.id} />
        </TicketProvider>
      );
}