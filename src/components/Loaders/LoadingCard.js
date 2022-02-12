import React from "react";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Rating from "@mui/material/Rating";
import IconButton from "@mui/material/IconButton";

const LoadingCard = () => (
  <>
    <Card variant="none" sx={{ display: "flex", backgroundColor: "#FDF4E7" }}>
      <Box>
        <Skeleton
          variant="rectangular"
          sx={{ width: 128, minWidth: 128, height: 168, minHeight: 168 }}
        />
        <Rating
          sx={{
            color: "rgba(0, 0, 0, 0.11);",
            animation: "animation-c7515d 1.5s ease-in-out 0.5s infinite",
          }}
          name="disabled"
          value={0}
          disabled
        />
        <Box>
          <IconButton disabled={true}>
            <FavoriteIcon
              sx={{
                display: "inline-block",
                verticalAlign: "middle",
                color: "rgba(0, 0, 0, 0.11);",
                animation: "animation-c7515d 1.5s ease-in-out 0.5s infinite",
              }}
            />
          </IconButton>

          <Typography
            style={{ display: "inline-block", verticalAlign: "middle" }}
            variant="caption"
            gutterBottom
          >
            <Skeleton sx={{ width: 64 }} />
          </Typography>
        </Box>
      </Box>
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
      </Box>
    </Card>
  </>
);

export default LoadingCard;
