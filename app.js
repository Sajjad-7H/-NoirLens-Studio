const categories = [
  "All",
  "Wedding",
  "Pre-Wedding",
  "Event",
  "Fashion",
  "Product",
  "Corporate",
  "Travel",
  "Wildlife",
  "Portrait"
];

const seedGalleryItems = [
  { title: "Velvet vows", category: "Wedding", control: "Downloads gated", height: 360 },
  { title: "Rainlit promise", category: "Pre-Wedding", control: "Share enabled", height: 260 },
  { title: "Launch night", category: "Event", control: "Watermarked", height: 420 },
  { title: "Chrome editorial", category: "Fashion", control: "Downloads gated", height: 310 },
  { title: "Ceramic campaign", category: "Product", control: "Share enabled", height: 240 },
  { title: "Boardroom light", category: "Corporate", control: "Private preview", height: 380 },
  { title: "Alpine hour", category: "Travel", control: "Share enabled", height: 300 },
  { title: "Silent forest", category: "Wildlife", control: "Downloads gated", height: 430 },
  { title: "Window portrait", category: "Portrait", control: "Watermarked", height: 270 }
];

let galleryItems = loadGalleryItems();

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
  { title: "Event shortlist", rating: 5, image: "", watermark: true },
  { title: "Product proofs", rating: 4, image: "", watermark: true },
  { title: "Client favorites", rating: 5, image: "", watermark: true },
  { title: "Final review", rating: 4, image: "", watermark: true }
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

let cartItems = loadCartItems();

const adminModules = [
  "Dashboard Analytics",
  "Website Content",
  "Portfolio Projects",
  "Booking Calendar",
  "Clients",
  "Private Galleries",
  "Store Orders",
  "Blog Posts",
  "Testimonials",
  "SEO Tools",
  "Theme Builder",
  "User Roles"
];

const modules = [
  "Change all text",
  "Change all images",
  "Create pages",
  "Enable sections",
  "Reorder sections",
  "Manage coupons",
  "Generate invoices",
  "Moderate comments",
  "AI image tagging",
  "AI SEO generator",
  "AI blog writer",
  "Inquiry assistant"
];

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

const qs = (selector) => document.querySelector(selector);
const qsa = (selector) => [...document.querySelectorAll(selector)];
const adminEmail = "admin@gmail.com";
const adminPassword = "admin";

const categoryTabs = qs("#categoryTabs");
const galleryGrid = qs("#galleryGrid");
const gallerySearch = qs("#gallerySearch");
let activeCategory = "All";

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[char]);
}

function loadGalleryItems() {
  try {
    const uploaded = JSON.parse(localStorage.getItem("nl-uploaded-gallery") || "[]");
    return [...seedGalleryItems, ...(Array.isArray(uploaded) ? uploaded : [])];
  } catch {
    return [...seedGalleryItems];
  }
}

function loadSiteContent() {
  try {
    return { ...defaultSiteContent, ...JSON.parse(localStorage.getItem("nl-site-content") || "{}") };
  } catch {
    return { ...defaultSiteContent };
  }
}

function loadPaymentMethods() {
  try {
    const stored = JSON.parse(localStorage.getItem("nl-payment-methods") || "[]");
    return Array.isArray(stored) && stored.length ? stored : defaultPaymentMethods;
  } catch {
    return defaultPaymentMethods;
  }
}

function loadPricingPlans() {
  try {
    const stored = JSON.parse(localStorage.getItem("nl-pricing-plans") || "[]");
    const plans = Array.isArray(stored) && stored.length ? stored : defaultPricingPlans;
    return plans.map(withBdtPrice);
  } catch {
    return defaultPricingPlans.map(withBdtPrice);
  }
}

function loadList(key, fallback) {
  try {
    const stored = JSON.parse(localStorage.getItem(key) || "[]");
    return Array.isArray(stored) && stored.length ? stored : fallback;
  } catch {
    return fallback;
  }
}

