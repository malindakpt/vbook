import {
  Box,
  Container,
  CssBaseline,
  Grid,
  Paper,
  styled,
} from "@mui/material";

export const AddVehicle = () => {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  return (
    <Container maxWidth="lg">
        <Grid container spacing={2} rowSpacing={4}>
          <Grid xs={6} md={8} item>
            <Item>xs=6 md=8</Item>
          </Grid>
          <Grid xs={6} md={4} item>
            <Item>xs=6 md=4</Item>
          </Grid>
        </Grid>
   </Container>
  );
};
