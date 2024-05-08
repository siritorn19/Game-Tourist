import React from "react";
import { Grid, Typography, Button } from "@mui/material";
import LocationOnIcon from '@mui/icons-material/LocationOn';

function AllStore() {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      sx={{
        display: "flex",
        justifyContent: "space-between",
        p: 0.5,
        mt: 3,
        width: 400
      }}
    >
      <Button
        variant="contained"
        style={{
          borderRadius: 30,
          backgroundColor: "#93d701",
          padding: "4px 30px",
          fontSize: "18px",
          fontFamily: "Prompt",
          color: "#000",
        }}
      >
        สาขาทั้งหมด
      </Button>
      <a href="/liststore"
        rel="noopener noreferrer"
        style={{ textDecoration: "none", color: "#000" }}
      >
        <Grid
          container
          spacing={1}
          sx={{ borderRadius: 5, p: 2, backgroundColor: "grey.200" }}
        >
          <Grid item xs={3}>
            <LocationOnIcon sx={{ fontSize: 50, color: "#000" }} />
          </Grid>
          <Grid item xs={9}>
            <Typography sx={{ fontFamily: "Prompt" }}>
              กดเพื่อดูสาขาทั้งหมดที่ร่วม สุขทันที ที่เที่ยวไทย
              สุขไปกันใหญ่ที่บิ๊กซี
            </Typography>
          </Grid>
        </Grid>
      </a>
    </Grid>
  );
}

export default AllStore;
