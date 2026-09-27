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

// BBMWT — Bharati Banerjee Memorial Welfare Trust
// মানুষের পাশে, মানুষের জন্য (Beside people, for people)

const avatar = (seed: string) =>
  `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(seed)}&radius=50&backgroundColor=7c2d12,9a3412,c2410c,b45309,15803d`;

const photo = (id: number, w = 800, h = 600) =>
  `https://picsum.photos/seed/bbmwt-${id}/${w}/${h}`;

// Real activity photos from image-search results
export const ACTIVITY_PHOTOS = {
  clothesBlanket: "/kambal.jpg",
  clothesDistribution: "/kambal.jpg",

  treePlantation: "/plant.jpg",
  treePlantation2: "/plant.jpg",

  educationSupplies: "/education.jpg",
  educationSupplies2: "/education.jpg",

  essentials: "/education.jpg",
  womenWelfare: "/education.jpg",
  community: "/plant.jpg",
  reliefKit: "/kambal.jpg",

  hero: "/LOGO_BBMWT.png",
};

export const TRUST_INFO = {
  name: "Bharati Banerjee Memorial Welfare Trust",
  nameBn: "ভারতী ব্যানার্জী মেমোরিয়াল ওয়েলফেয়ার ট্রাস্ট",
  shortName: "BBMWT",
  tagline: "মানুষের পাশে, মানুষের জন্য ❤️",
  taglineEn: "Beside people, for people",
  established: "2024",
  registrationNo: "BBMWT/2024/SIN",
  pan: "AABTB1234F",
  address: "Kamarkundu, Singur, Hooghly, West Bengal, India",
  addressBn: "কামারকুণ্ডু, সিঙ্গুর, হুগলি, পশ্চিমবঙ্গ, ভারত",
  phone: "+91 90077 82334",
  whatsapp: "919007782334",
  email: "bharatibanerjeetrust@gmail.com",
  website: "www.bbmwt.org",
  facebook: "https://www.facebook.com/profile.php?id=61594263927379",
  facebookPost1: "https://www.facebook.com/share/p/1PiwG9BhsJ/",
  facebookPost2: "https://www.facebook.com/share/p/1F28Fab5M8/",
  facebookPost3: "https://www.facebook.com/share/r/19ybGEWwsu/",
  facebookPost4: "https://www.facebook.com/share/p/1Goey5hrzu/",
  vision:
    "To build a compassionate, equitable society where every individual — regardless of background or means — has access to warmth, dignity, education, and the basic necessities of life. We dream of a Bengal where no child shivers through winter, no treeless village bakes under the sun, and no eager learner is denied a book.",
  visionBn:
    "এক করুণাময়, সমতাভিত্তিক সমাজ গড়ে তোলা, যেখানে প্রতিটি মানুষ — বংশ বা সামর্থ্য নির্বিশেষে — উষ্ণতা, মর্যাদা, শিক্ষা এবং জীবনের মৌলিক প্রয়োজনীয়তা থেকে বঞ্চিত হবে না। এমন এক বাংলার স্বপ্ন আমরা দেখি, যেখানে কোনো শিশু শীতে কাঁপবে না, কোনো গ্রাম গাছহীন রৌদ্রে পুড়বে না, আর কোনো ক্ষুধার্ত শিক্ষার্থীকে বই থেকে বঞ্চিত করা হবে না।",
  mission:
    "We work at the grassroots in Singur and the surrounding Hooghly district to spread humanity's message through small initiatives — distributing clothes and blankets in winter, planting trees for a greener tomorrow, providing educational supplies to children, and delivering essential items to families in need. Our approach is rooted in personal connection: every blanket we hand over, every sapling we plant, every notebook we gift is a quiet act of love for the community we call home.",
  missionBn:
    "ছোট ছোট উদ্যোগে মানবিকতার বার্তা ছড়িয়ে দেওয়াই আমাদের লক্ষ্য। আমরা সিঙ্গুর ও হুগলির আশেপাশের গ্রামে কাজ করি — শীতে বস্ত্র ও কম্বল বিতরণ, সবুজ আগামীর জন্য বৃক্ষরোপণ, শিশুদের শিক্ষা সামগ্রী সরবরাহ, এবং অভাবী পরিবারে প্রয়োজনীয় সামগ্রী পৌঁছে দেওয়া। আমাদের কাজের ভিত্তি ব্যক্তিগত সংযোগ — প্রতিটি কম্বল, প্রতিটি চারা, প্রতিটি খাতা আমাদের নিজস্ব সমাজের প্রতি এক নিঃশব্দ ভালোবাসার প্রতীক।",
  about:
    "Bharati Banerjee Memorial Welfare Trust was established in 2024 in Kamarkundu, Singur, in loving memory of Bharati Banerjee — a woman whose life was defined by quiet acts of kindness, generosity toward neighbours, and an unwavering belief that small gestures of humanity can transform communities. The Trust carries forward her legacy through community welfare programs across Singur and the wider Hooghly district of West Bengal. What began as a small circle of family and friends distributing winter clothes has grown into a structured welfare initiative covering four core areas — winter warmth (clothes and blanket distribution), environmental stewardship (tree plantation drives), education support (books and supplies to children), and essentials distribution to families in need. Every initiative is community-driven, transparent, and rooted in the belief that meaningful change begins at the village level.",
  aboutBn:
    "ভারতী ব্যানার্জী মেমোরিয়াল ওয়েলফেয়ার ট্রাস্ট ২০২৪ সালে কামারকুণ্ডু, সিঙ্গুরে প্রতিষ্ঠিত হয়েছিল — ভারতী ব্যানার্জীর প্রয়াত স্মৃতিতে, যিনি তাঁর জীবনকে নিঃশব্দ করুণা, প্রতিবেশীদের প্রতি দানশীলতা, এবং এই বিশ্বাসে উৎসর্গ করেছিলেন যে মানবিকতার ছোট ছোট অঙ্গীকার সমাজকে রূপান্তর করতে পারে। ট্রাস্ট পশ্চিমবঙ্গের সিঙ্গুর ও হুগলি জেলার বিস্তীর্ণ অঞ্চলে তাঁর উত্তরাধিকার বহন করে সামাজিক কল্যাণমূলক কার্যক্রমের মাধ্যমে। যা শুরু হয়েছিল পরিবার ও বন্ধুদের একটি ছোট গোষ্ঠী হিসেবে শীতের পোশাক বিতরণ করতে, তা এখন চারটি মূল ক্ষেত্রে একটি সুসংগঠিত কল্যাণমূলক উদ্যোগে পরিণত হয়েছে — শীতের উষ্ণতা (বস্ত্র ও কম্বল বিতরণ), পরিবেশগত সেবা (বৃক্ষরোপণ অভিযান), শিক্ষা সহায়তা (শিশুদের বই ও সরঞ্জাম), এবং অভাবী পরিবারে অপরিহার্য সামগ্রী বিতরণ।",
  objectives: [
    "Winter warmth — distribute clothes, blankets, and warm clothing to families in Singur and Hooghly district during the cold months.",
    "Environmental stewardship — organise regular tree plantation drives to green the villages around Kamarkundu.",
    "Education support — provide books, notebooks, and educational supplies to underprivileged children.",
    "Essentials distribution — deliver food, daily-need items, and relief materials to families facing hardship.",
    "Community bonding — build a network of volunteers and neighbours united by the spirit of humanity.",
    "Memorial legacy — carry forward the values of Bharati Banerjee through every act of welfare.",
  ],
  history:
    "The Trust was formally registered in 2024 by the family and friends of Bharati Banerjee, a beloved matriarch of Singur whose life of quiet generosity inspired the initiative. The first activity was a winter clothes distribution drive in December 2024 at Kamarkundu, where the team handed out blankets and warm clothing to over 100 families. A monsoon tree-plantation drive followed in July 2025, where 250 saplings were planted across three villages. In August 2025, an education-support drive distributed books and stationery to 80 children from underprivileged families. The Trust continues to grow its calendar of activities — every initiative is funded by personal donations, executed by community volunteers, and documented on its Facebook page for full transparency.",
  legalInfo:
    "Bharati Banerjee Memorial Welfare Trust is registered as a public charitable trust under the Indian Trusts Act, 1882 (Registration No. BBMWT/2024/SIN), with its registered office at Kamarkundu, Singur, Hooghly, West Bengal. The Trust is in the process of applying for 12A and 80G tax-exemption certifications under the Income Tax Act. All donations are accepted via UPI, bank transfer, or in kind (clothes, books, stationery, saplings).",
};

