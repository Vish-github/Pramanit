import React, { useRef } from "react";
import { Button } from "@mui/material";
import ReactToPrint from "react-to-print";
import Certificate from "../src/components/NewDocument";

const DATA = {
  name: "Eren Yeager",
  place: "Shiganshina District, Wall Maria",
  date: "20/03/840",
  fathers_name: "Grisha Yeager",
  mothers_name: "Carla Yeager",
};

export default function PrintComponent() {
  let componentRef = useRef();

  return (
    <>
      <div>
        {/* component to be printed */}
        <Certificate ref={(el) => (componentRef = el)} data={DATA} />

        {/* button to trigger printing of target component */}
        <ReactToPrint
          trigger={() => (
            <Button
              variant="contained"
              style={{
                alignSelf: "center",
                fontWeight: "bold",
                padding: "1rem 2rem",
                marginLeft: "8rem",
              }}
            >
              Download Certificate
            </Button>
          )}
          content={() => componentRef}
        />
      </div>
    </>
  );
}
