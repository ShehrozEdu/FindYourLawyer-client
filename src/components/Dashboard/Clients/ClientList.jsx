import React, { useState, useEffect, useMemo } from 'react';
import { Dialog, DialogHeader, DialogBody, DialogFooter, Button } from '@material-tailwind/react';
import apiService from '../../../utility/apiService';
import { useAuth } from '../../../contexts/AuthContext';
import { format } from 'date-fns';

const ClientList = () => {
  const [clients, setClients] = useState([]);
  const [cases, setCases] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedClient, setSelectedClient] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    if (user?._id && user?.isLawyer) {
      fetchClients();
    }
  }, [user]);

  const fetchClients = async () => {
    try {
      setIsLoading(true);
      const response = await apiService.get(`/my-cases/${user._id}`);
      if (response.data.status) {
        const casesData = response.data.casesLawyers || [];
        setCases(casesData);
        
        // Extract unique clients
        const clientsMap = new Map();
        casesData.forEach(caseItem => {
          if (caseItem.client) {
            const clientId = typeof caseItem.client === 'object' 
              ? caseItem.client._id 
              : caseItem.client;
            
            if (!clientsMap.has(clientId)) {
              clientsMap.set(clientId, {
                _id: clientId,
                name: caseItem.clientName || 'Unknown Client',
                email: caseItem.client?.Email || caseItem.client?.email || 'N/A',
                cases: []
              });
            }
            clientsMap.get(clientId).cases.push(caseItem);
          }
        });
        
        setClients(Array.from(clientsMap.values()));
      }
    } catch (error) {
      console.error('Error fetching clients:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredClients = useMemo(() => {
    if (!searchQuery) return clients;
    const query = searchQuery.toLowerCase();
    return clients.filter(client =>
      client.name.toLowerCase().includes(query) ||
      client.email.toLowerCase().includes(query)
    );
  }, [clients, searchQuery]);

  const handleClientClick = (client) => {
    setSelectedClient(client);
    setIsModalOpen(true);
  };

  const getStatusBadgeColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
      accepted: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      in_progress: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
      completed: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      cancelled: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
    };
    return colors[status] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
  };

  const formatStatus = (status) => {
    return status.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gmeshMain border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500 dark:text-gray-400">Loading clients...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Client Management</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">Manage your client relationships</p>
        </div>
        <div className="w-full md:w-64">
          <div className="relative">
            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search clients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-gmeshMain dark:bg-gray-700 dark:text-white transition-all"
            />
          </div>
        </div>
      </div>

      {filteredClients.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="w-20 h-20 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center mb-4">
            <svg className="w-10 h-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <p className="text-lg font-medium text-gray-400 dark:text-gray-300">
            {searchQuery ? 'No clients match your search.' : 'No clients found yet.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredClients.map((client) => (
            <div
              key={client._id}
              onClick={() => handleClientClick(client)}
              className="p-5 border border-gray-200 dark:border-gray-700 rounded-xl hover:shadow-lg cursor-pointer transition-all duration-300 hover:-translate-y-1 bg-white dark:bg-gray-800"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  {client.name}
                </h3>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gmeshMain/20 to-gmeshMain/10 dark:from-gmeshMain/30 dark:to-gmeshMain/20 flex items-center justify-center">
                  <span className="text-gmeshMain font-bold text-lg">
                    {client.name.charAt(0).toUpperCase()}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 mb-4">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="truncate">{client.email}</span>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {client.cases.length} {client.cases.length === 1 ? 'case' : 'cases'}
                </span>
                <span className="text-sm font-bold text-gmeshMain">
                  ₹{client.cases.reduce((sum, c) => sum + (c.income || 0), 0).toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Client Details Modal */}
      <Dialog open={isModalOpen} handler={setIsModalOpen} size="lg" className="dark:bg-gray-700">
        <DialogHeader className="dark:text-white">
          Client Details: {selectedClient?.name}
        </DialogHeader>
        <DialogBody>
          {selectedClient && (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Email</h3>
                <p className="text-gray-900 dark:text-white">{selectedClient.email}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Total Cases</h3>
                <p className="text-gray-900 dark:text-white">{selectedClient.cases.length}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Cases</h3>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {selectedClient.cases.map((caseItem) => (
                    <div
                      key={caseItem._id}
                      className="p-3 bg-gray-50 dark:bg-gray-600 rounded-lg"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadgeColor(caseItem.status)}`}>
                          {formatStatus(caseItem.status)}
                        </span>
                        <span className="text-sm font-semibold text-gray-900 dark:text-white">
                          ₹{caseItem.income?.toLocaleString('en-IN') || '0'}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                        {caseItem.description || 'No description'}
                      </p>
                      {caseItem.consultationDate && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          📅 {format(new Date(caseItem.consultationDate), 'MMM dd, yyyy HH:mm')}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={() => setIsModalOpen(false)}
            className="mr-1"
          >
            Close
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default ClientList;

