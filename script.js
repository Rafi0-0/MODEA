/* =====================================================
   MODEA — PREMIUM FASHION STORE
   SCRIPT.JS
===================================================== */


/* ================= PRODUCTS ================= */

const products = [
    {
        id: 1,
        name: "Elegant Black Dress",
        price: 149,
        image: "images/product1.jpg"
    },

    {
        id: 2,
        name: "Satin Evening Dress",
        price: 179,
        image: "images/product2.jpg"
    },

    {
        id: 3,
        name: "Minimal White Top",
        price: 89,
        image: "images/product3.jpg"
    },

    {
        id: 4,
        name: "Purple Satin Set",
        price: 129,
        image: "images/product4.jpg"
    },

    {
        id: 5,
        name: "Classic Blazer",
        price: 199,
        image: "images/product5.jpg"
    },

    {
        id: 6,
        name: "Soft Knit Cardigan",
        price: 119,
        image: "images/product6.jpg"
    },

    {
        id: 7,
        name: "Modern Long Coat",
        price: 229,
        image: "images/product7.jpg"
    },

    {
        id: 8,
        name: "Luxury Evening Set",
        price: 189,
        image: "images/product8.jpg"
    }
];


/* ================= CART ================= */

let cart = JSON.parse(
    localStorage.getItem("modeaCart")
) || [];


/* ================= ELEMENTS ================= */

const cartBtn =
    document.getElementById("cartBtn");

const cartPanel =
    document.getElementById("cartPanel");

const closeCart =
    document.getElementById("closeCart");

const cartItems =
    document.getElementById("cartItems");

const cartCount =
    document.getElementById("cartCount");

const cartTotal =
    document.getElementById("cartTotal");

const overlay =
    document.getElementById("overlay");

const checkoutBtn =
    document.getElementById("checkoutBtn");


/* ================= OPEN CART ================= */

function openCart() {

    cartPanel.classList.add("active");

    overlay.classList.add("active");

    document.body.style.overflow = "hidden";

}


/* ================= CLOSE CART ================= */

function closeCartPanel() {

    cartPanel.classList.remove("active");

    overlay.classList.remove("active");

    document.body.style.overflow = "";

}


cartBtn.addEventListener(
    "click",
    openCart
);


closeCart.addEventListener(
    "click",
    closeCartPanel
);


overlay.addEventListener(
    "click",
    closeCartPanel
);


/* ================= ADD TO CART ================= */

function addToCart(productId) {

    const product =
        products.find(
            item => item.id === productId
        );

    if (!product) return;


    const existingProduct =
        cart.find(
            item => item.id === productId
        );


    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        cart.push({

            id: product.id,

            name: product.name,

            price: product.price,

            image: product.image,

            quantity: 1

        });

    }


    saveCart();

    updateCart();

    showToast(
        `${product.name} added to cart`
    );

}


/* ================= REMOVE FROM CART ================= */

function removeFromCart(productId) {

    cart =
        cart.filter(
            item => item.id !== productId
        );

    saveCart();

    updateCart();

}


/* ================= CHANGE QUANTITY ================= */

function changeQuantity(
    productId,
    amount
) {

    const item =
        cart.find(
            product => product.id === productId
        );


    if (!item) return;


    item.quantity += amount;


    if (item.quantity <= 0) {

        removeFromCart(productId);

        return;

    }


    saveCart();

    updateCart();

}


/* ================= SAVE CART ================= */

function saveCart() {

    localStorage.setItem(
        "modeaCart",
        JSON.stringify(cart)
    );

}


/* ================= UPDATE CART ================= */

function updateCart() {

    cartItems.innerHTML = "";


    if (cart.length === 0) {

        cartItems.innerHTML = `

            <div class="empty-cart">

                <p>
                    Your cart is empty.
                </p>

            </div>

        `;

    }


    let total = 0;

    let count = 0;


    cart.forEach(item => {

        total +=
            item.price *
            item.quantity;

        count +=
            item.quantity;


        const cartItem =
            document.createElement("div");


        cartItem.className =
            "cart-item";


        cartItem.innerHTML = `

            <img
                src="${item.image}"
                alt="${item.name}"
            >

            <div class="cart-item-info">

                <h4>
                    ${item.name}
                </h4>

                <p>
                    ${item.price} SAR
                </p>

                <div class="cart-item-actions">

                    <button
                        onclick="changeQuantity(${item.id}, -1)"
                    >
                        −
                    </button>

                    <span>
                        ${item.quantity}
                    </span>

                    <button
                        onclick="changeQuantity(${item.id}, 1)"
                    >
                        +
                    </button>

                    <button
                        class="remove-item"
                        onclick="removeFromCart(${item.id})"
                    >
                        ✕
                    </button>

                </div>

            </div>

        `;


        cartItems.appendChild(
            cartItem
        );

    });


    cartCount.textContent =
        count;


    cartTotal.textContent =
        `${total} SAR`;

}


/* ================= ADD BUTTONS ================= */

document.querySelectorAll(
    ".add-btn"
).forEach(button => {

    button.addEventListener(
        "click",
        () => {

            const id =
                Number(
                    button.dataset.id
                );

            addToCart(id);

        }
    );

});


/* ================= INITIAL CART ================= */

updateCart();


/* =====================================================
   WISHLIST
===================================================== */

const wishlistButtons =
    document.querySelectorAll(
        ".wishlist"
    );


let wishlist =
    JSON.parse(
        localStorage.getItem(
            "modeaWishlist"
        )
    ) || [];