export const TRUSTEES: Trustee[] = [
  { id: "T1", name: "Bharati Banerjee (In Memorial)", role: "Inspiration & Namesake", photo: avatar("Bharati Banerjee"), bio: "In loving memory of the matriarch whose life of quiet kindness and boundless generosity inspired the founding of this Trust." },
  { id: "T2", name: "Founder Trustee", role: "Founder & Chairman", photo: avatar("Founder BBMWT"), bio: "Carrying forward Bharati Banerjee's legacy through structured community welfare initiatives in Singur." },
  { id: "T3", name: "Community Coordinator", role: "Secretary & Field Lead", photo: avatar("Coordinator BBMWT"), bio: "Coordinates on-the-ground activities across Singur and Hooghly district, ensuring every initiative reaches those who need it most." },
  { id: "T4", name: "Volunteer Lead", role: "Outreach & Logistics", photo: avatar("Volunteer Lead"), bio: "Leads volunteer engagement, donor relations, and the day-to-day execution of welfare drives." },
  { id: "T5", name: "Treasurer", role: "Finance & Compliance", photo: avatar("Treasurer BBMWT"), bio: "Manages donations, expense records, and statutory compliance for the Trust." },
  { id: "T6", name: "Communications Lead", role: "Media & Documentation", photo: avatar("Comms Lead"), bio: "Documents every activity on Facebook and maintains the public face of the Trust." },
];

export const ADVISORY_MEMBERS: Trustee[] = [
  { id: "A1", name: "Local School Principal", role: "Education Advisor", photo: avatar("Principal Advisor"), bio: "Guides our education-support initiatives, identifying children most in need of books and stationery." },
  { id: "A2", name: "Panchayat Member", role: "Community Liaison", photo: avatar("Panchayat Member"), bio: "Bridges the Trust with local village administration to ensure initiatives reach the right beneficiaries." },
  { id: "A3", name: "Environmental Activist", role: "Plantation Advisor", photo: avatar("Environment Advisor"), bio: "Advises on native tree species, plantation timing, and sapling survival strategies." },
  { id: "A4", name: "Local Doctor", role: "Health & Relief Advisor", photo: avatar("Doctor Advisor"), bio: "Provides medical insight for relief distributions and identifies families in urgent need." },
];

export const ACTIVITIES: Activity[] = [
  { id: "ACT-001", name: "বস্ত্র বিতরণ — Year-Round Clothes Distribution", category: "Community Development", date: "2025-09-15", location: "Kamarkundu, Singur", description: "Year-round distribution of clothes to poor children and families in Singur — new and gently-used garments collected from donors and delivered directly to those in need, every month.", objectives: "Ensure children and families have decent clothing throughout the year, not just during winter.", beneficiaries: 320, status: "Ongoing", impact: "320 children and adults received clothes in 2025 so far; distribution happens every month at Kamarkundu More.", cover: ACTIVITY_PHOTOS.clothesDistribution },
  { id: "ACT-002", name: "শীতের কম্বল বিতরণ — Winter Blanket Distribution", category: "Community Development", date: "2024-12-15", location: "Kamarkundu, Singur", description: "Annual winter drive distributing blankets and warm shawls to families in and around Singur — protecting children, elderly, and daily-wage workers from the cold.", objectives: "Ensure no one in our community shivers through winter without adequate warmth.", beneficiaries: 105, status: "Completed", impact: "105 families received blankets; zero cold-related hospitalizations reported in covered households.", cover: ACTIVITY_PHOTOS.clothesBlanket },
  { id: "ACT-003", name: "বৃক্ষরোপণ অভিযান — Tree Plantation Drive", category: "Environment", date: "2025-07-12", location: "Three villages around Singur", description: "Monsoon tree-plantation drive planting 250 native saplings (neem, banyan, mango, jamrul) across three villages — building green cover and shade for future generations.", objectives: "Green the villages of Singur, prevent soil erosion, and create natural shade.", beneficiaries: 1500, status: "Completed", impact: "250 saplings planted; 78% survival rate as of latest audit; native fruit trees beginning to bear.", cover: ACTIVITY_PHOTOS.treePlantation },
  { id: "ACT-004", name: "শিক্ষা সামগ্রী বিতরণ — Education Supplies Distribution", category: "Education", date: "2025-08-22", location: "Government Primary School, Kamarkundu", description: "Distributed books, notebooks, pens, pencils, geometry boxes, and school bags to 80 underprivileged children ahead of the new academic session.", objectives: "Remove the financial barrier to education for children from low-income families.", beneficiaries: 80, status: "Completed", impact: "80 children started the school year with full supplies; attendance of recipient children improved by 18%.", cover: ACTIVITY_PHOTOS.educationSupplies },
  { id: "ACT-005", name: "প্রয়োজনীয় সামগ্রী বিতরণ — Essentials Distribution", category: "Community Development", date: "2025-09-10", location: "Singur Block, Hooghly", description: "Distributed rice, dal, oil, soap, and other daily-need items to 60 families affected by economic hardship — day-labourers, elderly couples, and single-parent households.", objectives: "Provide immediate relief to families struggling to meet daily nutritional needs.", beneficiaries: 60, status: "Completed", impact: "60 families received a 15-day essentials kit; community feedback recorded for future drives.", cover: ACTIVITY_PHOTOS.essentials },
  { id: "ACT-006", name: "শীতের উষ্ণতা ২০২৫ — Winter Warmth Drive 2025", category: "Community Development", date: "2025-12-20", location: "Multiple villages, Singur Block", description: "Planned annual winter drive — 200 blankets and 300 sets of warm clothing to be distributed across five villages around Singur.", objectives: "Scale up winter relief to cover more families in the Hooghly district.", beneficiaries: 200, status: "Ongoing", impact: "Pre-positioning warm clothing and identifying beneficiaries through door-to-door surveys.", cover: ACTIVITY_PHOTOS.clothesBlanket },
  { id: "ACT-007", name: "সবুজ সিঙ্গুর — Green Singur Initiative", category: "Environment", date: "2026-07-15", location: "Roadside and schoolyard plantations, Singur", description: "Year-two plantation drive targeting 500 saplings along village roads and in schoolyards — engaging school children as caretakers.", objectives: "Build a green corridor around Singur with active community stewardship.", beneficiaries: 3000, status: "Ongoing", impact: "Saplings being sourced from local nurseries; three schools have signed up as caretaker sites.", cover: ACTIVITY_PHOTOS.treePlantation2 },
  { id: "ACT-008", name: "শিক্ষা বৃত্তি — Education Scholarship Program", category: "Education", date: "2026-01-15", location: "Singur Block", description: "Merit-cum-means scholarship for 25 deserving students from Class 8 to Class 12 — supporting tuition, books, and exam fees.", objectives: "Prevent school dropout among bright students from economically weaker families.", beneficiaries: 25, status: "Ongoing", impact: "25 students selected through school recommendations; first scholarship disbursement completed.", cover: ACTIVITY_PHOTOS.educationSupplies2 },
  { id: "ACT-009", name: "মহিলা স্বনির্ভরতা — Women Empowerment Drive", category: "Women Empowerment", date: "2026-02-08", location: "Singur", description: "Sewing machine distribution and tailoring training for 15 women from low-income households — enabling supplementary income.", objectives: "Enable financial independence through vocational skill development.", beneficiaries: 15, status: "Completed", impact: "15 women trained; 8 have started earning within 3 months of completion.", cover: ACTIVITY_PHOTOS.womenWelfare },
  { id: "ACT-010", name: "বন্যা ত্রাণ — Flood Relief Distribution", category: "Disaster Relief", date: "2025-08-15", location: "Hooghly riverside villages", description: "Distributed dry rations, clean water, and oral rehydration sachets to 80 families affected by monsoon flooding in low-lying villages.", objectives: "Provide immediate relief to flood-affected families during the critical 14-day period.", beneficiaries: 80, status: "Completed", impact: "80 families supported; coordinated with local panchayat for evacuation assistance.", cover: ACTIVITY_PHOTOS.reliefKit },
];

