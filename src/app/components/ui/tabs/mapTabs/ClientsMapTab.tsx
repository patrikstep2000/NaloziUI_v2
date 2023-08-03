import { ApiUrls } from "@/app/lib/constants";
import useApi from "@/app/lib/hooks/useApi";
import { ClientFormatter } from "@/app/lib/util/Formatters";
import ClientType from "@/model/Client/Client";
import { Box, Button, Stack, SxProps, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";

const typographyStyle: SxProps = {
  width: '100%',
  marginLeft: '40px'
}

const ClientsMapTab: FC<{ id: number | undefined }> = ({ id }) => {
  const connector = useApi();
  const [client, setClient] = useState<ClientType>()

  useEffect(() => {
    if (id) {
      const controller = new AbortController();

      connector
        .get(`${ApiUrls.Client}/${id}`, controller)
        .then(res => setClient(res.data))
        .catch(console.error)

        return () => {
          controller.abort();
        }
    }
  }, [id]);

  return (
    <Box>
      {client ? (
        <Stack alignItems="center">
          <Typography variant='h6' sx={{textAlign:'center', width: '100%'}}>{client.name}</Typography>
          <Stack sx={{width: '100%', gap: '10px', margin: '30px 0 0 30px'}} >
            <Typography sx={typographyStyle}>{`Address: ${ClientFormatter.formatFullAddress(client)}`}</Typography>
            <Typography sx={typographyStyle}>{`OIB: ${client.oib}`}</Typography>
            <Typography sx={typographyStyle}>{`ERP: ${client.erp}`}</Typography>
            <Typography sx={typographyStyle}>{`Broj pisača u najmu: ${client.printers?.length}`}</Typography>
            <Button></Button>
          </Stack>
        </Stack>
      ) : (
        <Typography sx={{ textAlign: "center" }}>
          Odaberite klijenta na mapi za detalje.
        </Typography>
      )}
    </Box>
  );
};

export default ClientsMapTab;