function loadStoreProducts() {
  return loadList("nl-store-products", defaultStoreProducts);
}

function loadProofItems() {
  return loadList("nl-proof-items", defaultProofItems);
}

function loadBlogPosts() {
  return loadList("nl-blog-posts", defaultBlogPosts);
}

function loadSocialLinks() {
  return loadList("nl-social-links", defaultSocialLinks);
}

function withBdtPrice(plan) {
  if (plan.bdtPrice) return plan;
  const amount = Number(String(plan.price || "").replace(/[^0-9.]/g, ""));
  if (!amount) return { ...plan, bdtPrice: "BDT custom quote" };
  return { ...plan, bdtPrice: `BDT ${Math.round(amount * 120).toLocaleString("en-US")}` };
}

function saveUploadedGallery(items) {
  const uploaded = items.filter((item) => item.uploaded);
  localStorage.setItem("nl-uploaded-gallery", JSON.stringify(uploaded));
}

function loadBookings() {
  try {
    const stored = JSON.parse(localStorage.getItem("nl-client-bookings") || "[]");
    return Array.isArray(stored) ? stored : [];
  } catch {
    return [];
  }
}

function saveBooking(booking) {
  const bookings = loadBookings();
  bookings.unshift(booking);
  localStorage.setItem("nl-client-bookings", JSON.stringify(bookings));
}

function loadCartItems() {
  try {
    const stored = JSON.parse(localStorage.getItem("nl-store-cart") || "[]");
    return Array.isArray(stored) ? stored : [];
  } catch {
    return [];
  }
}

function saveCartItems() {
  localStorage.setItem("nl-store-cart", JSON.stringify(cartItems));
}

function priceToNumber(price) {
  return Number(String(price).replace(/[^0-9.]/g, "")) || 0;
}

function renderCategories() {
  categoryTabs.innerHTML = categories
    .map((category) => `<button type="button" class="${category === activeCategory ? "active" : ""}" data-category="${category}">${category}</button>`)
    .join("");
}

function renderGallery() {
  const term = gallerySearch.value.trim().toLowerCase();
  const filtered = galleryItems.filter(({ title, category }) => {
    const matchesCategory = activeCategory === "All" || category === activeCategory;
    const matchesSearch = !term || `${title} ${category}`.toLowerCase().includes(term);
    return matchesCategory && matchesSearch;
  });

  galleryGrid.innerHTML = filtered
    .map(({ title, category, control, height, image }) => `
      <article class="gallery-card">
        <button class="image-tile" style="--tile-height:${height}px; ${image ? `background-image: linear-gradient(135deg, rgba(0,0,0,0.08), rgba(0,0,0,0.34)), url('${image}')` : ""}" type="button" data-title="${escapeHtml(title)}" data-category="${escapeHtml(category)}" data-image="${image || ""}" aria-label="Open ${escapeHtml(title)} preview">
          <span class="download-chip">${escapeHtml(control)}</span>
        </button>
        <footer>
          <div>
            <strong>${escapeHtml(title)}</strong><br />
            <small>${escapeHtml(category)}</small>
          </div>
          <small>Share</small>
        </footer>
      </article>
    `)
    .join("");
}

function renderPricing() {
  const plans = loadPricingPlans();
  qs("#pricingGrid").innerHTML = plans
    .map((plan) => `
      <article class="price-card">
        <h3>${escapeHtml(plan.title)}</h3>
        <div class="price-lines">
          <strong>${escapeHtml(plan.price)}</strong>
          <span>${escapeHtml(plan.bdtPrice)}</span>
        </div>
        <ul>${(plan.points || []).map((point) => `<li>${escapeHtml(point)}</li>`).join("")}</ul>
        <a class="secondary-action" href="#booking">Book now</a>
      </article>
    `)
    .join("");
}