export const BENEFICIARIES: Beneficiary[] = [
  { id: "BEN-001", name: "Rina Karmakar", age: 38, gender: "Female", address: "Kamarkundu, Singur", contact: "+91 90XXX XX001", category: "Community Development", assistance: "Winter blanket + warm clothing", assistanceDate: "2024-12-15", project: "Winter Warmth Drive", status: "Completed" },
  { id: "BEN-002", name: "Sukumar Das", age: 65, gender: "Male", address: "Singur", contact: "+91 90XXX XX002", category: "Community Development", assistance: "Essentials kit (15 days)", assistanceDate: "2025-09-10", project: "Essentials Distribution", status: "Completed" },
  { id: "BEN-003", name: "Anjali Mondal", age: 9, gender: "Female", address: "Kamarkundu", contact: "+91 90XXX XX003", category: "Education", assistance: "Books + stationery + school bag", assistanceDate: "2025-08-22", project: "Education Supplies Drive", status: "Active" },
  { id: "BEN-004", name: "Pradip Ghosh", age: 52, gender: "Male", address: "Singur", contact: "+91 90XXX XX004", category: "Community Development", assistance: "Winter blanket", assistanceDate: "2024-12-15", project: "Winter Warmth Drive", status: "Completed" },
  { id: "BEN-005", name: "Mou Das", age: 11, gender: "Female", address: "Singur", contact: "+91 90XXX XX005", category: "Education", assistance: "Geometry box + notebooks", assistanceDate: "2025-08-22", project: "Education Supplies Drive", status: "Active" },
  { id: "BEN-006", name: "Geeta Roy", age: 45, gender: "Female", address: "Kamarkundu", contact: "+91 90XXX XX006", category: "Community Development", assistance: "Essentials kit", assistanceDate: "2025-09-10", project: "Essentials Distribution", status: "Completed" },
  { id: "BEN-007", name: "Local Primary School", age: 0, gender: "Other", address: "Kamarkundu", contact: "—", category: "Environment", assistance: "25 saplings + plantation", assistanceDate: "2025-07-12", project: "Tree Plantation Drive", status: "Active" },
  { id: "BEN-008", name: "Subhash Shil", age: 70, gender: "Male", address: "Singur", contact: "+91 90XXX XX008", category: "Community Development", assistance: "Winter blanket + shawl", assistanceDate: "2024-12-15", project: "Winter Warmth Drive", status: "Completed" },
  { id: "BEN-009", name: "Lakshmi Biswas", age: 28, gender: "Female", address: "Singur", contact: "+91 90XXX XX009", category: "Women Empowerment", assistance: "Sewing machine + training", assistanceDate: "2026-02-08", project: "Women Empowerment Drive", status: "Completed" },
  { id: "BEN-010", name: "Rahul Khan", age: 13, gender: "Male", address: "Kamarkundu", contact: "+91 90XXX XX010", category: "Education", assistance: "School bag + books + scholarship", assistanceDate: "2026-01-15", project: "Education Scholarship Program", status: "Active" },
];

export const DONATIONS: Donation[] = [
  { id: "DON-001", donor: "Subhash Banerjee", mobile: "+91 90XXX XX111", email: "subhash.b@example.com", amount: 2100, purpose: "General Donation", campaign: "Winter Warmth Drive 2025", paymentMethod: "UPI", status: "Successful", date: "2025-09-22", txnId: "UPI987654321", anonymous: false },
  { id: "DON-002", donor: "Anonymous Donor", mobile: "—", email: "—", amount: 5000, purpose: "Campaign Contribution", campaign: "Green Singur Initiative", paymentMethod: "UPI", status: "Successful", date: "2025-09-21", txnId: "UPI987654322", anonymous: true },
  { id: "DON-003", donor: "Singur Steel Pvt Ltd", mobile: "+91 261XXXX XXX1", email: "csr@singursteel.com", amount: 25000, purpose: "CSR Contribution", campaign: "Education Supplies Drive", paymentMethod: "Net Banking", status: "Successful", date: "2025-09-20", txnId: "NB987654323", anonymous: false },
  { id: "DON-004", donor: "Santanu Roy", mobile: "+91 90XXX XX222", email: "santanu.r@example.com", amount: 1100, purpose: "General Donation", campaign: "—", paymentMethod: "UPI", status: "Pending", date: "2025-09-22", txnId: "UPI987654324", anonymous: false },
  { id: "DON-005", donor: "Mita Sengupta", mobile: "+91 90XXX XX333", email: "mita.s@example.com", amount: 3100, purpose: "Sponsorship", campaign: "Education Scholarship Program", paymentMethod: "UPI", status: "Successful", date: "2025-09-19", txnId: "UPI987654325", anonymous: false },
  { id: "DON-006", donor: "Anonymous Well-Wisher", mobile: "—", email: "—", amount: 11000, purpose: "General Donation", campaign: "—", paymentMethod: "UPI", status: "Failed", date: "2025-09-22", txnId: "UPI987654326", anonymous: true },
  { id: "DON-007", donor: "Hooghly Jute Mill", mobile: "+91 261XXXX XXX2", email: "csr@hooghlyjute.com", amount: 50000, purpose: "CSR Contribution", campaign: "Winter Warmth Drive 2025", paymentMethod: "Net Banking", status: "Successful", date: "2025-09-18", txnId: "NB987654327", anonymous: false },
  { id: "DON-008", donor: "Pradip Chatterjee", mobile: "+91 90XXX XX444", email: "pradip.c@example.com", amount: 1500, purpose: "Campaign Contribution", campaign: "Flood Relief Distribution", paymentMethod: "UPI", status: "Successful", date: "2025-09-17", txnId: "UPI987654328", anonymous: false },
  { id: "DON-009", donor: "Anjali Dutta", mobile: "+91 90XXX XX555", email: "anjali.d@example.com", amount: 5100, purpose: "General Donation", campaign: "—", paymentMethod: "UPI", status: "Successful", date: "2025-09-16", txnId: "UPI987654329", anonymous: false },
  { id: "DON-010", donor: "Kamarkundu Club", mobile: "+91 261XXXX XXX3", email: "club@kamarkundu.org", amount: 15000, purpose: "Campaign Contribution", campaign: "Community Harmony Program", paymentMethod: "Net Banking", status: "Successful", date: "2025-09-15", txnId: "NB987654330", anonymous: false },
];

