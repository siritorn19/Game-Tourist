import React from "react";
import { Grid, Typography, Button } from "@mui/material";
import ArticleIcon from "@mui/icons-material/Article";

function HowtoPlay() {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      sx={{
        display: "flex",
        justifyContent: "space-between",
        p: 2,
        mt: 2,
      }}
    >
      <Button
        variant="contained"
        style={{
          borderRadius: 30,
          backgroundColor: "#9ac93d",
          padding: "4px 30px",
          fontSize: "18px",
          fontFamily: "Prompt",
          color: "#000",
        }}
      >
        วิธีเล่นเกม
      </Button>
      <a href="#"
        target="_blank"
        rel="noopener noreferrer"
        style={{ textDecoration: "none", color: "#000" }}
      >
        <Grid
          container
          spacing={1}
          sx={{ borderRadius: 5, p: 2, backgroundColor: "grey.200" }}
        >
          <Grid item xs={3}>
            <ArticleIcon sx={{ fontSize: 50, color: "#000" }} />
          </Grid>
          <Grid item xs={9}>
            <Typography sx={{ fontFamily: "Prompt" }}>
              กดเพื่อดูวิธีการเล่นเกม สุขทันที ที่เที่ยวไทย
              สุขไปกันใหญ่ที่บิ๊กซี
            </Typography>
          </Grid>
        </Grid>
      </a>
    </Grid>
  );
}

export default HowtoPlay;
