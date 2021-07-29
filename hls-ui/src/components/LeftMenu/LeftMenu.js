import React from "react";

import {
    ProSidebar,
    Menu,
    MenuItem,
    SidebarHeader,
    SidebarFooter,
    SidebarContent,
} from "react-pro-sidebar";


import { FiHome } from "react-icons/fi";
import { BiCog } from "react-icons/bi";
import "react-pro-sidebar/dist/css/styles.css";

import { Link } from 'react-router-dom';

import './LeftMenu.css';


const LeftMenu = () => (
    <div id="header">
        <ProSidebar>
            <SidebarHeader>
                <div className="logotext">
                    {/* small and big change using menucollapse state */}
                    <p style={{textAlign: "center"}}>HLS</p>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <Menu iconShape="square">
                    <MenuItem active={true} icon={<FiHome />}>
                        <Link to="/">Home</Link>
                    </MenuItem>
                    <MenuItem icon={<BiCog />}>
                        <Link to="/settings">Settings</Link>
                    </MenuItem>
                </Menu>
            </SidebarContent>
            <SidebarFooter>
                <Menu iconShape="square">
                    <MenuItem>
                        <p style={{textAlign: "center"}}>2021</p>
                    </MenuItem>
                </Menu>
            </SidebarFooter>
        </ProSidebar>
    </div>
);

export default LeftMenu;