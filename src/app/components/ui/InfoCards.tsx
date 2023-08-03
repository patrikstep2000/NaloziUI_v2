import { UserFormatter, DateFormatter, ClientFormatter } from "@/app/lib/util/Formatters";
import ClientType from "@/model/Client/Client";
import UnregisteredClientType from "@/model/Client/UnregisteredClient";
import OrderType from "@/model/Order/Order";
import InfoCard from "../container/reusable/InfoCard";
import SpaceBetweenTypography from "../container/reusable/SpaceBetweenStack";

export const OrderInfocard: React.FC<{
  order: Partial<OrderType> | undefined;
}> = ({ order }) => {
  return (
    <InfoCard sx={{height:'fit-content'}}>
        <SpaceBetweenTypography leftSide="Broj naloga:" rightSide={order?.order_number}/>
        <SpaceBetweenTypography leftSide="Status:" rightSide={order?.status?.name}/>
        <SpaceBetweenTypography leftSide="Serviser:" rightSide={UserFormatter.formatFullName(order?.user)}/>
        <SpaceBetweenTypography leftSide="Datum:" rightSide={DateFormatter.formatToShortString(order?.created_at)}/>
    </InfoCard>
  );
};

export const ClientInfoCard: React.FC<{
  client: Partial<ClientType> | undefined;
}> = ({ client }) => {
  return (
    <InfoCard sx={{height:'fit-content'}}>
        <SpaceBetweenTypography leftSide="Klijent:" rightSide={client?.name}/>
        <SpaceBetweenTypography leftSide="Lokacija:" rightSide={ClientFormatter.formatFullAddress(client)}/>
    </InfoCard>
  );
};

export const UnregisteredClientInfoCard: React.FC<{
  client: Partial<UnregisteredClientType> | undefined;
}> = ({ client }) => {
  return (
    <InfoCard sx={{height:'fit-content'}}>
        <SpaceBetweenTypography leftSide="Klijent:" rightSide={client?.name}/>
        <SpaceBetweenTypography leftSide="Lokacija:" rightSide={client?.address}/>
    </InfoCard>
  );
};
