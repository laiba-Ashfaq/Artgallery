// Carousel functionality
let currentSlide = 0;

function initializeCarousel() {
    const slides = document.querySelectorAll('.carousel-images img');
    if (slides.length === 0) return;

    function showSlide(index) {
        slides[currentSlide].classList.remove('active');
        currentSlide = (index + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
    }

    document.querySelector('.carousel-next').addEventListener('click', () => {
        showSlide(currentSlide + 1);
    });

    document.querySelector('.carousel-prev').addEventListener('click', () => {
        showSlide(currentSlide - 1);
    });

    // Initialize the first slide as active
    showSlide(currentSlide);
}

// Form Handling for Reviews
function handleReviewForm() {
    const reviewForm = document.querySelector('.review-form');
    if (!reviewForm) return;

    reviewForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const reviewText = this.querySelector('textarea').value;
        const rating = this.querySelector('select').value;

        const newReview = document.createElement('div');
        newReview.classList.add('review');
        newReview.innerHTML = `<p><strong>You:</strong> ${'★'.repeat(rating)}${'☆'.repeat(5 - rating)}</p>
                               <p>${reviewText}</p>`;
        
        document.querySelector('.reviews-section').insertBefore(newReview, this);

        // Clear form fields
        this.querySelector('textarea').value = '';
        this.querySelector('select').value = '5';
    });
}

// Make entire section clickable
function makeSectionsClickable() {
    document.querySelector('#new-arrivals').addEventListener('click', function() {
        window.location.href = 'new-arrivals.html';
    });

    document.querySelector('#most-popular').addEventListener('click', function() {
        window.location.href = 'most-popular.html';
    });

    document.querySelector('#artist-spotlights').addEventListener('click', function() {
        window.location.href = 'artist-spotlights.html';
    });

    // Optional: Add a hover effect to indicate clickability
    document.querySelectorAll('section').forEach(section => {
        section.style.cursor = 'pointer';
    });
}

// Fetch and display artwork details
function fetchArtworkDetails() {
    fetch('artwork.json')
        .then(response => response.json())
        .then(data => {
            // Populate artwork details
            const artworkImage = document.getElementById('artwork-image');
            const artworkTitle = document.getElementById('artwork-title');
            const artworkArtist = document.getElementById('artwork-artist');
            const artworkDescription = document.getElementById('artwork-description');
            const artworkPrice = document.getElementById('artwork-price');

            if (artworkImage && artworkTitle && artworkArtist && artworkDescription && artworkPrice) {
                artworkImage.src = data.image;
                artworkTitle.textContent = data.title;
                artworkArtist.textContent = `Artist: ${data.artist}`;
                artworkDescription.textContent = data.description;
                artworkPrice.textContent = `Price: ${data.price}`;
            }

            // Populate reviews
            const reviewsList = document.getElementById('reviews-list');
            if (reviewsList) {
                data.reviews.forEach(review => {
                    const li = document.createElement('li');
                    li.textContent = `${review.username}: ${review.text}`;
                    reviewsList.appendChild(li);
                });
            }

            // Example cart summary data (can be fetched or dynamically populated)
            const cartItems = [{ title: data.title, price: data.price }];
            const cartItemsList = document.getElementById('cart-items');
            if (cartItemsList) {
                let totalPrice = 0;

                cartItems.forEach(item => {
                    const li = document.createElement('li');
                    li.textContent = `${item.title} - ${item.price}`;
                    cartItemsList.appendChild(li);
                    totalPrice += parseFloat(item.price.replace('$', ''));
                });

                const totalPriceElement = document.getElementById('total-price');
                if (totalPriceElement) {
                    totalPriceElement.textContent = `Total Price: $${totalPrice.toFixed(2)}`;
                }
            }
        })
        .catch(error => console.error('Error fetching the JSON data:', error));
}

// Initialize all functionalities
function initialize() {
    initializeCarousel();
    handleReviewForm();
    makeSectionsClickable();
    fetchArtworkDetails();
}

// Execute the initialization function when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initialize);
// script.js

