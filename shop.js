const categoryLabels = {
  shirts: "Tees",
  hoodies: "Hoodies",
  sweaters: "Sweaters",
  polos: "Polos",
  pants: "Pants",
  shorts: "Shorts",
  footwear: "Footwear",
  headwear: "Headwear",
  mens: "Men's",
  womens: "Women's",
};
const requestedCategory = new URLSearchParams(location.search).get("category");
const collectionCategory = Object.hasOwn(categoryLabels, requestedCategory) ? requestedCategory : "hoodies";
const collectionProducts = products.filter((product) => product.category === collectionCategory);
const isShirtCollection = collectionCategory === "shirts";
const collectionLabel = categoryLabels[collectionCategory];

document.title = `FLYEST — ${collectionLabel}`;
document.getElementById("shopTitle").textContent = collectionProducts.length
  ? `${collectionLabel} Collection`
  : collectionLabel;
document.getElementById("shopIntro").textContent = collectionProducts.length
  ? isShirtCollection
    ? "Graphic staples and everyday essentials. Find your new favorite tee."
    : "Heavyweight comfort. A statement in every color. Made to move with you."
  : `The ${collectionLabel.toLowerCase()} collection is coming soon.`;
document.getElementById("shopCount").textContent = collectionProducts.length
  ? `${collectionProducts.length} ${collectionProducts.length === 1 ? "STYLE" : "STYLES"}`
  : "COMING SOON";
const shopGrid = document.getElementById("shopGrid");
const emptyState = document.getElementById("shopEmpty");
emptyState.hidden = collectionProducts.length > 0;
collectionProducts.forEach((product) => {
  const card = document.createElement("a");
  card.className = "card shop-card";
  card.href = `${product.category === "shirts" ? "shirt" : "hoodie"}.html?id=${encodeURIComponent(product.id)}`;
  card.innerHTML = `
    <div class="card-img">
      ${product.isSoldOut ? '<span class="product-badge product-badge-soldout">SOLD OUT</span>' : ""}
      ${product.isNewRelease ? '<span class="product-badge">NEW RELEASE</span>' : ""}
      ${product.salePrice ? '<span class="product-badge product-badge-sale">BER-MONTH SALE</span>' : ""}
    </div>
    <div class="card-meta">
      <div class="card-name">${product.name}</div>
      <div class="card-price price-row">${formatProductPrice(product)}</div>
    </div>
    <div class="card-cta">${product.isSoldOut ? "SOLD OUT" : "VIEW PRODUCT ↗"}</div>`;
  const image = card.querySelector(".card-img");
  if (product.backImage) image.appendChild(createShirtPreview(product));
  else {
    const img = document.createElement("img");
    img.src = product.image;
    img.alt = product.name;
    img.loading = "lazy";
    image.appendChild(img);
  }
  shopGrid.appendChild(card);
});
