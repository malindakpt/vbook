import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import {
  Grid,
  Box,
  CardHeader,
  CardMedia,
  CardContent,
  Divider,
} from "@mui/material";

export const GridItemAdd = () => {
  return (
    <Grid xs={12} sm={6} item>
      <Box sx={{ margin: 0 }}>
        <CardHeader title={" ."} subheader={" ."} color="transperant" />
        <Grid container>
          <Grid item margin={"auto"} height={"150px"}>
          <AddIcon  style={{ fontSize: "70px", margin: 'auto', display: 'block' }} />
            <Typography align="center" variant="h6">Add New Record</Typography>
            <Typography align="center" variant="subtitle1">Today</Typography>
            
          </Grid>
        </Grid>

        {/* <CardContent>
          <Typography variant="body2">{`ODO Me `}</Typography>
          <Typography variant="body2"> asd</Typography>
        </CardContent>

        <Divider variant="middle" /> */}
      </Box>
    </Grid>
  );
};