export const CAMPAIGNS: Campaign[] = [
  { id: "CMP-001", title: "শীতের উষ্ণতা — Winter Warmth 2025", description: "Help us distribute 200 blankets and 300 sets of warm clothing to families in Singur before the December cold peaks.", objective: "Raise ₹1,50,000 to fund blankets and warm clothing for 200 families", targetAmount: 150000, collectedAmount: 98000, beneficiaries: 200, startDate: "2025-10-01", endDate: "2025-12-20", status: "Active", cover: ACTIVITY_PHOTOS.clothesBlanket, category: "Community Development" },
  { id: "CMP-002", title: "সবুজ সিঙ্গুর — Green Singur 500 Saplings", description: "Fund 500 native saplings and plantation logistics to build a green corridor around Singur in monsoon 2026.", objective: "Raise ₹75,000 to source and plant 500 saplings", targetAmount: 75000, collectedAmount: 52000, beneficiaries: 3000, startDate: "2025-09-01", endDate: "2026-07-15", status: "Active", cover: ACTIVITY_PHOTOS.treePlantation, category: "Environment" },
  { id: "CMP-003", title: "শিক্ষা বৃত্তি — 25 Student Scholarships", description: "Sponsor tuition, books, and exam fees for 25 deserving students from Class 8 to 12 in Singur.", objective: "Raise ₹1,00,000 to fund 25 scholarships for one academic year", targetAmount: 100000, collectedAmount: 67000, beneficiaries: 25, startDate: "2025-11-01", endDate: "2026-04-30", status: "Active", cover: ACTIVITY_PHOTOS.educationSupplies, category: "Education" },
  { id: "CMP-004", title: "মহিলা স্বনির্ভরতা — Sewing Machines for 30 Women", description: "Provide sewing machines and tailoring training to 30 women from low-income households.", objective: "Raise ₹90,000 to fund 30 sewing machines + 3-month training", targetAmount: 90000, collectedAmount: 90000, beneficiaries: 30, startDate: "2025-12-01", endDate: "2026-02-28", status: "Completed", cover: ACTIVITY_PHOTOS.womenWelfare, category: "Women Empowerment" },
  { id: "CMP-005", title: "বন্যা ত্রাণ — Flood Relief 2025", description: "Emergency relief for 80 families affected by monsoon flooding in Hooghly riverside villages.", objective: "Raise ₹1,20,000 for relief kits and clean water", targetAmount: 120000, collectedAmount: 108000, beneficiaries: 80, startDate: "2025-08-10", endDate: "2025-09-15", status: "Active", cover: ACTIVITY_PHOTOS.reliefKit, category: "Disaster Relief" },
  { id: "CMP-006", title: "প্রয়োজনীয় সামগ্রী — Monthly Essentials", description: "Recurring monthly drive providing rice, dal, oil, and soap to 60 families facing economic hardship.", objective: "Raise ₹50,000 per month to fund essentials for 60 families", targetAmount: 600000, collectedAmount: 180000, beneficiaries: 60, startDate: "2025-09-01", endDate: "2026-08-31", status: "Active", cover: ACTIVITY_PHOTOS.essentials, category: "Community Development" },
];

export const SPONSORSHIPS: Sponsorship[] = [
  { id: "SPN-001", sponsorName: "Mita Sengupta", type: "Education", amount: 12000, duration: "12 months", startDate: "2025-09-01", beneficiary: "Anjali Mondal (BEN-003)", status: "Active", nextPayment: "2025-10-01" },
  { id: "SPN-002", sponsorName: "Subhash Banerjee", type: "Monthly Support", amount: 2100, duration: "12 months", startDate: "2025-01-01", beneficiary: "General — Winter Warmth", status: "Active", nextPayment: "2025-10-01" },
  { id: "SPN-003", sponsorName: "Anjali Dutta", type: "Food", amount: 3100, duration: "12 months", startDate: "2025-04-01", beneficiary: "Essentials kit — 3 families", status: "Active", nextPayment: "2025-10-01" },
  { id: "SPN-004", sponsorName: "Pradip Chatterjee", type: "Child", amount: 12000, duration: "12 months", startDate: "2025-06-15", beneficiary: "Rahul Khan (BEN-010)", status: "Active", nextPayment: "2025-10-15" },
  { id: "SPN-005", sponsorName: "Hooghly Jute Mill", type: "Event", amount: 15000, duration: "One-time", startDate: "2026-01-15", beneficiary: "Republic Day Community Harmony", status: "Completed", nextPayment: "—" },
  { id: "SPN-006", sponsorName: "Singur Steel Pvt Ltd", type: "Equipment", amount: 25000, duration: "One-time", startDate: "2025-08-15", beneficiary: "School bags + stationery (80 sets)", status: "Completed", nextPayment: "—" },
  { id: "SPN-007", sponsorName: "Santanu Roy", type: "Monthly Support", amount: 1100, duration: "12 months", startDate: "2025-05-01", beneficiary: "General — Flood Relief", status: "Active", nextPayment: "2025-10-01" },
];

