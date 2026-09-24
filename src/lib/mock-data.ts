import type {
  Activity,
  Beneficiary,
  Donation,
  Campaign,
  Sponsorship,
  Volunteer,
  EventItem,
  Enquiry,
  CSRPartner,
  Grant,
  Expense,
  NewsItem,
  GalleryItem,
  DocumentItem,
  Certificate,
  AuditLog,
  UserAccount,
  Trustee,
  Testimonial,
} from "./types";

// Use a deterministic avatar service for placeholders
const avatar = (seed: string, size = 200) =>
  `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(seed)}&radius=50&backgroundColor=0f766e,ca8a04,9a3412,15803d,7c2d12`;

const photo = (id: number, w = 800, h = 600) =>
  `https://picsum.photos/seed/trust-${id}/${w}/${h}`;

export const TRUST_INFO = {
  name: "BHARATI BANERJEE MEMORIAL WELFARE TRUST",
  tagline: "Serving Humanity, Building Hope",
  established: "2009",
  registrationNo: "REG/2009/0447/MUM",
  pan: "AABTA1234N",
  address: "12, Seva Marg, Andheri West, Mumbai, Maharashtra 400058",
  phone: "+91 98765 43210",
  email: "info@ananyaseva.org",
  website: "www.ananyaseva.org",
  vision:
    "To build a compassionate and inclusive society where every individual has access to education, healthcare, dignity, and opportunity — regardless of background, gender, or economic status.",
  mission:
    "We work at the grassroots level to uplift underprivileged communities through sustainable programs in education, healthcare, women empowerment, and rural development. Our approach combines immediate relief with long-term capacity building, ensuring that every rupee contributed creates lasting impact in the lives of those we serve.",
  about:
    "Founded in 2009 by a small group of educators, doctors, and social workers, BHARATI BANERJEE MEMORIAL WELFARE TRUST began as a single classroom for ten children in a Mumbai slum. Over fifteen years, we have grown into a recognized non-profit organization working across Maharashtra, Gujarat, and Rajasthan, directly impacting more than 1.2 lakh beneficiaries through over 480 community programs.",
  objectives: [
    "Provide free and quality education to children from economically weaker sections",
    "Deliver accessible primary healthcare to rural and tribal communities",
    "Empower women through skill development, microfinance, and entrepreneurship support",
    "Promote sustainable rural development through water, sanitation, and livelihood initiatives",
    "Support senior citizens with shelter, healthcare, and emotional well-being programs",
    "Respond swiftly to natural disasters with relief and rehabilitation efforts",
  ],
  history:
    "The Trust was formally registered on 14 August 2009 under the Bombay Public Trusts Act, 1950. What began with a single classroom of ten children has, over fifteen years, expanded into 24 active project sites across three Indian states. Our journey includes milestones such as the 2014 launch of the Mobile Medical Unit program, the 2018 establishment of the Women's Skill Centre in Pune, and the 2022 introduction of digital learning labs in rural schools. Each phase of growth has been guided by community needs and a commitment to measurable, transparent outcomes.",
  legalInfo:
    "BHARATI BANERJEE MEMORIAL WELFARE TRUST is registered under the Bombay Public Trusts Act, 1950 (Registration No. REG/2009/0447/MUM) and under Section 12A of the Income Tax Act, 1961. Donations are exempt under Section 80G of the Income Tax Act. The Trust is also registered under Section 11 and accredited by Guidestar India (Platinum level) and Credibility Alliance.",
};

export const TRUSTEES: Trustee[] = [
  { id: "T1", name: "Dr. Rajesh Mehta", role: "Founder & Chairman", photo: avatar("Rajesh Mehta"), bio: "Renowned educationist with 30+ years of experience in community education." },
  { id: "T2", name: "Mrs. Sunita Patil", role: "Vice Chairperson", photo: avatar("Sunita Patil"), bio: "Social worker specializing in women empowerment and rural development." },
  { id: "T3", name: "Dr. Anil Kumar", role: "Secretary", photo: avatar("Anil Kumar"), bio: "Public health expert guiding our healthcare initiatives." },
  { id: "T4", name: "Mrs. Kavita Shah", role: "Treasurer", photo: avatar("Kavita Shah"), bio: "Chartered Accountant overseeing financial governance and compliance." },
  { id: "T5", name: "Mr. Ramesh Iyer", role: "Trustee", photo: avatar("Ramesh Iyer"), bio: "CSR consultant and corporate partnership advisor." },
  { id: "T6", name: "Dr. Meena Desai", role: "Trustee", photo: avatar("Meena Desai"), bio: "Pediatrician championing child welfare programs." },
];

export const ADVISORY_MEMBERS: Trustee[] = [
  { id: "A1", name: "Justice (Retd.) S. Bhattacharya", role: "Legal Advisor", photo: avatar("SB"), bio: "Former High Court judge providing pro-bono legal counsel." },
  { id: "A2", name: "Prof. Vivek Rao", role: "Education Advisor", photo: avatar("VR"), bio: "Dean at TIFR, guiding curriculum and pedagogy." },
  { id: "A3", name: "Dr. Priya Nair", role: "Health Advisor", photo: avatar("PN"), bio: "Public health policy specialist from AIIMS." },
  { id: "A4", name: "Mr. Arjun Singh", role: "Finance Advisor", photo: avatar("AS"), bio: "Ex-Managing Director of a leading microfinance institution." },
];

