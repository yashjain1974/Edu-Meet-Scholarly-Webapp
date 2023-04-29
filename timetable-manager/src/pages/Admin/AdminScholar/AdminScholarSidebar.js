import React from "react"

import { useParams } from 'react-router-dom';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,

} from 'cdbreact';
import { NavLink } from 'react-router-dom';

const AdminScholarSidebar = () => {
  const p = useParams();
  console.log(p);


  return (
    <div style={{ display: 'flex', minheight: '50vh', overflow: 'scroll initial' }}>
      <CDBSidebar textColor="#fff" backgroundColor="#5c2d01">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <a href="/" className="text-decoration-none" style={{ color: 'inherit' }}>
            Admin Portal
          </a>
        </CDBSidebarHeader>
        
        <CDBSidebarContent className="sidebar-content" iconShape="square">
          <CDBSidebarMenu>
            <NavLink exact to={`/admin/scholar/${p.qid}`} activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="columns">Dashboard</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to={`/admin/scholarList/${p.qid}`} activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="table">Scholar Data</CDBSidebarMenuItem>
            </NavLink>

            <NavLink exact to={`/admin/scholarDocument/${p.qid}`} activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="table">Generate Document</CDBSidebarMenuItem>
            </NavLink>
            


          </CDBSidebarMenu>
        </CDBSidebarContent>

        {/* <CDBSidebarFooter style={{ textAlign: 'center' }}>
          <div
            style={{
              padding: '20px 5px',
            }}
          >
          <CDBSidebarMenuItem icon="GrLogout">Log-out</CDBSidebarMenuItem>
          </div>
        </CDBSidebarFooter> */}
      </CDBSidebar>
    </div>
  );
};

export default AdminScholarSidebar;