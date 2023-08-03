import ClientType from "@/model/Client/Client";
import UserType from "@/model/User/User";
import { DateTime } from "luxon"

export class DateFormatter{
    public static formatToShortString = (date:Date | undefined) : string => {
        return date ? DateTime.fromISO(date.toString()).setLocale('HR').toLocaleString(DateTime.DATE_SHORT) : '-';
    }

    public static formatToLongString = (date:Date | undefined) : string => {
        return date ? DateTime.fromISO(date.toString()).setLocale('HR').toLocaleString(DateTime.DATETIME_MED_WITH_SECONDS) : '-';
    }
}

export class UserFormatter{
    public static formatFullName = (user?:Partial<UserType>) => {
        return user ? `${user?.first_name} ${user?.last_name}` : '';
    }
    
    public static formatInitials = (user?:Partial<UserType>) => {
        return user ? `${user.first_name?.charAt(0)}${user.last_name?.charAt(0)}` : ''
    }
}

export class ClientFormatter{
    public static formatFullAddress = (client?:Partial<ClientType>) =>{
        return client ? `${client?.address}, ${client?.post_code} ${client?.city}, ${client?.country}` : '';
    } 
}