export const ACTIVITIES: Activity[] = [
  { id: "ACT-001", name: "Free Tuition Centre — Dharavi", category: "Education", date: "2026-09-15", location: "Dharavi, Mumbai", description: "After-school tuition support for 120 children from classes 5 to 10 across three batches.", objectives: "Improve academic performance and reduce school dropout rate", beneficiaries: 120, status: "Ongoing", impact: "85% students showed grade improvement in last assessment", cover: photo(1) },
  { id: "ACT-002", name: "Mobile Medical Camp — Palghar", category: "Healthcare", date: "2026-09-12", location: "Palghar District", description: "Free primary health checkup and medicine distribution in tribal villages.", objectives: "Provide accessible healthcare in remote areas", beneficiaries: 540, status: "Completed", impact: "Treated 540 patients; identified 42 cases needing further intervention", cover: photo(2) },
  { id: "ACT-003", name: "Tailoring Training for Women", category: "Women Empowerment", date: "2026-09-10", location: "Pune", description: "Six-month vocational training program with placement assistance.", objectives: "Enable financial independence through skill development", beneficiaries: 35, status: "Ongoing", impact: "28 women have started earning within 3 months of completion", cover: photo(3) },
  { id: "ACT-004", name: "Rural Drinking Water Project", category: "Rural Development", date: "2026-08-20", location: "Jalgaon District", description: "Installed 12 hand-pumps and one RO purification unit across five villages.", objectives: "Provide safe and accessible drinking water", beneficiaries: 2400, status: "Completed", impact: "Reduced water-borne disease incidence by 62%", cover: photo(4) },
  { id: "ACT-005", name: "Mid-day Meal Support Program", category: "Child Welfare", date: "2026-09-01", location: "Rajasthan", description: "Daily nutritious meals to 850 children across 14 government schools.", objectives: "Improve nutrition and school attendance", beneficiaries: 850, status: "Ongoing", impact: "School attendance improved from 71% to 89%", cover: photo(5) },
  { id: "ACT-006", name: "Elderly Care Home — Lonavala", category: "Senior Citizen Welfare", date: "2026-07-15", location: "Lonavala", description: "Residential care facility for 40 abandoned seniors with medical support.", objectives: "Provide dignified shelter and care to senior citizens", beneficiaries: 40, status: "Ongoing", impact: "Reunited 8 seniors with families in last year", cover: photo(6) },
  { id: "ACT-007", name: "Digital Literacy Workshop", category: "Skill Development", date: "2026-09-05", location: "Nashik", description: "Weekend workshops on basic computer skills and internet safety.", objectives: "Bridge digital divide in rural youth", beneficiaries: 75, status: "Ongoing", impact: "32 participants secured jobs requiring basic digital skills", cover: photo(7) },
  { id: "ACT-008", name: "Tree Plantation Drive", category: "Environment", date: "2026-08-15", location: "Multiple Locations", description: "Planted 5,000 native trees with community participation.", objectives: "Increase green cover and combat climate change", beneficiaries: 0, status: "Completed", impact: "78% sapling survival rate as of latest audit", cover: photo(8) },
  { id: "ACT-009", name: "Flood Relief — Assam", category: "Disaster Relief", date: "2026-07-20", location: "Guwahati, Assam", description: "Distributed food kits, clean water, and temporary shelter materials.", objectives: "Provide immediate relief to flood-affected families", beneficiaries: 1200, status: "Completed", impact: "Supported 1,200 families during critical 14-day period", cover: photo(9) },
  { id: "ACT-010", name: "Community Library — Slum Cluster", category: "Community Development", date: "2026-09-08", location: "Bhiwandi", description: "Established a community library with 3,000 books and reading sessions.", objectives: "Promote reading culture among children and youth", beneficiaries: 220, status: "Ongoing", impact: "65 active members; average 18 daily visitors", cover: photo(10) },
];

export const BENEFICIARIES: Beneficiary[] = [
  { id: "BEN-001", name: "Aarav Sharma", age: 12, gender: "Male", address: "Dharavi, Mumbai", contact: "+91 98XXX XX123", category: "Education", assistance: "Education scholarship", assistanceDate: "2026-06-15", project: "Free Tuition Centre", status: "Active" },
  { id: "BEN-002", name: "Priya Yadav", age: 28, gender: "Female", address: "Palghar", contact: "+91 98XXX XX234", category: "Healthcare", assistance: "Free surgery", assistanceDate: "2026-08-22", project: "Mobile Medical Camp", status: "Completed" },
  { id: "BEN-003", name: "Lakshmi Devi", age: 35, gender: "Female", address: "Pune", contact: "+91 98XXX XX345", category: "Women Empowerment", assistance: "Tailoring training + sewing machine", assistanceDate: "2026-03-10", project: "Tailoring Training", status: "Completed" },
  { id: "BEN-004", name: "Mohammed Irfan", age: 45, gender: "Male", address: "Jalgaon", contact: "+91 98XXX XX456", category: "Rural Development", assistance: "Water connection at home", assistanceDate: "2026-08-20", project: "Drinking Water Project", status: "Completed" },
  { id: "BEN-005", name: "Sneha Patil", age: 9, gender: "Female", address: "Rajasthan", contact: "+91 98XXX XX567", category: "Child Welfare", assistance: "Mid-day meal support", assistanceDate: "2026-09-01", project: "Mid-day Meal Program", status: "Active" },
  { id: "BEN-006", name: "Ramesh Kulkarni", age: 72, gender: "Male", address: "Lonavala", contact: "+91 98XXX XX678", category: "Senior Citizen Welfare", assistance: "Residential care", assistanceDate: "2026-04-15", project: "Elderly Care Home", status: "Active" },
  { id: "BEN-007", name: "Anita Pawar", age: 22, gender: "Female", address: "Nashik", contact: "+91 98XXX XX789", category: "Skill Development", assistance: "Digital training + job placement", assistanceDate: "2026-05-20", project: "Digital Literacy Workshop", status: "Completed" },
  { id: "BEN-008", name: "Babulal Meena", age: 50, gender: "Male", address: "Assam", contact: "+91 98XXX XX890", category: "Disaster Relief", assistance: "Relief kit + temporary shelter", assistanceDate: "2026-07-21", project: "Flood Relief", status: "Follow-up" },
  { id: "BEN-009", name: "Fatima Sheikh", age: 14, gender: "Female", address: "Bhiwandi", contact: "+91 98XXX XX901", category: "Community Development", assistance: "Library membership", assistanceDate: "2026-09-08", project: "Community Library", status: "Active" },
  { id: "BEN-010", name: "Karan Verma", age: 16, gender: "Male", address: "Mumbai", contact: "+91 98XXX XX012", category: "Education", assistance: "Scholarship for higher studies", assistanceDate: "2026-06-30", project: "Free Tuition Centre", status: "Active" },
];

