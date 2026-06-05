const adminEmail = "admin@gmail.com";
const adminPassword = "admin";

const defaultSiteContent = {
  brand: "NoirLens Studio",
  eyebrow: "Luxury photography management suite",
  headline: "NoirLens Studio",
  subtitle: "Showcase premium work, book clients, proof private galleries, sell photo products, and manage the entire website from one locked admin panel.",
  contactTitle: "Inquiry form, map panel, WhatsApp CTA, social links, and live chat entry."
};

const defaultPaymentMethods = [
  { name: "bKash", number: "01700000000", type: "Merchant", active: true },
  { name: "Nagad", number: "01800000000", type: "Merchant", active: true },
  { name: "Rocket", number: "01900000000", type: "Merchant", active: true }
];

const defaultPricingPlans = [
  { title: "Wedding Signature", price: "$2,800", bdtPrice: "BDT 336,000", points: ["10 hours coverage", "Private proofing gallery", "Album design", "Invoice and payment tracking"] },
  { title: "Brand Campaign", price: "$1,650", bdtPrice: "BDT 198,000", points: ["Studio or location", "Commercial usage", "Shot list planning", "Fast review workflow"] },
  { title: "Custom Story", price: "Quote", bdtPrice: "BDT custom quote", points: ["Tailored brief", "Multi-day production", "Assistant team", "Priority delivery"] }
];

const defaultStoreProducts = [
  { title: "Fine Art Print", price: "$89", description: "Museum paper print", image: "" },
  { title: "Preset Collection", price: "$49", description: "Editorial color pack", image: "" },
  { title: "Wedding Album", price: "$340", description: "Linen-bound album", image: "" },
  { title: "Digital Gallery", price: "$120", description: "High-resolution set", image: "" }
];

const defaultProofItems = [
  { title: "Wedding proof set", rating: 5, image: "", watermark: true },
  { title: "Portrait selects", rating: 4, image: "", watermark: true },
  { title: "Event shortlist", rating: 5, image: "", watermark: true }
];

const defaultBlogPosts = [
  { category: "Photography Tips", title: "How to prepare for a winter wedding shoot", excerpt: "A calm checklist for timing, light, wardrobe, and client comfort." },
  { category: "Editing Tutorial", title: "Color grading skin tones in low light", excerpt: "Build a polished editorial look while keeping skin natural." },
  { category: "Event Story", title: "A brand launch built around motion and chrome", excerpt: "Behind the scenes from a high-energy commercial event." }
];

const defaultSocialLinks = [
  { name: "Facebook", url: "https://facebook.com" },
  { name: "Instagram", url: "https://instagram.com" },
  { name: "WhatsApp", url: "https://wa.me/8801700000000" },
  { name: "X", url: "https://x.com" }
];

const adminModules = [
  { label: "Dashboard Analytics", panel: "dashboard" },
  { label: "Website Content", panel: "content" },
  { label: "Portfolio Projects", panel: "portfolio" },
  { label: "Services & Pricing", panel: "pricing" },
  { label: "Booking Calendar", panel: "bookings" },
  { label: "Payment Gateway", panel: "payments" },
  { label: "Clients", panel: "clients" },
  { label: "Private Galleries", panel: "private-galleries" },
  { label: "Store Orders", panel: "orders" },
  { label: "Blog Posts", panel: "blog" },
  { label: "Testimonials", panel: "testimonials" },
  { label: "SEO Tools", panel: "seo" },
  { label: "Theme Builder", panel: "theme" },
  { label: "User Roles", panel: "roles" }
];

const modules = [
  "Change all text",
  "Change all images",
  "Upload portfolio photos",
  "Create pages",
  "Enable sections",
  "Reorder sections",
  "Manage bKash number",
  "Manage Nagad number",
  "Manage Rocket number",
  "Manage coupons",
  "Generate invoices",
  "AI SEO generator"
];

const qs = (selector) => document.querySelector(selector);
const qsa = (selector) => [...document.querySelectorAll(selector)];

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[char]);
}

