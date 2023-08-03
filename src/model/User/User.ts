import { Role } from "./Role";

type UserType={
    id:string,
    first_name:string,
    last_name:string,
    email:string,
    password:string,
    role:Role,
    deleted_at?:Date
}

export const UserHeader = [
    { name: "name", label: "Ime i prezime", disablePadding: false, numeric: false, formatter: () => null, optional: (e:UserType) =>  `${e.first_name} ${e.last_name}`},
    { name: "email", label: "Email", disablePadding: false, numeric: false},
    { name: "role", label: "Vrsta", disablePadding: false, numeric: false, formatter: (e:Role) => e.name},
  ]

export default UserType;