export const VOLUNTEERS: Volunteer[] = [
  { id: "VOL-001", name: "Sourav Banerjee", mobile: "+91 90XXX XX001", email: "sourav.b@example.com", location: "Kamarkundu, Singur", occupation: "College Student", skills: ["Photography", "Social Media"], interests: ["Education", "Environment"], availability: "Weekends", status: "Active", joinedDate: "2024-12-01", activitiesCount: 14 },
  { id: "VOL-002", name: "Priyanka Roy", mobile: "+91 90XXX XX002", email: "priyanka.r@example.com", location: "Singur", occupation: "School Teacher", skills: ["Teaching", "Event Management"], interests: ["Education", "Child Welfare"], availability: "Weekends", status: "Active", joinedDate: "2025-01-15", activitiesCount: 12 },
  { id: "VOL-003", name: "Aniket Shil", mobile: "+91 90XXX XX003", email: "aniket.s@example.com", location: "Singur", occupation: "Agriculturalist", skills: ["Plantation", "Community Liaison"], interests: ["Environment", "Rural Development"], availability: "Flexible", status: "Active", joinedDate: "2025-02-20", activitiesCount: 9 },
  { id: "VOL-004", name: "Madhumita Das", mobile: "+91 90XXX XX004", email: "madhumita.d@example.com", location: "Kamarkundu", occupation: "Tailor", skills: ["Tailoring", "Training"], interests: ["Women Empowerment"], availability: "Weekdays", status: "Active", joinedDate: "2025-12-01", activitiesCount: 6 },
  { id: "VOL-005", name: "Rahul Saha", mobile: "+91 90XXX XX005", email: "rahul.s@example.com", location: "Singur", occupation: "College Student", skills: ["Logistics", "Driving"], interests: ["Disaster Relief"], availability: "Weekends", status: "Pending", joinedDate: "2025-09-18", activitiesCount: 0 },
  { id: "VOL-006", name: "Sohini Ghosh", mobile: "+91 90XXX XX006", email: "sohini.g@example.com", location: "Kamarkundu", occupation: "Social Worker", skills: ["Counselling", "Survey"], interests: ["Community Development", "Women Empowerment"], availability: "Flexible", status: "Active", joinedDate: "2025-03-10", activitiesCount: 11 },
  { id: "VOL-007", name: "Tanmoy Khan", mobile: "+91 90XXX XX007", email: "tanmoy.k@example.com", location: "Singur", occupation: "Shop Owner", skills: ["Logistics", "Donor Relations"], interests: ["Community Development"], availability: "Weekends", status: "Active", joinedDate: "2024-11-15", activitiesCount: 8 },
  { id: "VOL-008", name: "Payel Biswas", mobile: "+91 90XXX XX008", email: "payel.b@example.com", location: "Hooghly", occupation: "Journalist", skills: ["Content Writing", "Media"], interests: ["Media"], availability: "Flexible", status: "Active", joinedDate: "2025-04-22", activitiesCount: 7 },
];

export const EVENTS: EventItem[] = [
  { id: "EVT-001", title: "শীতের বস্ত্র বিতরণ — Winter Blanket Distribution Drive", date: "2025-12-20", time: "10:00 AM", venue: "Kamarkundu More, Singur", description: "Annual winter blanket and warm clothing distribution drive. 200 blankets and 300 sets of warm clothing will be distributed to pre-identified families across five villages of Singur Block. Volunteers needed for logistics and beneficiary coordination.", participantLimit: 50, registered: 32, status: "Upcoming", cover: ACTIVITY_PHOTOS.clothesBlanket },
  { id: "EVT-002", title: "সবুজ সিঙ্গুর বৃক্ষরোপণ — Green Singur Tree Plantation", date: "2026-07-15", time: "7:00 AM", venue: "Three village roads, Singur", description: "Monsoon tree-plantation drive targeting 500 native saplings along village roads and in three schoolyards. Schools have signed up as caretaker sites. Light breakfast and refreshments will be provided.", participantLimit: 100, registered: 47, status: "Upcoming", cover: ACTIVITY_PHOTOS.treePlantation },
  { id: "EVT-003", title: "শিক্ষা সামগ্রী বিতরণ — Education Supplies Distribution", date: "2026-01-15", time: "11:00 AM", venue: "Government Primary School, Kamarkundu", description: "Distribution of books, notebooks, school bags, and stationery to 80 underprivileged children ahead of the new academic session. Coordinated with local school principal for beneficiary selection.", participantLimit: 30, registered: 18, status: "Upcoming", cover: ACTIVITY_PHOTOS.educationSupplies },
  { id: "EVT-004", title: "প্রজাতন্ত্র দিবস সমাবেশ — Republic Day Community Gathering", date: "2026-01-26", time: "8:00 AM", venue: "Singur Town Hall", description: "Republic Day flag hoisting followed by cultural program and collective community meal. Open to all residents of Singur — celebrating unity in diversity.", participantLimit: 350, registered: 280, status: "Completed", cover: ACTIVITY_PHOTOS.community },
  { id: "EVT-005", title: "মহিলা দিবস উদযাপন — Women's Day Celebration", date: "2026-03-08", time: "11:00 AM", venue: "Singur Community Hall", description: "Celebration of International Women's Day — honouring women achievers of Singur and showcasing tailoring work from the Women Empowerment Drive graduates.", participantLimit: 100, registered: 75, status: "Upcoming", cover: ACTIVITY_PHOTOS.womenWelfare },
];

export const ENQUIRIES: Enquiry[] = [
  { id: "ENQ-001", name: "Karthik Maiti", email: "karthik.m@example.com", mobile: "+91 90XXX XX101", category: "Donation", subject: "Want to donate blankets — bulk", message: "We have 50 new blankets at home. Can you arrange pickup from Howrah?", status: "Resolved", date: "2025-09-20", assignedTo: "Volunteer Lead" },
  { id: "ENQ-002", name: "Sarla Devi", email: "sarla.d@example.com", mobile: "+91 90XXX XX102", category: "Volunteer", subject: "Weekend teaching opportunity", message: "I am a retired teacher. Can I volunteer to teach at the primary school?", status: "In Progress", date: "2025-09-21", assignedTo: "Community Coordinator" },
  { id: "ENQ-003", name: "Hooghly Industries", email: "csr@hooghlyindustries.com", mobile: "+91 261XXXX XXX5", category: "CSR", subject: "CSR partnership proposal", message: "Interested in funding 500 saplings for the Green Singur initiative.", status: "New", date: "2025-09-22", assignedTo: "Founder Trustee" },
  { id: "ENQ-004", name: "Vivek Anand", email: "vivek.a@example.com", mobile: "+91 90XXX XX103", category: "Sponsorship", subject: "Sponsor 5 children's education", message: "Want to sponsor education of 5 children for one year.", status: "In Progress", date: "2025-09-19", assignedTo: "Treasurer" },
  { id: "ENQ-005", name: "Singur Press Reporter", email: "press@singurpress.in", mobile: "+91 261XXXX XXX6", category: "Media", subject: "Interview request with founder", message: "Requesting 30 min interview for upcoming story on local NGOs.", status: "New", date: "2025-09-22", assignedTo: "Communications Lead" },
  { id: "ENQ-006", name: "Anita Foundation", email: "contact@anitafoundation.org", mobile: "+91 33XXXX XXX7", category: "Partnership", subject: "Joint program proposal", message: "Looking to partner for women empowerment initiatives.", status: "In Progress", date: "2025-09-18", assignedTo: "Founder Trustee" },
  { id: "ENQ-007", name: "Mahesh Joshi", email: "mahesh.j@example.com", mobile: "+91 90XXX XX104", category: "General", subject: "Visit to trust office", message: "Can I visit your Singur office next week?", status: "Closed", date: "2025-09-15", assignedTo: "Community Coordinator" },
];

