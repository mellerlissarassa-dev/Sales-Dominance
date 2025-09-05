import React, { useState, useEffect } from 'react';
import { Users, Target, TrendingUp, Calendar, CheckSquare, MapPin, Phone, Mail, Plus, Edit, Trash2, Eye, Clock, DollarSign, Menu, X, Home, User, FileText, Navigation, ListTodo } from 'lucide-react';

const CRMApp = () => {
  // Estados principais
  const [activeTab, setActiveTab] = useState('dashboard');
  const [currentUser] = useState({ name: 'Gestor', role: 'manager' });
  const [showAddForm, setShowAddForm] = useState(false);
  const [activeAddType, setActiveAddType] = useState('');
  
  // Dados mockados (simula Google Sheets)
  const [clients, setClients] = useState([
    { id: 1, name: 'Auto Peças Silva', contact: 'João Silva', phone: '11999888777', email: 'joao@autosilva.com', status: 'ativo', lastContact: '2024-09-02', type: 'cliente' },
    { id: 2, name: 'Transportadora Rápida', contact: 'Maria Santos', phone: '11888777666', email: 'maria@rapida.com', status: 'prospect', lastContact: '2024-09-01', type: 'prospect' },
    { id: 3, name: 'Oficina Central', contact: 'Pedro Costa', phone: '11777666555', email: 'pedro@central.com', status: 'inativo', lastContact: '2024-08-15', type: 'cliente' }
  ]);

  const [proposals, setProposals] = useState([
    { id: 1, clientId: 1, client: 'Auto Peças Silva', product: 'Pneu 225/45R17', quantity: 50, value: 12500, status: 'negociacao', salesPerson: 'Carlos', date: '2024-09-01' },
    { id: 2, clientId: 2, client: 'Transportadora Rápida', product: 'Pneu 295/80R22.5', quantity: 20, value: 8000, status: 'enviada', salesPerson: 'Ana', date: '2024-08-30' },
    { id: 3, clientId: 1, client: 'Auto Peças Silva', product: 'Pneu 185/65R15', quantity: 100, value: 18000, status: 'perdida', salesPerson: 'Carlos', date: '2024-08-28' }
  ]);

  const [visits, setVisits] = useState([
    { id: 1, clientId: 1, client: 'Auto Peças Silva', salesPerson: 'Carlos', date: '2024-09-04', time: '14:00', status: 'agendada', type: 'visita' },
    { id: 2, clientId: 2, client: 'Transportadora Rápida', salesPerson: 'Ana', date: '2024-09-05', time: '09:00', status: 'agendada', type: 'ligacao' }
  ]);

  const [tasks, setTasks] = useState([
    { id: 1, salesPerson: 'Carlos', task: 'Fazer 10 ligações de prospecção', completed: false, date: '2024-09-04', type: 'prospeccao' },
    { id: 2, salesPerson: 'Carlos', task: 'Acompanhar proposta Auto Peças Silva', completed: true, date: '2024-09-04', type: 'followup' },
    { id: 3, salesPerson: 'Ana', task: 'Visitar 3 clientes na região sul', completed: false, date: '2024-09-04', type: 'visita' },
    { id: 4, salesPerson: 'Ana', task: 'Atualizar CRM com novos contatos', completed: true, date: '2024-09-04', type: 'administrativo' }
  ]);

  const [newClient, setNewClient] = useState({
    name: '', contact: '', phone: '', email: '', status: 'prospect', type: 'prospect'
  });

  const [newProposal, setNewProposal] = useState({
    clientId: '', product: '', quantity: '', value: '', salesPerson: 'Carlos'
  });

  const [newVisit, setNewVisit] = useState({
    clientId: '', salesPerson: 'Carlos', date: '', time: '', type: 'visita'
  });

  // PWA Installation
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallBanner, setShowInstallBanner] = useState(false);

  useEffect(() => {
    // PWA Install prompt
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallBanner(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Add PWA manifest
    if (!document.querySelector('link[rel="manifest"]')) {
      const manifest = {
        name: "CRM Vendas de Pneus",
        short_name: "CRM Pneus",
        description: "Sistema de Gestão Comercial para Vendas de Pneus",
        start_url: "/",
        display: "standalone",
        background_color: "#2563eb",
        theme_color: "#2563eb",
        orientation: "portrait",
        icons: [
          {
            src: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTkyIiBoZWlnaHQ9IjE5MiIgdmlld0JveD0iMCAwIDE5MiAxOTIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxOTIiIGhlaWdodD0iMTkyIiByeD0iMjQiIGZpbGw9IiMyNTYzZWIiLz4KPHN2ZyB4PSI0OCIgeT0iNDgiIHdpZHRoPSI5NiIgaGVpZ2h0PSI5NiIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiPgo8Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSIzIi8+CjxwYXRoIGQ9Im0xMiAzLTEuNjkgMS42OWEyIDIgMCAwIDAtLjUzIDEuOTZsLjE2IDFhNCA0IDAgMCAxLS43NiA0LjAwOGwtLjQ4IDEuODc1YTIgMiAwIDAgMC4zOSAyLjAwNkwxMiAyMGwzLjEtNC4zNDVhMiAyIDAgMCAwIC4zOS0yLjAwNmwtLjQ4LTEuODc1YTQgNCAwIDAgMS0uNzYtNC4wMDhsLjE2LTFhMiAyIDAgMCAwLS41My0xLjk2TDEyIDMiLz4KPC9zdmc+Cjwvc3ZnPgo=",
            sizes: "192x192",
            type: "image/svg+xml"
          },
          {
            src: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgdmlld0JveD0iMCAwIDUxMiA1MTIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI1MTIiIGhlaWdodD0iNTEyIiByeD0iNjQiIGZpbGw9IiMyNTYzZWIiLz4KPHN2ZyB4PSIxMjgiIHk9IjEyOCIgd2lkdGg9IjI1NiIgaGVpZ2h0PSIyNTYiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIyIj4KPGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMyIvPgo8cGF0aCBkPSJtMTIgMy0xLjY5IDEuNjlhMiAyIDAgMCAwLS41MyAxLjk2bC4xNiAxYTQgNCAwIDAgMS0uNzYgNC4wMDhsLS40OCAxLjg3NWEyIDIgMCAwIDAgLjM5IDIuMDA2TDEyIDIwbDMuMS00LjM0NWEyIDIgMCAwIDAgLjM5LTIuMDA2bC0uNDgtMS44NzVhNCA0IDAgMCAxLS43Ni00LjAwOGwuMTYtMWEyIDIgMCAwIDAtLjUzLTEuOTZMMTIgMyIvPgo8L3N2Zz4KPC9zdmc+Cg==",
            sizes: "512x512",
            type: "image/svg+xml"
          }
        ]
      };

      const manifestBlob = new Blob([JSON.stringify(manifest)], { type: 'application/json' });
      const manifestUrl = URL.createObjectURL(manifestBlob);
      const link = document.createElement('link');
      link.rel = 'manifest';
      link.href = manifestUrl;
      document.head.appendChild(link);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallApp = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      setDeferredPrompt(null);
      setShowInstallBanner(false);
    }
  };

  // Funções auxiliares
  const getStatusColor = (status) => {
    const colors = {
      ativo: 'bg-green-100 text-green-800',
      inativo: 'bg-red-100 text-red-800',
      prospect: 'bg-blue-100 text-blue-800',
      enviada: 'bg-yellow-100 text-yellow-800',
      negociacao: 'bg-purple-100 text-purple-800',
      fechada: 'bg-green-100 text-green-800',
      perdida: 'bg-red-100 text-red-800',
      agendada: 'bg-blue-100 text-blue-800',
      realizada: 'bg-green-100 text-green-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  // Funções de CRUD
  const addClient = () => {
    if (newClient.name && newClient.contact) {
      setClients([...clients, {
        id: clients.length + 1,
        ...newClient,
        lastContact: new Date().toISOString().split('T')[0]
      }]);
      setNewClient({ name: '', contact: '', phone: '', email: '', status: 'prospect', type: 'prospect' });
      setShowAddForm(false);
    }
  };

  const addProposal = () => {
    if (newProposal.clientId && newProposal.product && newProposal.value) {
      const client = clients.find(c => c.id === parseInt(newProposal.clientId));
      setProposals([...proposals, {
        id: proposals.length + 1,
        ...newProposal,
        client: client?.name,
        status: 'enviada',
        date: new Date().toISOString().split('T')[0],
        quantity: parseInt(newProposal.quantity),
        value: parseFloat(newProposal.value)
      }]);
      setNewProposal({ clientId: '', product: '', quantity: '', value: '', salesPerson: 'Carlos' });
      setShowAddForm(false);
    }
  };

  const addVisit = () => {
    if (newVisit.clientId && newVisit.date && newVisit.time) {
      const client = clients.find(c => c.id === parseInt(newVisit.clientId));
      setVisits([...visits, {
        id: visits.length + 1,
        ...newVisit,
        client: client?.name,
        status: 'agendada'
      }]);
      setNewVisit({ clientId: '', salesPerson: 'Carlos', date: '', time: '', type: 'visita' });
      setShowAddForm(false);
    }
  };

  const toggleTask = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  // Estatísticas para Dashboard
  const stats = {
    totalClients: clients.filter(c => c.type === 'cliente').length,
    totalProspects: clients.filter(c => c.type === 'prospect').length,
    activeProposals: proposals.filter(p => ['enviada', 'negociacao'].includes(p.status)).length,
    monthlyRevenue: proposals.filter(p => p.status === 'fechada').reduce((sum, p) => sum + p.value, 0),
    completedTasks: tasks.filter(t => t.completed).length,
    totalTasks: tasks.length
  };

  const tabs = [
    { id: 'dashboard', label: 'Início', icon: Home },
    { id: 'clients', label: 'Clientes', icon: Users },
    { id: 'proposals', label: 'Propostas', icon: FileText },
    { id: 'visits', label: 'Visitas', icon: Navigation },
    { id: 'tasks', label: 'Tarefas', icon: ListTodo }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* PWA Install Banner */}
      {showInstallBanner && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-blue-600 text-white p-3">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium">Instalar CRM Pneus</p>
              <p className="text-xs opacity-90">Acesse offline diretamente do seu celular</p>
            </div>
            <div className="flex space-x-2 ml-3">
              <button
                onClick={handleInstallApp}
                className="bg-white text-blue-600 px-3 py-1 rounded text-xs font-medium"
              >
                Instalar
              </button>
              <button
                onClick={() => setShowInstallBanner(false)}
                className="text-white p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header - Mobile Optimized */}
      <header className={`bg-blue-600 text-white shadow-lg ${showInstallBanner ? 'mt-16' : ''}`}>
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold">CRM Pneus</h1>
              <p className="text-blue-100 text-sm">{currentUser.name}</p>
            </div>
            <div className="text-right">
              <p className="text-blue-100 text-xs">{new Date().toLocaleDateString('pt-BR')}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 py-6">
        {/* Dashboard */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* Stats Cards - Mobile Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Users className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="ml-3">
                    <p className="text-xs font-medium text-gray-600">Clientes</p>
                    <p className="text-xl font-bold text-gray-900">{stats.totalClients}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-center">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <Target className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div className="ml-3">
                    <p className="text-xs font-medium text-gray-600">Prospects</p>
                    <p className="text-xl font-bold text-gray-900">{stats.totalProspects}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-center">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <DollarSign className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="ml-3">
                    <p className="text-xs font-medium text-gray-600">Propostas</p>
                    <p className="text-xl font-bold text-gray-900">{stats.activeProposals}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-center">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <CheckSquare className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="ml-3">
                    <p className="text-xs font-medium text-gray-600">Tarefas</p>
                    <p className="text-xl font-bold text-gray-900">{stats.completedTasks}/{stats.totalTasks}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Próximas Atividades */}
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Próximas Atividades</h3>
              </div>
              <div className="p-4 space-y-3">
                {visits.filter(v => v.status === 'agendada').slice(0, 3).map(visit => (
                  <div key={visit.id} className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <MapPin className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="ml-3 flex-1">
                      <p className="font-medium text-gray-900 text-sm">{visit.client}</p>
                      <p className="text-xs text-gray-600">{visit.salesPerson} • {visit.date} às {visit.time}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(visit.type)}`}>
                      {visit.type}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Propostas em Andamento */}
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Propostas em Andamento</h3>
              </div>
              <div className="p-4 space-y-3">
                {proposals.filter(p => ['enviada', 'negociacao'].includes(p.status)).slice(0, 3).map(proposal => (
                  <div key={proposal.id} className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <DollarSign className="w-4 h-4 text-green-600" />
                    </div>
                    <div className="ml-3 flex-1">
                      <p className="font-medium text-gray-900 text-sm">{proposal.client}</p>
                      <p className="text-xs text-gray-600">R$ {proposal.value.toLocaleString()} • {proposal.salesPerson}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(proposal.status)}`}>
                      {proposal.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Clientes */}
        {activeTab === 'clients' && (
          <div className="space-y-4">
            {clients.map(client => (
              <div key={client.id} className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{client.name}</h3>
                    <p className="text-sm text-gray-600">{client.contact}</p>
                    <div className="flex items-center mt-2 space-x-4">
                      <a href={`tel:${client.phone}`} className="flex items-center text-blue-600">
                        <Phone className="w-4 h-4 mr-1" />
                        <span className="text-sm">{client.phone}</span>
                      </a>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Último contato: {client.lastContact}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(client.status)}`}>
                    {client.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Propostas */}
        {activeTab === 'proposals' && (
          <div className="space-y-4">
            {proposals.map(proposal => (
              <div key={proposal.id} className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{proposal.client}</h3>
                    <p className="text-sm text-gray-600">{proposal.product}</p>
                    <div className="flex items-center mt-2 space-x-4">
                      <span className="text-sm text-gray-600">Qtd: {proposal.quantity}</span>
                      <span className="text-sm font-medium text-green-600">R$ {proposal.value.toLocaleString()}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{proposal.salesPerson} • {proposal.date}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(proposal.status)}`}>
                    {proposal.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Visitas */}
        {activeTab === 'visits' && (
          <div className="space-y-4">
            {visits.map(visit => (
              <div key={visit.id} className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{visit.client}</h3>
                    <p className="text-sm text-gray-600">{visit.salesPerson}</p>
                    <div className="flex items-center mt-2">
                      <Clock className="w-4 h-4 text-gray-400 mr-1" />
                      <span className="text-sm text-gray-600">{visit.date} às {visit.time}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(visit.type)} block mb-2`}>
                      {visit.type}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(visit.status)}`}>
                      {visit.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tarefas */}
        {activeTab === 'tasks' && (
          <div className="space-y-4">
            {/* Performance Summary */}
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium text-gray-900 mb-3">Performance da Equipe</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">{tasks.filter(t => t.completed).length}</p>
                  <p className="text-xs text-gray-600">Concluídas</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-red-600">{tasks.filter(t => !t.completed).length}</p>
                  <p className="text-xs text-gray-600">Pendentes</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">{Math.round((tasks.filter(t => t.completed).length / tasks.length) * 100)}%</p>
                  <p className="text-xs text-gray-600">Taxa</p>
                </div>
              </div>
            </div>

            {/* Tasks by Sales Person */}
            {['Carlos', 'Ana'].map(salesPerson => {
              const salesTasks = tasks.filter(t => t.salesPerson === salesPerson);
              return (
                <div key={salesPerson} className="bg-white rounded-lg shadow-sm">
                  <div className="p-4 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-gray-900 flex items-center">
                        <User className="w-4 h-4 mr-2" />
                        {salesPerson}
                      </h4>
                      <span className="text-sm text-gray-500">
                        {salesTasks.filter(t => t.completed).length}/{salesTasks.length}
                      </span>
                    </div>
                  </div>
                  <div className="p-4 space-y-3">
                    {salesTasks.map(task => (
                      <div key={task.id} className="flex items-start space-x-3">
                        <input
                          type="checkbox"
                          checked={task.completed}
                          onChange={() => toggleTask(task.id)}
                          className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <div className="flex-1">
                          <p className={`text-sm ${task.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                            {task.task}
                          </p>
                          <div className="flex items-center mt-1">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.type)} mr-2`}>
                              {task.type}
                            </span>
                            <span className="text-xs text-gray-500">{task.date}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* Floating Action Button */}
      <button
        onClick={() => setShowAddForm(true)}
        className="fixed bottom-24 right-4 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-blue-700 transition-colors z-10"
      >
        <Plus className="w-6 h-6" />
      </button>

      {/* Add Form Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
          <div className="bg-white w-full rounded-t-lg p-4 max-h-96 overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Adicionar</h3>
              <button
                onClick={() => setShowAddForm(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {!activeAddType && (
              <div className="space-y-3">
                <button
                  onClick={() => setActiveAddType('client')}
                  className="w-full p-3 text-left bg-gray-50 rounded-lg hover:bg-gray-100"
                >
                  <div className="flex items-center">
                    <Users className="w-5 h-5 text-blue-600 mr-3" />
                    <span className="font-medium">Novo Cliente/Prospect</span>
                  </div>
                </button>
                <button
                  onClick={() => setActiveAddType('proposal')}
                  className="w-full p-3 text-left bg-gray-50 rounded-lg hover:bg-gray-100"
                >
                  <div className="flex items-center">
                    <FileText className="w-5 h-5 text-green-600 mr-3" />
                    <span className="font-medium">Nova Proposta</span>
                  </div>
                </button>
                <button
                  onClick={() => setActiveAddType('visit')}
                  className="w-full p-3 text-left bg-gray-50 rounded-lg hover:bg-gray-100"
                >
                  <div className="flex items-center">
                    <Navigation className="w-5 h-5 text-purple-600 mr-3" />
                    <span className="font-medium">Agendar Visita</span>
                  </div>
                </button>
              </div>
            )}

            {/* Client Form */}
            {activeAddType === 'client' && (
              <div className="space-y-4">
                <button
                  onClick={() => setActiveAddType('')}
                  className="text-blue-600 text-sm"
                >
                  ← Voltar
                </button>
                <input
                  type="text"
                  placeholder="Nome da empresa"
                  value={newClient.name}
                  onChange={(e) => setNewClient({...newClient, name: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input
                  type="text"
                  placeholder="Nome do contato"
                  value={newClient.contact}
                  onChange={(e) => setNewClient({...newClient, contact: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input
                  type="tel"
                  placeholder="Telefone"
                  value={newClient.phone}
                  onChange={(e) => setNewClient({...newClient, phone: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={newClient.email}
                  onChange={(e) => setNewClient({...newClient, email: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <select
                  value={newClient.status}
                  onChange={(e) => setNewClient({...newClient, status: e.target.value, type: e.target.value === 'ativo' ? 'cliente' : 'prospect'})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="prospect">Prospect</option>
                  <option value="ativo">Cliente Ativo</option>
                </select>
                <button
                  onClick={addClient}
                  className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Adicionar Cliente
                </button>
              </div>
            )}

            {/* Proposal Form */}
            {activeAddType === 'proposal' && (
              <div className="space-y-4">
                <button
                  onClick={() => setActiveAddType('')}
                  className="text-blue-600 text-sm"
                >
                  ← Voltar
                </button>
                <select
                  value={newProposal.clientId}
                  onChange={(e) => setNewProposal({...newProposal, clientId: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Selecionar Cliente</option>
                  {clients.map(client => (
                    <option key={client.id} value={client.id}>{client.name}</option>
                  ))}
                </select>
                <input
                  type="text"
                  placeholder="Produto"
                  value={newProposal.product}
                  onChange={(e) => setNewProposal({...newProposal, product: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input
                  type="number"
                  placeholder="Quantidade"
                  value={newProposal.quantity}
                  onChange={(e) => setNewProposal({...newProposal, quantity: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input
                  type="number"
                  step="0.01"
                  placeholder="Valor Total (R$)"
                  value={newProposal.value}
                  onChange={(e) => setNewProposal({...newProposal, value: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  onClick={addProposal}
                  className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Criar Proposta
                </button>
              </div>
            )}

            {/* Visit Form */}
            {activeAddType === 'visit' && (
              <div className="space-y-4">
                <button
                  onClick={() => setActiveAddType('')}
                  className="text-blue-600 text-sm"
                >
                  ← Voltar
                </button>
                <select
                  value={newVisit.clientId}
                  onChange={(e) => setNewVisit({...newVisit, clientId: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Selecionar Cliente</option>
                  {clients.map(client => (
                    <option key={client.id} value={client.id}>{client.name}</option>
                  ))}
                </select>
                <select
                  value={newVisit.type}
                  onChange={(e) => setNewVisit({...newVisit, type: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="visita">Visita Presencial</option>
                  <option value="ligacao">Ligação</option>
                  <option value="email">Email</option>
                </select>
                <input
                  type="date"
                  value={newVisit.date}
                  onChange={(e) => setNewVisit({...newVisit, date: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input
                  type="time"
                  value={newVisit.time}
                  onChange={(e) => setNewVisit({...newVisit, time: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  onClick={addVisit}
                  className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Agendar Visita
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-2">
        <div className="flex justify-around">
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center py-2 px-3 rounded-lg min-w-0 flex-1 ${
                  isActive
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Icon className="w-5 h-5 mb-1" />
                <span className="text-xs font-medium">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default CRMApp;