function renderProofing() {
  const items = loadProofItems();
  qs("#proofGallery").innerHTML = items.map((item, index) => `
    <button class="proof-tile" style="${item.image ? `background-image:linear-gradient(135deg, rgba(0,0,0,.08), rgba(0,0,0,.28)), url('${item.image}')` : ""}" type="button" aria-label="Select ${escapeHtml(item.title)}">
      ${item.watermark ? `<span class="watermark">NoirLens proof</span>` : ""}
      <span class="proof-rating">Rating ${escapeHtml(item.rating || 0)}/5</span>
    </button>
  `).join("");
  qs("#proofStatus").textContent = `${items.length} images awaiting selection.`;
}

function renderStore() {
  const products = loadStoreProducts();
  qs("#storeGrid").innerHTML = products
    .map(({ title, price, description, image }, index) => `
      <article class="product-card">
        <div class="product-media" style="${image ? `background-image:linear-gradient(135deg, rgba(0,0,0,.08), rgba(0,0,0,.28)), url('${image}')` : ""}" aria-hidden="true"></div>
        <div>
          <span>${escapeHtml(description)}</span>
          <h3>${escapeHtml(title)}</h3>
          <strong>${escapeHtml(price)}</strong>
          <button class="secondary-action add-to-cart" data-index="${index}" type="button">Add to Cart</button>
        </div>
      </article>
    `)
    .join("");
}

function renderCart() {
  if (!qs("#cartItems")) return;
  const grouped = cartItems.reduce((acc, item) => {
    const key = item.title;
    acc[key] ||= { ...item, quantity: 0 };
    acc[key].quantity += 1;
    return acc;
  }, {});
  const items = Object.values(grouped);
  const total = cartItems.reduce((sum, item) => sum + priceToNumber(item.price), 0);

  qs("#cartCount").textContent = cartItems.length;
  qs("#cartTotal").textContent = `$${total.toLocaleString("en-US")}`;
  qs("#cartItems").innerHTML = items.length
    ? items.map((item) => `
      <article class="cart-item">
        <div>
          <strong>${escapeHtml(item.title)}</strong>
          <small>${escapeHtml(item.price)} x ${item.quantity}</small>
        </div>
        <span>${escapeHtml(item.description)}</span>
      </article>
    `).join("")
    : `<p class="muted">Cart empty. Click Add to Cart from any product.</p>`;
}

function addToCart(index) {
  const { title, price, description } = loadStoreProducts()[index];
  cartItems.push({ title, price, description });
  saveCartItems();
  renderCart();
}

function renderBlogPosts() {
  const list = qs("#blogList");
  if (!list) return;
  list.innerHTML = loadBlogPosts().map((post) => `
    <article>
      <span>${escapeHtml(post.category)}</span>
      <strong>${escapeHtml(post.title)}</strong>
      <p>${escapeHtml(post.excerpt || "")}</p>
    </article>
  `).join("");
}

function renderSocialLinks() {
  const list = qs("#socialLinks");
  if (!list) return;
  list.innerHTML = loadSocialLinks().map((link) => `
    <a href="${escapeHtml(link.url)}" target="_blank" rel="noreferrer">${escapeHtml(link.name)}</a>
  `).join("");
}

function renderAdmin() {
  if (!qs("#adminMenu")) return;
  qs("#adminMenu").innerHTML = adminModules
    .map((module, index) => `<button class="${index === 0 ? "active" : ""}" type="button">${module}</button>`)
    .join("");
  qs("#moduleGrid").innerHTML = modules
    .map((module) => `<article class="module-card"><strong>${module}</strong><p class="muted">Enabled and editable from the admin workspace.</p></article>`)
    .join("");
  renderUploadedList();
  setAdminState(sessionStorage.getItem("nl-admin-auth") === "true");
}

