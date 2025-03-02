import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-900 text-white p-6">
      <nav>
        <ul className="space-y-4">
          <li><Link to="/dashboard" className="block p-2">Dashboard</Link></li>
          <li><Link to="/orders" className="block p-2">Orders</Link></li>
          <li><Link to="/stock" className="block p-2">Stock</Link></li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
