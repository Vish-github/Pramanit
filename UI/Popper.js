import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";

import settings from "../assets/svgs/settings.svg";

import Image from "next/image";
import {useRouter} from "next/router";

import {connect} from "react-redux";
import {removeToken} from "../redux/actions/token.action";

import {signOut,useSession} from "next-auth/react";

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
}));

function SimplePopover({removeUserDetails}) {
  const classes = useStyles();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { data: session } = useSession();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const logout = () => {
    console.log("inside logout");
    if(session)
    {
      console.log(" b4 loggin of session ", session);
      signOut("google");
      console.log("loggin of session ",session);
    }
    localStorage.removeItem("pramanit");
    removeUserDetails();
  };
  return (
    <>
      <Image
        src={settings}
        width={30}
        height={30}
        onClick={handleClick}
        aria-describedby={id}
      />
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Typography className={classes.typography} onClick={()=>{logout()}}>
          Logout
        </Typography>
      </Popover>
    </>
  );
}

const mapStateToProps = (state) => ({
  accesstoken: state.token?.token,
});

const mapDispatchToProps = (dispatch) => {
  return {
    removeUserDetails: () => dispatch(removeToken()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SimplePopover);
