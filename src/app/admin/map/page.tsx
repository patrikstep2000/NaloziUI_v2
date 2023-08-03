"use client"

import {
  Backdrop,
  Box,
  CircularProgress,
  Stack,
  SxProps,
  Tab,
  Tabs,
} from "@mui/material";
import useApi from "@/app/lib/hooks/useApi";
import TabPanel from "@/app/components/container/reusable/TabPanel";
import { ClientsMarkers, PrintersMarkers, RepairmenMarkers } from "@/app/components/ui/MapMarkers";
import ClientsMapTab from "@/app/components/ui/tabs/mapTabs/ClientsMapTab";
import PrintersMapTab from "@/app/components/ui/tabs/mapTabs/PrintersMapTab";
import RepairmenMapTab from "@/app/components/ui/tabs/mapTabs/RepairmenMapTab";
import { ApiUrls } from "@/app/lib/constants";
import ClientType from "@/model/Client/Client";
import PrinterType from "@/model/Printer/Printer";
import UserType from "@/model/User/User";
import { useLoadScript, GoogleMap } from "@react-google-maps/api";
import { useState, SyntheticEvent, useEffect } from "react";

const tabSx: SxProps = {
  minWidth: "200px",
};

const center = { lat: 44.7, lng: 16.7 };

export default function MapPage() {
  const connector = useApi();
  const [clients, setClients] = useState<ClientType[]>([]);
  const [printers, setPrinters] = useState<PrinterType[]>([]);
  const [repairmen, setRepairmen] = useState<UserType[]>([]);
  const [selectedClientId, setSelectedClientId] = useState<number>();

  const [tabIndex, setTabIndex] = useState(0);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_MAPS_KEY as string,
  });

  const onTabChange = (event: SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  useEffect(() => {
    const controller = new AbortController();

    connector
      .get(ApiUrls.Clients, controller)
      .then((res) => setClients(res.data.data))
      .catch(console.error);

    return () => {
      controller.abort();
    };
  }, []);

  if (!isLoaded)
    return (
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );

  return (
    <Stack direction="row" alignItems="start" justifyContent="space-between">
      <GoogleMap
        zoom={7}
        center={center}
        mapContainerStyle={{ width: "100%", height: "85vh" }}
      >
        {tabIndex === 0 ? (
          <ClientsMarkers
            clients={clients}
            setSelectedClientId={setSelectedClientId}
          />
        ) : tabIndex === 1 ? (
          <PrintersMarkers printers={printers} />
        ) : (
          <RepairmenMarkers repairmen={repairmen} />
        )}
      </GoogleMap>
      <Box width="100%" height="90vh">
        <Tabs value={tabIndex} onChange={onTabChange} centered>
          <Tab label="Klijenti" sx={tabSx} />
          <Tab label="Pisači" sx={tabSx} />
          <Tab label="Serviseri" sx={tabSx} />
        </Tabs>
        <TabPanel value={tabIndex} index={0}>
          <ClientsMapTab id={selectedClientId} />
        </TabPanel>
        <TabPanel value={tabIndex} index={1}>
          <PrintersMapTab />
        </TabPanel>
        <TabPanel value={tabIndex} index={2}>
          <RepairmenMapTab />
        </TabPanel>
      </Box>
    </Stack>
  );
}