wishlistButtons.forEach(button => {

    const productId =
        Number(
            button.dataset.product
        );


    if (
        wishlist.includes(productId)
    ) {

        button.classList.add(
            "active"
        );

        button.textContent =
            "♥";

    }


    button.addEventListener(
        "click",
        () => {

            toggleWishlist(
                productId,
                button
            );

        }
    );

});


function toggleWishlist(
    productId,
    button
) {

    if (
        wishlist.includes(productId)
    ) {

        wishlist =
            wishlist.filter(
                id => id !== productId
            );

        button.classList.remove(
            "active"
        );

        button.textContent =
            "♡";

        showToast(
            "Removed from wishlist"
        );

    } else {

        wishlist.push(
            productId
        );

        button.classList.add(
            "active"
        );

        button.textContent =
            "♥";

        showToast(
            "Added to wishlist ♥"
        );

    }


    localStorage.setItem(
        "modeaWishlist",
        JSON.stringify(wishlist)
    );

}


/* =====================================================
   SEARCH
===================================================== */

const searchBtn =
    document.getElementById(
        "searchBtn"
    );

const searchBox =
    document.getElementById(
        "searchBox"
    );

const searchInput =
    document.getElementById(
        "searchInput"
    );

const closeSearch =
    document.getElementById(
        "closeSearch"
    );

const productCards =
    document.querySelectorAll(
        ".product-card"
    );


searchBtn.addEventListener(
    "click",
    () => {

        searchBox.classList.toggle(
            "active"
        );

        if (
            searchBox.classList.contains(
                "active"
            )
        ) {

            searchInput.focus();

        }

    }
);


closeSearch.addEventListener(
    "click",
    () => {

        searchBox.classList.remove(
            "active"
        );

        searchInput.value = "";

        filterProducts("");

    }
);


searchInput.addEventListener(
    "input",
    () => {

        filterProducts(
            searchInput.value
        );

    }
);


function filterProducts(
    searchTerm
) {

    const term =
        searchTerm
            .toLowerCase()
            .trim();


    productCards.forEach(card => {

        const name =
            card.dataset.name
                .toLowerCase();


        if (
            name.includes(term)
        ) {

            card.style.display =
                "";

        } else {

            card.style.display =
                "none";

        }

    });

}


/* =====================================================
   MOBILE MENU
===================================================== */

const menuBtn =
    document.getElementById(
        "menuBtn"
    );

const navbar =
    document.querySelector(
        ".navbar"
    );


menuBtn.addEventListener(
    "click",
    () => {

        navbar.classList.toggle(
            "active"
        );

        menuBtn.textContent =
            navbar.classList.contains(
                "active"
            )
                ? "✕"
                : "☰";

    }
);


/* Close mobile menu after clicking link */

document.querySelectorAll(
    ".navbar a"
).forEach(link => {

    link.addEventListener(
        "click",
        () => {

            navbar.classList.remove(
                "active"
            );

            menuBtn.textContent =
                "☰";

        }
    );

});


/* =====================================================
   LOGIN MODAL
===================================================== */

const loginBtn =
    document.getElementById(
        "loginBtn"
    );

const loginModal =
    document.getElementById(
        "loginModal"
    );

const closeLogin =
    document.getElementById(
        "closeLogin"
    );

const loginForm =
    document.getElementById(
        "loginForm"
    );


loginBtn.addEventListener(
    "click",
    () => {

        loginModal.classList.add(
            "active"
        );

        document.body.style.overflow =
            "hidden";

    }
);


closeLogin.addEventListener(
    "click",
    closeLoginModal
);


loginModal.addEventListener(
    "click",
    event => {

        if (
            event.target ===
            loginModal
        ) {

            closeLoginModal();

        }

    }
);


function closeLoginModal() {

    loginModal.classList.remove(
        "active"
    );

    document.body.style.overflow =
        "";

}


loginForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();

        showToast(
            "Demo login successful ✓"
        );

        closeLoginModal();

        loginForm.reset();

    }
);


/* =====================================================
   NEWSLETTER
===================================================== */

const newsletterForm =
    document.getElementById(
        "newsletterForm"
    );


newsletterForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();

        const email =
            newsletterForm
                .querySelector(
                    "input"
                )
                .value;


        if (!email) return;


        showToast(
            "Thank you for subscribing ✓"
        );


        newsletterForm.reset();

    }
);


/* =====================================================
   CHECKOUT
===================================================== */

checkoutBtn.addEventListener(
    "click",
    () => {

        if (cart.length === 0) {

            showToast(
                "Your cart is empty"
            );

            return;

        }


        showToast(
            "Checkout will be connected soon"
        );

    }
);


/* =====================================================
   TOAST
===================================================== */

const toast =
    document.getElementById(
        "toast"
    );


let toastTimer;


function showToast(message) {

    toast.textContent =
        message;

    toast.classList.add(
        "show"
    );


    clearTimeout(
        toastTimer
    );


    toastTimer =
        setTimeout(
            () => {

                toast.classList.remove(
                    "show"
                );

            },
            2500
        );

}


/* =====================================================
   ESCAPE KEY
===================================================== */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape"
        ) {

            closeCartPanel();

            closeLoginModal();

            searchBox.classList.remove(
                "active"
            );

        }

    }
);


/* =====================================================
   IMAGE FALLBACK
===================================================== */

document.querySelectorAll(
    "img"
).forEach(image => {

    image.addEventListener(
        "error",
        () => {

            image.style.opacity =
                "0.2";

        }
    );

});


/* =====================================================
   PAGE LOADED
===================================================== */

console.log(
    "MODEA website loaded successfully."
);