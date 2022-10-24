import { styled } from "@mui/material";
import { isEmpty } from "lodash";
import { useTranslation } from "react-i18next";
import { StatusEnum } from "types/enums";
import { CommonLabel } from ".";

interface StatusLabelProps {
  status: string;
}

const CommonStatusLabel = styled(CommonLabel)(({ theme }) => ({
  padding: theme.spacing(0, 0.5),
  display: "inline-block",
}));

const SuccessLabel = styled(CommonStatusLabel)(({ theme }) => ({
  color: theme.palette.success.main,
  border: `1px solid ${theme.palette.success.main}`,
}));

const ErrorLabel = styled(CommonStatusLabel)(({ theme }) => ({
  color: theme.palette.error.main,
  border: `1px solid ${theme.palette.error.main}`,
}));

const InfoLabel = styled(CommonStatusLabel)(({ theme }) => ({
  color: theme.palette.info.main,
  border: `1px solid ${theme.palette.info.main}`,
}));

const SuccessTypes: string[] = [StatusEnum.FULL];

// const InfoTypes: string[] = [StatusEnum.NEW];

const ErrorTypes: string[] = [StatusEnum.HOT];

export const StatusLabel = ({ status }: StatusLabelProps) => {
  const { t } = useTranslation();
  if (!status || isEmpty(status)) return <></>;
  const isMatchedStatus = (listStatus: string[]) =>
    listStatus.find((color) => color === status);
  switch (status) {
    case isMatchedStatus(SuccessTypes):
      return <SuccessLabel>{t(`enums.${status}`)}</SuccessLabel>;
    case isMatchedStatus(ErrorTypes):
      return <ErrorLabel>{t(`enums.${status}`)}</ErrorLabel>;
    default:
      return <InfoLabel>{t(`enums.${status}`)}</InfoLabel>;
  }
};
