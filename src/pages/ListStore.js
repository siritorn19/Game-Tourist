import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Layout from "./Layout";
import jsondata from "../data/data.json";

function AccordionSection({ title, storeNames, open, handleChange }) {
  return (
    <Grid sx={{ m: 1 }}>
      <Accordion
        sx={{
          width: "100%",
          borderRadius: "10px",
          backgroundColor: "#93d701",
        }}
        expanded={open === title}
        onChange={handleChange(title)}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          sx={{ borderBottom: "1px solid #e0e0e0" }}
        >
          <Typography
            variant="h6"
            sx={{
              fontFamily: "Prompt",
              color: "#000",
              // fontWeight: "bold",
            }}
          >
            จังหวัด{title}
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ border: "1px solid #f7f7f7" }}>
          {storeNames.map((storeName, index) => (
            <div key={index}>
              <Typography
                sx={{
                  fontsize: 13,
                  fontFamily: "Prompt",
                  color: "#000",
                }}
              >
                <LocationOnIcon
                  direction="row"
                  sx={{
                    mr: 1,
                    mb: 0,
                  }}
                />
                {storeName}
              </Typography>
            </div>
          ))}
        </AccordionDetails>
      </Accordion>
    </Grid>
  );
}

function ListStore() {
  const [data, setData] = useState([]);
  const [openAccordion, setOpenAccordion] = useState(null);

  useEffect(() => {
    setData(jsondata);
  }, []);

  const handleBack = (e) => {
    e.preventDefault();
    window.history.go(-1);
    return false;
  };

  const handleChange = (panel) => (event, isExpanded) => {
    setOpenAccordion(isExpanded ? panel : null);
  };

  // Group storeNames by storeCity
  const groupedData = data.reduce((acc, { storeCity, storeName }) => {
    if (!acc[storeCity]) {
      acc[storeCity] = [];
    }
    acc[storeCity].push(storeName);
    return acc;
  }, {});

  const accordionSections = Object.entries(groupedData).map(([storeCity, storeNames]) => ({
    title: storeCity,
    storeNames: storeNames,
  }));

  return (
    <Layout>
      <Grid sx={{ m: 1 }}>
        <Grid container spacing={0} direction="column">
          <Grid sx={{ m: 1 }}>
            <IconButton onClick={handleBack}>
              <ArrowBackIosIcon sx={{ stroke: "#000", strokeWidth: 2 }} />
            </IconButton>
          </Grid>
          <Grid item xs={12}>
            <Typography fontSize={22} color="#000" align="center">
              <b>
                สุขทันที <a style={{ color: "#f2228f" }}>ที่เที่ยวไทย</a> <br /> 
                สุขไปกันใหญ่ ที่บิ๊กซี
              </b>
            </Typography>
          </Grid>
        </Grid>

        <Grid
          container
          spacing={0}
          direction="column"
          sx={{
            display: "flex",
            marginTop: "2rem",
          }}
        >
          {accordionSections.map(({ title, storeNames }) => (
            <AccordionSection
              key={title}
              title={title}
              storeNames={storeNames}
              open={openAccordion}
              handleChange={handleChange}
            />
          ))}
        </Grid>
      </Grid>
    </Layout>
  );
}

export default ListStore;
