import React from "react";
import { formatDate } from "../../../utils/dateFormatter";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { cellSx, rowSx } from "./productListStyles"; 

function ProductListTable({ products, orderBy, orderDirection, handleSort, onEdit, onDelete }) {
  const renderSortArrow = (field) => {
    if (orderBy !== field) return null;
    return orderDirection === "asc" ? "▲" : "▼";
  };

  return (
    <TableContainer component={Paper} sx={{ mt: 3, mb: 4 }}>
      <Table size="small" sx={{ fontSize: 13, borderCollapse: "collapse" }}>
        <TableHead>
          <TableRow>
            <TableCell onClick={() => handleSort("productName")} sx={{ ...cellSx, fontWeight: "bold" }}>
              商品名 {renderSortArrow("productName")}
            </TableCell>
            <TableCell onClick={() => handleSort("categoryName")} sx={{ ...cellSx, fontWeight: "bold" }}>
              カテゴリ {renderSortArrow("categoryName")}
            </TableCell>
            <TableCell onClick={() => handleSort("specName")} sx={{ ...cellSx, fontWeight: "bold" }}>
              規格・仕様 {renderSortArrow("specName")}
            </TableCell>
            <TableCell onClick={() => handleSort("stockQty")} sx={{ ...cellSx, fontWeight: "bold" }}>
              在庫数量 {renderSortArrow("stockQty")}
            </TableCell>
            <TableCell onClick={() => handleSort("price")} sx={{ ...cellSx, fontWeight: "bold" }}>
              単価（税込） {renderSortArrow("price")}
            </TableCell>
            <TableCell onClick={() => handleSort("lastSalesDate")} sx={{ ...cellSx, fontWeight: "bold" }}>
              最終販売日 {renderSortArrow("lastSalesDate")}
            </TableCell>
            <TableCell onClick={() => handleSort("totalSales")} sx={{ ...cellSx, fontWeight: "bold" }}>
              累計販売数 {renderSortArrow("totalSales")}
            </TableCell>
            <TableCell onClick={() => handleSort("staff")} sx={{ ...cellSx, fontWeight: "bold" }}>
              担当者 {renderSortArrow("staff")}
            </TableCell>
            <TableCell sx={{ ...cellSx, fontWeight: "bold", borderRight: "none" }}>
              アクション
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((p, index) => (
            <TableRow key={p.id} sx={rowSx(index)}>
              <TableCell sx={cellSx}>{p.productName}</TableCell>
              <TableCell sx={cellSx}>{p.categoryName}</TableCell>
              <TableCell sx={cellSx}>{p.specName}</TableCell>
              <TableCell sx={cellSx}>{p.stockQty}</TableCell>
              <TableCell sx={cellSx}>{p.price?.toFixed(0)}</TableCell>
              <TableCell sx={cellSx}>{formatDate(p.lastSalesDate)}</TableCell>
              <TableCell sx={cellSx}>{p.totalSales}</TableCell>
              <TableCell sx={cellSx}>{p.staff}</TableCell>
              <TableCell sx={{ ...cellSx, borderRight: "none" }}>
                <IconButton onClick={() => onEdit(p)} size="small">
                  <EditIcon fontSize="small" />
                </IconButton>
                <IconButton onClick={() => onDelete(p)} size="small">
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ProductListTable;
