import { MUIIcon } from "../lib/constants";

export interface DrawerItemType extends MUIIcon{
    name:string,
    url?:string,
    admin?:boolean 
}