export const DONATIONS: Donation[] = [
  { id: "DON-001", donor: "Rohit Sharma", mobile: "+91 98XXX XX111", email: "rohit.s@example.com", amount: 5000, purpose: "General Donation", campaign: "Education for 100 Children", paymentMethod: "UPI", status: "Successful", date: "2026-09-22", txnId: "UPI987654321", anonymous: false },
  { id: "DON-002", donor: "Anonymous Donor", mobile: "—", email: "—", amount: 25000, purpose: "Campaign Contribution", campaign: "Mobile Medical Unit", paymentMethod: "Card", status: "Successful", date: "2026-09-21", txnId: "CARD123456789", anonymous: true },
  { id: "DON-003", donor: "Tata Consultancy Services", mobile: "+91 22XXXX XXX1", email: "csr@tcs.com", amount: 500000, purpose: "CSR Contribution", campaign: "Digital Literacy Program", paymentMethod: "Net Banking", status: "Successful", date: "2026-09-20", txnId: "NB987654321", anonymous: false },
  { id: "DON-004", donor: "Meera Joshi", mobile: "+91 98XXX XX222", email: "meera.j@example.com", amount: 1100, purpose: "General Donation", campaign: "—", paymentMethod: "UPI", status: "Pending", date: "2026-09-22", txnId: "UPI987654322", anonymous: false },
  { id: "DON-005", donor: "Sandeep Gupta", mobile: "+91 98XXX XX333", email: "sandeep.g@example.com", amount: 50000, purpose: "Sponsorship", campaign: "Sponsor a Child", paymentMethod: "Card", status: "Successful", date: "2026-09-19", txnId: "CARD123456790", anonymous: false },
  { id: "DON-006", donor: "Priyanka Reddy", mobile: "+91 98XXX XX444", email: "priyanka.r@example.com", amount: 2100, purpose: "General Donation", campaign: "—", paymentMethod: "UPI", status: "Failed", date: "2026-09-22", txnId: "UPI987654323", anonymous: false },
  { id: "DON-007", donor: "Infosys Foundation", mobile: "+91 80XXXX XXX2", email: "foundation@infosys.com", amount: 1000000, purpose: "Grant", campaign: "Mid-day Meal Program", paymentMethod: "Net Banking", status: "Successful", date: "2026-09-18", txnId: "NB987654324", anonymous: false },
  { id: "DON-008", donor: "Vikram Singh", mobile: "+91 98XXX XX555", email: "vikram.s@example.com", amount: 15000, purpose: "Campaign Contribution", campaign: "Flood Relief Assam", paymentMethod: "UPI", status: "Successful", date: "2026-09-17", txnId: "UPI987654325", anonymous: false },
  { id: "DON-009", donor: "Anjali Mehta", mobile: "+91 98XXX XX666", email: "anjali.m@example.com", amount: 5100, purpose: "General Donation", campaign: "—", paymentMethod: "Card", status: "Successful", date: "2026-09-16", txnId: "CARD123456791", anonymous: false },
  { id: "DON-010", donor: "Reliance Foundation", mobile: "+91 22XXXX XXX3", email: "csr@reliance.com", amount: 750000, purpose: "CSR Contribution", campaign: "Tree Plantation Drive", paymentMethod: "Net Banking", status: "Successful", date: "2026-09-15", txnId: "NB987654326", anonymous: false },
];

export const CAMPAIGNS: Campaign[] = [
  { id: "CMP-001", title: "Support Education for 100 Underprivileged Children", description: "Help us provide a year of free tuition, books, and meals to 100 children from Mumbai slums.", objective: "Raise ₹15,00,000 to support 100 children for one academic year", targetAmount: 1500000, collectedAmount: 980000, beneficiaries: 100, startDate: "2026-07-01", endDate: "2026-12-31", status: "Active", cover: photo(11), category: "Education" },
  { id: "CMP-002", title: "Mobile Medical Unit for Tribal Areas", description: "Fund a fully-equipped mobile medical van to serve 50 remote tribal villages.", objective: "Raise ₹25,00,000 to purchase and operate a medical van for one year", targetAmount: 2500000, collectedAmount: 1850000, beneficiaries: 5000, startDate: "2026-06-15", endDate: "2026-11-30", status: "Active", cover: photo(12), category: "Healthcare" },
  { id: "CMP-003", title: "Skill Training for 200 Women", description: "Empower 200 women with tailoring, beauty, and digital skills for self-employment.", objective: "Raise ₹10,00,000 to train and place 200 women", targetAmount: 1000000, collectedAmount: 1000000, beneficiaries: 200, startDate: "2026-01-15", endDate: "2026-06-30", status: "Completed", cover: photo(13), category: "Women Empowerment" },
  { id: "CMP-004", title: "Clean Water for 5 Villages", description: "Install hand-pumps and RO systems to provide safe drinking water.", objective: "Raise ₹8,00,000 for water infrastructure in 5 villages", targetAmount: 800000, collectedAmount: 720000, beneficiaries: 2400, startDate: "2026-08-01", endDate: "2026-10-31", status: "Active", cover: photo(14), category: "Rural Development" },
  { id: "CMP-005", title: "Flood Relief — Assam 2026", description: "Emergency relief for families affected by the 2026 Assam floods.", objective: "Raise ₹50,00,000 for relief and rehabilitation", targetAmount: 5000000, collectedAmount: 4200000, beneficiaries: 1200, startDate: "2026-07-20", endDate: "2026-09-30", status: "Active", cover: photo(15), category: "Disaster Relief" },
  { id: "CMP-006", title: "Winter Warmth — Senior Citizens", description: "Distribute blankets, warm clothing, and medical kits to elderly in need.", objective: "Raise ₹5,00,000 to support 1,000 senior citizens", targetAmount: 500000, collectedAmount: 180000, beneficiaries: 1000, startDate: "2026-10-01", endDate: "2027-01-31", status: "Upcoming", cover: photo(16), category: "Senior Citizen Welfare" },
];

