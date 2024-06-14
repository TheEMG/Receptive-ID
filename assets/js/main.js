document.getElementById('request-button').addEventListener('click', function() {
    const category = document.getElementById('category').value;
    const imageDisplay = document.getElementById('displayed-image');

    const images = {
        apple: 'assets/img/apple/apple.webp',
        banana: 'assets/img/bannana/bannana.webp',
        cap: 'assets/img/cap/cap.webp',
        dog: 'assets/img/dog/dog.webp',
        car: 'assets/img/car/car.webp',
        bathtub: 'assets/img/bathtub/bathtub.webp'
    };

    imageDisplay.src = images[category];
});