function loadSiteContent() {
  try {
    return { ...defaultSiteContent, ...JSON.parse(localStorage.getItem("nl-site-content") || "{}") };
  } catch {
    return { ...defaultSiteContent };
  }
}

function saveSiteContent(content) {
  localStorage.setItem("nl-site-content", JSON.stringify(content));
}

function loadPaymentMethods() {
  try {
    const stored = JSON.parse(localStorage.getItem("nl-payment-methods") || "[]");
    return Array.isArray(stored) && stored.length ? stored : [...defaultPaymentMethods];
  } catch {
    return [...defaultPaymentMethods];
  }
}

function savePaymentMethods(methods) {
  localStorage.setItem("nl-payment-methods", JSON.stringify(methods));
}

function loadPricingPlans() {
  try {
    const stored = JSON.parse(localStorage.getItem("nl-pricing-plans") || "[]");
    const plans = Array.isArray(stored) && stored.length ? stored : [...defaultPricingPlans];
    return plans.map(withBdtPrice);
  } catch {
    return [...defaultPricingPlans].map(withBdtPrice);
  }
}

function withBdtPrice(plan) {
  if (plan.bdtPrice) return plan;
  return { ...plan, bdtPrice: usdToBdtPrice(plan.price) };
}

function usdToBdtPrice(price) {
  const amount = Number(String(price || "").replace(/[^0-9.]/g, ""));
  if (!amount) return "BDT custom quote";
  return `BDT ${Math.round(amount * 120).toLocaleString("en-US")}`;
}

function savePricingPlans(plans) {
  localStorage.setItem("nl-pricing-plans", JSON.stringify(plans));
}

function loadUploadedGallery() {
  try {
    const uploaded = JSON.parse(localStorage.getItem("nl-uploaded-gallery") || "[]");
    return Array.isArray(uploaded) ? uploaded : [];
  } catch {
    return [];
  }
}

function loadBookings() {
  try {
    const stored = JSON.parse(localStorage.getItem("nl-client-bookings") || "[]");
    return Array.isArray(stored) ? stored : [];
  } catch {
    return [];
  }
}

function saveUploadedGallery(items) {
  localStorage.setItem("nl-uploaded-gallery", JSON.stringify(items));
}

function loadList(key, fallback) {
  try {
    const stored = JSON.parse(localStorage.getItem(key) || "[]");
    return Array.isArray(stored) && stored.length ? stored : [...fallback];
  } catch {
    return [...fallback];
  }
}

function saveList(key, items) {
  localStorage.setItem(key, JSON.stringify(items));
}

function setAdminState(isLoggedIn) {
  qs("#adminLoginPanel").hidden = isLoggedIn;
  qs("#adminDashboard").classList.toggle("is-locked", !isLoggedIn);
  qs("#adminLoginStatus").textContent = "";
}

function restoreTheme() {
  const savedMode = localStorage.getItem("nl-mode");
  if (savedMode === "light") document.body.classList.add("light");
  const savedColors = JSON.parse(localStorage.getItem("nl-colors") || "{}");
  Object.entries(savedColors).forEach(([name, value]) => document.documentElement.style.setProperty(name, value));
}

function renderAdminMenu() {
  qs("#adminMenu").innerHTML = adminModules
    .map((module, index) => `<button class="${index === 0 ? "active" : ""}" data-panel="${module.panel}" type="button">${module.label}</button>`)
    .join("");
}

function showAdminPanel(panelName) {
  qsa(".admin-panel").forEach((panel) => {
    panel.hidden = panel.dataset.panel !== panelName;
  });
}

function renderModules() {
  qs("#moduleGrid").innerHTML = modules
    .map((module) => `<article class="module-card"><strong>${module}</strong><p class="muted">Editable from this admin dashboard.</p></article>`)
    .join("");
}

function renderContentForm() {
  const content = loadSiteContent();
  Object.entries(content).forEach(([name, value]) => {
    const field = qs(`[name="${name}"]`);
    if (field) field.value = value;
  });
}

