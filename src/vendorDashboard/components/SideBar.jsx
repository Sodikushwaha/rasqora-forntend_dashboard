import React from 'react'

function SideBar({showFirmHandler , showProductHandler , showAllProductHandler , showFirmTitle}) {
  return (
   <div className="sidebarSection">
    <ul>
      {showFirmTitle? <li onClick={showFirmHandler} >Add Firm</li>: ""}
        
        <li onClick={showProductHandler}>Add Product</li>
        <li onClick={showAllProductHandler}>All Products</li>
        <li>Users</li>
    </ul>
   </div>

  )
}

export default SideBar