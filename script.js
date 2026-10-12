
"use strict";

// Sample internship data for this frontend milestone.
// These are fictional demo listings, not verified job vacancies.
const internships = [
  {
    id: 1,
    role: "Frontend Developer Intern",
    company: "PixelCraft Labs",
    domain: "Web Development",
    location: "Remote",
    stipend: "₹10,000/month",
    duration: "3 months",
    description:
      "Build responsive web interfaces and learn modern frontend development practices.",
    applyUrl: "https://example.com/apply/1"
  },
  {
    id: 2,
    role: "AI/ML Intern",
    company: "NeuralNest",
    domain: "AI/ML",
    location: "Hyderabad",
    stipend: "₹15,000/month",
    duration: "6 months",
    description:
      "Explore machine learning models, prepare datasets, and experiment with AI solutions.",
    applyUrl: "https://example.com/apply/2"
  },
  {
    id: 3,
    role: "Data Science Intern",
    company: "Insight Analytics",
    domain: "Data Science",
    location: "Remote",
    stipend: "₹12,000/month",
    duration: "4 months",
    description:
      "Analyze datasets, create visualizations, and discover meaningful business insights.",
    applyUrl: "https://example.com/apply/3"
  },
  {
    id: 4,
    role: "Cybersecurity Intern",
    company: "SecureByte",
    domain: "Cybersecurity",
    location: "Bengaluru",
    stipend: "₹18,000/month",
    duration: "3 months",
    description:
      "Learn security fundamentals, identify common vulnerabilities, and practice defensive security.",
    applyUrl: "https://example.com/apply/4"
  },
  {
    id: 5,
    role: "UI/UX Design Intern",
    company: "DesignOrbit",
    domain: "UI/UX Design",
    location: "Hyderabad",
    stipend: "₹8,000/month",
    duration: "3 months",
    description:
      "Create wireframes, explore user journeys, and design intuitive digital experiences.",
    applyUrl: "https://example.com/apply/5"
  },
  {
    id: 6,
    role: "Full Stack Developer Intern",
    company: "CodeHarbor",
    domain: "Web Development",
    location: "Remote",
    stipend: "₹14,000/month",
    duration: "6 months",
    description:
      "Work with frontend interfaces, backend fundamentals, and database-driven applications.",
    applyUrl: "https://example.com/apply/6"
  },
  {
    id: 7,
    role: "Machine Learning Intern",
    company: "FutureMind AI",
    domain: "AI/ML",
    location: "Pune",
    stipend: "₹16,000/month",
    duration: "4 months",
    description:
      "Practice model training, feature engineering, and evaluation using sample datasets.",
    applyUrl: "https://example.com/apply/7"
  },
  {
    id: 8,
    role: "Data Analyst Intern",
    company: "MetricWorks",
    domain: "Data Science",
    location: "Remote",
    stipend: "₹9,000/month",
    duration: "3 months",
    description:
      "Clean data, build reports, and communicate insights using analytical tools.",
    applyUrl: "https://example.com/apply/8"
  },
  {
    id: 9,
    role: "Security Operations Intern",
    company: "ShieldPoint",
    domain: "Cybersecurity",
    location: "Hyderabad",
    stipend: "₹12,000/month",
    duration: "3 months",
    description:
      "Explore security monitoring, incident reporting, and basic threat detection.",
    applyUrl: "https://example.com/apply/9"
  }
];

// Cache the page elements.
const searchInput = document.querySelector("#search");
const domainSelect = document.querySelector("#domain");
const filterForm = document.querySelector("#filter-form");
const internshipGrid = document.querySelector("#internship-grid");
const resultsCount = document.querySelector("#results-count");
const statusMessage = document.querySelector("#status-message");
const errorMessage = document.querySelector("#error-message");
const retryButton = document.querySelector("#retry-button");

// Create an element and safely add text to it.
function createElement(tag, className, text = "") {
  const element = document.createElement(tag);

  if (className) {
    element.className = className;
  }

  element.textContent = text;
  return element;
}

// Display an empty-results or loading message.
function showStatus(title, description) {
  statusMessage.replaceChildren(
    createElement("h3", "", title),
    createElement("p", "", description)
  );

  statusMessage.hidden = false;
}

