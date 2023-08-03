import MaterialTypeType from "./MaterialType"

type MaterialType={
    id:number,
    name:string,
    type:Partial<MaterialTypeType>
}

export const MaterialHeader = [
    { name: "name", label: "Ime", disablePadding: false, numeric: false },
    { name: "type", label: "Tip", disablePadding: false, numeric: false, formatter: (e:MaterialTypeType) => e.name},
  ]

export default MaterialType;