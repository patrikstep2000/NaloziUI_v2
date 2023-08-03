import { FC, Fragment } from "react";
import { MarkerF } from "@react-google-maps/api";
import ClientType from "@/model/Client/Client";
import PrinterType from "@/model/Printer/Printer";
import UserType from "@/model/User/User";

export const ClientsMarkers: FC<{ clients: ClientType[], setSelectedClientId: Function }> = ({ clients, setSelectedClientId }) => {
  return (
    <Fragment>
      {clients.map((client) => {
        if (client.location?.x && client.location.y)
          return (
            <MarkerF
              key={client.id}
              position={{ lat: client.location?.x, lng: client.location?.y }}
              title={client.name}
              onClick={() => setSelectedClientId(client.id)}
            />
          );
      })}
    </Fragment>
  );
};

export const PrintersMarkers: FC<{ printers: PrinterType[] }> = ({
  printers,
}) => {
  return <></>;
};

export const RepairmenMarkers: FC<{ repairmen: UserType[] }> = ({
  repairmen,
}) => {
  return <></>;
};
