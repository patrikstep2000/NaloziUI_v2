import { Button, Stack, SxProps, TextField } from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";
import { ChangeEvent, useState } from "react";
import styled from "styled-components";
import { useDebouncedCallback } from "use-debounce";

const DateTimeBox = styled.section`
  width: 100%;
  box-sizing: border-box;
  display: flex;
  gap: 30px;
`;

const StackStyle: SxProps = {
  marginBottom:'20px',
  borderRadius: '5px',
  padding: '20px',
  boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
  gap: '20px'
}

const FiltersBox: React.FC<{
  setSearchValue: Function;
  disableDatePicker?: boolean;
}> = ({ setSearchValue, disableDatePicker }) => {
  const [startDateTime, setStartDateTime] = useState<Dayjs | null>(null);
  const [endDateTime, setEndDateTime] = useState<Dayjs | null>(null);

  const updateSearch = useDebouncedCallback((value: string) => {
    setSearchValue(value);
  }, 200);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    updateSearch(event.target.value);
  };

  const onStartDateTimeChange = (newValue: Dayjs | null) => {
    setStartDateTime(newValue);
  };

  const onEndDateTimeChange = (newValue: Dayjs | null) => {
    setEndDateTime(newValue);
  };

  const onClear = () => {
    setEndDateTime(null)
    setStartDateTime(null)
    setSearchValue(null)
  }

  return (
    <Stack sx={StackStyle}>
      <TextField
        onChange={handleSearchChange}
        style={{ width: "300px" }}
        id="outlined-basic"
        label="Pretraži"
        variant="outlined"
      />
      {!disableDatePicker && (
        <DateTimeBox>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              label="Od datuma:"
              value={startDateTime}
              onChange={onStartDateTimeChange}
            />
            <DateTimePicker
              label="Do datuma:"
              value={endDateTime}
              onChange={onEndDateTimeChange}
            />
          </LocalizationProvider>
        </DateTimeBox>
      )}
      <Button variant="contained" sx={{maxWidth: '200px'}} onClick={onClear}>Prikaži sve</Button>
    </Stack>
  );
};

export default FiltersBox;
