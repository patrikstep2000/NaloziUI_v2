import { AutocompleteFormatter } from "@/app/lib/util/AutocompleteFormatter";
import { Autocomplete, TextField, CircularProgress, SxProps, Theme, Box } from "@mui/material";
import React from "react";

const AdvancedAutocomplete: React.FC<{
  addKey?: React.Key | undefined | null;
  label: string;
  formatter: AutocompleteFormatter;
  options: any[];
  loading?: boolean
  option?: any;
  inputValue?: string;
  sx?: SxProps<Theme>;
  onChange?: (event: React.SyntheticEvent<Element, Event>, value?: any) => void;
  onInputChange?: (event: React.SyntheticEvent<Element, Event>, value?: any) => void;
}> = ({ addKey, label, option, inputValue, options, loading, formatter, onChange, onInputChange, sx }) => {

  return (
    <Box sx={sx ?? undefined}>
      <Autocomplete
        key={addKey}  
        onChange={onChange}
        onInputChange={onInputChange}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        getOptionLabel={(option) => formatter.format(option)}
        options={options}
        loading={loading}
        value={option}
        inputValue={inputValue}
        renderOption={
          (props, option) => <li {...props} key={option.id}>{formatter.format(option)}</li>
        }
        renderInput={(params) => (
          <TextField
            {...params}
            size='medium'
            label={label}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            }}
          />
        )}
      />
    </Box>
  );
};

export default AdvancedAutocomplete;