// Build one internship card from a data record.
function createInternshipCard(internship) {
  const card = createElement("article", "internship-card");
  const top = createElement("div", "card-top");

  const avatar = createElement(
    "div",
    "company-avatar",
    internship.company.charAt(0).toUpperCase()
  );
  avatar.setAttribute("aria-hidden", "true");

  const companyInfo = createElement("div", "company-info");
  companyInfo.append(
    createElement("p", "company-name", internship.company),
    createElement("span", "posted-label", "Demo listing")
  );

  top.append(avatar, companyInfo);

  const title = createElement("h3", "internship-title", internship.role);
  const domain = createElement("span", "domain-tag", internship.domain);
  const description = createElement(
    "p",
    "card-description",
    internship.description
  );

  const details = createElement("div", "card-details");

  const stipend = createElement("div", "detail");
  stipend.append(
    createElement("span", "detail-label", "Stipend"),
    createElement("span", "detail-value", internship.stipend)
  );

  const duration = createElement("div", "detail");
  duration.append(
    createElement("span", "detail-label", "Duration"),
    createElement("span", "detail-value", internship.duration)
  );

  details.append(stipend, duration);

  const bottom = createElement("div", "card-bottom");
  const location = createElement(
    "span",
    "location-label",
    `⌖ ${internship.location}`
  );

  const applyLink = createElement("a", "apply-link", "View details →");
  applyLink.href = internship.applyUrl;
  applyLink.target = "_blank";
  applyLink.rel = "noopener noreferrer";
  applyLink.setAttribute(
    "aria-label",
    `View details for ${internship.role} at ${internship.company}`
  );

  bottom.append(location, applyLink);
  card.append(top, title, domain, description, details, bottom);

  return card;
}

// Check that the demo records contain the fields we need.
function validateInternships(records) {
  if (!Array.isArray(records)) {
    throw new Error("Internship data must be an array.");
  }

  const requiredFields = [
    "id",
    "role",
    "company",
    "domain",
    "location",
    "stipend",
    "duration",
    "description",
    "applyUrl"
  ];

  records.forEach((record) => {
    const isValid =
      record &&
      requiredFields.every(
        (field) =>
          typeof record[field] === "string" ||
          (field === "id" && typeof record[field] === "number")
      );

    if (!isValid || !record.role.trim() || !record.company.trim()) {
      throw new Error("An internship record is missing required fields.");
    }

    // Only permit HTTPS links for the external details action.
    const url = new URL(record.applyUrl);

    if (url.protocol !== "https:") {
      throw new Error("An internship link is not a secure HTTPS URL.");
    }
  });
}

// Search and domain filters work together.
function getFilteredInternships() {
  const keyword = searchInput.value.trim().toLowerCase();
  const selectedDomain = domainSelect.value;

  return internships.filter((internship) => {
    const searchableText = [
      internship.role,
      internship.company,
      internship.domain,
      internship.location,
      internship.description
    ]
      .join(" ")
      .toLowerCase();

    const matchesKeyword = searchableText.includes(keyword);

    const matchesDomain =
      selectedDomain === "all" ||
      internship.domain === selectedDomain;

    return matchesKeyword && matchesDomain;
  });
}

// Render the filtered list.
function renderInternships() {
  internshipGrid.setAttribute("aria-busy", "true");
  statusMessage.hidden = true;
  errorMessage.hidden = true;
  internshipGrid.replaceChildren();

  try {
    validateInternships(internships);

    const filteredInternships = getFilteredInternships();

    resultsCount.textContent =
      `${filteredInternships.length} ` +
      `${filteredInternships.length === 1 ? "internship" : "internships"} found`;

    if (filteredInternships.length === 0) {
      showStatus(
        "No internships found",
        "Try another keyword or select a different domain."
      );
      return;
    }

    const cards = filteredInternships.map(createInternshipCard);
    internshipGrid.replaceChildren(...cards);
  } catch (error) {
    console.error("Unable to render internships:", error);

    resultsCount.textContent = "Unable to load internships";
    errorMessage.hidden = false;
    internshipGrid.replaceChildren();
  } finally {
    internshipGrid.setAttribute("aria-busy", "false");
  }
}

// Update results as the user types or changes the domain.
searchInput.addEventListener("input", renderInternships);
domainSelect.addEventListener("change", renderInternships);

// Reset both filters together.
filterForm.addEventListener("reset", (event) => {
  event.preventDefault();

  searchInput.value = "";
  domainSelect.value = "all";

  renderInternships();
});

// Allow retry after a rendering error.
retryButton.addEventListener("click", renderInternships);

// Keep the footer year current.
document.querySelector("#current-year").textContent =
  new Date().getFullYear();

// Initial page render.
renderInternships();