export const SPONSORSHIPS: Sponsorship[] = [
  { id: "SPN-001", sponsorName: "Sandeep Gupta", type: "Child", amount: 12000, duration: "12 months", startDate: "2026-01-15", beneficiary: "Aarav Sharma (BEN-001)", status: "Active", nextPayment: "2026-10-15" },
  { id: "SPN-002", sponsorName: "Meera Foundation", type: "Education", amount: 500000, duration: "24 months", startDate: "2025-09-01", beneficiary: "Tuition Centre — Dharavi", status: "Active", nextPayment: "2026-10-01" },
  { id: "SPN-003", sponsorName: "Anand Bhatia", type: "Food", amount: 6000, duration: "12 months", startDate: "2026-04-01", beneficiary: "Mid-day Meal — 5 children", status: "Active", nextPayment: "2026-10-01" },
  { id: "SPN-004", sponsorName: "Lakshmi Trust", type: "Medical", amount: 25000, duration: "6 months", startDate: "2026-06-15", beneficiary: "Priya Yadav (BEN-002)", status: "Active", nextPayment: "2026-10-15" },
  { id: "SPN-005", sponsorName: "Tech Mahindra", type: "Event", amount: 200000, duration: "One-time", startDate: "2026-09-01", beneficiary: "Annual Day 2026", status: "Completed", nextPayment: "—" },
  { id: "SPN-006", sponsorName: "Indira Charities", type: "Equipment", amount: 150000, duration: "One-time", startDate: "2026-08-10", beneficiary: "Sewing machines (10 units)", status: "Completed", nextPayment: "—" },
  { id: "SPN-007", sponsorName: "Suresh Malhotra", type: "Monthly Support", amount: 5000, duration: "12 months", startDate: "2026-05-01", beneficiary: "General — Elderly Care", status: "Active", nextPayment: "2026-10-01" },
];

export const VOLUNTEERS: Volunteer[] = [
  { id: "VOL-001", name: "Nikhil Rao", mobile: "+91 98XXX XX001", email: "nikhil.r@example.com", location: "Mumbai", occupation: "Software Engineer", skills: ["Teaching", "Event Management"], interests: ["Education", "Child Welfare"], availability: "Weekends", status: "Active", joinedDate: "2026-01-15", activitiesCount: 12 },
  { id: "VOL-002", name: "Pooja Deshmukh", mobile: "+91 98XXX XX002", email: "pooja.d@example.com", location: "Pune", occupation: "Doctor", skills: ["Medical", "First Aid"], interests: ["Healthcare"], availability: "1 week/month", status: "Active", joinedDate: "2026-02-20", activitiesCount: 8 },
  { id: "VOL-003", name: "Arjun Nair", mobile: "+91 98XXX XX003", email: "arjun.n@example.com", location: "Mumbai", occupation: "Student", skills: ["Photography", "Content Writing"], interests: ["Media", "Event"], availability: "Weekends", status: "Active", joinedDate: "2026-03-10", activitiesCount: 15 },
  { id: "VOL-004", name: "Deepika Reddy", mobile: "+91 98XXX XX004", email: "deepika.r@example.com", location: "Hyderabad", occupation: "HR Manager", skills: ["Coordination", "Training"], interests: ["Women Empowerment", "Skill Development"], availability: "Flexible", status: "Active", joinedDate: "2025-11-05", activitiesCount: 22 },
  { id: "VOL-005", name: "Sahil Khan", mobile: "+91 98XXX XX005", email: "sahil.k@example.com", location: "Nashik", occupation: "Architect", skills: ["Project Planning", "Survey"], interests: ["Rural Development"], availability: "Weekends", status: "Pending", joinedDate: "2026-09-18", activitiesCount: 0 },
  { id: "VOL-006", name: "Riya Kapoor", mobile: "+91 98XXX XX006", email: "riya.k@example.com", location: "Mumbai", occupation: "Designer", skills: ["Design", "Social Media"], interests: ["Media", "Education"], availability: "Flexible", status: "Active", joinedDate: "2026-04-12", activitiesCount: 9 },
  { id: "VOL-007", name: "Aditya Verma", mobile: "+91 98XXX XX007", email: "aditya.v@example.com", location: "Pune", occupation: "Chartered Accountant", skills: ["Finance", "Audit"], interests: ["Transparency"], availability: "Monthly", status: "Inactive", joinedDate: "2025-08-15", activitiesCount: 4 },
  { id: "VOL-008", name: "Sneha Iyer", mobile: "+91 98XXX XX008", email: "sneha.i@example.com", location: "Mumbai", occupation: "Teacher", skills: ["Teaching", "Curriculum Design"], interests: ["Education", "Child Welfare"], availability: "Weekends", status: "Active", joinedDate: "2026-05-22", activitiesCount: 6 },
];

export const EVENTS: EventItem[] = [
  { id: "EVT-001", title: "Annual Charity Gala 2026", date: "2026-10-25", time: "6:30 PM", venue: "Taj Lands End, Mumbai", description: "Annual fundraising gala featuring performances, awards, and dinner.", participantLimit: 300, registered: 247, status: "Upcoming", cover: photo(17) },
  { id: "EVT-002", title: "Health Awareness Walk", date: "2026-10-02", time: "7:00 AM", venue: "Marine Drive, Mumbai", description: "5 km walkathon to raise awareness about preventive healthcare.", participantLimit: 500, registered: 312, status: "Upcoming", cover: photo(18) },
  { id: "EVT-003", title: "Teacher Training Workshop", date: "2026-09-28", time: "10:00 AM", venue: "Trust Office, Pune", description: "Capacity building workshop for volunteer teachers.", participantLimit: 40, registered: 38, status: "Upcoming", cover: photo(19) },
  { id: "EVT-004", title: "Independence Day Celebration", date: "2026-08-15", time: "8:00 AM", venue: "All Centres", description: "Flag hoisting and cultural programs across all project sites.", participantLimit: 1000, registered: 850, status: "Completed", cover: photo(20) },
  { id: "EVT-005", title: "Women's Day Special", date: "2026-03-08", time: "11:00 AM", venue: "Skill Centre, Pune", description: "Celebration of women achievers and skill showcase.", participantLimit: 100, registered: 95, status: "Completed", cover: photo(21) },
];

