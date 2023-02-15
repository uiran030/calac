import React from "react";
import { AccessTime } from "@mui/icons-material";
import { Avatar, Grid, Paper, Rating, Typography } from "@mui/material";
import { Box } from "@mui/system";

export default function TestCard({ tour }) {
  return (
    <Grid item xs={4} md={4} sx={{ width: "30px" }}>
      <Paper
        elevation={4}
        className='paper'
        sx={{
          cursor: "pointer",
          "&:hover": {
            transform: "scale(1.02)",
          },
        }}
      >
        <Avatar
          src={tour.image}
          alt=''
          className='img'
          sx={{ width: "100%", height: "200px", borderRadius: "0" }}
        />
        <Box
          sx={{
            padding: 1,
          }}
        >
          <Typography variant='subtitle1' component='h2'>
            {tour.name}
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <AccessTime style={{ width: 12.5 }} />
            <Typography variant='body2' component='p' marginLeft={0.5}>
              {tour.duration} hours
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
            marginTop={3}
          >
            <Rating
              name='size-small'
              size='small'
              defaultValue={tour.rating}
              precision={0.25}
              readOnly
            />
            <Typography variant='body2' component='p' marginLeft={0.5}>
              {tour.rating}
            </Typography>
            <Typography variant='body3' component='p' marginLeft={1.5}>
              ({tour.numberOfReviews} reviews)
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
            }}
          >
            <Typography variant='h6' component='h2' marginTop={0}>
              {tour.price}
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Grid>
  );
}
