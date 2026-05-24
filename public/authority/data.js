export const MOCK_DATA = {
  cities: ["Chennai", "Coimbatore", "Madurai"],
  roads: {
    "Chennai": [
      {
        id: "CHN-001",
        name: "Anna Salai",
        ward: "Ward 112",
        zone: "Zone 9",
        length: "15 km",
        width: "30 m",
        lastInspection: "2026-05-10",
        condition: "Good",
        healthScore: 82,
        progress: 100,
        priority: "High",
        authority: {
          department: "Highways Department",
          officer: "Muthuvel K.",
          contact: "+91 9876543210",
          email: "muthuvel.k@tn.gov.in",
          division: "Metro Division"
        },
        government: {
          ownership: "State Government",
          scheme: "Smart City Mission"
        },
        financials: {
          totalBudget: "₹ 50,00,000",
          utilizedBudget: "₹ 48,00,000",
          utilizedPercentage: 96,
          contractor: "L&T Infrastructure",
          tenderId: "TN-HD-2025-001"
        },
        timeline: {
          startDate: "2025-01-15",
          estimatedCompletion: "2025-12-30",
          actualCompletion: "2025-12-10",
          daysRemaining: 0,
          status: "Completed"
        },
        maintenance: [
          { date: "2026-02-15", type: "Pothole Repair", cost: "₹ 50,000", duration: "2 days" },
          { date: "2025-08-10", type: "Drainage Restoration", cost: "₹ 1,50,000", duration: "5 days" }
        ],
        projectProgress: {
          completed: 100,
          remaining: 0,
          contractorProgress: "Excellent",
          materialUsage: "100%",
          inspectionStatus: "Verified"
        },
        citizenReports: {
          total: 124,
          open: 5,
          resolved: 119,
          avgResolutionTime: "48 hours",
          trend: "decreasing"
        },
        geo: {
          lat: 13.0483,
          lng: 80.2586
        }
      },
      {
        id: "CHN-002",
        name: "OMR (Rajiv Gandhi Salai)",
        ward: "Ward 192",
        zone: "Zone 15",
        length: "45 km",
        width: "40 m",
        lastInspection: "2026-05-18",
        condition: "Excellent",
        healthScore: 95,
        progress: 100,
        priority: "High",
        authority: {
          department: "State Roads Authority",
          officer: "Priya R.",
          contact: "+91 9123456780",
          email: "priya.r@tn.gov.in",
          division: "IT Corridor Division"
        },
        government: {
          ownership: "State Government",
          scheme: "IT Corridor Development"
        },
        financials: {
          totalBudget: "₹ 1,20,00,000",
          utilizedBudget: "₹ 1,15,00,000",
          utilizedPercentage: 95,
          contractor: "GMR Group",
          tenderId: "TN-SRA-2024-042"
        },
        timeline: {
          startDate: "2024-05-01",
          estimatedCompletion: "2026-01-01",
          actualCompletion: "2025-11-20",
          daysRemaining: 0,
          status: "Completed"
        },
        maintenance: [
          { date: "2026-04-01", type: "Lane Marking", cost: "₹ 80,000", duration: "3 days" }
        ],
        projectProgress: {
          completed: 100,
          remaining: 0,
          contractorProgress: "Good",
          materialUsage: "98%",
          inspectionStatus: "Verified"
        },
        citizenReports: {
          total: 45,
          open: 2,
          resolved: 43,
          avgResolutionTime: "24 hours",
          trend: "stable"
        },
        geo: {
          lat: 12.8687,
          lng: 80.2238
        }
      },
      {
        id: "CHN-003",
        name: "Arcot Road",
        ward: "Ward 130",
        zone: "Zone 10",
        length: "12 km",
        width: "20 m",
        lastInspection: "2026-05-20",
        condition: "Poor",
        healthScore: 45,
        progress: 30,
        priority: "Critical",
        authority: {
          department: "Greater Chennai Corporation",
          officer: "Senthil Kumar",
          contact: "+91 9988776655",
          email: "senthil.k@chennaicorporation.gov.in",
          division: "Kodambakkam Division"
        },
        government: {
          ownership: "Corporation Fund",
          scheme: "Monsoon Repair Scheme"
        },
        financials: {
          totalBudget: "₹ 25,00,000",
          utilizedBudget: "₹ 7,50,000",
          utilizedPercentage: 30,
          contractor: "XYZ Builders",
          tenderId: "GCC-2026-105"
        },
        timeline: {
          startDate: "2026-04-01",
          estimatedCompletion: "2026-08-30",
          actualCompletion: "-",
          daysRemaining: 98,
          status: "Delayed"
        },
        maintenance: [
          { date: "2025-12-05", type: "Flood Damage Repair", cost: "₹ 2,00,000", duration: "10 days" }
        ],
        projectProgress: {
          completed: 30,
          remaining: 70,
          contractorProgress: "Poor",
          materialUsage: "35%",
          inspectionStatus: "Pending"
        },
        citizenReports: {
          total: 340,
          open: 125,
          resolved: 215,
          avgResolutionTime: "12 days",
          trend: "increasing"
        },
        geo: {
          lat: 13.0485,
          lng: 80.1983
        }
      },
      {
        id: "CHN-004",
        name: "Poonamallee High Road",
        ward: "Ward 101",
        zone: "Zone 8",
        length: "14 km",
        width: "35 m",
        lastInspection: "2026-05-15",
        condition: "Moderate",
        healthScore: 65,
        progress: 60,
        priority: "Medium",
        authority: {
          department: "Highways Department",
          officer: "Karthik D.",
          contact: "+91 9001122334",
          email: "karthik.d@tn.gov.in",
          division: "Central Division"
        },
        government: {
          ownership: "State Government",
          scheme: "Arterial Road Improvement"
        },
        financials: {
          totalBudget: "₹ 40,00,000",
          utilizedBudget: "₹ 24,00,000",
          utilizedPercentage: 60,
          contractor: "ABC Infra",
          tenderId: "TN-HD-2026-015"
        },
        timeline: {
          startDate: "2026-02-15",
          estimatedCompletion: "2026-07-15",
          actualCompletion: "-",
          daysRemaining: 52,
          status: "On Track"
        },
        maintenance: [
          { date: "2026-01-10", type: "Street Light Installation", cost: "₹ 5,00,000", duration: "15 days" }
        ],
        projectProgress: {
          completed: 60,
          remaining: 40,
          contractorProgress: "Good",
          materialUsage: "55%",
          inspectionStatus: "In Progress"
        },
        citizenReports: {
          total: 85,
          open: 15,
          resolved: 70,
          avgResolutionTime: "3 days",
          trend: "stable"
        },
        geo: {
          lat: 13.0768,
          lng: 80.2289
        }
      },
      {
        id: "CHN-005",
        name: "100 Feet Road (Jawaharlal Nehru Road)",
        ward: "Ward 125",
        zone: "Zone 10",
        length: "18 km",
        width: "45 m",
        lastInspection: "2026-05-22",
        condition: "Critical",
        healthScore: 28,
        progress: 10,
        priority: "High",
        authority: {
          department: "Highways Department",
          officer: "Vignesh T.",
          contact: "+91 9444455555",
          email: "vignesh.t@tn.gov.in",
          division: "North Division"
        },
        government: {
          ownership: "State Government",
          scheme: "Emergency Surface Replacement"
        },
        financials: {
          totalBudget: "₹ 80,00,000",
          utilizedBudget: "₹ 8,00,000",
          utilizedPercentage: 10,
          contractor: "MegaStruct Ltd",
          tenderId: "TN-HD-2026-099"
        },
        timeline: {
          startDate: "2026-05-10",
          estimatedCompletion: "2026-11-30",
          actualCompletion: "-",
          daysRemaining: 190,
          status: "At Risk"
        },
        maintenance: [
           { date: "2025-11-20", type: "Temporary Pothole Fill", cost: "₹ 1,00,000", duration: "5 days" }
        ],
        projectProgress: {
          completed: 10,
          remaining: 90,
          contractorProgress: "Moderate",
          materialUsage: "12%",
          inspectionStatus: "Pending"
        },
        citizenReports: {
          total: 512,
          open: 300,
          resolved: 212,
          avgResolutionTime: "15 days",
          trend: "increasing"
        },
        geo: {
          lat: 13.0619,
          lng: 80.2039
        }
      }
    ],
    "Coimbatore": [
      {
        id: "CBE-001",
        name: "Avinashi Road",
        ward: "Ward 52",
        zone: "East Zone",
        length: "16 km",
        width: "30 m",
        lastInspection: "2026-05-12",
        condition: "Good",
        healthScore: 85,
        progress: 90,
        priority: "Medium",
        authority: {
          department: "State Highways",
          officer: "Ramesh P.",
          contact: "+91 9876123456",
          email: "ramesh.p@tn.gov.in",
          division: "CBE East"
        },
        government: {
          ownership: "State Government",
          scheme: "Elevated Corridor Project"
        },
        financials: {
          totalBudget: "₹ 500,00,000",
          utilizedBudget: "₹ 450,00,000",
          utilizedPercentage: 90,
          contractor: "L&T Infrastructure",
          tenderId: "CBE-SH-2023-01"
        },
        timeline: {
          startDate: "2023-08-01",
          estimatedCompletion: "2026-08-01",
          actualCompletion: "-",
          daysRemaining: 68,
          status: "On Track"
        },
        maintenance: [
          { date: "2026-01-20", type: "Service Road Repair", cost: "₹ 2,00,000", duration: "7 days" }
        ],
        projectProgress: {
          completed: 90,
          remaining: 10,
          contractorProgress: "Excellent",
          materialUsage: "90%",
          inspectionStatus: "Verified"
        },
        citizenReports: {
          total: 210,
          open: 20,
          resolved: 190,
          avgResolutionTime: "4 days",
          trend: "decreasing"
        },
        geo: { lat: 11.0264, lng: 77.0195 }
      },
      {
        id: "CBE-002",
        name: "Trichy Road",
        ward: "Ward 65",
        zone: "South Zone",
        length: "12 km",
        width: "25 m",
        lastInspection: "2026-05-01",
        condition: "Moderate",
        healthScore: 70,
        progress: 50,
        priority: "Medium",
        authority: {
          department: "Coimbatore City Municipal Corporation",
          officer: "Arun K.",
          contact: "+91 9111222333",
          email: "arun.k@ccmc.gov.in",
          division: "Roads Division"
        },
        government: {
          ownership: "Municipal Authority",
          scheme: "Urban Renewal"
        },
        financials: {
          totalBudget: "₹ 30,00,000",
          utilizedBudget: "₹ 15,00,000",
          utilizedPercentage: 50,
          contractor: "Southern Builders",
          tenderId: "CCMC-2025-45"
        },
        timeline: {
          startDate: "2026-01-10",
          estimatedCompletion: "2026-09-10",
          actualCompletion: "-",
          daysRemaining: 109,
          status: "On Track"
        },
        maintenance: [
          { date: "2025-10-15", type: "Median Painting", cost: "₹ 50,000", duration: "2 days" }
        ],
        projectProgress: {
          completed: 50,
          remaining: 50,
          contractorProgress: "Good",
          materialUsage: "48%",
          inspectionStatus: "In Progress"
        },
        citizenReports: {
          total: 150,
          open: 45,
          resolved: 105,
          avgResolutionTime: "5 days",
          trend: "stable"
        },
        geo: { lat: 10.9997, lng: 76.9818 }
      }
    ],
    "Madurai": [
      {
        id: "MDU-001",
        name: "Bypass Road",
        ward: "Ward 12",
        zone: "West Zone",
        length: "8 km",
        width: "24 m",
        lastInspection: "2026-05-15",
        condition: "Excellent",
        healthScore: 92,
        progress: 100,
        priority: "Low",
        authority: {
          department: "Madurai Corporation",
          officer: "Kannan M.",
          contact: "+91 9443322111",
          email: "kannan.m@maduraicorp.gov.in",
          division: "Engineering Division"
        },
        government: {
          ownership: "Corporation Fund",
          scheme: "Smart City Mission"
        },
        financials: {
          totalBudget: "₹ 18,00,000",
          utilizedBudget: "₹ 17,50,000",
          utilizedPercentage: 97,
          contractor: "Pandian Engg",
          tenderId: "MDU-SC-2024-08"
        },
        timeline: {
          startDate: "2024-10-01",
          estimatedCompletion: "2025-10-01",
          actualCompletion: "2025-09-15",
          daysRemaining: 0,
          status: "Completed"
        },
        maintenance: [
          { date: "2026-03-10", type: "Reflector Installation", cost: "₹ 30,000", duration: "1 day" }
        ],
        projectProgress: {
          completed: 100,
          remaining: 0,
          contractorProgress: "Excellent",
          materialUsage: "100%",
          inspectionStatus: "Verified"
        },
        citizenReports: {
          total: 20,
          open: 0,
          resolved: 20,
          avgResolutionTime: "24 hours",
          trend: "stable"
        },
        geo: { lat: 9.9390, lng: 78.1130 }
      },
      {
        id: "MDU-002",
        name: "Kamarajar Salai",
        ward: "Ward 45",
        zone: "East Zone",
        length: "5 km",
        width: "15 m",
        lastInspection: "2026-05-20",
        condition: "Poor",
        healthScore: 40,
        progress: 25,
        priority: "High",
        authority: {
          department: "State Highways",
          officer: "Bala J.",
          contact: "+91 9008877665",
          email: "bala.j@tn.gov.in",
          division: "MDU East"
        },
        government: {
          ownership: "State Government",
          scheme: "CRIDP Scheme"
        },
        financials: {
          totalBudget: "₹ 12,00,000",
          utilizedBudget: "₹ 3,00,000",
          utilizedPercentage: 25,
          contractor: "Vaigai Infra",
          tenderId: "TN-HD-2026-055"
        },
        timeline: {
          startDate: "2026-04-15",
          estimatedCompletion: "2026-09-15",
          actualCompletion: "-",
          daysRemaining: 114,
          status: "On Track"
        },
        maintenance: [
          { date: "2025-12-01", type: "Water Logging Clearance", cost: "₹ 45,000", duration: "3 days" }
        ],
        projectProgress: {
          completed: 25,
          remaining: 75,
          contractorProgress: "Moderate",
          materialUsage: "20%",
          inspectionStatus: "Pending"
        },
        citizenReports: {
          total: 180,
          open: 70,
          resolved: 110,
          avgResolutionTime: "8 days",
          trend: "increasing"
        },
        geo: { lat: 9.9173, lng: 78.1362 }
      }
    ]
  }
};
