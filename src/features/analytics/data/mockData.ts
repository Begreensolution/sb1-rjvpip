// Update mockData.ts with more detailed examples
export const mockClientData = {
  id: '1',
  name: 'Mario Rossi',
  type: 'individual',
  metrics: {
    practicesCompleted: 12,
    practicesInProgress: 3,
    practicesDelayed: 1,
    averageCompletionTime: 3.8,
    efficiency: 92,
  },
  history: [
    { month: 'Gen', completed: 4, delayed: 0 },
    { month: 'Feb', completed: 3, delayed: 1 },
    { month: 'Mar', completed: 5, delayed: 0 },
  ],
  services: {
    dichiarazioneRedditi: 8,
    consulenzaFiscale: 4,
  },
  assignedTeam: [
    { name: 'Laura Bianchi', role: 'Consulente Fiscale' },
  ],
  documents: {
    total: 24,
    pending: 2,
    lastUpdate: '2024-03-19',
  },
};

export const mockCompanyData = {
  id: '2',
  name: 'AB Communication',
  type: 'company',
  metrics: {
    practicesCompleted: 89,
    practicesInProgress: 12,
    practicesDelayed: 3,
    averageCompletionTime: 5.2,
    efficiency: 88.5,
    employees: 120,
    departments: [
      { name: 'Marketing', employees: 35 },
      { name: 'Vendite', employees: 45 },
      { name: 'Amministrazione', employees: 25 },
      { name: 'IT', employees: 15 },
    ],
  },
  history: [
    { month: 'Gen', completed: 28, delayed: 1 },
    { month: 'Feb', completed: 31, delayed: 1 },
    { month: 'Mar', completed: 30, delayed: 1 },
  ],
  services: {
    bustePaga: 45,
    dichiarazioni: 25,
    consulenza: 19,
  },
  locations: ['Milano', 'Roma', 'Torino'],
  assignedTeam: [
    { name: 'Mario Rossi', role: 'Responsabile' },
    { name: 'Laura Bianchi', role: 'Consulente' },
  ],
  documents: {
    total: 156,
    pending: 8,
    lastUpdate: '2024-03-19',
  },
};

export const mockEmployeeData = {
  id: '3',
  name: 'Mario Rossi',
  role: 'Responsabile',
  metrics: {
    practicesCompleted: 156,
    practicesInProgress: 42,
    practicesDelayed: 8,
    averageCompletionTime: 4.5,
    efficiency: 92.5,
  },
  history: [
    { month: 'Gen', completed: 45, delayed: 2 },
    { month: 'Feb', completed: 52, delayed: 3 },
    { month: 'Mar', completed: 59, delayed: 3 },
  ],
  performance: {
    accuracy: 95,
    speed: 88,
    communication: 90,
    teamwork: 92,
  },
  specializations: ['Buste Paga', 'Dichiarazioni', 'Consulenza'],
  topClients: [
    { name: 'AB Communication', practices: 25 },
    { name: 'Studio Bianchi', practices: 18 },
    { name: 'Retail Solutions SpA', practices: 15 },
  ],
  workload: {
    current: 42,
    capacity: 50,
    distribution: {
      bustePaga: 25,
      dichiarazioni: 10,
      consulenza: 7,
    },
  },
};