document.addEventListener('DOMContentLoaded', () => {
    // Sample data for artworks
    const artworks = [
        { id: 1, title: 'Whispers in Blue', artist: 'Raphael', price: '$200', image: 'artwork1.jpg' },
        { id: 2, title: 'Golden Ruins', artist: 'Peter Paul', price: '$300', image: 'artwork2.jpg' },
        { id: 3, title: 'Scilence', artist: 'Edgar Degas', price: '$250', image: 'artwork3.jpg' },
        { id: 4, title: 'Tears', artist: 'Sandro Botticelli', price: '$350', image: 'artwork4.jpg' },
        { id: 5, title: 'Empires Sunset', artist: 'Caravaggio', price: '$400', image: 'artwork5.jpg' },
    ];

    // Function to render artworks
    function renderArtworks(artworks) {
        const artworkList = document.getElementById('artwork-list');
        artworkList.innerHTML = ''; // Clear previous artworks

        artworks.forEach(artwork => {
            const article = document.createElement('article');
            article.innerHTML = `
                <img src="${artwork.image}" alt="${artwork.title}">
                <h3>${artwork.title}</h3>
                <p>Artist: ${artwork.artist}</p>
                <p>Price: ${artwork.price}</p>
                <button class="view-details" onclick="location.href='detailpage.html?artworkId=${artwork.id}'">View Details</button>
            `;
            artworkList.appendChild(article);
        });
    }

    // Render all artworks initially
    renderArtworks(artworks);

    // Search functionality
    document.getElementById('search-input').addEventListener('input', function() {
        const query = this.value.toLowerCase();
        const filteredArtworks = artworks.filter(artwork =>
            artwork.title.toLowerCase().includes(query)
        );
        renderArtworks(filteredArtworks);
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const artistName = urlParams.get('artist');

    if (artistName) {
        // Fetch artist data from a JSON file or API (replace with your data source)
        fetch('artists.json')
            .then(response => response.json())
            .then(data => {
                const artist = data.artists.find(artist => 
                    artist.name.toLowerCase().replace(/ /g, '-') === artistName
                );

                if (artist) {
                    document.getElementById('artist-name').textContent = artist.name;
                    document.getElementById('artist-bio').textContent = artist.bio;

                    const gallery = document.querySelector('.artwork-gallery');
                    gallery.innerHTML = ''; // Clear any existing gallery content

                    artist.famousWorks.forEach(work => {
                        const div = document.createElement('div');
                        div.classList.add('gallery-item');
                        div.innerHTML = `<img src="${work.image}" alt="${work.title}">
                                         <p>${work.title}</p>`;
                        gallery.appendChild(div);
                    });
                } else {
                    alert('Artist not found.');
                }
            })
            .catch(error => console.error('Error fetching artist data:', error));
    }
});

document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();
    alert('Message sent to the artist!');
    // Additional form handling can be added here
});
document.addEventListener('DOMContentLoaded', () => {
    const cartIcon = document.getElementById('cart-icon');
    const cartSummary = document.getElementById('cart-summary');
    const cartItemsList = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const cartCount = document.getElementById('cart-count');

    let cart = [];

    // Toggle cart summary visibility
    cartIcon.addEventListener('click', () => {
        cartSummary.classList.toggle('hidden');
    });

    // Function to update cart summary
    function updateCartSummary() {
        cartItemsList.innerHTML = '';
        let total = 0;

        cart.forEach((item, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${item.title}</span>
                <span>$${item.price}</span>
                <button class="delete-item" data-index="${index}">X</button>
            `;
            cartItemsList.appendChild(li);
            total += parseFloat(item.price);
        });

        cartTotal.textContent = total.toFixed(2);
        cartCount.textContent = cart.length;
    }

    // Function to add an item to the cart
    function addToCart(title, price) {
        cart.push({ title, price });
        updateCartSummary();
    }

    // Event listener for delete item
    cartItemsList.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-item')) {
            const index = e.target.getAttribute('data-index');
            cart.splice(index, 1);
            updateCartSummary();
        }
    });

    // Example: Adding an item to the cart
    document.querySelectorAll('.add-to-cart-button').forEach(button => {
        button.addEventListener('click', () => {
            const title = button.getAttribute('data-title');
            const price = button.getAttribute('data-price');
            addToCart(title, price);
        });
    });

    // Event listener for checkout button
    document.getElementById('checkout-button').addEventListener('click', () => {
        alert(`Proceeding to checkout with total: $${cartTotal.textContent}`);
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const cartIcon = document.getElementById('cart-icon');
    const cartSummary = document.getElementById('cart-summary');

    // Toggle cart summary visibility on cart icon click
    cartIcon.addEventListener('click', () => {
        cartSummary.classList.toggle('hidden');
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const cartItems = [];
    const cartIcon = document.getElementById('cart-icon');
    const cartSummary = document.getElementById('cart-summary');
    const cartItemsList = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');

    document.querySelectorAll('.buy-now').forEach(button => {
        button.addEventListener('click', () => {
            const title = button.getAttribute('data-title');
            const price = parseFloat(button.getAttribute('data-price'));

            const cartItem = {
                title,
                price
            };

            cartItems.push(cartItem);
            updateCart();
        });
    });

    cartIcon.addEventListener('click', () => {
        cartSummary.classList.toggle('hidden');
    });

    function updateCart() {
        cartItemsList.innerHTML = ''; // Clear the cart list
        let total = 0;

        cartItems.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.title}: $${item.price.toFixed(2)}`;
            cartItemsList.appendChild(li);
            total += item.price;
        });

        cartTotal.textContent = total.toFixed(2);
    }
});
function updateCart() {
    cartItemsList.innerHTML = ''; // Clear the cart list
    let total = 0;

    cartItems.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = `${item.title}: $${item.price.toFixed(2)}`;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
            cartItems.splice(index, 1); // Remove item from array
            updateCart(); // Update cart
        });

        li.appendChild(deleteButton);
        cartItemsList.appendChild(li);
        total += item.price;
    });

    cartTotal.textContent = total.toFixed(2);
}

