document.addEventListener('DOMContentLoaded', () => {
    const imageContainer = document.querySelector('main');
    const featureRequestForm = document.getElementById('feature-request-form');

    const images = [
        { id: 1, url: 'https://i.makeagif.com/media/3-26-2015/6cdUye.gif', caption: '', liked: false, hidden: false },
        { id: 2, url: 'https://i.pinimg.com/originals/15/17/ed/1517ed1d264c3c7dbb2937b923066f05.gif', caption: '', liked: false, hidden: false },
        { id: 3, url: 'https://i.pinimg.com/originals/a8/96/c4/a896c49a2c4ee27d9349f38ba662aab9.gif', caption: '', liked: false, hidden: false },
    ];

    function updateImage(figure, image) {
        const img = figure.querySelector('img');
        img.src = image.url;
        img.alt = image.caption;

        if (!figure.querySelector('.image-actions')) {
            const actionsDiv = createActionButtons(image);
            figure.appendChild(actionsDiv);
        }

        figure.style.display = image.hidden ? 'none' : 'block';
    }

    function createActionButtons(image) {
        const actionsDiv = document.createElement('div');
        actionsDiv.className = 'image-actions';
        actionsDiv.innerHTML = `
            <button class="like-btn" data-id="${image.id}">${image.liked ? 'Unlike' : 'Like'}</button>
            <button class="hide-btn" data-id="${image.id}">Hide</button>
            <button class="share-btn" data-id="${image.id}">Share</button>
        `;
        return actionsDiv;
    }

    function updateImages() {
        images.forEach((image, index) => {
            const figure = document.getElementById(`image${index + 1}`);
            if (figure) {
                updateImage(figure, image);
            }
        });
    }

    function handleImageAction(actionType, imageId) {
        const image = images.find(img => img.id === imageId);
        if (!image) {
            console.error(`Image with id ${imageId} not found`);
            return;
        }

        switch (actionType) {
            case 'like':
                image.liked = !image.liked;
                break;
            case 'hide':
                image.hidden = true;
                break;
            case 'share':
                alert(`Sharing image ${imageId}`);
                break;
            default:
                console.error('Unknown action type');
        }

        updateImages();
    }

    imageContainer.addEventListener('click', (e) => {
        const actionButton = e.target.closest('.like-btn, .hide-btn, .share-btn');
        if (!actionButton) return;

        const imageId = parseInt(actionButton.dataset.id);
        const actionType = actionButton.classList[0].split('-')[0];
        handleImageAction(actionType, imageId);
    });

    featureRequestForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const featureRequest = document.getElementById('feature-request').value;
        alert(`Feature request submitted: ${featureRequest}`);
        featureRequestForm.reset();
    });

    updateImages();
});