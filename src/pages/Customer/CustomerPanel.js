import { useEffect, useState } from "react";
import { getCustomer, deleteCustomer, updateCustomer } from "../../services/CustomerServices";
import EditCustomerModal from "./EditCustomerModal";
import 'react-toastify/dist/ReactToastify.css';
import { ArrowUpDown, SquarePen, Trash } from 'lucide-react';
import { sortData } from "../../utils/sortUtils";
import { searchData } from "../../utils/searchUtils";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CustomerPanel = () => {
  const [customers, setCustomers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [editForm, setEditForm] = useState({
    customer_name: '',
    customer_address: '',
    customer_number: '',
  });

  const [sortConfig, setSortConfig] = useState({ key: 'customer_name', direction: 'asc', isDate: false });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 20;
  const [searchTerm, setSearchTerm] = useState('');
  useEffect(() => {
    fetchCustomer(currentPage);
  }, [currentPage]);

  const fetchCustomer = async (page = 1) => {
    try {
      const data = await getCustomer(page, pageSize);
      setCustomers(Array.isArray(data?.results) ? data.results : []);
      setTotalPages(Math.ceil(data.count / pageSize));
    } catch (error) {
      console.error("Error fetching customers", error);
    }
  };

  const openEditModal = (customer) => {
    setEditingCustomer(customer);
    setEditForm({
      customer_name: customer.customer_name,
      customer_address: customer.customer_address,
      customer_number: customer.customer_number,
    });
    setShowModal(true);
  };

  const handleEditChange = (e) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateCustomer(editingCustomer.customer_id, editForm);
      setShowModal(false);
      setEditingCustomer(null);
      fetchCustomer(currentPage);
      toast.success("Customer Added Successfully!");
    } catch (error) {
      console.error('Error updating customer:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this Customer?")) {
      try {
        await deleteCustomer(id);
        fetchCustomer(currentPage);
        toast.warning("Customer Deleted Successfully!")
      } catch (error) {
        console.error("Error deleting customer:", error);
      }
    }
  };

  return (
    <div className="p-6 bg-[#C6E7FF] min-h-screen rounded-md shadow-sm">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Customer Panel</h1>
      <div className="overflow-x-auto">

        <div className="mb-4 flex justify-between">
          <input
            type="text"
            placeholder="Search Customer"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-3/6 px-4 py-2 border rounded"
          />
          <button
            className="bg-[#1da855] px-2 rounded text-sm mr-2"
            onClick={() =>
              setSortConfig({ key: 'customer_name', direction: sortConfig.direction === 'asc' ? 'desc' : 'asc', isDate: false })
            }
          >
            <ArrowUpDown size={20} color='#ffffff' />
          </button>
        </div>

        <table className="min-w-full bg-[#FBFBFB] border-gray-200 shadow-md rounded-lg overflow-hidden">
          <thead className="bg-[#FFDDAE] text-gray-700 uppercase text-sm">
            <tr>
              <th className="py-3 px-6 text-left">Customer</th>
              <th className="py-3 px-6 text-left">Address</th>
              <th className="py-3 px-6 text-left">Contact</th>
              <th className="py-3 px-6 text-left">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {sortData(
              searchData(customers, searchTerm, ['customer_name', 'customer_address']),
              sortConfig.key,
              sortConfig.direction,
              sortConfig.isDate
            )
              .map((customer) => (
                <tr
                  key={customer.customer_id}
                  className="hover:bg-[#D4F6FF] border-b transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-gray-800">
                    {customer.customer_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                    {customer.customer_address}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                    {customer.customer_number}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap space-x-2">
                    <button
                      onClick={() => openEditModal(customer)}
                      className="bg-[#2696ff] px-3 py-1 rounded"
                    >
                      <SquarePen size={18} color='#ffffff' width={30} strokeWidth={1.5} />
                    </button>
                    <button
                      onClick={() => handleDelete(customer.customer_id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm transition-all"
                    >
                      <Trash size={18} color='#ffffff' width={30} />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <div className="mb-4 space-x-2">
          
              
        </div>


        {/* Pagination controls */}
        <div className="flex justify-center mt-4 space-x-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded-md ${currentPage === i + 1
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700'
                }`}
            >
              {i + 1}
            </button>
          ))}
        </div>

        <EditCustomerModal
          show={showModal}
          editForm={editForm}
          onClose={() => setShowModal(false)}
          onChange={handleEditChange}
          onSubmit={handleEditSubmit}
        />
      </div>
      <ToastContainer richColor position='top-center' autoClose={3000} />
    </div>
  );
};

export default CustomerPanel;