export const ENQUIRIES: Enquiry[] = [
  { id: "ENQ-001", name: "Karthik Menon", email: "karthik.m@example.com", mobile: "+91 98XXX XX101", category: "Donation", subject: "Tax exemption certificate query", message: "I want to donate ₹50,000. Will I get 80G certificate?", status: "Resolved", date: "2026-09-20", assignedTo: "Kavita Shah" },
  { id: "ENQ-002", name: "Sarla Devi", email: "sarla.d@example.com", mobile: "+91 98XXX XX102", category: "Volunteer", subject: "Weekend teaching opportunity", message: "I am a retired teacher. Can I volunteer on weekends?", status: "In Progress", date: "2026-09-21", assignedTo: "Deepika Reddy" },
  { id: "ENQ-003", name: "HDFC Bank CSR Team", email: "csr@hdfcbank.com", mobile: "+91 22XXXX XXX5", category: "CSR", subject: "CSR partnership proposal", message: "Interested in funding healthcare program for FY 2026-27.", status: "New", date: "2026-09-22", assignedTo: "Ramesh Iyer" },
  { id: "ENQ-004", name: "Vivek Anand", email: "vivek.a@example.com", mobile: "+91 98XXX XX103", category: "Sponsorship", subject: "Sponsor 5 children", message: "Want to sponsor education of 5 children for one year.", status: "In Progress", date: "2026-09-19", assignedTo: "Kavita Shah" },
  { id: "ENQ-005", name: "City Press Reporter", email: "press@citypress.in", mobile: "+91 22XXXX XXX6", category: "Media", subject: "Interview request with Chairman", message: "Requesting 30 min interview for upcoming story on NGOs.", status: "New", date: "2026-09-22", assignedTo: "Arjun Nair" },
  { id: "ENQ-006", name: "Anita Foundation", email: "contact@anitafoundation.org", mobile: "+91 11XXXX XXX7", category: "Partnership", subject: "Joint program proposal", message: "Looking to partner for senior citizen welfare.", status: "In Progress", date: "2026-09-18", assignedTo: "Ramesh Iyer" },
  { id: "ENQ-007", name: "Mahesh Joshi", email: "mahesh.j@example.com", mobile: "+91 98XXX XX104", category: "General", subject: "Visit to trust office", message: "Can I visit your Mumbai office next week?", status: "Closed", date: "2026-09-15", assignedTo: "Kavita Shah" },
];

export const CSR_PARTNERS: CSRPartner[] = [
  { id: "CSR-001", companyName: "Tata Consultancy Services", contactPerson: "Rajesh Krishnan", email: "csr@tcs.com", mobile: "+91 22XXXX XXX1", csrInterest: "Education, Skill Development", proposedContribution: 500000, location: "Mumbai", projectInterest: "Digital Literacy Program", status: "Active", date: "2026-09-20" },
  { id: "CSR-002", companyName: "Infosys Foundation", contactPerson: "Lakshmi Iyer", email: "foundation@infosys.com", mobile: "+91 80XXXX XXX2", csrInterest: "Education, Healthcare", proposedContribution: 1000000, location: "Bengaluru", projectInterest: "Mid-day Meal Program", status: "Active", date: "2026-09-18" },
  { id: "CSR-003", companyName: "Reliance Foundation", contactPerson: "Nita Ambani Office", email: "csr@reliance.com", mobile: "+91 22XXXX XXX3", csrInterest: "Environment, Rural Development", proposedContribution: 750000, location: "Mumbai", projectInterest: "Tree Plantation Drive", status: "Active", date: "2026-09-15" },
  { id: "CSR-004", companyName: "HDFC Bank", contactPerson: "CSR Cell", email: "csr@hdfcbank.com", mobile: "+91 22XXXX XXX5", csrInterest: "Healthcare", proposedContribution: 600000, location: "Mumbai", projectInterest: "Mobile Medical Unit", status: "In Discussion", date: "2026-09-22" },
  { id: "CSR-005", companyName: "Mahindra Group", contactPerson: "Anand Mahindra Office", email: "csr@mahindra.com", mobile: "+91 22XXXX XXX8", csrInterest: "Skill Development, Women Empowerment", proposedContribution: 450000, location: "Mumbai", projectInterest: "Tailoring Training", status: "Approved", date: "2026-09-12" },
  { id: "CSR-006", companyName: "Aditya Birla Foundation", contactPerson: "CSR Team", email: "csr@adityabirla.com", mobile: "+91 22XXXX XXX9", csrInterest: "Education", proposedContribution: 800000, location: "Mumbai", projectInterest: "Free Tuition Centres", status: "New", date: "2026-09-22" },
];