function renderPaymentForm() {
  const methods = loadPaymentMethods();
  qs("#paymentForm").innerHTML = methods.map((method, index) => `
    <article class="payment-editor-row">
      <label>Name <input name="name" data-index="${index}" value="${escapeHtml(method.name)}" /></label>
      <label>Number <input name="number" data-index="${index}" value="${escapeHtml(method.number)}" /></label>
      <label>Type <input name="type" data-index="${index}" value="${escapeHtml(method.type || "Merchant")}" /></label>
      <label class="toggle-row"><input name="active" data-index="${index}" type="checkbox" ${method.active ? "checked" : ""} /> Active</label>
      <button class="secondary-action remove-payment" data-index="${index}" type="button">Remove</button>
    </article>
  `).join("");
}

function renderPricingForm() {
  const plans = loadPricingPlans();
  qs("#pricingForm").innerHTML = plans.map((plan, index) => `
    <article class="pricing-editor-row">
      <label>Package title <input name="title" data-index="${index}" value="${escapeHtml(plan.title)}" /></label>
      <label>USD price <input name="price" data-index="${index}" value="${escapeHtml(plan.price)}" /></label>
      <label>BDT price <input name="bdtPrice" data-index="${index}" value="${escapeHtml(plan.bdtPrice)}" /></label>
      <label>Features <textarea name="points" data-index="${index}">${escapeHtml((plan.points || []).join("\n"))}</textarea></label>
      <button class="secondary-action remove-pricing" data-index="${index}" type="button">Remove Package</button>
    </article>
  `).join("");
}

function renderUploadedList() {
  const uploaded = loadUploadedGallery();
  qs("#uploadCount").textContent = uploaded.length;
  qs("#uploadedList").innerHTML = uploaded.length
    ? uploaded.map((item) => `
      <article class="uploaded-item">
        <div class="uploaded-thumb" style="background-image:url('${item.image}')"></div>
        <div>
          <strong>${escapeHtml(item.title)}</strong><br />
          <small>${escapeHtml(item.category)}</small>
        </div>
      </article>
    `).join("")
    : `<p class="muted">No admin uploads yet.</p>`;
}

function renderBookings() {
  const bookings = loadBookings();
  qs("#bookingCount").textContent = bookings.length;
  qs("#bookingList").innerHTML = bookings.length
    ? bookings.map((booking) => `
      <article class="booking-card">
        <div>
          <strong>${escapeHtml(booking.service)}</strong>
          <span>${escapeHtml(booking.status || "Pending")}</span>
        </div>
        <p>${escapeHtml(booking.name)} - ${escapeHtml(booking.email)} - ${escapeHtml(booking.phone || "No phone")}</p>
        <small>${escapeHtml(booking.date)} at ${escapeHtml(booking.time)} | ${escapeHtml(booking.id)}</small>
      </article>
    `).join("")
    : `<p class="muted">No client bookings yet.</p>`;

  const uniqueClients = [...new Map(bookings.map((booking) => [booking.email, booking])).values()];
  qs("#clientList").innerHTML = uniqueClients.length
    ? uniqueClients.map((client) => `
      <article class="booking-card">
        <div>
          <strong>${escapeHtml(client.name)}</strong>
          <span>${escapeHtml(client.service)}</span>
        </div>
        <p>${escapeHtml(client.email)} - ${escapeHtml(client.phone || "No phone")}</p>
        <small>Last booking: ${escapeHtml(client.date)} at ${escapeHtml(client.time)}</small>
      </article>
    `).join("")
    : `<p class="muted">No clients yet. Booking submit korle ekhane show hobe.</p>`;
}

function renderProofAdmin() {
  const items = loadList("nl-proof-items", defaultProofItems);
  qs("#proofAdminForm").innerHTML = items.map((item, index) => `
    <article class="admin-editor-row">
      <label>Title <input name="title" data-kind="proof" data-index="${index}" value="${escapeHtml(item.title)}" /></label>
      <label>Rating <input name="rating" data-kind="proof" data-index="${index}" type="number" min="0" max="5" value="${escapeHtml(item.rating)}" /></label>
      <label class="toggle-row"><input name="watermark" data-kind="proof" data-index="${index}" type="checkbox" ${item.watermark ? "checked" : ""} /> Watermark</label>
      <label>Picture <input name="imageFile" data-kind="proof" data-index="${index}" type="file" accept="image/*" /></label>
      <button class="secondary-action remove-list-item" data-kind="proof" data-index="${index}" type="button">Remove</button>
    </article>
  `).join("");
}

