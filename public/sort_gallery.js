let currentPage = 1; // Initialize the current page
const photosPerPage = 10; // Number of photos to fetch per page
let currentCategory = 'all'; // Initialize the current category

function showPhotos(category) {
    const categoryParam = category === 'all' ? '' : category;

    fetch(`/api/photos?category=${categoryParam}&page=${currentPage}&limit=${photosPerPage}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to fetch photos. Status: ${response.status}`);
            }
            return response.json();
        })
        .then(photos => {
            const photoContainer = document.getElementById('photo-container');

            if (currentPage === 1) {
                // Clear existing images if it's the first page
                photoContainer.innerHTML = '';
            }

            photos.forEach(photo => {
                const imgContainer = document.createElement('div');
                imgContainer.classList.add('pic');

                const imgElement = document.createElement('img');
                imgElement.src = photo.url; // Make sure your server response provides the correct image URL
                imgElement.alt = photo.altText; // Replace 'altText' with the appropriate property

                imgContainer.appendChild(imgElement);
                photoContainer.appendChild(imgContainer);
            });
        })
        .catch(error => console.error('Error:', error));
}

// Add this function to load some initial photos when the page is loaded
function loadInitialPhotos() {
    // Set the initial category to 'all'
    currentCategory = 'all';
    
    // Load some initial photos for the 'all' category
    showPhotos(currentCategory);

    // You can adjust the number of initial photos loaded or fetch them from your server
}

// Add an event listener to call loadInitialPhotos when the page is loaded
document.addEventListener('DOMContentLoaded', loadInitialPhotos);

function loadMorePhotos() {
    currentPage++; // Increment the current page before fetching more photos
    showPhotos(currentCategory); // Call the showPhotos function with the current category
}

// Add this function to update the current category when a category is clicked
function updateCategory(category) {
    currentCategory = category;
    currentPage = 1; // Reset current page when category changes
    showPhotos(currentCategory);
}

// Add event listeners for category clicks
document.getElementById('all_photos').addEventListener('click', () => updateCategory('all'));
document.getElementById('check2').addEventListener('click', () => updateCategory('studio'));
document.getElementById('check3').addEventListener('click', () => updateCategory('outdoor'));
document.getElementById('check4').addEventListener('click', () => updateCategory('babybump'));
