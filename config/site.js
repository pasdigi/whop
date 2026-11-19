export const siteConfig = {
  company: {
    name: "Apex Shield Roofing Co.",
    tagline: "Licensed, Bonded & Insured Texas Roofing Specialists",
    phone: "(512) 555-0194",
    email: "estimates@apexshieldroofing.com",
    license: "TX-RCAT #88412",
    yearsInBusiness: "15+ Years",
    rating: "4.9",
    reviewCount: "340+",
  },

  serviceArea: {
    region: "Greater Austin & Central Texas",
    cities: [
      "Austin", "Round Rock", "Cedar Park", "Georgetown",
      "Pflugerville", "Lakeway", "San Marcos", "Kyle"
    ],
    zipCodes: "78701–78759, 78664, 78613, 78626",
  },

  financing: {
    headline: "Flexible Monthly Financing Available at Checkout",
    subheadline:
      "Split your roof replacement or major repair into manageable payments. Klarna, Afterpay, and Splitit appear automatically inside our Whop checkout for approved merchants.",
    providers: ["Klarna", "Afterpay", "Splitit", "Apple Pay", "Google Pay"],
  },

  // 3 Plan Wajib + Layanan Utama
  plans: {
    inspection: {
      id: process.env.NEXT_PUBLIC_PLAN_INSPECTION,
      slug: "inspection",
      name: "21-Point Roof & Drone Inspection",
      price: 149,
      billingType: "One-time",
      isDeposit: false,
      badge: "Most Popular First Step",
      description:
        "Full shingle, flashing, decking, and thermal drone inspection with a same-day photo report and itemized repair/replacement quote.",
      features: [
        "HD drone & attic moisture check",
        "Insurance-ready storm damage report",
        "100% credited toward any full replacement",
      ],
    },
    deposit: {
      id: process.env.NEXT_PUBLIC_PLAN_DEPOSIT,
      slug: "deposit",
      name: "Project Scheduling Deposit",
      price: 500,
      billingType: "Deposit (Card on File)",
      isDeposit: true, // Memicu Setup Intent (simpan kartu untuk pelunasan)
      badge: "Locks Your Crew Date",
      description:
        "Reserve your installation crew and material order. Your payment method is securely saved on file so the final balance can be billed seamlessly upon completion.",
      features: [
        "Locks material pricing & install date",
        "Secure card-on-file via Whop Setup Intent",
        "Final balance invoiced only after walkthrough",
      ],
    },
    flatRate: {
      id: process.env.NEXT_PUBLIC_PLAN_FLATRATE,
      slug: "flat-rate-repair",
      name: "Flat-Rate Emergency Leak Repair & Tune-Up",
      price: 299,
      billingType: "Flat-Rate Service",
      isDeposit: false,
      badge: "Same-Week Service",
      description:
        "Upfront flat-rate fix for pipe boot leaks, lifted shingles, exposed nail heads, and ridge vent resealing—no surprise hourly fees.",
      features: [
        "Up to 15 replacement shingles included",
        "Pipe boot & flashing waterproof reseal",
        "2-year workmanship leak warranty",
      ],
    },
  },

  servicesOverview: [
    {
      id: "repair",
      title: "Roof Repair",
      summary: "Fast hail, wind, and leak repairs with exact-match shingles and flashing restoration.",
      startingPrice: "$299 Flat-Rate",
      planKey: "flatRate",
    },
    {
      id: "replacement",
      title: "Full Roof Replacement",
      summary: "Architectural shingle, standing-seam metal, and Class 4 impact-resistant systems backed by a 25-year warranty.",
      startingPrice: "$500 Deposit to Start",
      planKey: "deposit",
    },
    {
      id: "inspection",
      title: "Certified Roof Inspection",
      summary: "21-point physical and drone inspection for homeowners, real estate closings, and storm claims.",
      startingPrice: "$149 One-Time",
      planKey: "inspection",
    },
  ],

  reviews: [
    {
      name: "Marcus D.",
      location: "Round Rock, TX",
      service: "Full Roof Replacement",
      text: "Booked the $149 inspection, put down the $500 deposit online with Apple Pay, and paid the final invoice right after the crew finished cleanup. Zero paperwork headaches.",
    },
    {
      name: "Sarah K.",
      location: "Austin, TX",
      service: "Emergency Leak Repair",
      text: "Transparent $299 flat-rate repair. They sealed two cracked pipe boots the next morning before the rain hit.",
    },
    {
      name: "David & Elena R.",
      location: "Cedar Park, TX",
      service: "Storm Replacement",
      text: "Used Klarna right at checkout to split the balance. Best contractor experience we have had in 10 years.",
    },
  ],
};
