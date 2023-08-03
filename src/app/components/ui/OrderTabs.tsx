import {
  Box,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  Stack,
  SxProps,
  Tab,
  Tabs,
} from "@mui/material";
import { Dispatch, SetStateAction, SyntheticEvent, useState } from "react";
import OrderCountersTab from "./tabs/orderTabs/OrderCountersTab";
import OrderGeneralTab from "./tabs/orderTabs/OrderGeneralTab";
import OrderPrintersTab from "./tabs/orderTabs/OrderPrintersTab";
import OrderType from "@/model/Order/Order";
import TabPanel from "../container/reusable/TabPanel";

const tabSx: SxProps = {
  minWidth: "200px",
};

const OrderTabs: React.FC<{
  order: Partial<OrderType>;
  setOrder: Dispatch<SetStateAction<Partial<OrderType>>>;
}> = ({ order, setOrder }) => {
  const [tabIndex, setTabIndex] = useState(0);

  const onTabChange = (event: SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  return (
    <Box sx={{ marginTop: "15px" }} >
      <Tabs value={tabIndex} onChange={onTabChange} centered>
        <Tab label="Općenito" sx={tabSx} />
        <Tab label="Printeri" sx={tabSx} />
        <Tab label="Brojčanici" sx={tabSx} />
      </Tabs>
        <TabPanel value={tabIndex} index={0}>
            <OrderGeneralTab order={order} setOrder={setOrder} />
        </TabPanel>
        <TabPanel value={tabIndex} index={1}>
            <OrderPrintersTab order={order} setOrder={setOrder} />
        </TabPanel>
        <TabPanel value={tabIndex} index={2}>
            <OrderCountersTab order={order} setOrder={setOrder} />
        </TabPanel>     
    </Box>
  );
};

export default OrderTabs;
