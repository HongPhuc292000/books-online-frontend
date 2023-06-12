import { Box, Step, StepButton, Stepper, styled } from "@mui/material";
import { useAppSelector } from "app/hooks";
import React, { memo, useEffect, useState } from "react";
import { OrderStatusesEnum } from "types/enums";
import { useTranslation } from "react-i18next";
import { selectCheckoutSuccess } from "../slice/selector";

const steps = [
  OrderStatusesEnum.INCART,
  OrderStatusesEnum.ORDERED,
  OrderStatusesEnum.CANCEL,
  OrderStatusesEnum.DELIVERING,
  OrderStatusesEnum.DONE,
  OrderStatusesEnum.REPAY,
];

const StepsContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  padding: theme.spacing(2, 1, 5, 1),
}));

const OrderSteps = memo(() => {
  const { t } = useTranslation();

  const [activeStep, setActiveStep] = useState(0);
  const { checkoutSuccessDetail } = useAppSelector(selectCheckoutSuccess);

  const handleStep = (stepIndex: number) => () => {
    setActiveStep(stepIndex);
  };

  useEffect(() => {
    if (checkoutSuccessDetail?.status) {
      const currentStepIndex = steps.findIndex(
        (step) => step === checkoutSuccessDetail.status
      );
      setActiveStep(currentStepIndex >= 0 ? currentStepIndex : 0);
    }
  }, [checkoutSuccessDetail]);

  return (
    <StepsContainer>
      <Stepper nonLinear activeStep={activeStep}>
        {steps.map((value, index) => (
          <Step key={value} disabled={true}>
            <StepButton
              sx={{ padding: 2 }}
              color="inherit"
              onClick={handleStep(index)}
            >
              {t(`enums.${value}`)}
            </StepButton>
          </Step>
        ))}
      </Stepper>
    </StepsContainer>
  );
});

export default OrderSteps;
