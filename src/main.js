let shop = document.getElementById("shop");

/**
 * ! Basket to hold all the selected items
 * ? the getItem part is retrieving data from the local storage
 * ? if local storage is blank, basket becomes an empty array
 */

let basket = JSON.parse(localStorage.getItem("data")) || [];

/**
 * ! Generates the shop with product cards composed of
 * ! images, title, price, buttons, description
 */

// //const itemContainer = document.getElementById("item-list");
// const searchInput = document.getElementById("search-box");

// // Trigger function every time search text is changed
// searchInput.onkeyup = (event) => {
//   generateShop(shopItemsData, event.target.value);
// };

let generateShop = (shopItemsData, query = "") => {
  return (shop.innerHTML = shopItemsData
    .map((x) => {
      let { id, name, desc, img, price } = x;
      let search = basket.find((y) => y.id === id) || [];
      if (x.name.toLowerCase().indexOf(query.toLowerCase()) !== -1) {
        return `
        <div id=product-id-${id} class="item">
          <img width="220" src=${img} alt="">
          <div class="details">
            <h3>${name}</h3>
            <p>${desc}</p>
            <div class="price-quantity">
              <h2>$ ${price} </h2>
              <div class="buttons">
                <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                <div id=${id} class="quantity">${
          search.item === undefined ? 0 : search.item
        }</div>
                <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
              </div>
            </div>
          </div>
      </div>
        `;
      }
    })
    .join(""));
};

// Function to filter products based on search term, selected categories, and price range
const filterProducts = () => {
  const searchTerm = document.getElementById("search-box").value.toLowerCase();
  const selectedCategories = Array.from(
    document.querySelectorAll('.filter-category input[type="checkbox"]:checked')
  ).map((checkbox) => checkbox.value);
  const priceRange = document.getElementById("priceRange").value;

  const filteredProducts = shopItemsData.filter((product) => {
    const matchesSearchTerm =
      product.name.toLowerCase().includes(searchTerm) ||
      product.desc.toLowerCase().includes(searchTerm);
    const matchesCategories =
      selectedCategories.length === 0 ||
      selectedCategories.includes(product.category);
    const isInPriceRange = product.price <= priceRange;
    return matchesSearchTerm && matchesCategories && isInPriceRange;
  });

  generateShop(filteredProducts);
};

// Initial call to generate shop with all products
generateShop(shopItemsData);

/**
 * ! used to increase the selected product item quantity by 1
 */

let increment = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);

  if (search === undefined) {
    basket.push({
      id: selectedItem.id,
      item: 1,
    });
  } else {
    search.item += 1;
  }

  console.log(basket);
  update(selectedItem.id);
  localStorage.setItem("data", JSON.stringify(basket));
};

/**
 * ! used to decrease the selected product item quantity by 1
 */

let decrement = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);

  if (search === undefined) return;
  else if (search.item === 0) return;
  else {
    search.item -= 1;
  }

  update(selectedItem.id);
  basket = basket.filter((x) => x.item !== 0);
  console.log(basket);
  localStorage.setItem("data", JSON.stringify(basket));
};

/**
 * ! To update the digits of picked items on each item card
 */

let update = (id) => {
  let search = basket.find((x) => x.id === id);
  document.getElementById(id).innerHTML = search.item;
  calculation();
};

/**
 * ! To calculate total amount of selected Items
 */

let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calculation();

// Initialize variables
let currentSlide = 0;
const slides = document.querySelectorAll(".slider-item img");
const totalSlides = slides.length;
let autoScrollInterval;

// Function to show current slide
function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.style.display = i === index ? "block" : "none";
  });
}

// Function to show next slide
function nextSlide() {
  currentSlide = (currentSlide + 1) % totalSlides;
  showSlide(currentSlide);
}

// Function to show previous slide
function prevSlide() {
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  showSlide(currentSlide);
}

// Attach event listeners to next and previous buttons
document.getElementById("NextBtn").addEventListener("click", nextSlide);
document.getElementById("PrevBtn").addEventListener("click", prevSlide);

// Auto-scroll every 3 seconds
function startAutoScroll() {
  autoScrollInterval = setInterval(nextSlide, 3000);
}

function stopAutoScroll() {
  clearInterval(autoScrollInterval);
}

// Start auto-scrolling
startAutoScroll();

// Pause auto-scrolling on hover
document
  .querySelector(".slider-container")
  .addEventListener("mouseenter", stopAutoScroll);
document
  .querySelector(".slider-container")
  .addEventListener("mouseleave", startAutoScroll);
