import { Grid, IconButton, TextField } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { UpdateAmountEnum } from "types/enums";

interface ChangeAmountProductProps {
  value: number;
  handleChangeAmount: (type: UpdateAmountEnum, value?: number) => void;
  handleDoAfterChange?: () => void;
}

const ChangeAmountProduct = ({
  value,
  handleChangeAmount,
  handleDoAfterChange,
}: ChangeAmountProductProps) => {
  return (
    <Grid container>
      <Grid item>
        <IconButton
          onClick={() => {
            handleChangeAmount(UpdateAmountEnum.REDUCE);
          }}
          disabled={value === 1}
        >
          <RemoveCircleIcon />
        </IconButton>
      </Grid>
      <Grid item flex={1} alignSelf="stretch">
        <TextField
          type="text"
          size="small"
          variant="outlined"
          value={value}
          inputProps={{ style: { textAlign: "center" } }}
          onKeyPress={(event) => {
            if (!/[0-9]/.test(event.key)) {
              event.preventDefault();
            }
          }}
          onChange={(e) => {
            const newValue = e.target.value ? parseInt(e.target.value) : 0;
            handleChangeAmount(UpdateAmountEnum.INSERT, newValue);
          }}
        />
      </Grid>
      <Grid item>
        <IconButton
          onClick={() => {
            handleChangeAmount(UpdateAmountEnum.INCREASE);
          }}
        >
          <AddCircleIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default ChangeAmountProduct;
