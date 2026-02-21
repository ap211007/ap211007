const hospitals = [
  {
    name: "CityCare Multispeciality Hospital",
    area: "Indiranagar",
    city: "Bengaluru",
    pincode: "560038",
    phone: "+91 80 4100 1100",
  },
  {
    name: "Green Valley Medical Center",
    area: "HSR Layout",
    city: "Bengaluru",
    pincode: "560102",
    phone: "+91 80 4200 2200",
  },
  {
    name: "Sunrise General Hospital",
    area: "Madhapur",
    city: "Hyderabad",
    pincode: "500081",
    phone: "+91 40 4300 3300",
  },
  {
    name: "Lifeline Emergency Hospital",
    area: "Andheri West",
    city: "Mumbai",
    pincode: "400058",
    phone: "+91 22 4400 4400",
  },
  {
    name: "Harmony Heart Institute",
    area: "Anna Nagar",
    city: "Chennai",
    pincode: "600040",
    phone: "+91 44 4500 5500",
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
  return [hospital.area, hospital.city, hospital.pincode, hospital.name]
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
    card.querySelector(".name").textContent = hospital.name;
    card.querySelector(".meta").textContent = `${hospital.area}, ${hospital.city} - ${hospital.pincode}`;

    const directionsLink = card.querySelector(".directions");
    directionsLink.href = mapLink(hospital);

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
