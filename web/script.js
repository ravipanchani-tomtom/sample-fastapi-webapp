document.addEventListener('DOMContentLoaded', function() {
    const elems = document.querySelectorAll('.collapsible');
    M.Collapsible.init(elems);

    const animalRadios = document.querySelectorAll('input[name="animal"]');
    const animalImageContainer = document.getElementById('animal-image-container');
    const animalImage = document.getElementById('animal-image');
    const fileInput = document.getElementById('file-input');
    const metadataContainer = document.getElementById('metadata-container');
    const metadataTableBody = document.getElementById('metadata-table-body');

    const animalImages = {
        cat: 'https://www.purrfectcatgifts.co.uk/cdn/shop/collections/Funny_Cat_Cards_1200x1200.png',
        dog: 'https://www.dogster.com/wp-content/uploads/2024/02/german-shepherd-dog-lying-on-wooden-table-outdoors_lancegfx_Pixabay.jpeg',
        elephant: 'https://pics.craiyon.com/2024-01-03/nXAhY1JbTfix9b8KW8PVzQ.webp'
    };

    animalRadios.forEach(radio => {
        radio.addEventListener('change', () => {
            const animal = radio.value;
            animalImage.src = animalImages[animal];
            animalImageContainer.classList.remove('hidden');
        });
    });

    fileInput.addEventListener('change', async () => {
        const file = fileInput.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('file', file);

            const response = await fetch('http://localhost:8000/upload', {
                method: 'POST',
                body: formData
            });

            const metadata = await response.json();
            metadataTableBody.innerHTML = '';
            for (const [key, value] of Object.entries(metadata)) {
                const row = document.createElement('tr');
                const keyCell = document.createElement('td');
                const valueCell = document.createElement('td');
                keyCell.textContent = key;
                valueCell.textContent = value;
                row.appendChild(keyCell);
                row.appendChild(valueCell);
                metadataTableBody.appendChild(row);
            }
            metadataContainer.classList.remove('hidden');
        }
    });
});