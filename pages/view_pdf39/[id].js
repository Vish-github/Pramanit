import { Grid } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const ViewPdf39 = () => {
  const router = useRouter();
  const [pdfUrl, setPdfUrl] = useState(null);

  useEffect(() => {
    if (!router.isReady) return;

    const url = `/api/pdf_getter/${router.query.id}`;

    setPdfUrl(url);
  }, [router.isReady]);

  return (
    <div>
      <Grid container spacing={2} style={{ height: "80vh", padding: "2rem" }}>
        <Grid item xs={6}>
          <object
            data={pdfUrl}
            type="application/pdf"
            width="100%"
            height="100%"
          >
            <p>
              Alternative text - include a link <a href={pdfUrl}>to the PDF!</a>
            </p>
          </object>
        </Grid>
        <Grid item xs={6} display="flex" justifyContent="center">
          <h1>Block Details</h1>
          <p></p>
        </Grid>
      </Grid>
    </div>
  );
};

export default ViewPdf39;