function renderUploadedList() {
  if (!qs("#uploadedList")) return;
  const uploaded = galleryItems.filter((item) => item.uploaded);
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

function setAdminState(isLoggedIn) {
  if (!qs("#adminLoginPanel") || !qs("#adminDashboard")) return;
  qs("#adminLoginPanel").hidden = isLoggedIn;
  qs("#adminDashboard").classList.toggle("is-locked", !isLoggedIn);
  qs("#adminLoginStatus").textContent = "";
}

function renderSiteContent() {
  const content = loadSiteContent();
  qsa(".brand span:last-child").forEach((item) => {
    item.textContent = content.brand;
  });
  const footerBrand = qs(".site-footer span:first-child");
  if (footerBrand) footerBrand.textContent = content.brand;
  const eyebrow = qs(".hero-content .eyebrow");
  if (eyebrow) eyebrow.textContent = content.eyebrow;
  const headline = qs(".hero-content h1");
  if (headline) headline.textContent = content.headline;
  const subtitle = qs(".hero-content p:not(.eyebrow)");
  if (subtitle) subtitle.textContent = content.subtitle;
  const contactTitle = qs(".contact-section h2");
  if (contactTitle) contactTitle.textContent = content.contactTitle;
}

function renderPaymentMethods() {
  const grid = qs("#paymentGrid");
  if (!grid) return;
  const methods = loadPaymentMethods().filter((method) => method.active);
  grid.innerHTML = methods.map((method) => `
    <article class="payment-card">
      <span>${escapeHtml(method.type || "Merchant")}</span>
      <strong>${escapeHtml(method.name)}</strong>
      <small>${escapeHtml(method.number)}</small>
    </article>
  `).join("");
}

function openLightbox(tile) {
  qs("#lightboxTitle").textContent = tile.dataset.title;
  qs("#lightboxMeta").textContent = `${tile.dataset.category} gallery - fullscreen preview, sharing, and download rules available.`;
  if (tile.dataset.image) {
    qs("#lightboxImage").style.backgroundImage = `linear-gradient(135deg, rgba(0,0,0,0.08), rgba(0,0,0,0.34)), url('${tile.dataset.image}')`;
  } else {
    qs("#lightboxImage").style.backgroundImage = "";
  }
  qs("#lightbox").showModal();
}

function readPhotoAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error("Could not read the selected photo."));
    reader.readAsDataURL(file);
  });
}

function restoreTheme() {
  const savedMode = localStorage.getItem("nl-mode");
  if (savedMode === "light") document.body.classList.add("light");
  const savedColors = JSON.parse(localStorage.getItem("nl-colors") || "{}");
  Object.entries(savedColors).forEach(([name, value]) => document.documentElement.style.setProperty(name, value));
}

