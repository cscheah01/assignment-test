import { useState, useEffect } from 'react';
import { Staff } from '../data/data';
import Link from 'next/link';
import Head from 'next/head'

interface TableProps {
  data: Staff[];
}

const Table: React.FC<TableProps> = ({ data }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    
    const itemsPerPage = 8;
  
    const filteredData = data.filter(person =>
      person.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  
    const goToPage = (page: number) => {
      if (page >= 1 && page <= totalPages) {
        setCurrentPage(page);
      }
    };

    useEffect(() => {
        if (currentPage > totalPages && totalPages > 0) {
          setCurrentPage(1); 
        }
      }, [searchTerm, totalPages, currentPage]);

  return (
    <div>
      <Head>
        <title>Staff Details</title>
      </Head>
      <div className="bg-gray-100 py-10 px-4">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Staff List</h1>
        <input
          type="text"
          placeholder="Search by name..."
          className="px-4 py-2 border rounded-md w-full sm:w-1/3"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      
      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-gray-100">
          <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">ID</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Name</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Age</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Phone</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Address</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.length > 0 ? (
            currentItems.map((person) => (
              <tr key={person.id} className="border-t">
                <td className="px-6 py-4 text-sm text-gray-600">{person.id}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{person.name}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{person.email}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{person.phone}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{person.address}</td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  <Link href={`/staff/${person.id}`} className="text-blue-500 hover:text-blue-600">
                    View Details
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3} className="text-center py-4 text-sm text-gray-600">
                No results found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="mt-4 flex justify-between items-center">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md disabled:bg-gray-200"
        >
          Previous
        </button>

        <span className="text-sm text-gray-700">
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md disabled:bg-gray-200"
        >
          Next
        </button>
      </div>
    </div>
    </div>
  );
};

export default Table;