const productList = document.querySelector('#product-list');
const productHeading = document.querySelector('.product__heading h2');
const productCount = document.querySelector('.product__heading p');
const categoryList = document.querySelector(".category__list");
const cartCount = document.querySelector("#cart-count");


let products = [];
let cartItems = [];

async function fetchProducts() {
    try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        products = data;
        return data;
    } catch (error) {
        console.error(error);
        console.log("Fetch Product Failed!!!");
        products = [];
        return products;
    }
}

const createProductCard = (product) => {
    const cardContainer = document.createElement("div");
    cardContainer.className = "product";
    cardContainer.dataset.id = product.id;
    // Card Header
    const cardHeader = document.createElement("div");
    cardHeader.className = "product__header";

    const cardImg = document.createElement("img");
    cardImg.src = product.image;
    cardImg.className = "product-img";

    const cardTitle = document.createElement("h3");
    cardTitle.innerText = product.title;

    const cardRating = document.createElement("div")
    cardRating.className = "product__rating-details"

    const cardRatingIcon = document.createElement("i");
    cardRatingIcon.className = "star-icon fa-solid fa-star"

    const cardRatingRate = document.createElement("span")
    cardRatingRate.innerText = product.rating.rate;
    cardRatingRate.className = "product__rating_rate";

    const cardRatingCount = document.createElement("span")
    cardRatingCount.innerText = `(${product.rating.count})`;
    cardRatingCount.className = "product__rating_count";

    cardRating.append(cardRatingIcon, cardRatingRate, cardRatingCount)


    cardHeader.append(cardImg, cardTitle, cardRating)
    // Card Footer
    const cardFooter = document.createElement("div");
    cardFooter.className = "product__footer";

    const cardPrice = document.createElement("div");
    cardPrice.className = "product__cost";
    cardPrice.innerText = `$${product.price}`;

    const cardBtn = document.createElement("button");
    cardBtn.className = "product__buy-btn";
    cardBtn.setAttribute("type", "button");

    const cardIconBtn = document.createElement("i"); 
    cardIconBtn.className = "fa-solid fa-cart-shopping"

    cardBtn.append(cardIconBtn);

    cardFooter.append(cardPrice, cardBtn)

    cardContainer.append(cardHeader, cardFooter);

    return cardContainer;
}

function capitalizeFirstLetter(word) {
    if (!word) return "";
    return word.charAt(0).toUpperCase() + word.slice(1);
}

function renderProductList(filteredProducts, categoryName) {
    productList.innerHTML = "";
    filteredProducts.forEach(product => {
        productList.append(createProductCard(product));
    });

    productHeading.innerText = capitalizeFirstLetter(categoryName);
    productCount.innerText = `Hiển thị ${filteredProducts.length} sản phẩm`;
}

function filterByCategory(categoryKey) {
    if(categoryKey === "all") {
        renderProductList(products, "Tất cả sản phẩm");
    } else {
        const filteredProducts = products.filter(p => p.category === categoryKey);
        renderProductList(filteredProducts, categoryKey);
    }
}

if(categoryList) {
    categoryList.addEventListener("click", (e) => {
        const categoryItems = document.querySelectorAll('.category__item');
        const targetItem = e.target.closest(".category__item");

        if(targetItem) {
            categoryItems.forEach(item => item.classList.remove("active"));
            targetItem.classList.add("active");
            
            const categoryKey = targetItem.dataset.category;
            filterByCategory(categoryKey);
        }
    })
}

function getCategoryCounts() {
    const counts = {};

    products.forEach(product => {
        if(!counts[product.category]) {
            counts[product.category] = 0;
        }
        counts[product.category] += 1;
    });

    return counts;
}

function renderCategoryList(counts) {
    if(!categoryList) return;
    categoryList.innerHTML = "";

    const allItem = document.createElement("li");
    allItem.className = "category__item active";
    allItem.dataset.category = "all";

    const allItemSpanCategoryName = document.createElement("span");
    allItemSpanCategoryName.innerText = "Tất cả sản phẩm";

    const allItemSpanQuantity = document.createElement("span");
    allItemSpanQuantity.className = "category__quantity";
    allItemSpanQuantity.innerText = products.length;

    allItem.append(allItemSpanCategoryName, allItemSpanQuantity)
    categoryList.append(allItem);


    Object.keys(counts).forEach(category => {
        const li = document.createElement("li");
        li.className = "category__item";
        li.dataset.category = category;

        const spanName = document.createElement("span");
        spanName.innerText = capitalizeFirstLetter(category);

        const spanQuantity = document.createElement("span");
        spanQuantity.className = "category__quantity";
        spanQuantity.innerText = counts[category];

        li.append(spanName, spanQuantity)
        categoryList.append(li);
    })
    
}

productList.addEventListener("click", (e) => {
    const buyBtn = e.target.closest(".product__buy-btn");
    
    if(buyBtn) {
        const productElement = buyBtn.closest(".product");
        const productId = productElement.dataset.id;

        const product = products.find(product => product.id === Number(productId));
        if (!product) return;
        cartItems.push(product);


        if(cartCount) {
            cartCount.innerText = cartItems.length;
        }
        console.log(cartItems);
        
    }

})

async function init() {
    await fetchProducts();
    const counts = getCategoryCounts();
    renderCategoryList(counts);
    renderProductList(products, "Tất cả sản phẩm");
};

init();