function renderStoreAdmin() {
  const items = loadList("nl-store-products", defaultStoreProducts);
  qs("#storeAdminForm").innerHTML = items.map((item, index) => `
    <article class="admin-editor-row store-editor-row">
      <label>Product <input name="title" data-kind="store" data-index="${index}" value="${escapeHtml(item.title)}" /></label>
      <label>Price <input name="price" data-kind="store" data-index="${index}" value="${escapeHtml(item.price)}" /></label>
      <label>Description <input name="description" data-kind="store" data-index="${index}" value="${escapeHtml(item.description)}" /></label>
      <label>Picture <input name="imageFile" data-kind="store" data-index="${index}" type="file" accept="image/*" /></label>
      <button class="secondary-action remove-list-item" data-kind="store" data-index="${index}" type="button">Remove</button>
    </article>
  `).join("");
}

function renderBlogAdmin() {
  const items = loadList("nl-blog-posts", defaultBlogPosts);
  qs("#blogAdminForm").innerHTML = items.map((item, index) => `
    <article class="admin-editor-row blog-editor-row">
      <label>Category <input name="category" data-kind="blog" data-index="${index}" value="${escapeHtml(item.category)}" /></label>
      <label>Title <input name="title" data-kind="blog" data-index="${index}" value="${escapeHtml(item.title)}" /></label>
      <label>Excerpt <textarea name="excerpt" data-kind="blog" data-index="${index}">${escapeHtml(item.excerpt)}</textarea></label>
      <button class="secondary-action remove-list-item" data-kind="blog" data-index="${index}" type="button">Remove</button>
    </article>
  `).join("");
}

function renderSocialAdmin() {
  const items = loadList("nl-social-links", defaultSocialLinks);
  qs("#socialAdminForm").innerHTML = items.map((item, index) => `
    <article class="admin-editor-row social-editor-row">
      <label>Name <input name="name" data-kind="social" data-index="${index}" value="${escapeHtml(item.name)}" /></label>
      <label>Link <input name="url" data-kind="social" data-index="${index}" value="${escapeHtml(item.url)}" /></label>
      <button class="secondary-action remove-list-item" data-kind="social" data-index="${index}" type="button">Remove</button>
    </article>
  `).join("");
}

function readPhotoAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error("Could not read the selected photo."));
    reader.readAsDataURL(file);
  });
}

function getListConfig(kind) {
  return {
    proof: { key: "nl-proof-items", fallback: defaultProofItems, render: renderProofAdmin, status: "#proofAdminStatus" },
    store: { key: "nl-store-products", fallback: defaultStoreProducts, render: renderStoreAdmin, status: "#storeAdminStatus" },
    blog: { key: "nl-blog-posts", fallback: defaultBlogPosts, render: renderBlogAdmin, status: "#blogAdminStatus" },
    social: { key: "nl-social-links", fallback: defaultSocialLinks, render: renderSocialAdmin, status: "#socialAdminStatus" }
  }[kind];
}

function updateListItem(target) {
  const config = getListConfig(target.dataset.kind);
  if (!config) return;
  const items = loadList(config.key, config.fallback);
  const item = items[Number(target.dataset.index)];
  item[target.name] = target.type === "checkbox" ? target.checked : target.value;
  saveList(config.key, items);
  qs(config.status).textContent = "Saved. Public website refresh korle update dekhabe.";
}

async function updateListImage(target) {
  const file = target.files && target.files[0];
  if (!file) return;
  const config = getListConfig(target.dataset.kind);
  if (!config) return;
  const items = loadList(config.key, config.fallback);
  items[Number(target.dataset.index)].image = await readPhotoAsDataUrl(file);
  saveList(config.key, items);
  qs(config.status).textContent = "Picture saved.";
}