export const GRANTS: Grant[] = [
  { id: "GRN-001", name: "Education Infrastructure Grant", fundingOrganisation: "Infosys Foundation", project: "Digital Learning Labs", sanctionedAmount: 2500000, receivedAmount: 2500000, utilisedAmount: 1850000, startDate: "2026-01-15", endDate: "2026-12-31", status: "Active" },
  { id: "GRN-002", name: "Healthcare Outreach Grant", fundingOrganisation: "Bill & Melinda Gates Foundation", project: "Mobile Medical Unit", sanctionedAmount: 5000000, receivedAmount: 3500000, utilisedAmount: 2100000, startDate: "2026-04-01", endDate: "2027-03-31", status: "Active" },
  { id: "GRN-003", name: "Rural Water Supply Grant", fundingOrganisation: "Government of Maharashtra", project: "Drinking Water Project", sanctionedAmount: 1500000, receivedAmount: 1500000, utilisedAmount: 1500000, startDate: "2026-05-01", endDate: "2026-08-31", status: "Completed" },
  { id: "GRN-004", name: "Women Empowerment Grant", fundingOrganisation: "UN Women India", project: "Skill Training Program", sanctionedAmount: 1800000, receivedAmount: 900000, utilisedAmount: 0, startDate: "2026-10-01", endDate: "2027-09-30", status: "Pending" },
  { id: "GRN-005", name: "Disaster Relief Grant", fundingOrganisation: "PM Relief Fund", project: "Assam Flood Relief", sanctionedAmount: 3000000, receivedAmount: 3000000, utilisedAmount: 2750000, startDate: "2026-07-25", endDate: "2026-09-30", status: "Active" },
];

export const EXPENSES: Expense[] = [
  { id: "EXP-001", date: "2026-09-22", category: "Education Materials", amount: 45000, project: "Free Tuition Centre", fundingSource: "General Donation", vendor: "Stationery Hub", remarks: "Books and notebooks for new batch" },
  { id: "EXP-002", date: "2026-09-20", category: "Medical Supplies", amount: 85000, project: "Mobile Medical Camp", fundingSource: "Mobile Medical Unit Campaign", vendor: "MediSource Ltd", remarks: "Medicine stock for next 3 camps" },
  { id: "EXP-003", date: "2026-09-18", category: "Equipment", amount: 120000, project: "Tailoring Training", fundingSource: "Mahindra CSR", vendor: "Singer India", remarks: "10 sewing machines" },
  { id: "EXP-004", date: "2026-09-15", category: "Infrastructure", amount: 350000, project: "Drinking Water Project", fundingSource: "Government Grant", vendor: "AquaPure Systems", remarks: "RO purification unit installation" },
  { id: "EXP-005", date: "2026-09-12", category: "Food", amount: 92000, project: "Mid-day Meal Program", fundingSource: "Infosys Grant", vendor: "Annapurna Caterers", remarks: "Monthly meal supply" },
  { id: "EXP-006", date: "2026-09-10", category: "Relief Material", amount: 480000, project: "Assam Flood Relief", fundingSource: "PM Relief Fund", vendor: "Multiple vendors", remarks: "Food kits and shelter materials" },
  { id: "EXP-007", date: "2026-09-08", category: "Administrative", amount: 35000, project: "General", fundingSource: "General Donation", vendor: "Various", remarks: "Office rent and utilities" },
  { id: "EXP-008", date: "2026-09-05", category: "Travel", amount: 28000, project: "Mobile Medical Camp", fundingSource: "Mobile Medical Unit Campaign", vendor: "Travel Desk", remarks: "Volunteer travel to Palghar" },
];

export const NEWS_ITEMS: NewsItem[] = [
  { id: "NWS-001", title: "Trust awarded Guidestar Platinum transparency rating", category: "Achievement", date: "2026-09-20", excerpt: "BHARATI BANERJEE MEMORIAL WELFARE TRUST received the highest transparency rating from Guidestar India for the third consecutive year.", content: "This recognition reflects our continued commitment to transparency, accountability, and good governance. The Platinum rating is awarded to NGOs that publish comprehensive information about their operations, finances, and impact.", cover: photo(22), author: "Communications Team" },
  { id: "NWS-002", title: "Mobile Medical Unit completes 100 camps", category: "Achievement", date: "2026-09-15", excerpt: "Our flagship healthcare program reached a milestone of 100 medical camps across tribal Maharashtra.", content: "Since its launch in 2014, the Mobile Medical Unit has provided free primary healthcare to over 38,000 patients in remote tribal regions. The 100th camp was held at Palghar on September 12, 2026.", cover: photo(23), author: "Dr. Anil Kumar" },
  { id: "NWS-003", title: "Annual Report 2025-26 now available", category: "Announcement", date: "2026-09-10", excerpt: "We have published our annual report detailing all activities, financials, and impact metrics.", content: "The 2025-26 Annual Report includes a comprehensive review of our programs, audited financial statements, beneficiary stories, and future plans. Download the report from the Transparency section.", cover: photo(24), author: "Mrs. Kavita Shah" },
  { id: "NWS-004", title: "Partnership with TCS for digital literacy", category: "Press Release", date: "2026-09-05", excerpt: "TCS has committed ₹5 lakh to expand our digital literacy workshops in rural Maharashtra.", content: "The partnership will enable us to train an additional 500 rural youth in basic computer skills and internet safety over the next 12 months.", cover: photo(25), author: "Mr. Ramesh Iyer" },
  { id: "NWS-005", title: "Independence Day celebrated across all centres", category: "News", date: "2026-08-15", excerpt: "Children, volunteers, and staff celebrated with flag hoisting and cultural programs.", content: "All 24 centres hosted Independence Day celebrations with flag hoisting, cultural performances, and community gatherings. Over 850 people participated across locations.", cover: photo(26), author: "Communications Team" },
  { id: "NWS-006", title: "Important: Office closed for Ganesh Chaturthi", category: "Notice", date: "2026-09-06", excerpt: "Trust office will remain closed from September 7-9 for Ganesh Chaturthi.", content: "All administrative operations will resume on September 10, 2026. Emergency contact for ongoing programs: +91 98765 43210.", cover: photo(27), author: "Administration" },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  { id: "GAL-001", title: "Independence Day 2026", type: "Photo", category: "Event", date: "2026-08-15", url: photo(30), caption: "Children performing at the Independence Day celebration" },
  { id: "GAL-002", title: "Medical Camp — Palghar", type: "Photo", category: "Activity", date: "2026-09-12", url: photo(31), caption: "Patients being examined at mobile medical camp" },
  { id: "GAL-003", title: "Women's Skill Showcase", type: "Photo", category: "Activity", date: "2026-08-30", url: photo(32), caption: "Tailoring training graduates with their certificates" },
  { id: "GAL-004", title: "Tree Plantation Drive", type: "Photo", category: "Activity", date: "2026-08-15", url: photo(33), caption: "Volunteers planting saplings" },
  { id: "GAL-005", title: "Annual Day 2025 Highlights", type: "Video", category: "Event", date: "2025-12-15", url: "https://www.youtube.com/embed/dQw4w9WgXcQ", caption: "Highlights from Annual Day 2025" },
  { id: "GAL-006", title: "Flood Relief Assam", type: "Photo", category: "Activity", date: "2026-07-22", url: photo(34), caption: "Distribution of relief kits in Assam" },
  { id: "GAL-007", title: "Library Opening", type: "Photo", category: "Activity", date: "2026-09-08", url: photo(35), caption: "Community library inauguration at Bhiwandi" },
  { id: "GAL-008", title: "Health Awareness Walk 2025", type: "Video", category: "Event", date: "2025-10-02", url: "https://www.youtube.com/embed/dQw4w9WgXcQ", caption: "Recap of 2025 walkathon" },
  { id: "GAL-009", title: "Children's Day Celebration", type: "Photo", category: "Event", date: "2025-11-14", url: photo(36), caption: "Children enjoying activities on Children's Day" },
  { id: "GAL-010", title: "Senior Citizens Picnic", type: "Photo", category: "Activity", date: "2026-02-20", url: photo(37), caption: "Elderly care home residents on a picnic" },
];

