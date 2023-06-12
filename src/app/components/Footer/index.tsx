import {
  Box,
  CardMedia,
  Container,
  Grid,
  Typography,
  styled,
  useTheme,
} from "@mui/material";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import EngineeringIcon from "@mui/icons-material/Engineering";
import EmailIcon from "@mui/icons-material/Email";
import HomeIcon from "@mui/icons-material/Home";
import vnPayLogo from "assets/images/footer/Logo-VNPAY-QR-1.png";

const policies = [
  "Hướng dẫn mua online",
  "Chính sách bảo hành",
  "Chính sách vận chuyển",
  "Chính sách bảo mật",
];

const customerSupport = [
  {
    icon: <ContactPhoneIcon fontSize="inherit" sx={{ marginRight: 1 }} />,
    title: "Tư vấn mua hàng",
    subtitle: "0988 888 888",
    note: "(Từ 8h00 - 21h00)",
  },
  {
    icon: <EngineeringIcon fontSize="inherit" sx={{ marginRight: 1 }} />,
    title: "Hỗ trợ kỹ thuật, bảo hành",
    subtitle: "0988 888 888",
    note: "(Từ 9h00 - 19h00)",
  },
  {
    icon: <EmailIcon fontSize="inherit" sx={{ marginRight: 1 }} />,
    title: "Góp ý kiến, khiếu nại",
    note: "cskh.bookonline@gmail.com",
  },
];

const address = [
  {
    icon: <HomeIcon fontSize="inherit" sx={{ marginRight: 1 }} />,
    title: "Cổ Nhuế, Nam Từ Liêm, Hà Nội",
  },
];

export const FooterHeaderLabel = styled(Typography)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.common.white}`,
  display: "inline-block",
  textTransform: "uppercase",
  marginBottom: theme.spacing(2),
}));

const Footer = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        mt: 4,
        backgroundColor: theme.palette.grey[900],
        color: theme.palette.common.white,
        paddingTop: 4,
        paddingBottom: 4,
      }}
    >
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <FooterHeaderLabel>Hướng dẫn - chính sách</FooterHeaderLabel>
            {policies.map((policy, index) => (
              <Typography
                sx={{
                  mb: 0.5,
                }}
                variant="body2"
                key={index}
              >
                {policy}
              </Typography>
            ))}
          </Grid>
          <Grid item xs={3}>
            <FooterHeaderLabel>Hỗ trợ khách hàng</FooterHeaderLabel>
            {customerSupport.map((item, index) => (
              <Box key={index}>
                <Typography
                  variant="body2"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {item.icon}
                  {item.title}
                </Typography>
                <Typography variant="body2">{item.subtitle}</Typography>
                <Typography
                  variant="body2"
                  sx={{ color: theme.palette.error.main }}
                >
                  {item.note}
                </Typography>
              </Box>
            ))}
          </Grid>
          <Grid item xs={3}>
            <FooterHeaderLabel>Địa chỉ</FooterHeaderLabel>
            {address.map((item, index) => (
              <Typography
                variant="body2"
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
                key={index}
              >
                {item.icon}
                {item.title}
              </Typography>
            ))}
          </Grid>

          <Grid item xs={3}>
            <FooterHeaderLabel>Hỗ trợ thanh toán</FooterHeaderLabel>
            <CardMedia component="img" src={vnPayLogo} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
