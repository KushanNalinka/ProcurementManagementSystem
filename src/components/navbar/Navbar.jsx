import "./navbar.scss";

import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";

import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";

import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close"; // React icon for close button
//import CheckCircleIcon from "@mui/icons-material/CheckCircle";
//import EventNoteIcon from "@mui/icons-material/EventNote";
//import BlockIcon from "@mui/icons-material/Block";
import CategoryRoundedIcon from '@mui/icons-material/CategoryRounded';
import ApartmentRoundedIcon from '@mui/icons-material/ApartmentRounded';
import BorderColorRoundedIcon from '@mui/icons-material/BorderColorRounded';

const Navbar = () => {
  const { dispatch } = useContext(DarkModeContext);
 
  const [isDialogOpen, setDialogOpen] = useState(false);
  const navigate = useNavigate();

  const handleListIconClick = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const navigateToPage = (pagePath) => {
    navigate(pagePath);
    handleDialogClose();
  };
  return (
    <div className="navbar">
      <div className="wrapper">
        
        <div className="items" >
          
        <div className="item">
            <ChatBubbleOutlineOutlinedIcon  onClick={() => navigateToPage("/invoices")} className="icon" />
            
          </div>
          
          <div className="item">
            <img
              src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
              className="avatar"
            />
          </div>
          <div className="navbar">
          <div className="item">
          <ListOutlinedIcon className="icon" onClick={handleListIconClick} />
          <Dialog open={isDialogOpen} onClose={handleDialogClose} fullWidth maxWidth="sm">
            <div className="dialog-header">
              <h2>Activities</h2>
              <CloseIcon onClick={handleDialogClose} className="close-icon" />
            </div>
            <List className="dialog-list">
              <ListItem
                button
                onClick={() => navigateToPage("/viewapprovedorders")}
                className="list-item"
              >
                <BorderColorRoundedIcon  className="list-icon check" />
                <ListItemText primary="Approved Orders" />
              </ListItem>
              <ListItem
                button
                onClick={() => navigateToPage("/registereditems")}
                className="list-item"
              >
                < CategoryRoundedIcon className="list-icon event" />
                <ListItemText primary="Procurement Items" />
              </ListItem>
              <ListItem
                button
                onClick={() => navigateToPage("/siteview")}
                className="list-item"
              >
                <ApartmentRoundedIcon className="list-icon block" />
                <ListItemText primary="Approved Projects and Sites" />
              </ListItem>
              {/* Add more activities and their respective page paths */}
            </List>
          </Dialog>
        </div>
        </div>

        </div>
      </div>
    </div>
  );
};

export default Navbar;
