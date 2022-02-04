import React from "react";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";

const LoadingCard = () => (
  <>
    <Card variant="none" sx={{ display: "flex" }}>
      <Skeleton
        variant="rectangular"
        sx={{ width: 128, minWidth: 128, height: 168, minHeight: 168 }}
      />
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h5">
            <Skeleton sx={{ width: "30vw" }} />
          </Typography>
          <Typography variant="subtitle1" component="div">
            <Skeleton sx={{ width: "20vw" }} />
          </Typography>
          <Typography variant="subtitle2" component="div">
            <Skeleton sx={{ width: "100vw" }} />
          </Typography>
          <Typography variant="subtitle1" component="div">
            <Skeleton sx={{ width: "10vw" }} />
          </Typography>
        </CardContent>
        <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
          <IconButton>
            <Skeleton sx={{ height: "16px", width: "16px" }} />
          </IconButton>
          <IconButton>
            <Skeleton sx={{ height: "16px", width: "16px" }} />
          </IconButton>
          <IconButton>
            <Skeleton sx={{ height: "16px", width: "16px" }} />
          </IconButton>
        </Box>
      </Box>
    </Card>
  </>
);

export default LoadingCard;
