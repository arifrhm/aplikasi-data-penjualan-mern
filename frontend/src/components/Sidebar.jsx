import React from 'react';
const Sidebar = () => {

  return (
<div className="drawer lg:drawer-open w-60">
  <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content flex flex-col items-center justify-center">
    {/* Page content here */}
    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>
  
  </div> 
  <div className="drawer-side ">
    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label> 
    <ul className="menu p-4 w-60 min-h-full bg-base-200 text-zinc-950 pt-12">
      {/* Sidebar content here */}
      <li><a href="/">Home</a></li>
      <li><a href="/items">Items</a></li>
      <li><a href="/transactions">Transactions</a></li>
    </ul>
  
  </div>
</div>
  );
};

export default Sidebar;