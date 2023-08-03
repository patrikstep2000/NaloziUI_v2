import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { DrawerItemType } from "../model/DrawerItem";
import HomeIcon from "@mui/icons-material/Home";
import ArticleIcon from "@mui/icons-material/Article";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import HardwareIcon from "@mui/icons-material/Hardware";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import BusinessIcon from "@mui/icons-material/Business";
import PrintIcon from "@mui/icons-material/Print";
import MapIcon from "@mui/icons-material/Map";

export enum USER_ROLE {
  ADMIN = "Administrator",
  SERVISER = "Serviser",
}

export enum PRINTER_STATUS {
  IN_RENT = 1,
  WRITE_OFF = 2,
  FOR_PARTS = 3,
  ON_CONDITION = 4,
}

export enum PRINTER_TYPE {
  BW = 1,
  COLOR = 2,
}

export type MUIIcon = {
  Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
  };
};

export enum ORDER_STATUS {
  Potpisan = 1,
  Otvoren = 2,
}

export const DrawerItems: DrawerItemType[] = [
  { name: "Home", url: "/public", Icon: HomeIcon },
  { name: "Tiketi", url: "/public/ticket", Icon: AssignmentTurnedInIcon },
  { name: "Nalozi", url: "/public/order", Icon: ArticleIcon },
  { name: "Dijelovi", url: "/admin/material", Icon: HardwareIcon, admin: true },
  { name: "Klijenti", url: "/admin/client", Icon: BusinessIcon, admin: true },
  { name: "Pisači", url: "/admin/printer", Icon: PrintIcon, admin: true },
  { name: "Korisnici", url: "/admin/user", Icon: PeopleAltIcon, admin: true },
  { name: "Mapa", url: "/admin/map", Icon: MapIcon, admin: true },
];

export const UIUrls = {
  Index: "/public",
  Order: "/public/order",
  OrderCreate: "/public/order/create",
  OrderEdit: "/public/order/edit",
  Login: "/auth/login",
  Logout: "/api/auth/signout",
  SignOrder: "/public/order/sign",
  Ticket: "/public/ticket",
  EditTicket: "/public/ticket/edit",
  Material: "/admin/material",
  MaterialEdit: "/admin/material/edit",
  MaterialCreate: "/admin/material/create",
  Client: "/admin/client",
  ClientEdit: "/admin/client/edit",
  ClientCreate: "/admin/client/create",
  Printer: "/admin/printer",
  PrinterEdit: "/admin/printer/edit",
  User: "/admin/user",
  UserEdit: "/admin/user/edit",
  UserCreate: "/admin/user/create",
};

export const ApiUrls = {
  WhoAmI: "/auth/whoami",
  Refresh: "/auth/refresh",
  ResetPassword: "/user/reset_password",
  Login: "/auth/login",
  Order: "/order",
  CreateOrder: "/order/create",
  Orders: "/orders",
  Clients: "/clients",
  Client: "/client",
  PrintersByClient: "/printers/client",
  Material: "/materials",
  Tickets: "/tickets",
  Ticket: "/ticket",
  SignOrder: "/order/sign",
  TakeTicket: "/ticket/take",
};
