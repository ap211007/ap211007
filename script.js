const hospitals = [
  {
    name: "Sagar City Hospital",
    area: "Jayanagar",
    city: "Bengaluru",
    pincode: "560041",
    phone: "+91 80 4669 9999",
    website: "https://www.sagarhospitals.in",
    details: "24/7 emergency, ICU, cardiology, orthopedics, and diagnostic imaging.",
    image:
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "CityCare Multispeciality Hospital",
    area: "Indiranagar",
    city: "Bengaluru",
    pincode: "560038",
    phone: "+91 80 4100 1100",
    website: "https://www.citycare.example.com",
    details: "General medicine, trauma care, and family health checkups.",
    image:
      "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Green Valley Medical Center",
    area: "HSR Layout",
    city: "Bengaluru",
    pincode: "560102",
    phone: "+91 80 4200 2200",
    website: "https://www.greenvalleymedical.example.com",
    details: "Pediatrics, gynecology, and minimally invasive surgery.",
    image:
      "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Sunrise General Hospital",
    area: "Madhapur",
    city: "Hyderabad",
    pincode: "500081",
    phone: "+91 40 4300 3300",
    website: "https://www.sunrisegeneral.example.com",
    details: "Emergency care, pharmacy, and outpatient specialty clinics.",
    image:
      "https://images.unsplash.com/photo-1666214280391-8ff5bd3c0bf0?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Lifeline Emergency Hospital",
    area: "Andheri West",
    city: "Mumbai",
    pincode: "400058",
    phone: "+91 22 4400 4400",
    website: "https://www.lifelineemergency.example.com",
    details: "24-hour ambulance, critical care, and neurology support.",
    image:
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=600&q=80",
  },
];

const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const results = document.getElementById("results");
const statusText = document.getElementById("statusText");
const template = document.getElementById("hospitalCardTemplate");

function hospitalMatches(hospital, query) {
  if (!query) return true;
  const normalized = query.toLowerCase();
  return [
    hospital.area,
    hospital.city,
    hospital.pincode,
    hospital.name,
    hospital.details,
    hospital.website,
  ]
    .join(" ")
    .toLowerCase()
    .includes(normalized);
}

function mapLink(hospital) {
  const location = encodeURIComponent(`${hospital.name}, ${hospital.area}, ${hospital.city}`);
  return `https://www.google.com/maps/search/?api=1&query=${location}`;
}

function callLink(phone) {
  const digits = phone.replace(/[^\d+]/g, "");
  return `tel:${digits}`;
}

function render(list) {
  results.innerHTML = "";

  if (list.length === 0) {
    const empty = document.createElement("p");
    empty.className = "empty";
    empty.textContent = "No hospitals found for this area. Try another location.";
    results.appendChild(empty);
    return;
  }

  list.forEach((hospital) => {
    const card = template.content.firstElementChild.cloneNode(true);
    card.querySelector(".hospital-image").src = hospital.image;
    card.querySelector(".hospital-image").alt = `${hospital.name} hospital view`;
    card.querySelector(".name").textContent = hospital.name;
    card.querySelector(".meta").textContent = `${hospital.area}, ${hospital.city} - ${hospital.pincode}`;
    card.querySelector(".details").textContent = hospital.details;

    const directionsLink = card.querySelector(".directions");
    directionsLink.href = mapLink(hospital);

    const websiteLink = card.querySelector(".website");
    websiteLink.href = hospital.website;

    const callAnchor = card.querySelector(".call");
    callAnchor.href = callLink(hospital.phone);
    callAnchor.textContent = hospital.phone;

    results.appendChild(card);
  });
}

function applySearch() {
  const query = searchInput.value.trim();
  const filtered = hospitals.filter((hospital) => hospitalMatches(hospital, query));

  statusText.textContent = query
    ? `Found ${filtered.length} hospital(s) for "${query}".`
    : "Showing all hospitals.";

  render(filtered);
}

searchBtn.addEventListener("click", applySearch);
searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") applySearch();
});

render(hospitals);