// Initialize Cart Functionality
function initializeCart() {
    const cartItems = [];
    const cartIcon = document.getElementById('cart-icon');
    const cartSummary = document.getElementById('cart-summary');
    const cartItemsList = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');

    document.querySelectorAll('.buy-now').forEach(button => {
        button.addEventListener('click', () => {
            const title = button.getAttribute('data-title');
            const price = parseFloat(button.getAttribute('data-price'));

            const cartItem = {
                title,
                price
            };

            cartItems.push(cartItem);
            updateCart();
        });
    });

    cartIcon.addEventListener('click', () => {
        cartSummary.classList.toggle('hidden');
    });

    function updateCart() {
        cartItemsList.innerHTML = ''; // Clear the cart list
        let total = 0;

        cartItems.forEach((item, index) => {
            const li = document.createElement('li');
            li.textContent = `${item.title}: $${item.price.toFixed(2)}`;

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', () => {
                cartItems.splice(index, 1); // Remove item from array
                updateCart(); // Update cart
            });

            li.appendChild(deleteButton);
            cartItemsList.appendChild(li);
            total += item.price;
        });

        cartTotal.textContent = total.toFixed(2);
    }

    document.getElementById('checkout-button').addEventListener('click', () => {
        if (cartItems.length > 0) {
            alert(`Proceeding to checkout with total: $${cartTotal.textContent}`);
        } else {
            alert('Your cart is empty!');
        }
    });
}
document.addEventListener('DOMContentLoaded', () => {
    initializeCarousel();
    fetchArtworkDetails();
    initializeCart();
});

// Carousel Functionality
function initializeCarousel() {
    let currentSlide = 0;
    const slides = document.querySelectorAll('.carousel-images img');

    if (slides.length === 0) return;

    function showSlide(index) {
        slides[currentSlide].classList.remove('active');
        currentSlide = (index + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
    }

    document.querySelector('.carousel-next').addEventListener('click', () => {
        showSlide(currentSlide + 1);
    });

    document.querySelector('.carousel-prev').addEventListener('click', () => {
        showSlide(currentSlide - 1);
    });

    showSlide(currentSlide);
}

// Fetch and Display Artwork Details
function fetchArtworkDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const artworkId = urlParams.get('artworkId');

    if (artworkId) {
        fetch('artwork.json')
            .then(response => response.json())
            .then(data => {
                const artwork = data.find(art => art.id == artworkId);

                if (artwork) {
                    document.getElementById('artwork-image').src = artwork.image;
                    document.getElementById('artwork-title').textContent = artwork.title;
                    document.getElementById('artwork-artist').textContent = `Artist: ${artwork.artist}`;
                    document.getElementById('artwork-description').textContent = artwork.description;
                    document.getElementById('artwork-price').textContent = `Price: ${artwork.price}`;
                } else {
                    alert('Artwork not found.');
                }
            })
            .catch(error => console.error('Error fetching the JSON data:', error));
    }
}

