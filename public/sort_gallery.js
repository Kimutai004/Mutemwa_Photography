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