export const DOCUMENTS: DocumentItem[] = [
  { id: "DOC-001", name: "Trust Registration Certificate", category: "Registration Documents", date: "2009-08-14", version: "1.0", visibility: "Public", size: "2.4 MB" },
  { id: "DOC-002", name: "Trust Deed", category: "Trust Deed", date: "2009-08-14", version: "1.0", visibility: "Public", size: "5.1 MB" },
  { id: "DOC-003", name: "12A Tax Exemption Certificate", category: "Certificates", date: "2010-03-22", version: "1.0", visibility: "Public", size: "1.8 MB" },
  { id: "DOC-004", name: "80G Approval Letter", category: "Certificates", date: "2010-03-22", version: "1.0", visibility: "Public", size: "1.5 MB" },
  { id: "DOC-005", name: "Annual Report 2025-26", category: "Annual Reports", date: "2026-09-10", version: "1.0", visibility: "Public", size: "8.2 MB" },
  { id: "DOC-006", name: "Audited Financials FY 2024-25", category: "Audit Reports", date: "2025-09-15", version: "1.0", visibility: "Public", size: "4.6 MB" },
  { id: "DOC-007", name: "Activity Report Q2 2026", category: "Activity Reports", date: "2026-07-05", version: "1.0", visibility: "Public", size: "3.2 MB" },
  { id: "DOC-008", name: "CSR Policy", category: "Policies", date: "2024-04-01", version: "2.0", visibility: "Public", size: "1.2 MB" },
  { id: "DOC-009", name: "Child Protection Policy", category: "Policies", date: "2023-06-15", version: "1.0", visibility: "Public", size: "0.9 MB" },
  { id: "DOC-010", name: "Internal HR Manual", category: "Policies", date: "2025-01-10", version: "3.1", visibility: "Admin Only", size: "2.8 MB" },
  { id: "DOC-011", name: "Govt. Recognition Letter", category: "Government Correspondence", date: "2024-11-20", version: "1.0", visibility: "Public", size: "0.7 MB" },
  { id: "DOC-012", name: "UN Women Grant Agreement", category: "Grant Documents", date: "2026-09-15", version: "1.0", visibility: "Admin Only", size: "3.5 MB" },
];

export const CERTIFICATES: Certificate[] = [
  { id: "CERT-001", certificateNo: "TRUST/2026/000125", recipientName: "Nikhil Rao", recipientType: "Volunteer", issueDate: "2026-09-15", event: "Independence Day Celebration", verified: true },
  { id: "CERT-002", certificateNo: "TRUST/2026/000124", recipientName: "Sandeep Gupta", recipientType: "Sponsor", issueDate: "2026-09-14", event: "Child Sponsorship Program", verified: true },
  { id: "CERT-003", certificateNo: "TRUST/2026/000123", recipientName: "Pooja Deshmukh", recipientType: "Volunteer", issueDate: "2026-09-12", event: "Mobile Medical Camp — Palghar", verified: true },
  { id: "CERT-004", certificateNo: "TRUST/2026/000122", recipientName: "Tata Consultancy Services", recipientType: "Sponsor", issueDate: "2026-09-10", event: "Digital Literacy Program", verified: true },
  { id: "CERT-005", certificateNo: "TRUST/2026/000121", recipientName: "Arjun Nair", recipientType: "Volunteer", issueDate: "2026-09-05", event: "Photography Coverage", verified: true },
  { id: "CERT-006", certificateNo: "TRUST/2026/000120", recipientName: "Deepika Reddy", recipientType: "Volunteer", issueDate: "2026-08-30", event: "Women's Skill Training", verified: true },
  { id: "CERT-007", certificateNo: "TRUST/2026/000119", recipientName: "Anjali Mehta", recipientType: "Donor", issueDate: "2026-09-16", event: "Donation Acknowledgement", verified: true },
  { id: "CERT-008", certificateNo: "TRUST/2026/000118", recipientName: "Vikram Singh", recipientType: "Donor", issueDate: "2026-09-17", event: "Flood Relief Contribution", verified: false },
];