// Initialize Cart Functionality
function initializeCart() {
    const cartItems = [];
    const cartIcon = document.getElementById('cart-icon');
    const cartSummary = document.getElementById('cart-summary');
    const cartItemsList = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');

    document.querySelectorAll('.buy-now').forEach(button => {
        button.addEventListener('click', () => {
            const title = button.getAttribute('data-title');
            const price = parseFloat(button.getAttribute('data-price'));

            const cartItem = {
                title,
                price
            };

            cartItems.push(cartItem);
            updateCart();
        });
    });

    cartIcon.addEventListener('click', () => {
        console.log('Cart icon clicked'); // Debugging log
        cartSummary.classList.toggle('hidden'); // Toggle visibility
    });

    function updateCart() {
        cartItemsList.innerHTML = ''; // Clear the cart list
        let total = 0;

        cartItems.forEach((item, index) => {
            const li = document.createElement('li');
            li.textContent = `${item.title}: $${item.price.toFixed(2)}`;

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', () => {
                cartItems.splice(index, 1); // Remove item from array
                updateCart(); // Update cart
            });

            li.appendChild(deleteButton);
            cartItemsList.appendChild(li);
            total += item.price;
        });

        cartTotal.textContent = total.toFixed(2);
    }

    document.getElementById('checkout-button').addEventListener('click', () => {
        if (cartItems.length > 0) {
            alert(`Proceeding to checkout with total: $${cartTotal.textContent}`);
        } else {
            alert('Your cart is empty!');
        }
    });
}
document.getElementById('cart-summary').classList.toggle('hidden');
document.addEventListener('DOMContentLoaded', () => {
    // Initialize cart from localStorage or empty array
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    updateCartSummary();

    // Retrieve the title and price from localStorage
    const artworkTitle = localStorage.getItem('artworkTitle');
    const artworkPrice = localStorage.getItem('artworkPrice');

    // If the title and price are available, display them
    if (artworkTitle && artworkPrice) {
        const summaryParagraph = document.getElementById('summary');
        summaryParagraph.textContent = `Artwork Title: ${artworkTitle} - ${artworkPrice}`;
    } else {
        // Handle the case where the title or price is not available
        alert("Artwork details not found. Please go back and select an artwork.");
        window.location.href = 'new-arrivals.html'; // Redirect if details are missing
    }

    document.getElementById('checkout-form').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form submission

        // Retrieve the title and price from localStorage
        const artworkTitle = localStorage.getItem('artworkTitle');
        const artworkPrice = parseFloat(localStorage.getItem('artworkPrice'));

        // Display alert with the title and price and add to cart
        if (artworkTitle && artworkPrice) {
            alert(`Order Confirmed!\n\nArtwork Title: ${artworkTitle}\nPrice: $${artworkPrice.toFixed(2)}`);

            // Add the item to the cart
            const cartItem = {
                title: artworkTitle,
                price: artworkPrice
            };
            cartItems.push(cartItem);

            // Save updated cart to localStorage
            localStorage.setItem('cartItems', JSON.stringify(cartItems));

            // Update the cart summary
            updateCartSummary();

            // Clear localStorage for next use
            localStorage.removeItem('artworkTitle');
            localStorage.removeItem('artworkPrice');

            // Optionally redirect to a thank you or confirmation page
            // window.location.href = 'thank-you.html';
        } else {
            alert("Artwork details not found. Please go back and select an artwork.");
        }
    });

    // Function to update the cart summary
    function updateCartSummary() {
        const cartSummary = document.getElementById('cart-summary');
        const cartItemsList = document.getElementById('cart-items');
        const cartTotal = document.getElementById('cart-total');
        const cartCount = document.getElementById('cart-count');

        // Clear the current cart items in the summary
        cartItemsList.innerHTML = '';

        // Calculate total price and update the summary
        let total = 0;
        cartItems.forEach((item) => {
            const li = document.createElement('li');
            li.textContent = `${item.title}: $${item.price.toFixed(2)}`;
            cartItemsList.appendChild(li);
            total += item.price;
        });

        // Update total and item count
        cartTotal.textContent = total.toFixed(2);
        cartCount.textContent = cartItems.length;

        // Show the cart summary
        cartSummary.classList.remove('hidden');
    }

    // Toggle the cart summary when the cart icon is clicked
    document.getElementById('cart-icon').addEventListener('click', () => {
        document.getElementById('cart-summary').classList.toggle('hidden');
    });
});

