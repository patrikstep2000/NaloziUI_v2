import AdvancedAutocomplete from "@/app/components/container/reusable/AdvancedAutocomplete";
import SimpleTable from "@/app/components/container/reusable/SimpleTable";
import { ApiUrls } from "@/app/lib/constants";
import useApi from "@/app/lib/hooks/useApi";
import { MaterialAutocompleteFormatter } from "@/app/lib/util/AutocompleteFormatter";
import { NumbersAboveZeroRegex } from "@/app/lib/util/Regex";
import MaterialType from "@/model/Material/MaterialType";
import OrderMaterialType, { OrderMaterialHeader } from "@/model/Material/OrderMaterial";
import OrderType from "@/model/Order/Order";
import { IconButton, Stack, TextField } from "@mui/material";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import AddBoxIcon from "@mui/icons-material/AddBox";

const OrderGeneralTab: React.FC<{
  order: Partial<OrderType>;
  setOrder: Dispatch<SetStateAction<Partial<OrderType>>>;
}> = ({ order, setOrder }) => {
  const connector = useApi();
  const [materials, setMaterials] = useState<Partial<MaterialType>[]>([]);
  const [materialLoading, setMaterialLoading] = useState(false);
  const [material, setMaterial] = useState<MaterialType>();
  const [materialInput, setMaterialInput] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    (async () => {
      setMaterialLoading(true);
      await connector.get(`${ApiUrls.Materials}`, controller)
      .then((result) =>{
          setMaterials(
            result.data.data?.filter((material: Partial<MaterialType>) => {
              let valid = true;
              order.material?.forEach(
                (m) => (valid = m.material?.id === material.id)
              );
              return valid
            })
          )
        }
      )
      .catch(console.error);
      setMaterialLoading(false);
    })()

    return () => {
      controller.abort();
    }
  }, []);

  const onWorkDetailsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOrder((prev: Partial<OrderType>) => {
      return {
        ...prev,
        work_details: event.target.value,
      };
    });
  };

  const onMaterialChange = (
    event: React.SyntheticEvent<Element, Event>,
    value?: any
  ) => {
    setMaterial(value);
  };

  const onMaterialInput = (
    event: React.SyntheticEvent<Element, Event>,
    value?: any
  ) => {
    setMaterialInput(value);
  };

  const onAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const regex = NumbersAboveZeroRegex;
    const amount = event.target.value;

    if(regex.test(amount)) setAmount(amount);
  };

  const onMaterialadd = () => {
    if (!material || amount === "") return;

    setOrder((prev: Partial<OrderType>) => {
      if (!prev.material) return prev;

      return {
        ...prev,
        material: [
          ...prev.material,
          {
            material: material,
            amount: Number(amount),
          },
        ],
      };
    });

    setMaterials((prev) => prev.filter((m) => m.id !== material.id));
    setMaterial(undefined);
    setMaterialInput("");
    setAmount("");
  };

  const onMaterialRemove = (material: OrderMaterialType) => {
    setMaterials((prev: Partial<MaterialType>[]) => [
      ...prev,
      material.material,
    ]);
    setOrder((prev: Partial<OrderType>) => {
      if (!prev.material) return prev;

      return {
        ...prev,
        material: prev.material.filter(
          (m) => m.material?.id !== material.material.id
        ),
      };
    });
  };

  return (
      <Stack>
        <TextField
          label='Opis'
          fullWidth
          value={order?.work_details ?? ""}
          onChange={onWorkDetailsChange}
          multiline
        />
        <Stack
          direction="row"
          spacing={2}
          sx={{ margin: "50px 0 10px 0", width: "100%" }}
        >
          <AdvancedAutocomplete
            label="Materijali"
            formatter={MaterialAutocompleteFormatter}
            loading={materialLoading}
            options={materials}
            option={material || null}
            onInputChange={onMaterialInput}
            inputValue={materialInput || ""}
            onChange={onMaterialChange}
            sx={{ width: "80%" }}
          />
          <TextField
            type="text"
            label="Količina"
            value={amount}
            onChange={onAmountChange}
          />
          <IconButton sx={{ width: "55px" }} onClick={onMaterialadd}>
            <AddBoxIcon fontSize="large" color="primary" />
          </IconButton>
        </Stack>
        {!!order.material?.length && (
          <SimpleTable
            rows={order?.material}
            headCells={OrderMaterialHeader}
            removable
            removeFunction={onMaterialRemove}
          />
        )}
      </Stack>
  );
};

export default OrderGeneralTab;
