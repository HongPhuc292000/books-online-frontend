import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import { Grid } from "@mui/material";
import { SimpleCardImage } from "app/components/CardImage";
import { CategoryBookContainer } from "app/components/Container";
import { LinkLabel } from "app/components/Label";
import TitlePageWithIcon from "app/components/Label/LabelWithIcon";
import { useAppSelector } from "app/hooks";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { selectHome } from "../slice/selector";

const BestSellingBooks = memo(() => {
  const { t } = useTranslation();
  const { listBestSellingBooks } = useAppSelector(selectHome);
  const navigate = useNavigate();

  return (
    <CategoryBookContainer>
      <Grid container justifyContent="space-between" alignItems="center" mb={4}>
        <Grid item>
          <TitlePageWithIcon
            title={t("common.bestSellingBooks")}
            icon={<LocalFireDepartmentIcon color="inherit" />}
          />
        </Grid>
        <Grid item>
          <LinkLabel
            variant="body2"
            onClick={() => {
              navigate(`/product/list?bestSaled=${true}`);
            }}
          >
            {t("common.showmore")}
          </LinkLabel>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        {listBestSellingBooks?.data
          ? listBestSellingBooks?.data.map((item) => {
              return (
                <Grid key={item._id} item xs={3}>
                  <SimpleCardImage productInfo={item} />
                </Grid>
              );
            })
          : null}
      </Grid>
    </CategoryBookContainer>
  );
});

export default BestSellingBooks;
