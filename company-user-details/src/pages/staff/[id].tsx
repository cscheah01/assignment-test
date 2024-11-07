import { useRouter } from 'next/router';
import { people } from '../../data/data';
import Link from 'next/link';
import Head from 'next/head';

const PersonDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  

  const staff = people.find((p) => p.id === Number(id));

  if (!staff) {
    return (
        <div className="flex justify-center items-center h-screen">
            <h2 className="text-3xl font-bold text-gray-600">Staff not found</h2>
        </div>
    );
  }

  return (
    <>
      <Head>
        <title>{staff.name} - Person Details</title>
      </Head>
        <div className="min-h-screen bg-gray-100 py-10 px-4">
        <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6">
            <h1 className="text-3xl font-semibold text-gray-800 mb-4">
            {staff.name}
            </h1>
            <div className="mb-6">
            <p className="text-lg text-gray-600 mb-2">
                <span className="font-bold">Staff ID:</span> {staff.staffid}
            </p>
            <p className="text-lg text-gray-600 mb-2">
                <span className="font-bold">Email:</span> {staff.email}
            </p>
            <p className="text-lg text-gray-600 mb-2">
                <span className="font-bold">Phone:</span> {staff.phone}
            </p>
            <p className="text-lg text-gray-600 mb-2">
                <span className="font-bold">Address:</span> {staff.address}
            </p>
            <p className="text-lg text-gray-600 mb-2">
                <span className="font-bold">Designation:</span> {staff.designation}
            </p>
            <p className="text-lg text-gray-600">
                <span className="font-bold">Urgent Contact Number:</span> {staff.urgentContactNumber}
            </p>
            </div>
            <div className="flex justify-between">
            <button
                onClick={() => router.back()}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
            >
                Back
            </button>
            </div>
        </div>
        </div>
    </>
  );
};

export default PersonDetail;