"use client"
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';

const Siderbar = () => {


    return (


        
        <Sidebar rootStyles={{height: "100vh", position: "fixed",top:0,}} backgroundColor={"rgb(0,120,163)"} width={"250px"} collapsedWidth={"50px"} collapsed={false} toggled={false} customBreakPoint={"960px"} onBackdropClick={()=>{console.log("sexo")}} >
            <p>Die Wortschatzkartei</p>
            <Menu closeOnClick={true}>
                <MenuItem> Documentation </MenuItem>
                <MenuItem> Calendar </MenuItem>
            </Menu>
        </Sidebar>



    );
};

export default Siderbar;