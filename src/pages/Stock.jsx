import { useState, useEffect } from "react";
import { useReactTable, getCoreRowModel } from "@tanstack/react-table";
import axios from "axios";
import { useForm } from "react-hook-form";
import { mockStock } from "../mockdata/stockData.js";

const Stock = () => {
  const [stock, setStock] = useState(mockStock);

  // Fetch Stock
  // useEffect(() => {
  //   axios.get("/api/stock").then((response) => setStock(response.data));
  // }, []);

  // Form Hook for Updating
  const { register, handleSubmit, setValue } = useForm();

  // Define Columns
  const columns = [
    { accessorKey: "id", header: "ID" },
    { accessorKey: "product.name", header: "Product" },
    { accessorKey: "stock", header: "Stock" },
    { accessorKey: "price", header: "Price" },
    { accessorKey: "createdAt", header: "Created At" },
    {
      accessorKey: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <button
          className="bg-blue-500 text-white px-3 py-1 rounded"
          onClick={() => editStock(row.original)}
        >
          Edit
        </button>
      ),
    },
  ];

  // Function to Edit Stock
  const editStock = (stockItem) => {
    setValue("id", stockItem.id);
    setValue("stock", stockItem.stock);
    setValue("price", stockItem.price);
  };

  // Function to Submit Updated Stock
  const updateStock = (data) => {
    axios.put(`/api/stock/${data.id}`, data).then((response) => {
      setStock((prev) =>
        prev.map((item) => (item.id === data.id ? response.data : item))
      );
    });
  };

  const table = useReactTable({
    data: stock,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Stock</h2>

      {/* Table */}
      <table className="min-w-full border border-gray-300">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((column) => (
                <th key={column.id} className="border p-2">
                  {column.column.columnDef.header}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="border">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="p-2 border">
                  {cell.renderValue()}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Form */}
      <form onSubmit={handleSubmit(updateStock)} className="mt-4 p-4 bg-gray-100">
        <h3 className="font-bold">Edit Stock</h3>
        <input {...register("id")} type="hidden" />
        <label className="block mt-2">Stock:</label>
        <input {...register("stock")} className="border p-2 w-full" />
        <label className="block mt-2">Price:</label>
        <input {...register("price")} className="border p-2 w-full" />
        <button type="submit" className="bg-green-500 text-white px-3 py-2 mt-3">
          Update Stock
        </button>
      </form>
    </div>
  );
};

export default Stock;