export const CSR_PARTNERS: CSRPartner[] = [
  { id: "CSR-001", companyName: "Singur Steel Pvt Ltd", contactPerson: "Rajesh Krishnan", email: "csr@singursteel.com", mobile: "+91 261XXXX XXX1", csrInterest: "Education, Skill Development", proposedContribution: 25000, location: "Singur", projectInterest: "Education Supplies Drive", status: "Active", date: "2025-09-20" },
  { id: "CSR-002", companyName: "Hooghly Jute Mill", contactPerson: "Lakshmi Iyer", email: "csr@hooghlyjute.com", mobile: "+91 261XXXX XXX2", csrInterest: "Community Welfare", proposedContribution: 50000, location: "Hooghly", projectInterest: "Winter Warmth Drive 2025", status: "Active", date: "2025-09-18" },
  { id: "CSR-003", companyName: "Kamarkundu Club", contactPerson: "Santanu Roy", email: "club@kamarkundu.org", mobile: "+91 261XXXX XXX3", csrInterest: "Community Development, Events", proposedContribution: 15000, location: "Kamarkundu", projectInterest: "Community Harmony Program", status: "Active", date: "2025-09-15" },
  { id: "CSR-004", companyName: "Hooghly Industries", contactPerson: "CSR Cell", email: "csr@hooghlyindustries.com", mobile: "+91 261XXXX XXX5", csrInterest: "Environment, Rural Development", proposedContribution: 60000, location: "Hooghly", projectInterest: "Green Singur Initiative", status: "In Discussion", date: "2025-09-22" },
  { id: "CSR-005", companyName: "Bengal Agro Products", contactPerson: "Anand Mitra", email: "csr@bengalagro.com", mobile: "+91 33XXXX XXX8", csrInterest: "Skill Development, Women Empowerment", proposedContribution: 30000, location: "Kolkata", projectInterest: "Women Empowerment Drive", status: "Approved", date: "2025-09-12" },
  { id: "CSR-006", companyName: "Singur Cooperative Bank", contactPerson: "Branch Manager", email: "csr@singurbank.com", mobile: "+91 261XXXX XXX9", csrInterest: "Education, Financial Literacy", proposedContribution: 20000, location: "Singur", projectInterest: "Education Scholarship Program", status: "New", date: "2025-09-22" },
];

export const GRANTS: Grant[] = [
  { id: "GRN-001", name: "Green Singur Plantation Grant", fundingOrganisation: "West Bengal Forest Dept", project: "Green Singur Initiative", sanctionedAmount: 100000, receivedAmount: 80000, utilisedAmount: 52000, startDate: "2025-09-01", endDate: "2026-07-15", status: "Active" },
  { id: "GRN-002", name: "Education Support Grant", fundingOrganisation: "Anita Foundation", project: "Education Scholarship Program", sanctionedAmount: 75000, receivedAmount: 50000, utilisedAmount: 30000, startDate: "2025-11-01", endDate: "2026-04-30", status: "Active" },
  { id: "GRN-003", name: "Winter Relief Grant", fundingOrganisation: "Hooghly District Administration", project: "Winter Warmth Drive 2025", sanctionedAmount: 50000, receivedAmount: 50000, utilisedAmount: 50000, startDate: "2025-10-01", endDate: "2025-12-31", status: "Completed" },
  { id: "GRN-004", name: "Women Empowerment Grant", fundingOrganisation: "Bengal Agro Products", project: "Women Empowerment Drive", sanctionedAmount: 30000, receivedAmount: 30000, utilisedAmount: 28000, startDate: "2025-12-01", endDate: "2026-02-28", status: "Active" },
  { id: "GRN-005", name: "Disaster Relief Grant", fundingOrganisation: "Local Panchayat", project: "Flood Relief Distribution", sanctionedAmount: 40000, receivedAmount: 40000, utilisedAmount: 38000, startDate: "2025-08-10", endDate: "2025-09-15", status: "Completed" },
];

export const EXPENSES: Expense[] = [
  { id: "EXP-001", date: "2025-09-22", category: "Winter Materials", amount: 35000, project: "Winter Warmth Drive 2025", fundingSource: "Hooghly Jute Mill CSR", vendor: "Bharat Blankets & Textiles", remarks: "100 blankets + 50 shawls purchased" },
  { id: "EXP-002", date: "2025-09-20", category: "Saplings", amount: 12000, project: "Green Singur Initiative", fundingSource: "WB Forest Dept Grant", vendor: "Singur Nursery", remarks: "250 native saplings + compost" },
  { id: "EXP-003", date: "2025-09-18", category: "Education Materials", amount: 22000, project: "Education Supplies Drive", fundingSource: "Singur Steel CSR", vendor: "Saraswati Book House", remarks: "Books, notebooks, geometry boxes for 80 children" },
  { id: "EXP-004", date: "2025-09-15", category: "Essentials", amount: 18000, project: "Essentials Distribution", fundingSource: "General Donation", vendor: "Local Wholesale Market", remarks: "Rice, dal, oil, soap for 60 families" },
  { id: "EXP-005", date: "2025-09-12", category: "Equipment", amount: 28000, project: "Women Empowerment Drive", fundingSource: "Bengal Agro CSR", vendor: "Singer India", remarks: "15 sewing machines" },
  { id: "EXP-006", date: "2025-09-10", category: "Relief Material", amount: 38000, project: "Flood Relief Distribution", fundingSource: "Panchayat Grant", vendor: "Multiple vendors", remarks: "Dry rations + ORS + clean water for 80 families" },
  { id: "EXP-007", date: "2025-09-08", category: "Event Logistics", amount: 8500, project: "Community Harmony Program", fundingSource: "Kamarkundu Club", vendor: "Local caterer + decorator", remarks: "Republic Day event catering + decoration" },
  { id: "EXP-008", date: "2025-09-05", category: "Travel", amount: 4200, project: "Field Operations", fundingSource: "General Donation", vendor: "Local transport", remarks: "Volunteer travel to plantation sites" },
];

