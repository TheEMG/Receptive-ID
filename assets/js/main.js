document.addEventListener('DOMContentLoaded', function() {
    const basePath = 'assets/img/';

    const images = {
        apple: ['apples/apple.webp', 'apples/apple2.webp'],
        banana: ['bannana/bannana.webp', 'bannana/bannana2.webp'],
        cap: ['cap/cap.webp', 'cap/cap2.webp'],
        dog: ['dog/dog.webp', 'dog/dog2.webp'],
        car: ['car/car.webp', 'car/car2.webp'],
        pizza: ['pizzas/pizza.webp', 'pizzas/pizza2.webp'],
        coat: ['coats/coat.webp', 'coats/coat2.webp'],
        bird: ['birds/bird.webp', 'birds/bird2.webp'],
        bathtub: ['bathtub/bathtub.webp', 'bathtub/bathtub2.webp']
    };

    const imageGrid = document.getElementById('image-grid');
    const categorySelect = document.getElementById('category');
    const numberOfImagesSelect = document.getElementById('number-of-images');

    function getRandomImages(selectedCategory, numImages) {
        const allCategories = Object.keys(images);
        let selectedImages = [];
        
        // Ensure the selected category image is included
        const selectedCategoryImages = [...images[selectedCategory]]; // Copy array to avoid mutation
        const selectedImage = selectedCategoryImages.splice(Math.floor(Math.random() * selectedCategoryImages.length), 1)[0];
        selectedImages.push(selectedImage);

        // Gather all other categories except the selected one
        let otherCategories = allCategories.filter(category => category !== selectedCategory);

        // Collect images from other categories
        while (selectedImages.length < numImages && otherCategories.length > 0) {
            const randomCategoryIndex = Math.floor(Math.random() * otherCategories.length);
            const randomCategory = otherCategories[randomCategoryIndex];
            const randomCategoryImages = [...images[randomCategory]]; // Copy array to avoid mutation
            const randomImage = randomCategoryImages.splice(Math.floor(Math.random() * randomCategoryImages.length), 1)[0];

            if (!selectedImages.includes(randomImage)) {
                selectedImages.push(randomImage);
                otherCategories = otherCategories.filter(category => category !== randomCategory); // Remove used category
            }
        }

        // Shuffle the images array to randomize the position of the selected image
        for (let i = selectedImages.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [selectedImages[i], selectedImages[j]] = [selectedImages[j], selectedImages[i]];
        }

        // Prepend the base path to each image
        selectedImages = selectedImages.map(image => basePath + image);

        return selectedImages;
    }

    function displayImages(images) {
        imageGrid.innerHTML = '';
        images.forEach(imageSrc => {
            const imgElement = document.createElement('img');
            imgElement.src = imageSrc;
            imageGrid.appendChild(imgElement);
        });
    }

    function updateGridClass(numImages) {
        if (numImages === 4) {
            imageGrid.className = 'image-grid grid-4';
        } else {
            imageGrid.className = 'image-grid grid-8';
        }
    }

    function initializeDefaultImages() {
        const defaultImages = getRandomImages('apple', 4);
        updateGridClass(4);
        displayImages(defaultImages);
    }

    document.getElementById('request-button').addEventListener('click', function() {
        const selectedCategory = categorySelect.value;
        const numberOfImages = parseInt(numberOfImagesSelect.value, 10);
        const selectedImages = getRandomImages(selectedCategory, numberOfImages);
        
        updateGridClass(numberOfImages);
        displayImages(selectedImages);
    });

    document.getElementById('refresh-button').addEventListener('click', function() {
        const selectedCategory = categorySelect.value;
        const numberOfImages = parseInt(numberOfImagesSelect.value, 10);
        const selectedImages = getRandomImages(selectedCategory, numberOfImages);
        
        updateGridClass(numberOfImages);
        displayImages(selectedImages);
    });

    // Initialize with default images
    initializeDefaultImages();
});