export const AUDIT_LOGS: AuditLog[] = [
  { id: "LOG-001", user: "Kavita Shah", action: "Updated", module: "Donations", details: "Modified donation record #DON-004", timestamp: "2026-09-23 11:42 AM", ip: "103.21.X.X" },
  { id: "LOG-002", user: "Ramesh Iyer", action: "Created", module: "CSR", details: "Added new CSR partner: Aditya Birla Foundation", timestamp: "2026-09-23 10:15 AM", ip: "103.21.X.X" },
  { id: "LOG-003", user: "Dr. Anil Kumar", action: "Created", module: "Activities", details: "Added new activity: Mobile Medical Camp — Palghar", timestamp: "2026-09-22 4:30 PM", ip: "49.36.X.X" },
  { id: "LOG-004", user: "Dr. Rajesh Mehta", action: "Login", module: "Auth", details: "Successful admin login", timestamp: "2026-09-22 9:00 AM", ip: "103.21.X.X" },
  { id: "LOG-005", user: "Sunita Patil", action: "Updated", module: "Beneficiaries", details: "Modified beneficiary record #BEN-005", timestamp: "2026-09-21 3:45 PM", ip: "106.51.X.X" },
  { id: "LOG-006", user: "Kavita Shah", action: "Exported", module: "Donations", details: "Exported donations report (CSV)", timestamp: "2026-09-21 2:20 PM", ip: "103.21.X.X" },
  { id: "LOG-007", user: "Deepika Reddy", action: "Approved", module: "Volunteers", details: "Approved volunteer application #VOL-006", timestamp: "2026-09-20 5:10 PM", ip: "157.32.X.X" },
  { id: "LOG-008", user: "Content Manager", action: "Published", module: "News", details: "Published news: Annual Report 2025-26 now available", timestamp: "2026-09-10 11:00 AM", ip: "103.21.X.X" },
];

export const USERS: UserAccount[] = [
  { id: "USR-001", name: "Dr. Rajesh Mehta", email: "rajesh@ananyaseva.org", role: "Super Admin", status: "Active", lastLogin: "2026-09-22 9:00 AM" },
  { id: "USR-002", name: "Mrs. Kavita Shah", email: "kavita@ananyaseva.org", role: "Trust Admin", status: "Active", lastLogin: "2026-09-23 11:42 AM" },
  { id: "USR-003", name: "Mr. Ramesh Iyer", email: "ramesh@ananyaseva.org", role: "Trust Admin", status: "Active", lastLogin: "2026-09-23 10:15 AM" },
  { id: "USR-004", name: "Dr. Anil Kumar", email: "anil@ananyaseva.org", role: "Project Manager", status: "Active", lastLogin: "2026-09-22 4:30 PM" },
  { id: "USR-005", name: "Mrs. Sunita Patil", email: "sunita@ananyaseva.org", role: "Project Manager", status: "Active", lastLogin: "2026-09-21 3:45 PM" },
  { id: "USR-006", name: "Deepika Reddy", email: "deepika@ananyaseva.org", role: "Volunteer Coordinator", status: "Active", lastLogin: "2026-09-20 5:10 PM" },
  { id: "USR-007", name: "Content Manager", email: "content@ananyaseva.org", role: "Content Manager", status: "Active", lastLogin: "2026-09-10 11:00 AM" },
  { id: "USR-008", name: "CA Accountant", email: "accounts@ananyaseva.org", role: "Accounts", status: "Active", lastLogin: "2026-09-21 5:00 PM" },
];

export const TESTIMONIALS: Testimonial[] = [
  { id: "T1", name: "Sneha Patil", role: "Beneficiary — Mid-day Meal Program", quote: "My daughter now eats a healthy meal at school every day. Her attendance and grades have improved so much. Thank you BHARATI BANERJEE MEMORIAL WELFARE TRUST!", rating: 5 },
  { id: "T2", name: "Lakshmi Devi", role: "Beneficiary — Tailoring Training", quote: "After my husband passed away, I had no income. The Trust trained me and gave me a sewing machine. Today I support my family independently.", rating: 5 },
  { id: "T3", name: "Sandeep Gupta", role: "Sponsor", quote: "The transparency and impact reports I receive are excellent. I can see exactly how my sponsorship is changing a child's life.", rating: 5 },
  { id: "T4", name: "Dr. Pooja Deshmukh", role: "Volunteer — Doctor", quote: "Volunteering with the medical camps has been the most fulfilling experience of my career. The team is professional and dedicated.", rating: 5 },
];

export const IMPACT_STATS = {
  beneficiaries: 124500,
  projects: 480,
  villages: 220,
  volunteers: 380,
  amountRaised: 18500000,
  yearsOfService: 16,
};

export const MONTHLY_DONATIONS = [
  { month: "Apr", amount: 850000 },
  { month: "May", amount: 1200000 },
  { month: "Jun", amount: 980000 },
  { month: "Jul", amount: 1850000 },
  { month: "Aug", amount: 1450000 },
  { month: "Sep", amount: 2100000 },
];

export const CATEGORY_DISTRIBUTION = [
  { name: "Education", value: 32, color: "oklch(0.55 0.14 165)" },
  { name: "Healthcare", value: 24, color: "oklch(0.70 0.15 75)" },
  { name: "Women Empowerment", value: 14, color: "oklch(0.60 0.18 30)" },
  { name: "Rural Development", value: 12, color: "oklch(0.65 0.12 200)" },
  { name: "Child Welfare", value: 10, color: "oklch(0.75 0.16 320)" },
  { name: "Other", value: 8, color: "oklch(0.50 0.10 150)" },
];

export const DONATION_SOURCES = [
  { source: "Individual Donors", amount: 6800000 },
  { source: "CSR Partners", amount: 8200000 },
  { source: "Grants", amount: 2900000 },
  { source: "Sponsorships", amount: 600000 },
];

export const UPCOMING_EVENTS_PUBLIC = EVENTS.filter((e) => e.status === "Upcoming").slice(0, 3);
export const LATEST_NEWS_PUBLIC = NEWS_ITEMS.slice(0, 4);
export const ACTIVE_CAMPAIGNS = CAMPAIGNS.filter((c) => c.status === "Active").slice(0, 3);