// Facebook-sourced news items (referenced from user-provided FB post links)
export const NEWS_ITEMS: NewsItem[] = [
  { id: "NWS-001", title: "ভারতী ব্যানার্জী মেমোরিয়াল ওয়েলফেয়ার ট্রাস্ট-এর সেবামূলক কার্যক্রমের স্মৃতি", category: "Announcement", date: "2025-09-22", excerpt: "বস্ত্র ও কম্বল বিতরণ, বৃক্ষরোপণ, শিক্ষা সামগ্রী এবং প্রয়োজনীয় সামগ্রী বিতরণ — ছোট ছোট উদ্যোগে মানবিকতার বার্তা ছড়িয়ে দেওয়াই আমাদের লক্ষ্য।", content: "A glimpse of our recent welfare activities — clothes and blanket distribution, tree plantation, education supplies and essential items distribution. Spreading humanity's message through small initiatives is our mission. মানুষের পাশে, মানুষের জন্য ❤️", cover: ACTIVITY_PHOTOS.community, author: "BBMWT Communications Team" },
  { id: "NWS-002", title: "শীতের বস্ত্র বিতরণ ২০২৪ — First Winter Drive Completed", category: "Achievement", date: "2024-12-15", excerpt: "105 families in Kamarkundu and Singur received blankets and warm clothing in our very first welfare drive.", content: "Our inaugural activity as a registered Trust — distributing blankets, shawls, and warm clothing to 105 families across Kamarkundu and Singur. The drive was made possible through personal donations from family and friends. We documented every distribution on our Facebook page for full transparency.", cover: ACTIVITY_PHOTOS.clothesBlanket, author: "Founder Trustee" },
  { id: "NWS-003", title: "বৃক্ষরোপণ অভিযান ২০২৫ — 250 Saplings Planted", category: "Achievement", date: "2025-07-12", excerpt: "Monsoon tree-plantation drive plants 250 native saplings across three villages of Singur.", content: "Our monsoon plantation drive was a community celebration — 250 native saplings (neem, banyan, mango, jamrul) planted across three villages with active participation from local school children. 78% survival rate as of latest audit. We thank our volunteers and the local panchayat for their support.", cover: ACTIVITY_PHOTOS.treePlantation, author: "Community Coordinator" },
  { id: "NWS-004", title: "শিক্ষা সামগ্রী বিতরণ ২০২৫ — 80 Children Supported", category: "Achievement", date: "2025-08-22", excerpt: "80 underprivileged children received books, notebooks, geometry boxes, and school bags ahead of the new academic session.", content: "Education is the most powerful weapon to change the world. Our education supplies distribution drive reached 80 children from low-income families at the Government Primary School, Kamarkundu. Each child received a school bag, notebooks, pens, pencils, erasers, sharpener, and a geometry box. We thank Singur Steel Pvt Ltd for their CSR contribution.", cover: ACTIVITY_PHOTOS.educationSupplies, author: "Volunteer Lead" },
  { id: "NWS-005", title: "প্রয়োজনীয় সামগ্রী বিতরণ ২০২৫ — Essentials Drive", category: "News", date: "2025-09-10", excerpt: "60 families in Singur Block received 15-day essentials kits of rice, dal, oil, and soap.", content: "Recognising the economic hardship faced by daily-wage families, we distributed 15-day essentials kits to 60 families in Singur Block. Each kit contained rice, dal, mustard oil, soap, and basic spices. Beneficiaries were identified through door-to-door surveys coordinated with local panchayat members.", cover: ACTIVITY_PHOTOS.essentials, author: "Community Coordinator" },
  { id: "NWS-006", title: "শীতের উষ্ণতা ২০২৫ — Upcoming Winter Drive", category: "Notice", date: "2025-10-01", excerpt: "We are scaling up our annual winter drive — 200 blankets and 300 sets of warm clothing across five villages.", content: "Preparations are underway for Winter Warmth Drive 2025. We are scaling up from 105 to 200 families, and from one to five villages. Donations open — every ₹750 sponsors one blanket for a family in need. WhatsApp +91 90077 82334 to contribute.", cover: ACTIVITY_PHOTOS.clothesDistribution, author: "BBMWT Communications Team" },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  { id: "GAL-001", title: "Winter Blanket Distribution 2024", type: "Photo", category: "Activity", date: "2024-12-15", url: ACTIVITY_PHOTOS.clothesBlanket, caption: "Beneficiaries receiving blankets at Kamarkundu More" },
  { id: "GAL-002", title: "Tree Plantation Drive 2025", type: "Photo", category: "Activity", date: "2025-07-12", url: ACTIVITY_PHOTOS.treePlantation, caption: "Volunteers planting saplings in Singur" },
  { id: "GAL-003", title: "Education Supplies Distribution", type: "Photo", category: "Activity", date: "2025-08-22", url: ACTIVITY_PHOTOS.educationSupplies, caption: "Children receiving school bags and books" },
  { id: "GAL-004", title: "Essentials Kit Distribution", type: "Photo", category: "Activity", date: "2025-09-10", url: ACTIVITY_PHOTOS.essentials, caption: "Essentials kit ready for distribution" },
  { id: "GAL-005", title: "Flood Relief Distribution", type: "Photo", category: "Activity", date: "2025-08-15", url: ACTIVITY_PHOTOS.reliefKit, caption: "Relief kits for flood-affected families" },
  { id: "GAL-006", title: "Women Empowerment Drive", type: "Photo", category: "Activity", date: "2026-02-08", url: ACTIVITY_PHOTOS.womenWelfare, caption: "Women receiving sewing machines and training" },
  { id: "GAL-007", title: "Republic Day Celebration", type: "Photo", category: "Event", date: "2026-01-26", url: ACTIVITY_PHOTOS.community, caption: "Community gathering on Republic Day" },
  { id: "GAL-008", title: "Tree Plantation - Sapling Care", type: "Photo", category: "Activity", date: "2025-07-15", url: ACTIVITY_PHOTOS.treePlantation2, caption: "School children tending to newly planted saplings" },
  { id: "GAL-009", title: "Education Supplies - Close-up", type: "Photo", category: "Activity", date: "2025-08-25", url: ACTIVITY_PHOTOS.educationSupplies2, caption: "Stationery kits ready for distribution" },
  { id: "GAL-010", title: "Clothes Distribution Drive", type: "Photo", category: "Activity", date: "2024-12-16", url: ACTIVITY_PHOTOS.clothesDistribution, caption: "Warm clothing being sorted and distributed" },
];

export const DOCUMENTS: DocumentItem[] = [
  { id: "DOC-001", name: "Trust Registration Certificate", category: "Registration Documents", date: "2024-09-15", version: "1.0", visibility: "Public", size: "2.1 MB" },
  { id: "DOC-002", name: "Trust Deed", category: "Trust Deed", date: "2024-09-15", version: "1.0", visibility: "Public", size: "4.8 MB" },
  { id: "DOC-003", name: "PAN Card", category: "Certificates", date: "2024-10-20", version: "1.0", visibility: "Admin Only", size: "0.6 MB" },
  { id: "DOC-004", name: "12A Application Status", category: "Certificates", date: "2025-03-22", version: "Draft", visibility: "Admin Only", size: "1.2 MB" },
  { id: "DOC-005", name: "Annual Report 2024-25", category: "Annual Reports", date: "2025-04-15", version: "1.0", visibility: "Public", size: "6.4 MB" },
  { id: "DOC-006", name: "Activity Report Q1 2025", category: "Activity Reports", date: "2025-07-05", version: "1.0", visibility: "Public", size: "2.8 MB" },
  { id: "DOC-007", name: "Activity Report Q2 2025", category: "Activity Reports", date: "2025-10-05", version: "1.0", visibility: "Public", size: "3.1 MB" },
  { id: "DOC-008", name: "Financial Statement FY 2024-25", category: "Audit Reports", date: "2025-06-30", version: "1.0", visibility: "Public", size: "2.5 MB" },
  { id: "DOC-009", name: "Donation Ledger FY 2024-25", category: "Audit Reports", date: "2025-06-30", version: "1.0", visibility: "Admin Only", size: "1.8 MB" },
  { id: "DOC-010", name: "Volunteer Code of Conduct", category: "Policies", date: "2024-10-01", version: "1.0", visibility: "Public", size: "0.9 MB" },
  { id: "DOC-011", name: "Beneficiary Identification Policy", category: "Policies", date: "2024-11-15", version: "1.0", visibility: "Public", size: "1.1 MB" },
  { id: "DOC-012", name: "Internal HR Manual", category: "Policies", date: "2025-01-10", version: "1.0", visibility: "Admin Only", size: "2.3 MB" },
];

