import React, { useEffect, useState } from "react";
import { Pagination } from "antd";

const Paging = ({ totalItems, sizePerPage, name, currentPage, handlePageChange }) => {
  console.log("size" + sizePerPage);
    return (
      <Pagination
        total={totalItems}
        defaultPageSize={sizePerPage}
        showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} ${name}`}
        current={currentPage}
        onChange={handlePageChange}
      />
    );
  };
  
  export default Paging;