function bindEvents() {
  qs("#menuToggle").addEventListener("click", () => qs("#mobileNav").classList.toggle("open"));
  qsa(".mobile-nav a").forEach((link) => link.addEventListener("click", () => qs("#mobileNav").classList.remove("open")));

  qs("#modeToggle").addEventListener("click", () => {
    document.body.classList.toggle("light");
    localStorage.setItem("nl-mode", document.body.classList.contains("light") ? "light" : "dark");
  });

  categoryTabs.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-category]");
    if (!button) return;
    activeCategory = button.dataset.category;
    renderCategories();
    renderGallery();
  });

  gallerySearch.addEventListener("input", renderGallery);

  galleryGrid.addEventListener("click", (event) => {
    const tile = event.target.closest(".image-tile");
    if (tile) openLightbox(tile);
  });

  qs("#storeGrid").addEventListener("click", (event) => {
    const button = event.target.closest(".add-to-cart");
    if (!button) return;
    addToCart(Number(button.dataset.index));
    button.textContent = "Added";
    window.setTimeout(() => {
      button.textContent = "Add to Cart";
    }, 900);
  });

  qs("#clearCart").addEventListener("click", () => {
    cartItems = [];
    saveCartItems();
    renderCart();
  });

  qs("#closeLightbox").addEventListener("click", () => qs("#lightbox").close());
  qs("#shareImage").addEventListener("click", async () => {
    const title = qs("#lightboxTitle").textContent;
    const message = `${title} from NoirLens Studio`;
    if (navigator.share) {
      await navigator.share({ title, text: message });
    } else {
      await navigator.clipboard.writeText(message);
      qs("#lightboxMeta").textContent = "Share text copied to clipboard.";
    }
  });

  qs("#bookingForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const booking = {
      id: `BK-${Date.now()}`,
      service: String(data.get("service")),
      date: String(data.get("date")),
      time: String(data.get("time")),
      name: String(data.get("name")),
      email: String(data.get("email")),
      phone: String(data.get("phone")),
      status: "Pending",
      createdAt: new Date().toLocaleString()
    };
    saveBooking(booking);
    qs("#bookingConfirmation").textContent = `Booking request confirmed for ${data.get("service")} on ${data.get("date")} at ${data.get("time")}. A secure payment link and invoice would be generated next.`;
    event.currentTarget.reset();
  });

  qs("#proofGallery").addEventListener("click", (event) => {
    const tile = event.target.closest(".proof-tile");
    if (!tile) return;
    tile.classList.toggle("selected");
    const selected = qsa(".proof-tile.selected").length;
    qs("#proofStatus").textContent = `${selected} image${selected === 1 ? "" : "s"} selected for final edits.`;
  });

  qs("#submitFeedback").addEventListener("click", () => {
    const feedback = qs("#proofFeedback").value.trim();
    qs("#proofStatus").textContent = feedback ? "Feedback submitted to the photographer." : "Add feedback before submitting.";
  });

  qsa("[data-color-var]").forEach((input) => {
    input.addEventListener("input", () => {
      document.documentElement.style.setProperty(input.dataset.colorVar, input.value);
      const colors = JSON.parse(localStorage.getItem("nl-colors") || "{}");
      colors[input.dataset.colorVar] = input.value;
      localStorage.setItem("nl-colors", JSON.stringify(colors));
    });
  });

  if (!qs("#adminMenu")) return;

  qs("#applyHeadline").addEventListener("click", () => {
    qs(".hero-content h1").textContent = qs("#headlineEditor").value || "NoirLens Studio";
  });

  qs("#adminMenu").addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (!button) return;
    qsa("#adminMenu button").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
  });

  qs("#adminLoginForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = String(data.get("email")).trim().toLowerCase();
    const password = String(data.get("password"));
    if (email === adminEmail && password === adminPassword) {
      sessionStorage.setItem("nl-admin-auth", "true");
      setAdminState(true);
      qs("#adminDashboard").scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    qs("#adminLoginStatus").textContent = "Wrong email or password. Use admin@gmail.com / admin for this demo.";
  });

  qs("#adminLogout").addEventListener("click", () => {
    sessionStorage.removeItem("nl-admin-auth");
    setAdminState(false);
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
    const newItem = {
      title: String(data.get("title")).trim() || "Admin uploaded photo",
      category: String(data.get("category")),
      control: "Admin upload",
      height: 320,
      image,
      uploaded: true
    };

    try {
      galleryItems.push(newItem);
      saveUploadedGallery(galleryItems);
    } catch {
      galleryItems = galleryItems.filter((item) => item !== newItem);
      qs("#uploadStatus").textContent = "This image is too large for browser demo storage. Try a smaller photo.";
      return;
    }

    renderGallery();
    renderUploadedList();
    event.currentTarget.reset();
    qs("#uploadStatus").textContent = "Photo uploaded and published to the portfolio gallery.";
  });
}

restoreTheme();
renderSiteContent();
renderCategories();
renderGallery();
renderPricing();
renderProofing();
renderStore();
renderCart();
renderBlogPosts();
renderSocialLinks();
renderAdmin();
renderPaymentMethods();
bindEvents();
