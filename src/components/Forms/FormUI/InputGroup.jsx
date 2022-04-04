import { Grid } from "@mui/material";

const InputGroup = ({ children, full, ...otherProps }) => {
  return (
    <Grid
      item
      xs={12}
      md={full ? 12 : 6}
      display="flex"
      justifyContent="center"
      alignItems="center"
      {...otherProps}
    >
      {children}
    </Grid>
  );
};

export default InputGroup;
