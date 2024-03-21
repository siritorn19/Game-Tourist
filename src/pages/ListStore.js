// ListStorePage1.js
import { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Layout from "./Layout";
import jsondata from "../data/data.json";


function AccordionSection({ title, filteredData }) {
  return (
    <Grid sx={{ mt: 2 }}>
      <Accordion
        sx={{
          width: "100%",
          borderRadius: "10px",
          backgroundColor: "#9ac93d",
        }}
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
              fontWeight: "bold",
            }}
          >
            {title}
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ border: "1px solid #f7f7f7" }}>
          {filteredData.map((item, index) => (
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
                {item.storeName}
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

  useEffect(() => {
    setData(jsondata);
  }, []);

  const filteredSections = [
    { title: "กรุงเทพมหานคร", filter: (item, index) => index >= 1 && index <= 23 },
    { title: "สุราษฎร์ธานี", filter: (item, index) => index >= 24 && index <= 54 },
    { title: "สระบุรี", filter: (item, index) => index >= 55 && index <= 79 },
    { title: "นครพนม", filter: (item, index) => index >= 116 && index <= 128 },
    { title: "ชัยนาท", filter: (item, index) => index >= 129 && index <= 131 },
    { title: "พังงา", filter: (item, index) => index >= 132 && index <= 134 },
    { title: "หาดใหญ่", filter: (item, index) => index >= 135 && index <= 171 },
    { title: "สุราษฎร์ธานี", filter: (item, index) => index >= 172 && index <= 195 },
    { title: "ระยอง", filter: (item, index) => index >= 216 && index <= 235 },
    { title: "ปัตตานี", filter: (item, index) => index >= 236 && index <= 259 },
  ];

  return (
    <Layout>
      <Grid sx={{ m: 1 }}>
        <Grid item xs={12} sx={{ m: 2 }}>
          <Typography fontSize={26} color="#000" align="center">
            <b>
              สุขทันที <a style={{ color: "#f2228f" }}>ที่เที่ยวไทย</a> <br />{" "}
              สุขไปกันใหญ่ ที่บิ๊กซี
            </b>
          </Typography>
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
          {filteredSections.map(({ title, filter }) => (
            <AccordionSection
              key={title}
              title={title}
              filteredData={data.filter(filter)}
            />
          ))}
        </Grid>
      </Grid>
    </Layout>
  );
}

export default ListStore;
