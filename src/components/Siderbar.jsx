"use client"
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';

const Siderbar = () => {


    return (
        <Sidebar backgroundColor={"rgb(0,120,163)"}>
            <p>Die Wortschatzkartei</p>
            <Menu closeOnClick={true}>
                <MenuItem> Documentation </MenuItem>
                <MenuItem> Calendar </MenuItem>
            </Menu>
        </Sidebar>
    );
};

export default Siderbar;