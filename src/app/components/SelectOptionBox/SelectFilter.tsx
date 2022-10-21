import * as React from "react";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { SelectEnum } from "types/enums";
import { useTranslation } from "react-i18next";
import { useTheme } from "@mui/material";

export const FilterWithSelect = () => {
  const { t } = useTranslation();
  const [selectedValue, setSelectedValue] = React.useState<string>(
    SelectEnum.ALL
  );
  const theme = useTheme();

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedValue(event.target.value as string);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth size="small">
        <Select
          value={selectedValue}
          onChange={handleChange}
          inputProps={{ "aria-label": "Without label" }}
          sx={{ color: theme.palette.common.black }}
        >
          <MenuItem value={SelectEnum.ALL}>
            {t(`enums.${SelectEnum.ALL}`)}
          </MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};