export const CERTIFICATES: Certificate[] = [
  { id: "CERT-001", certificateNo: "BBMWT/2025/000045", recipientName: "Sourav Banerjee", recipientType: "Volunteer", issueDate: "2025-09-22", event: "Winter Warmth Drive 2024", verified: true },
  { id: "CERT-002", certificateNo: "BBMWT/2025/000044", recipientName: "Hooghly Jute Mill", recipientType: "Sponsor", issueDate: "2025-09-20", event: "Winter Warmth Drive 2025", verified: true },
  { id: "CERT-003", certificateNo: "BBMWT/2025/000043", recipientName: "Priyanka Roy", recipientType: "Volunteer", issueDate: "2025-09-18", event: "Education Supplies Drive", verified: true },
  { id: "CERT-004", certificateNo: "BBMWT/2025/000042", recipientName: "Singur Steel Pvt Ltd", recipientType: "Sponsor", issueDate: "2025-09-15", event: "Education Supplies Drive", verified: true },
  { id: "CERT-005", certificateNo: "BBMWT/2025/000041", recipientName: "Aniket Shil", recipientType: "Volunteer", issueDate: "2025-09-12", event: "Tree Plantation Drive", verified: true },
  { id: "CERT-006", certificateNo: "BBMWT/2025/000040", recipientName: "Madhumita Das", recipientType: "Volunteer", issueDate: "2025-09-10", event: "Women Empowerment Drive", verified: true },
  { id: "CERT-007", certificateNo: "BBMWT/2025/000039", recipientName: "Mita Sengupta", recipientType: "Sponsor", issueDate: "2025-09-08", event: "Education Scholarship Program", verified: true },
  { id: "CERT-008", certificateNo: "BBMWT/2025/000038", recipientName: "Tanmoy Khan", recipientType: "Volunteer", issueDate: "2025-09-05", event: "Essentials Distribution", verified: false },
];

export const AUDIT_LOGS: AuditLog[] = [
  { id: "LOG-001", user: "Treasurer", action: "Updated", module: "Donations", details: "Modified donation record #DON-004", timestamp: "2025-09-23 11:42 AM", ip: "103.21.X.X" },
  { id: "LOG-002", user: "Founder Trustee", action: "Created", module: "CSR", details: "Added new CSR partner: Singur Cooperative Bank", timestamp: "2025-09-23 10:15 AM", ip: "103.21.X.X" },
  { id: "LOG-003", user: "Community Coordinator", action: "Created", module: "Activities", details: "Added new activity: Winter Warmth Drive 2025", timestamp: "2025-09-22 4:30 PM", ip: "49.36.X.X" },
  { id: "LOG-004", user: "Founder Trustee", action: "Login", module: "Auth", details: "Successful admin login", timestamp: "2025-09-22 9:00 AM", ip: "103.21.X.X" },
  { id: "LOG-005", user: "Volunteer Lead", action: "Updated", module: "Beneficiaries", details: "Modified beneficiary record #BEN-005", timestamp: "2025-09-21 3:45 PM", ip: "106.51.X.X" },
  { id: "LOG-006", user: "Treasurer", action: "Exported", module: "Donations", details: "Exported donations report (CSV)", timestamp: "2025-09-21 2:20 PM", ip: "103.21.X.X" },
  { id: "LOG-007", user: "Communications Lead", action: "Approved", module: "Volunteers", details: "Approved volunteer application #VOL-006", timestamp: "2025-09-20 5:10 PM", ip: "157.32.X.X" },
  { id: "LOG-008", user: "Communications Lead", action: "Published", module: "News", details: "Published news: Winter Warmth Drive 2025 — Upcoming", timestamp: "2025-09-20 11:00 AM", ip: "103.21.X.X" },
];

export const USERS: UserAccount[] = [
  { id: "USR-001", name: "Founder Trustee", email: "founder@bbmwt.org", role: "Super Admin", status: "Active", lastLogin: "2025-09-22 9:00 AM" },
  { id: "USR-002", name: "Treasurer", email: "treasurer@bbmwt.org", role: "Trust Admin", status: "Active", lastLogin: "2025-09-23 11:42 AM" },
  { id: "USR-003", name: "Community Coordinator", email: "coordinator@bbmwt.org", role: "Project Manager", status: "Active", lastLogin: "2025-09-22 4:30 PM" },
  { id: "USR-004", name: "Volunteer Lead", email: "volunteers@bbmwt.org", role: "Volunteer Coordinator", status: "Active", lastLogin: "2025-09-21 3:45 PM" },
  { id: "USR-005", name: "Communications Lead", email: "comms@bbmwt.org", role: "Content Manager", status: "Active", lastLogin: "2025-09-20 5:10 PM" },
  { id: "USR-006", name: "Accounts Assistant", email: "accounts@bbmwt.org", role: "Accounts", status: "Active", lastLogin: "2025-09-21 5:00 PM" },
];

export const TESTIMONIALS: Testimonial[] = [
  { id: "T1", name: "Rina Karmakar", role: "Beneficiary — Winter Blanket Drive", quote: "শীতের রাতে আমার বাচ্চারা কাঁপত। ভারতী ব্যানার্জী ট্রাস্টের কম্বল পেয়ে আমরা শান্তিতে ঘুমাতে পারি। তাদের উষ্ণতা শুধু শরীরে নয়, হৃদয়েও লেগেছে।", rating: 5 },
  { id: "T2", name: "Anjali Mondal", role: "Beneficiary — Education Supplies", quote: "নতুন বই আর স্কুল ব্যাগ পেয়ে আমি খুব খুশি। এখন আমিও বড় হয়ে অন্যদের সাহায্য করব।", rating: 5 },
  { id: "T3", name: "Santanu Roy", role: "Volunteer", quote: "প্রতিটি কার্যক্রমে কাজ করতে গিয়ে দেখি সমাজের অনেকগুলো মুখ আমার চেনা হয়ে গেছে। ভালো কাজ করতে করতে মানুষ হয়ে ওঠে — এটাই শিখেছি।", rating: 5 },
  { id: "T4", name: "Subhash Banerjee", role: "Donor", quote: "I have been donating for a year now. Every rupee I send is documented with photos on Facebook. This transparency is rare and reassuring.", rating: 5 },
];

export const IMPACT_STATS = {
  beneficiaries: 850,
  projects: 10,
  villages: 5,
  volunteers: 8,
  amountRaised: 425000,
  yearsOfService: 1,
  saplingsPlanted: 250,
  blanketsDistributed: 105,
};

export const MONTHLY_DONATIONS = [
  { month: "Apr", amount: 28000 },
  { month: "May", amount: 35000 },
  { month: "Jun", amount: 42000 },
  { month: "Jul", amount: 55000 },
  { month: "Aug", amount: 68000 },
  { month: "Sep", amount: 85000 },
];

export const CATEGORY_DISTRIBUTION = [
  { name: "Community Development", value: 38, color: "oklch(0.55 0.18 30)" },
  { name: "Environment", value: 22, color: "oklch(0.50 0.12 145)" },
  { name: "Education", value: 20, color: "oklch(0.70 0.15 65)" },
  { name: "Women Empowerment", value: 10, color: "oklch(0.65 0.16 320)" },
  { name: "Disaster Relief", value: 10, color: "oklch(0.60 0.10 200)" },
];

export const DONATION_SOURCES = [
  { source: "Individual Donors", amount: 185000 },
  { source: "CSR Partners", amount: 165000 },
  { source: "Grants", amount: 55000 },
  { source: "Sponsorships", amount: 20000 },
];

export const UPCOMING_EVENTS_PUBLIC = EVENTS.filter((e) => e.status === "Upcoming").slice(0, 3);
export const LATEST_NEWS_PUBLIC = NEWS_ITEMS.slice(0, 4);
export const ACTIVE_CAMPAIGNS = CAMPAIGNS.filter((c) => c.status === "Active").slice(0, 3);
