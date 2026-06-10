(function () {
  'use strict';

  angular.module('kodeKrunchApp')
    .constant('MockData', {
      assetBrands: [
        'Sony', 'Canon', 'RED', 'ARRI', 'Sennheiser', 'Rode', 'Shure', 'Litepanels',
        'Harmonic', 'Ateme', 'Dell', 'HP', 'Mercedes-Benz', 'SSL', 'Sachtler',
        'Bebob', 'Belden', 'Amphenol', 'Fujifilm', 'Canare', 'Tiffen', 'Lappkabel',
        'Zeiss', 'Sound Devices', 'Grass Valley', 'Ross'
      ],
      assetLocations: [
        'Studio A', 'Studio B', 'PCR Room', 'MCR Room', 'Warehouse',
        'OB Bay', 'Server Room', 'Service Center', 'Van 1', 'OB Van 1',
        'Edit Suite 1', 'Repair Bay', 'On Location'
      ],
      notifications: [
        { id: 'NTF-001', title: 'Low Stock Alert', message: 'Gaffer Tape is below reorder level — only 3 rolls left.', time: '2h ago', read: false },
        { id: 'NTF-002', title: 'Maintenance Ticket', message: 'Litepanels Gemini 2×1 — under repair at MediaTech Services.', time: '5h ago', read: false },
        { id: 'NTF-003', title: 'Booking Pending', message: 'Corporate Documentary — TCS is awaiting approval.', time: '1d ago', read: false },
        { id: 'NTF-004', title: 'PM Due Soon', message: 'Harmonic Electra X2 Encoder — thermal check due 28 Jun.', time: '1d ago', read: true },
        { id: 'NTF-005', title: 'Movement Returned', message: 'Sachtler aktiv8 Fluid Head returned to Warehouse.', time: '2d ago', read: true }
      ],
      assets: [
        {
          id: 'CAM-001', name: 'Sony FX9 Full-Frame Camera', serial: 'SN-FX9-4821',
          brand: 'Sony', category: 'Production Equipment', location: 'Studio A',
          status: 'Available', value: 1050000, assignedTo: '—',
          warranty: { provider: 'Sony India Ltd.', type: 'Manufacturer', start: '', end: '', notes: '' },
          serviceHistory: [{
            type: 'Sensor Cleaning',
            description: 'Full sensor and optical element cleaning. Autofocus calibration check performed.',
            date: '12 Apr 2025', technician: 'In-house', vendor: 'Sony India Ltd.',
            cost: 15000, nextDue: '12 Jul 2025'
          }]
        },
        { id: 'CAM-002', name: 'RED KOMODO 6K', serial: 'SN-KOM-7293', brand: 'RED', category: 'Production Equipment', location: 'Studio B', status: 'In Use', value: 620000, assignedTo: 'Riya Mehta', warranty: {}, serviceHistory: [] },
        { id: 'CAM-003', name: 'Canon C300 Mark III', serial: 'SN-C30-1156', brand: 'Canon', category: 'Production Equipment', location: 'Van 1', status: 'Allocated', value: 380000, assignedTo: 'Amit Sharma', warranty: {}, serviceHistory: [] },
        { id: 'LIG-001', name: 'ARRI SkyPanel S60-C', serial: 'SN-ASP-3340', brand: 'ARRI', category: 'Lighting', location: 'Studio A', status: 'Available', value: 175000, assignedTo: '—', warranty: {}, serviceHistory: [] },
        { id: 'LIG-002', name: 'Litepanels Gemini 2x1 RGBWW', serial: 'SN-LPG-8821', brand: 'Litepanels', category: 'Lighting', location: 'Service Center', status: 'Under Repair', value: 95000, assignedTo: '—', warranty: {}, serviceHistory: [] },
        { id: 'AUD-001', name: 'Sennheiser MKH 416', serial: 'SN-MKH-5512', brand: 'Sennheiser', category: 'Audio Equipment', location: 'Studio A', status: 'Available', value: 42000, assignedTo: '—', warranty: {}, serviceHistory: [] },
        { id: 'AUD-002', name: 'Sound Devices MixPre-10 II', serial: 'SN-SDM-9934', brand: 'Sound Devices', category: 'Audio Equipment', location: 'Van 1', status: 'In Use', value: 78000, assignedTo: 'Priya Nair', warranty: {}, serviceHistory: [] },
        { id: 'IT-001', name: 'Dell Precision 7920', serial: 'SN-DPR-2201', brand: 'Dell', category: 'IT Assets', location: 'Edit Suite 1', status: 'Available', value: 210000, assignedTo: '—', warranty: {}, serviceHistory: [] },
        { id: 'IT-002', name: 'Harmonic Spectrum X', serial: 'SN-HRM-7788', brand: 'Harmonic', category: 'Transmission Equipment', location: 'PCR Room', status: 'In Use', value: 1250000, assignedTo: 'Rajesh Kumar', warranty: {}, serviceHistory: [] },
        { id: 'STU-001', name: 'SSL System T Console', serial: 'SN-SSL-0012', brand: 'SSL', category: 'Studio Equipment', location: 'Studio A', status: 'Allocated', value: 890000, assignedTo: 'Neha Gupta', warranty: {}, serviceHistory: [] },
        { id: 'LEN-001', name: 'Canon CN-E 30-300mm', serial: 'SN-CNE-4455', brand: 'Canon', category: 'Lenses', location: 'Studio A', status: 'Available', value: 320000, assignedTo: '—', warranty: {}, serviceHistory: [] },
        { id: 'LEN-002', name: 'Zeiss CP.3 85mm', serial: 'SN-ZCP-6677', brand: 'Zeiss', category: 'Lenses', location: 'Studio B', status: 'In Use', value: 145000, assignedTo: 'Vikram Singh', warranty: {}, serviceHistory: [] },
        { id: 'VEH-001', name: 'OB Van 1 (Mercedes)', serial: 'SN-OBV-1001', brand: 'Mercedes-Benz', category: 'Vehicles', location: 'On Location', status: 'Allocated', value: 4500000, assignedTo: 'Anil Desai', warranty: {}, serviceHistory: [] },
        { id: 'TRN-001', name: 'Ross Carbonite Ultra', serial: 'SN-RCU-8890', brand: 'Ross', category: 'Transmission Equipment', location: 'PCR Room', status: 'Available', value: 980000, assignedTo: '—', warranty: {}, serviceHistory: [] },
        { id: 'STU-002', name: 'Grass Valley K-Frame', serial: 'SN-GVK-3344', brand: 'Grass Valley', category: 'Studio Equipment', location: 'Studio B', status: 'Available', value: 720000, assignedTo: '—', warranty: {}, serviceHistory: [] }
      ],
      categories: [
        { name: 'Production Equipment', icon: '🎬', desc: 'Cameras, tripods, rigs, stabilizers', count: 4, available: 2 },
        { name: 'Lenses', icon: '🔭', desc: 'Cine lenses, zoom, prime, adapters', count: 2, available: 1 },
        { name: 'Audio Equipment', icon: '🎙️', desc: 'Microphones, mixers, recorders', count: 2, available: 1 },
        { name: 'Lighting', icon: '💡', desc: 'LED panels, fresnels, dimmers', count: 2, available: 1 },
        { name: 'Transmission Equipment', icon: '📡', desc: 'Encoders, modulators, receivers', count: 2, available: 1 },
        { name: 'IT Assets', icon: '💻', desc: 'Workstations, servers, networking', count: 1, available: 1 },
        { name: 'Studio Equipment', icon: '🎛️', desc: 'Consoles, switchers, routers', count: 2, available: 1 },
        { name: 'Vehicles', icon: '🚐', desc: 'OB vans, crew transport', count: 1, available: 0 }
      ],
      brandCategories: [
        'Camera & AV', 'Camera & Lenses', 'Camera', 'Camera & Lighting',
        'Audio Equipment', 'Lighting', 'Transmission Equipment', 'IT Infrastructure',
        'Studio Equipment', 'Vehicles', 'Power Solutions', 'Cables & Connectors',
        'Storage Media', 'Accessories'
      ],
      brands: [
        { id: 'BRD-001', name: 'Sony', category: 'Camera & AV', country: 'Japan', assetsInUse: 3, status: 'Active' },
        { id: 'BRD-002', name: 'Canon', category: 'Camera & Lenses', country: 'Japan', assetsInUse: 2, status: 'Active' },
        { id: 'BRD-003', name: 'RED', category: 'Camera', country: 'USA', assetsInUse: 1, status: 'Active' },
        { id: 'BRD-004', name: 'ARRI', category: 'Camera & Lighting', country: 'Germany', assetsInUse: 2, status: 'Active' },
        { id: 'BRD-005', name: 'Sennheiser', category: 'Audio Equipment', country: 'Germany', assetsInUse: 2, status: 'Active' },
        { id: 'BRD-006', name: 'Rode', category: 'Audio Equipment', country: 'Australia', assetsInUse: 1, status: 'Active' },
        { id: 'BRD-007', name: 'Shure', category: 'Audio Equipment', country: 'USA', assetsInUse: 0, status: 'Inactive' },
        { id: 'BRD-008', name: 'Litepanels', category: 'Lighting', country: 'USA', assetsInUse: 1, status: 'Active' },
        { id: 'BRD-009', name: 'Harmonic', category: 'Transmission Equipment', country: 'USA', assetsInUse: 1, status: 'Active' },
        { id: 'BRD-010', name: 'Ateme', category: 'Transmission Equipment', country: 'France', assetsInUse: 0, status: 'Active' },
        { id: 'BRD-011', name: 'Dell', category: 'IT Infrastructure', country: 'USA', assetsInUse: 2, status: 'Active' },
        { id: 'BRD-012', name: 'HP', category: 'IT Infrastructure', country: 'USA', assetsInUse: 1, status: 'Active' },
        { id: 'BRD-013', name: 'Mercedes-Benz', category: 'Vehicles', country: 'Germany', assetsInUse: 1, status: 'Active' },
        { id: 'BRD-014', name: 'SSL', category: 'Studio Equipment', country: 'UK', assetsInUse: 1, status: 'Active' },
        { id: 'BRD-015', name: 'Sachtler', category: 'Camera & AV', country: 'Germany', assetsInUse: 2, status: 'Active' },
        { id: 'BRD-016', name: 'Bebob', category: 'Power Solutions', country: 'Germany', assetsInUse: 1, status: 'Active' },
        { id: 'BRD-017', name: 'Belden', category: 'Cables & Connectors', country: 'USA', assetsInUse: 0, status: 'Active' },
        { id: 'BRD-018', name: 'Amphenol', category: 'Cables & Connectors', country: 'USA', assetsInUse: 0, status: 'Active' },
        { id: 'BRD-019', name: 'Fujifilm', category: 'Storage Media', country: 'Japan', assetsInUse: 1, status: 'Active' },
        { id: 'BRD-020', name: 'Canare', category: 'Cables & Connectors', country: 'Japan', assetsInUse: 1, status: 'Active' },
        { id: 'BRD-021', name: 'Tiffen', category: 'Accessories', country: 'USA', assetsInUse: 0, status: 'Active' },
        { id: 'BRD-022', name: 'Lappkabel', category: 'Cables & Connectors', country: 'Germany', assetsInUse: 0, status: 'Active' }
      ],
      stock: [
        { id: 'STK-001', sku: 'BAT-NP-FZ100', item: 'Sony NP-FZ100 Battery Pack', vendor: 'Sony India Ltd.', qty: 45, reorder: 10, location: 'Equipment Room', value: 8500 },
        { id: 'STK-002', sku: 'SDC-SF-G160T', item: 'Sony SF-G Series 160GB CFexpress', vendor: 'Sony India Ltd.', qty: 2, reorder: 5, location: 'Equipment Room', value: 28000 },
        { id: 'STK-003', sku: 'CAN-XLR10', item: 'Canare XLR Audio Cable 10m', vendor: 'ProAV Supplies', qty: 23, reorder: 15, location: 'Cable Store', value: 3200 },
        { id: 'STK-004', sku: 'LTO9-18TB', item: 'LTO-9 Data Tape 18TB', vendor: 'Fujifilm India', qty: 67, reorder: 20, location: 'Archive Room', value: 12000 },
        { id: 'STK-005', sku: 'AMP-BNC75', item: 'Amphenol BNC Connector 75Ω', vendor: 'ProAV Supplies', qty: 8, reorder: 50, location: 'Cable Store', value: 450 },
        { id: 'STK-006', sku: 'NEU-XLR3M', item: 'Neutrik XLR Connector 3-Pin', vendor: 'ProAV Supplies', qty: 120, reorder: 30, location: 'Cable Store', value: 380 },
        { id: 'STK-007', sku: 'GAF-2BLK', item: 'Gaffer Tape 2in Black', vendor: 'ProAV Supplies', qty: 3, reorder: 10, location: 'Equipment Room', value: 650 },
        { id: 'STK-008', sku: 'SD-CFE256', item: 'SanDisk 256GB CFexpress Type B', vendor: 'ProAV Supplies', qty: 14, reorder: 8, location: 'Equipment Room', value: 22000 }
      ],
      transactions: [
        { id: 'TXN-001', item: 'Sony NP-FZ100 Battery Pack', sku: 'BAT-NP-FZ100', type: 'Issue', qty: 4, issuedBy: 'Riya Mehta', date: '01 Jun 2025, 10:30', note: 'Morning News crew' },
        { id: 'TXN-002', item: 'Canare XLR Audio Cable 10m', sku: 'CAN-XLR10', type: 'Return', qty: 2, issuedBy: 'Amit Sharma', date: '01 Jun 2025, 09:15', note: 'After Studio B shoot' },
        { id: 'TXN-003', item: 'Sony SF-G Series 160GB CFexpress', sku: 'SDC-SF-G160T', type: 'Receive', qty: 10, issuedBy: 'Rajesh Kumar', date: '30 May 2025, 14:00', note: 'Vendor delivery — Sony India' },
        { id: 'TXN-004', item: 'Sony SF-G Series 160GB CFexpress', sku: 'SDC-SF-G160T', type: 'Issue', qty: 2, issuedBy: 'Priya Nair', date: '29 May 2025, 08:00', note: 'Documentary unit' },
        { id: 'TXN-005', item: 'Bebob V98 Micro Battery', sku: 'BEB-V98', type: 'Adjust', qty: 3, issuedBy: 'Rajesh Kumar', date: '28 May 2025, 16:45', note: 'Inventory count correction' },
        { id: 'TXN-006', item: 'Amphenol BNC Connector 75Ω', sku: 'AMP-BNC75', type: 'Receive', qty: 50, issuedBy: 'Rajesh Kumar', date: '27 May 2025, 11:20', note: 'ProAV Supplies delivery' }
      ],
      bookingDepartments: [
        'News Operations', 'Sports Production', 'Documentary Unit', 'Entertainment',
        'Digital Content', 'IT Operations', 'Broadcast Ops', 'Corporate Communications',
        'Marketing', 'Administration'
      ],
      bookingLocations: ['Studio A', 'Studio B', 'Warehouse', 'OB Bay', 'PCR Room', 'MCR Room'],
      bookings: [
        { id: 'BK-2025-001', production: 'Morning News Live', by: 'Riya Mehta', team: 'News Operations', assets: 2, assetIds: ['CAM-001', 'MIC-001'], startDate: '2025-06-02', endDate: '2025-06-02', start: '02 Jun 2025, 06:00', end: '02 Jun 2025, 10:00', status: 'Approved', pickup: 'Studio A', returnLoc: 'Studio A' },
        { id: 'BK-2025-002', production: 'IPL Coverage — Match Day 12', by: 'Priya Nair', team: 'Sports Production', assets: 3, assetIds: ['CAM-002', 'AUD-002', 'LIG-001'], startDate: '2025-06-04', endDate: '2025-06-04', start: '04 Jun 2025, 14:00', end: '04 Jun 2025, 23:00', status: 'Active', pickup: 'OB Bay', returnLoc: 'Warehouse' },
        { id: 'BK-2025-003', production: 'Corporate Documentary — TCS', by: 'Vikram Singh', team: 'Documentary Unit', assets: 3, assetIds: ['CAM-003', 'LEN-002', 'AUD-001'], startDate: '2025-06-06', endDate: '2025-06-08', start: '06 Jun 2025, 08:00', end: '08 Jun 2025, 18:00', status: 'Pending', pickup: 'Studio B', returnLoc: 'Studio B' },
        { id: 'BK-2025-004', production: 'Reality Show Finale', by: 'Neha Gupta', team: 'Entertainment', assets: 2, assetIds: ['STU-001', 'LIG-001'], startDate: '2025-06-05', endDate: '2025-06-05', start: '05 Jun 2025, 19:00', end: '05 Jun 2025, 22:00', status: 'Approved', pickup: 'Studio A', returnLoc: 'Studio A' },
        { id: 'BK-2025-005', production: 'Weekly Podcast Recording', by: 'Amit Sharma', team: 'Digital Content', assets: 1, assetIds: ['AUD-001'], startDate: '2025-06-07', endDate: '2025-06-07', start: '07 Jun 2025, 10:00', end: '07 Jun 2025, 14:00', status: 'Pending', pickup: 'Studio B', returnLoc: 'Studio B' },
        { id: 'BK-2025-006', production: 'Election Night Coverage', by: 'Riya Mehta', team: 'News Operations', assets: 2, assetIds: ['CAM-001', 'TRN-001'], startDate: '2025-06-11', endDate: '2025-06-11', start: '11 Jun 2025, 18:00', end: '12 Jun 2025, 02:00', status: 'Approved', pickup: 'PCR Room', returnLoc: 'PCR Room' },
        { id: 'BK-2025-007', production: 'Award Show Broadcast', by: 'Neha Gupta', team: 'Entertainment', assets: 2, assetIds: ['CAM-002', 'STU-001'], startDate: '2025-06-15', endDate: '2025-06-15', start: '15 Jun 2025, 19:00', end: '15 Jun 2025, 23:00', status: 'Rejected', pickup: 'Studio A', returnLoc: 'Studio A' }
      ],
      allocations: [
        { id: 'BK-2025-001', production: 'Morning News Live', dept: 'News Operations', by: 'Riya Mehta', assets: 'CAM-001, MIC-001', dueReturn: '02 Jun 2025, 10:00', pickup: 'Studio A', status: 'Approved' },
        { id: 'BK-2025-002', production: 'Evening Bulletin', dept: 'News Operations', by: 'Amit Sharma', assets: 'CAM-002, AUD-002', dueReturn: '02 Jun 2025, 20:00', pickup: 'Studio B', status: 'Active' },
        { id: 'BK-2025-005', production: 'Studio Talk Show', dept: 'Entertainment', by: 'Neha Gupta', assets: 'CAM-003, LIG-001, STU-001', dueReturn: '04 Jun 2025, 22:00', pickup: 'Studio A', status: 'Active' },
        { id: 'BK-2025-004', production: 'Documentary Shoot', dept: 'Production', by: 'Vikram Singh', assets: 'CAM-002, LEN-002', dueReturn: '07 Jun 2025, 18:00', pickup: 'Warehouse', status: 'Approved' }
      ],
      movementLocations: [
        'Warehouse', 'Studio A', 'Studio B', 'Equipment Room', 'OB Bay',
        'MediaTech Services', 'Wankhede Stadium', 'PCR Room', 'MCR Room',
        'Edit Suite 1', 'Service Center', 'On Location'
      ],
      movementRegister: [
        { id: 'MV-001', asset: 'Canon EOS C300 Mark III', assetId: 'CAM-002', from: 'Warehouse', to: 'Studio B', requestedBy: 'Arun Sharma', approvedBy: 'Rajesh Kumar', dispatched: '01 Jun 2025, 08:30', returned: '', status: 'Out' },
        { id: 'MV-002', asset: 'Litepanels Gemini 2×1 RGBWW', assetId: 'LIG-002', from: 'Studio A', to: 'MediaTech Services', requestedBy: 'Vikram Singh', approvedBy: 'Rajesh Kumar', dispatched: '28 May 2025, 14:00', returned: '', status: 'At Service' },
        { id: 'MV-003', asset: 'Sennheiser MKH 416', assetId: 'AUD-001', from: 'Equipment Room', to: 'Studio B', requestedBy: 'Priya Nair', approvedBy: 'Amit Sharma', dispatched: '30 May 2025, 09:00', returned: '', status: 'Out' },
        { id: 'MV-004', asset: 'Sachtler aktiv8 Fluid Head', assetId: 'TRI-001', from: 'Studio A', to: 'Warehouse', requestedBy: 'Deepak Joshi', approvedBy: 'Rajesh Kumar', dispatched: '25 May 2025, 11:30', returned: '27 May 2025, 16:45', status: 'Returned' },
        { id: 'MV-005', asset: 'OB Van — Mercedes Sprinter', assetId: 'VEH-001', from: 'OB Bay', to: 'Wankhede Stadium', requestedBy: 'Deepak Joshi', approvedBy: 'Rajesh Kumar', dispatched: '03 Jun 2025, 06:00', returned: '', status: 'Out' }
      ],
      tickets: [
        { id: 'MT-001', asset: 'Litepanels Gemini 2×1 RGBWW', assetId: 'LIG-002', issue: 'Flickering at 50% intensity — possible driver board failure', priority: 'High', vendor: 'MediaTech Services', cost: 85000, raised: '28 May 2025', estCompletion: '10 Jun 2025', status: 'Under Repair' },
        { id: 'MT-002', asset: 'Canon EOS C300 Mark III', assetId: 'CAM-003', issue: 'Sensor dust — requires professional cleaning', priority: 'Medium', vendor: 'Canon India Service', cost: 20000, raised: '25 May 2025', estCompletion: '08 Jun 2025', status: 'Scheduled' },
        { id: 'MT-003', asset: 'Harmonic Electra X2 Encoder', assetId: 'IT-002', issue: 'Fan noise above threshold — bearing replacement needed', priority: 'Critical', vendor: 'Harmonic Networks', cost: 120000, raised: '20 May 2025', estCompletion: '12 Jun 2025', status: 'Pending' },
        { id: 'MT-004', asset: 'OB Van — Mercedes Sprinter', assetId: 'VEH-001', issue: 'Annual service due — generator and transmission check', priority: 'Medium', vendor: 'Mercedes-Benz Mumbai', cost: 350000, raised: '15 May 2025', estCompletion: '15 Jun 2025', status: 'Scheduled' },
        { id: 'MT-005', asset: 'Sachtler aktiv8 Fluid Head', assetId: 'TRI-001', issue: 'Drag adjustment stiff on tilt axis', priority: 'Low', vendor: 'Sachtler Service UK', cost: 50000, raised: '10 May 2025', estCompletion: '05 Jun 2025', status: 'Resolved' },
        { id: 'MT-006', asset: 'Grass Valley K-Frame', assetId: 'STU-002', issue: 'Frame sync drift on Input 4', priority: 'High', vendor: 'GV Support India', cost: 220000, raised: '22 May 2025', estCompletion: '14 Jun 2025', status: 'Under Repair' }
      ],
      pmSchedule: [
        { id: 'PM-001', asset: 'Sony FX9 Full-Frame Camera', assetId: 'CAM-001', pmType: 'Sensor Cleaning', frequency: 'Every 3 months', lastDone: '12 Apr 2025', nextDue: '15 Jul 2025', status: 'Upcoming' },
        { id: 'PM-002', asset: 'Harmonic Electra X2 Encoder', assetId: 'IT-002', pmType: 'Thermal Check & Fan Clean', frequency: 'Monthly', lastDone: '28 May 2025', nextDue: '28 Jun 2025', status: 'Due Soon' },
        { id: 'PM-003', asset: 'Dell PowerEdge R750', assetId: 'SVR-001', pmType: 'RAID Check & Disk Health', frequency: 'Monthly', lastDone: '01 May 2025', nextDue: '01 Jun 2025', status: 'Due Soon' },
        { id: 'PM-004', asset: 'Canon EOS C300 Mark III', assetId: 'CAM-003', pmType: 'Lens Mount Inspection & Cleaning', frequency: 'Every 6 months', lastDone: '10 Jan 2025', nextDue: '10 Jul 2025', status: 'Upcoming' },
        { id: 'PM-005', asset: 'Litepanels Gemini 2×1 RGBWW', assetId: 'LIG-002', pmType: 'LED Driver Board Inspection', frequency: 'Every 6 months', lastDone: '05 Mar 2025', nextDue: '05 Sep 2025', status: 'Upcoming' },
        { id: 'PM-006', asset: 'OB Van — Mercedes Sprinter', assetId: 'VEH-001', pmType: 'Generator Service', frequency: 'Annually', lastDone: '15 Dec 2024', nextDue: '15 Dec 2025', status: 'Upcoming' }
      ],
      facilities: [
        { name: 'Studio A', desc: 'Main production studio', status: 'Occupied', area: '150 sqm', assets: 8, manager: 'Rajesh Kumar', occupancy: 65 },
        { name: 'Studio B', desc: 'Secondary studio', status: 'Available Space', area: '100 sqm', assets: 5, manager: 'Priya Nair', occupancy: 30 },
        { name: 'PCR Room', desc: 'Production control room', status: 'Occupied', area: '80 sqm', assets: 12, manager: 'Amit Sharma', occupancy: 85 },
        { name: 'Edit Suite 1', desc: 'Post-production editing', status: 'Available Space', area: '40 sqm', assets: 3, manager: 'Vikram Singh', occupancy: 20 },
        { name: 'Edit Suite 2', desc: 'Color grading suite', status: 'Occupied', area: '35 sqm', assets: 4, manager: 'Neha Gupta', occupancy: 70 },
        { name: 'Warehouse', desc: 'Central equipment storage', status: 'Available Space', area: '300 sqm', assets: 45, manager: 'Rajesh Kumar', occupancy: 55 },
        { name: 'OB Van 1', desc: 'Mobile production unit', status: 'On Location', area: '25 sqm', assets: 15, manager: 'Anil Desai', occupancy: 90 },
        { name: 'Repair Bay', desc: 'Maintenance workshop', status: 'Occupied', area: '60 sqm', assets: 6, manager: 'Suresh Patel', occupancy: 45 }
      ],
      vendorCategories: [
        'Camera & AV Equipment', 'Camera & Lenses', 'Equipment Repair & Service',
        'Broadcast Transmission', 'IT Infrastructure', 'Power Solutions',
        'Lighting Equipment', 'Audio Equipment', 'Cables & Accessories'
      ],
      vendors: [
        {
          id: 'VEN-001', name: 'Sony India Ltd.', category: 'Camera & AV Equipment',
          contact: 'Arun Mehta', email: 'arun.mehta@sony.co.in', phone: '+91 98765 43210',
          contracts: 3, rating: 5,
          contractList: [
            { id: 'CTR-001', title: 'Camera Maintenance SLA', start: '01 Apr 2025', end: '31 Mar 2026', value: 850000, status: 'Active' },
            { id: 'CTR-002', title: 'FX9 Spare Parts Supply', start: '15 Jan 2025', end: '14 Jan 2026', value: 320000, status: 'Active' },
            { id: 'CTR-003', title: 'Lens Calibration Service', start: '01 Jun 2024', end: '31 May 2025', value: 125000, status: 'Expired' }
          ]
        },
        {
          id: 'VEN-002', name: 'Canon India', category: 'Camera & Lenses',
          contact: 'Deepak Joshi', email: 'deepak.j@canon.in', phone: '+91 98765 12345',
          contracts: 2, rating: 4,
          contractList: [
            { id: 'CTR-004', title: 'C300 Mark III Service Agreement', start: '01 Mar 2025', end: '28 Feb 2026', value: 275000, status: 'Active' },
            { id: 'CTR-005', title: 'CN-E Lens Rental Support', start: '10 Feb 2025', end: '09 Feb 2026', value: 180000, status: 'Active' }
          ]
        },
        {
          id: 'VEN-003', name: 'MediaTech Services', category: 'Equipment Repair & Service',
          contact: 'Ravi Shankar', email: 'ravi@media-tech.in', phone: '+91 87654 32109',
          contracts: 5, rating: 5,
          contractList: [
            { id: 'CTR-006', title: 'Lighting Equipment Repair', start: '01 May 2025', end: '30 Apr 2026', value: 420000, status: 'Active' },
            { id: 'CTR-007', title: 'OB Van Maintenance', start: '15 Apr 2025', end: '14 Apr 2026', value: 650000, status: 'Active' },
            { id: 'CTR-008', title: 'Studio Equipment AMC', start: '01 Jan 2025', end: '31 Dec 2025', value: 980000, status: 'Active' },
            { id: 'CTR-009', title: 'Emergency Repair Retainer', start: '01 Jun 2025', end: '31 May 2026', value: 150000, status: 'Active' },
            { id: 'CTR-010', title: 'Generator Service Contract', start: '01 Mar 2024', end: '28 Feb 2025', value: 220000, status: 'Expired' }
          ]
        },
        {
          id: 'VEN-004', name: 'Bebob Factory GmbH', category: 'Power Solutions',
          contact: 'Klaus Weber', email: 'k.weber@bebob.de', phone: '+49 89 555 0123',
          contracts: 2, rating: 5,
          contractList: [
            { id: 'CTR-011', title: 'V-Mount Battery Supply', start: '01 Feb 2025', end: '31 Jan 2026', value: 195000, status: 'Active' },
            { id: 'CTR-012', title: 'Battery Charger Maintenance', start: '15 Mar 2025', end: '14 Mar 2026', value: 85000, status: 'Active' }
          ]
        },
        {
          id: 'VEN-005', name: 'Harmonic Inc.', category: 'Broadcast Transmission',
          contact: 'James Wilson', email: 'jwilson@harmonicinc.com', phone: '+1 408 555 0100',
          contracts: 1, rating: 4,
          contractList: [
            { id: 'CTR-013', title: 'Encoder Support & Updates', start: '01 Apr 2025', end: '31 Mar 2026', value: 1200000, status: 'Active' }
          ]
        },
        {
          id: 'VEN-006', name: 'AudioPro India', category: 'Audio Equipment',
          contact: 'Sanjay Verma', email: 'sanjay@audiopro.in', phone: '+91 65432 10987',
          contracts: 2, rating: 3,
          contractList: [
            { id: 'CTR-014', title: 'Microphone Service Agreement', start: '01 May 2025', end: '30 Apr 2026', value: 95000, status: 'Active' },
            { id: 'CTR-015', title: 'Wireless System Calibration', start: '10 Jan 2025', end: '09 Jan 2026', value: 68000, status: 'Active' }
          ]
        }
      ],
      purchaseRequests: [
        { id: 'PR-2025-001', item: 'Sony FX9 Battery Grip', qty: 2, vendor: 'Sony India Ltd.', cost: 45000, requestedBy: 'Rajesh Kumar', date: '28 May 2025', status: 'Approved' },
        { id: 'PR-2025-002', item: 'Belden SDI Cable 100m', qty: 10, vendor: 'MediaTech Services', cost: 32000, requestedBy: 'Arun Sharma', date: '30 May 2025', status: 'Pending' },
        { id: 'PR-2025-003', item: 'SanDisk 512GB CFexpress Card', qty: 4, vendor: 'Sony India Ltd.', cost: 88000, requestedBy: 'Vikram Singh', date: '01 Jun 2025', status: 'Approved' },
        { id: 'PR-2025-004', item: 'Litepanels Diffusion Frame', qty: 3, vendor: 'MediaTech Services', cost: 15000, requestedBy: 'Priya Nair', date: '25 May 2025', status: 'Rejected' }
      ],
      userRoles: [
        'Admin', 'Asset Manager', 'Studio Manager', 'Engineer', 'Production Team', 'Warehouse Staff'
      ],
      users: [
        { id: 'USR-001', name: 'Rajesh Kumar', email: 'rajesh.kumar@studio.in', role: 'Asset Manager', department: 'Operations', lastLogin: 'Today, 09:14', status: 'Active' },
        { id: 'USR-002', name: 'Priya Nair', email: 'priya.nair@studio.in', role: 'Production Team', department: 'Production', lastLogin: 'Today, 08:45', status: 'Active' },
        { id: 'USR-003', name: 'Amit Sharma', email: 'amit.sharma@studio.in', role: 'Studio Manager', department: 'Technical', lastLogin: 'Yesterday, 18:30', status: 'Active' },
        { id: 'USR-004', name: 'Vikram Singh', email: 'vikram.singh@studio.in', role: 'Engineer', department: 'News', lastLogin: 'Yesterday, 16:20', status: 'Active' },
        { id: 'USR-005', name: 'Riya Mehta', email: 'riya.mehta@studio.in', role: 'Production Team', department: 'Logistics', lastLogin: '3 days ago', status: 'Active' },
        { id: 'USR-006', name: 'Neha Gupta', email: 'neha.gupta@studio.in', role: 'Production Team', department: 'Entertainment', lastLogin: '2 days ago', status: 'Active' },
        { id: 'USR-007', name: 'Deepak Joshi', email: 'deepak.joshi@studio.in', role: 'Warehouse Staff', department: 'Digital', lastLogin: '1 week ago', status: 'Inactive' },
        { id: 'USR-008', name: 'admin', email: 'admin@studio.in', role: 'Admin', department: 'Management', lastLogin: 'Today, 10:00', status: 'Active' }
      ],
      reports: {
        utilization: {
          stats: { totalAssets: 15, available: 6, utilizationRate: '60%' },
          chart: {
            labels: ['Sony FX9', 'Canon C300', 'RED KOMODO', 'ARRI SkyPanel', 'SSL Console', 'Harmonic Inc.'],
            data: [85, 72, 45, 60, 90, 55]
          }
        },
        maintenance: {
          stats: { totalTickets: 6, open: 4, totalCost: '₹5,83,000' },
          chart: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            data: [120000, 85000, 200000, 95000, 150000, 183000]
          }
        },
        inventory: {
          stats: { totalSkus: 8, lowStock: 3, stockValue: '₹18,88,900' },
          chart: {
            labels: ['Sony NP-FZ100 Batt', 'Canare XLR Cable', 'Sony 160GB XQD', 'LTO-9 Data Tape', 'Amphenol BNC', 'Neutrik XLR', 'Gaffer Tape', 'SanDisk CFexpress'],
            stock: [24, 45, 8, 6, 120, 85, 3, 5],
            reorder: [10, 15, 12, 10, 50, 30, 10, 8]
          }
        }
      },
      dashboard: {
        stats: [
          { label: 'Total Assets', value: 15, hint: 'all categories', color: 'yellow' },
          { label: 'Available', value: 6, hint: 'ready to deploy', color: 'green' },
          { label: 'In Use / Allocated', value: 7, hint: 'active deployments', color: 'teal' },
          { label: 'Under Repair', value: 2, hint: 'at service center', color: 'orange' },
          { label: 'Pending Bookings', value: 2, hint: 'awaiting approval', color: 'purple' },
          { label: 'Low Stock Alerts', value: 3, hint: 'reorder needed', color: 'red' }
        ],
        bookingsMovements: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          bookings: [42, 38, 55, 48, 62, 58],
          movements: [28, 32, 40, 35, 50, 45]
        },
        fleetStatus: [
          { label: 'Available', value: 7, color: '#22c55e' },
          { label: 'In Use', value: 5, color: '#fbbf24' },
          { label: 'Allocated', value: 3, color: '#14b8a6' },
          { label: 'Under Repair', value: 2, color: '#f97316' },
          { label: 'Retired', value: 1, color: '#94a3b8' }
        ],
        movements: [
          { asset: 'Canon EOS C300 Mark III', route: 'Warehouse → Studio B', status: 'Out' },
          { asset: 'Litepanels Gemini 2×1', route: 'Studio A → MediaTech Services', status: 'At Service' },
          { asset: 'Sennheiser MKH 416', route: 'Equipment Room → Studio B', status: 'Out' },
          { asset: 'Sachtler aktiv8 Fluid Head', route: 'Studio A → Warehouse', status: 'Returned' }
        ],
        maintenanceDue: [
          { asset: 'Litepanels Gemini 2×1 RGBWW', issue: 'Flickering at 50% intensity on Channel 2', priority: 'High' },
          { asset: 'Canon EOS C300 Mark III', issue: 'Sensor dust — requires cleaning', priority: 'Medium' },
          { asset: 'Harmonic Electra X2 Encoder', issue: 'Fan noise above threshold', priority: 'High' },
          { asset: 'OB Van — Mercedes Sprinter', issue: 'Annual service due', priority: 'Low' }
        ]
      }
    });
})();
