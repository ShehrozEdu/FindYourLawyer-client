import React, { useState, useEffect } from 'react';
import ClientDescription from './ClientDescription';
import axios from 'axios';
import axiosInstance from '../Auth/AxiosInstance';

const LawyerDashboard = () => {
  const [clients, setClients] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [selectedClientId, setSelectedClientId] = useState(null);

  useEffect(() => {
    // Fetch data from API
    const lawyerId = JSON.parse(localStorage.getItem("auth_token1"))._id;
    axiosInstance.get(`/my-cases/${lawyerId}`)
      .then(response => {
        setClients(response.data.casesLawyers); // Assuming response contains an array of clients

        // Assuming response.data.casesLawyers is an array of objects with income property
        const totalIncome = response.data.casesLawyers.reduce((total, inc) => total + inc.income, 0);
        setTotalIncome(totalIncome.toLocaleString('en-IN'));

      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []); // Empty dependency array to run only once when component mounts

  const handleClientClick = (clientId) => {
    setSelectedClientId(clientId === selectedClientId ? null : clientId);
  };

  return (
    <div className="container-fluid mx-auto py-8 px-12 dark:bg-gray-800">
      <h1 className="text-3xl font-semibold mb-6 dark:text-white">Lawyer Dashboard</h1>
      <div className="grid grid-cols-2 gap-6">
        <div className="p-4 bg-white rounded-lg shadow-md dark:bg-gray-500 dark:text-white">
          <h2 className="text-lg font-semibold mb-2">Total Income</h2>
          <p className="text-2xl">&#x20b9; {totalIncome}</p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow-md dark:bg-gray-500 dark:text-white">
          <h2 className="text-lg font-semibold mb-2">Total Clients</h2>
          <p className="text-2xl">{clients.length}</p>
        </div>
      </div>
      <div className="mt-8 dark:bg-gray-500 dark:text-white p-5">
        <h2 className="text-2xl font-semibold mb-4">My Cases</h2>
        {clients.length > 0 ? (
          <ul>
            {clients.map((client, idx) => (
              <li key={idx} className="p-4 bg-white rounded-lg shadow-md mb-4 dark:bg-gray-500 dark:text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium">Client Name: {client.clientName}</h3>
                  </div>
                  <button className="btn-indigo" onClick={() => handleClientClick(client._id)}>
                    {selectedClientId === client._id ? 'Close Description' : 'Open Description'}
                  </button>
                </div>
                {selectedClientId === client._id && <ClientDescription description={client.description} />}
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex flex-col items-center justify-center py-8">
            <svg className="w-16 h-16 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"></path>
            </svg>
            <p className="text-lg font-medium text-gray-400">No cases found yet.</p>
          </div>
        )}
      </div>

    </div>
  );
};

export default LawyerDashboard;
