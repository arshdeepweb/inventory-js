import { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import axios from "axios";
import { useForm } from "react-hook-form";
import { mockOrders } from "../mockdata/orderData.js";

const Order = () => {
  const [orders, setOrders] = useState(mockOrders);

  // Form Hook for Updating
  const { register, handleSubmit, setValue } = useForm();

  // Define Columns
  const columns = [
    { header: "ID", accessorKey: "id" },
    { header: "User ID", accessorKey: "userId" },
    { header: "Order Type", accessorKey: "orderType" },
    { header: "Total Amount", accessorKey: "totalAmount" },
    { header: "Created At", accessorKey: "createdAt" },
    {
      header: "Actions",
      accessorKey: "actions",
      cell: ({ row }) => (
        <button
          className="bg-blue-500 text-white px-3 py-1 rounded"
          onClick={() => editOrder(row.original)}
        >
          Edit
        </button>
      ),
    },
  ];

  // Function to Edit Order
  const editOrder = (order) => {
    setValue("id", order.id);
    setValue("totalAmount", order.totalAmount);
    setValue("orderType", order.orderType);
  };

  // Function to Submit Updated Order
  const updateOrder = (data) => {
    // axios.put(`/api/orders/${data.id}`, data).then((response) => {
    //   setOrders((prev) =>
    //     prev.map((order) => (order.id === data.id ? response.data : order))
    //   );
    // });
  };

  // Use TanStack Table
  const table = useReactTable({
    data: orders,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(), // ✅ Handles pagination
  });

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Orders</h2>

      {/* Table */}
      <table className="min-w-full border border-gray-300">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="border p-2">
                  {flexRender(header.column.columnDef.header, header.getContext())}
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
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Form */}
      <form onSubmit={handleSubmit(updateOrder)} className="mt-4 p-4 bg-gray-100">
        <h3 className="font-bold">Edit Order</h3>
        <input {...register("id")} type="hidden" />
        <label className="block mt-2">Total Amount:</label>
        <input {...register("totalAmount")} className="border p-2 w-full" />
        <label className="block mt-2">Order Type:</label>
        <select {...register("orderType")} className="border p-2 w-full">
          <option value="SALE">SALE</option>
          <option value="PURCHASE">PURCHASE</option>
        </select>
        <button type="submit" className="bg-green-500 text-white px-3 py-2 mt-3">
          Update Order
        </button>
      </form>
    </div>
  );
};

export default Order;