function removeListItem(button) {
  const config = getListConfig(button.dataset.kind);
  if (!config) return;
  const items = loadList(config.key, config.fallback);
  items.splice(Number(button.dataset.index), 1);
  saveList(config.key, items);
  config.render();
  qs(config.status).textContent = "Removed.";
}

function bindEvents() {
  qs("#modeToggle").addEventListener("click", () => {
    document.body.classList.toggle("light");
    localStorage.setItem("nl-mode", document.body.classList.contains("light") ? "light" : "dark");
  });

  qs("#adminLoginForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = String(data.get("email")).trim().toLowerCase();
    const password = String(data.get("password"));
    if (email === adminEmail && password === adminPassword) {
      sessionStorage.setItem("nl-admin-auth", "true");
      setAdminState(true);
      return;
    }
    qs("#adminLoginStatus").textContent = "Wrong email or password. Use admin@gmail.com / admin.";
  });

  qs("#adminLogout").addEventListener("click", () => {
    sessionStorage.removeItem("nl-admin-auth");
    setAdminState(false);
  });

  qs("#contentForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    saveSiteContent({
      brand: String(data.get("brand")).trim() || defaultSiteContent.brand,
      eyebrow: String(data.get("eyebrow")).trim() || defaultSiteContent.eyebrow,
      headline: String(data.get("headline")).trim() || defaultSiteContent.headline,
      subtitle: String(data.get("subtitle")).trim() || defaultSiteContent.subtitle,
      contactTitle: String(data.get("contactTitle")).trim() || defaultSiteContent.contactTitle
    });
    qs("#contentStatus").textContent = "Content saved. Public website refresh korle update dekhabe.";
  });

  qs("#paymentForm").addEventListener("input", (event) => {
    const target = event.target;
    if (!target.dataset.index) return;
    const methods = loadPaymentMethods();
    const method = methods[Number(target.dataset.index)];
    method[target.name] = target.type === "checkbox" ? target.checked : target.value;
    savePaymentMethods(methods);
    qs("#paymentStatus").textContent = "Payment gateway saved.";
  });

  qs("#pricingForm").addEventListener("input", (event) => {
    const target = event.target;
    if (!target.dataset.index) return;
    const plans = loadPricingPlans();
    const plan = plans[Number(target.dataset.index)];
    if (target.name === "points") {
      plan.points = target.value.split(/\r?\n/).map((point) => point.trim()).filter(Boolean);
    } else if (target.name === "price") {
      plan.price = target.value;
      plan.bdtPrice = usdToBdtPrice(target.value);
      const bdtField = qs(`#pricingForm [name="bdtPrice"][data-index="${target.dataset.index}"]`);
      if (bdtField) bdtField.value = plan.bdtPrice;
    } else {
      plan[target.name] = target.value;
    }
    savePricingPlans(plans);
    qs("#pricingStatus").textContent = "Pricing saved. Public website refresh korle update dekhabe.";
  });

  qs("#pricingForm").addEventListener("click", (event) => {
    const button = event.target.closest(".remove-pricing");
    if (!button) return;
    const plans = loadPricingPlans();
    plans.splice(Number(button.dataset.index), 1);
    savePricingPlans(plans);
    renderPricingForm();
    qs("#pricingStatus").textContent = "Package removed.";
  });

  qs("#addPricingPlan").addEventListener("click", () => {
    const plans = loadPricingPlans();
    plans.push({
      title: "New Photography Package",
      price: "$999",
      bdtPrice: "BDT 119,880",
      points: ["Service detail one", "Service detail two", "Client proofing included"]
    });
    savePricingPlans(plans);
    renderPricingForm();
    qs("#pricingStatus").textContent = "New package added.";
  });

  qs("#paymentForm").addEventListener("click", (event) => {
    const button = event.target.closest(".remove-payment");
    if (!button) return;
    const methods = loadPaymentMethods();
    methods.splice(Number(button.dataset.index), 1);
    savePaymentMethods(methods);
    renderPaymentForm();
    qs("#paymentStatus").textContent = "Payment method removed.";
  });

  qs("#addPaymentMethod").addEventListener("click", () => {
    const methods = loadPaymentMethods();
    methods.push({ name: "New Method", number: "01XXXXXXXXX", type: "Personal", active: true });
    savePaymentMethods(methods);
    renderPaymentForm();
    qs("#paymentStatus").textContent = "New payment method added.";
  });

  qsa(".admin-list-editor").forEach((form) => {
    form.addEventListener("input", (event) => {
      const target = event.target;
      if (!target.dataset.kind || target.type === "file") return;
      updateListItem(target);
    });
    form.addEventListener("change", async (event) => {
      const target = event.target;
      if (!target.dataset.kind || target.type !== "file") return;
      await updateListImage(target);
    });
    form.addEventListener("click", (event) => {
      const button = event.target.closest(".remove-list-item");
      if (button) removeListItem(button);
    });
  });

  qs("#addProofItem").addEventListener("click", () => {
    const items = loadList("nl-proof-items", defaultProofItems);
    items.push({ title: "New proof image", rating: 5, image: "", watermark: true });
    saveList("nl-proof-items", items);
    renderProofAdmin();
  });

  qs("#addStoreProduct").addEventListener("click", () => {
    const items = loadList("nl-store-products", defaultStoreProducts);
    items.push({ title: "New Product", price: "$99", description: "Product description", image: "" });
    saveList("nl-store-products", items);
    renderStoreAdmin();
  });

  qs("#addBlogPost").addEventListener("click", () => {
    const items = loadList("nl-blog-posts", defaultBlogPosts);
    items.push({ category: "New Category", title: "New blog title", excerpt: "Short professional blog excerpt." });
    saveList("nl-blog-posts", items);
    renderBlogAdmin();
  });

  qs("#addSocialLink").addEventListener("click", () => {
    const items = loadList("nl-social-links", defaultSocialLinks);
    items.push({ name: "New Link", url: "https://" });
    saveList("nl-social-links", items);
    renderSocialAdmin();
  });

  qs("#photoUploadForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const file = data.get("photo");
    if (!(file instanceof File) || !file.type.startsWith("image/")) {
      qs("#uploadStatus").textContent = "Please choose a valid image file.";
      return;
    }
    qs("#uploadStatus").textContent = "Uploading photo...";
    const image = await readPhotoAsDataUrl(file);
    const uploaded = loadUploadedGallery();
    uploaded.push({
      title: String(data.get("title")).trim() || "Admin uploaded photo",
      category: String(data.get("category")),
      control: "Admin upload",
      height: 320,
      image,
      uploaded: true
    });
    try {
      saveUploadedGallery(uploaded);
    } catch {
      qs("#uploadStatus").textContent = "Image too large for browser storage. Try a smaller photo.";
      return;
    }
    event.currentTarget.reset();
    renderUploadedList();
    qs("#uploadStatus").textContent = "Photo uploaded and published to public gallery.";
  });

  qsa("[data-color-var]").forEach((input) => {
    input.addEventListener("input", () => {
      document.documentElement.style.setProperty(input.dataset.colorVar, input.value);
      const colors = JSON.parse(localStorage.getItem("nl-colors") || "{}");
      colors[input.dataset.colorVar] = input.value;
      localStorage.setItem("nl-colors", JSON.stringify(colors));
    });
  });

  qs("#adminMenu").addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (!button) return;
    qsa("#adminMenu button").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    showAdminPanel(button.dataset.panel);
    if (button.dataset.panel === "bookings" || button.dataset.panel === "clients" || button.dataset.panel === "dashboard") {
      renderBookings();
    }
  });
}

restoreTheme();
renderAdminMenu();
renderModules();
renderContentForm();
renderPricingForm();
renderPaymentForm();
renderUploadedList();
renderBookings();
renderProofAdmin();
renderStoreAdmin();
renderBlogAdmin();
renderSocialAdmin();
showAdminPanel("dashboard");
setAdminState(sessionStorage.getItem("nl-admin-auth") === "true");
bindEvents();
