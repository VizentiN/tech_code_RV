import { fetchBroths, fetchProteins, createOrder } from './api/api.js';

function createItemElement(item, type) {
    const div = document.createElement('div');
    div.className = 'item';
    div.setAttribute('data-id', item.id);
    div.setAttribute('data-name', item.name);

    let imageUrl = "";
    if (item.name.toLowerCase().includes("karaague")) {
        imageUrl = "https://ramengo-images-api.vercel.app/icons/banner/karaague.png";
    } else if (item.name.toLowerCase().includes("chasu")) {
        imageUrl = "https://ramengo-images-api.vercel.app/icons/banner/chasu.png";
    } else if (item.name.toLowerCase().includes("yasai vegetarian")) {
        imageUrl = "https://ramengo-images-api.vercel.app/icons/banner/vegetable.png";
    }
    div.setAttribute('data-image', imageUrl);

    div.innerHTML = `
        <img class="item_img" src="${item.imageInactive}" alt="${item.name}" data-inactive="${item.imageInactive}">
        <h3>${item.name}</h3>
        <p class="item_description">${item.description}</p>
        <p class="price">US$ ${item.price.toString().substring(0, 2)}</p>
    `;
    div.addEventListener('click', () => {
        const container = document.getElementById(`${type}-container`);
        Array.from(container.children).forEach(child => {
            child.classList.remove('selected');
            const img = child.querySelector('.item_img');
            img.src = img.getAttribute('data-inactive');
        });
        div.classList.add('selected');
        const activeImg = div.querySelector('.item_img');
        activeImg.src = item.imageActive;

        // Atualizar indicadores
        const carousel = container.closest('.mobile-carousel');
        const index = Array.from(container.children).indexOf(div);
        updateCarouselIndicators(carousel, index);
    });
    return div;
}

async function loadItems(type, fetchFunction) {
    const container = document.getElementById(`${type}-container`);
    try {
        const items = await fetchFunction();
        container.innerHTML = '';
        items.forEach(item => container.appendChild(createItemElement(item, type)));

        const carousel = container.closest('.mobile-carousel');
        if (carousel && container.children.length > 0) {
            initializeCarousel(carousel); 
        }
    } catch (error) {
        console.error(`Error fetching ${type}:`, error);
        container.innerHTML = '<p>Error loading items. Check console for details.</p>';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadItems('broth', fetchBroths);
    loadItems('protein', fetchProteins);

    const carousels = document.querySelectorAll('.mobile-carousel');
    carousels.forEach(carousel => {
        initializeCarousel(carousel);
        carousel.addEventListener('scroll', () => {
            updateIndicatorsOnScroll(carousel);
        });
    });

    document.getElementById('submit-order').addEventListener('click', async () => {
        const selectedBroth = document.querySelector('#broth-container .selected');
        const selectedProtein = document.querySelector('#protein-container .selected');
        const orderResult = document.getElementById('order-result');

        if (selectedBroth && selectedProtein) {
            const brothName = selectedBroth.getAttribute('data-name');
            const proteinName = selectedProtein.getAttribute('data-name');
            const proteinImage = selectedProtein.getAttribute('data-image');

            try {
                const response = await createOrder(selectedBroth.dataset.id, selectedProtein.dataset.id);
                if (response && response.orderId) {
                    localStorage.setItem('orderDescription', `${brothName} and ${proteinName} Ramen`);
                    localStorage.setItem('selectedProteinImage', proteinImage);
                    window.location.href = `order-status.html?orderId=${response.orderId}`;
                } else {
                    throw new Error('Invalid order response');
                }
            } catch (error) {
                console.error('Error connecting to the server:', error);
                orderResult.innerText = 'Error connecting to the server. Please try again.';
            }
        } else {
            orderResult.innerText = 'Select a broth and a protein to place the order.';
        }
    });
});

function initializeCarousel(carousel) {
    const firstItem = carousel.querySelector('.item');
    if (firstItem) {
        scrollToItem(carousel, firstItem, 0);
        updateCarouselIndicators(carousel, 0);
    }
}

function updateIndicatorsOnScroll(carousel) {
    const items = Array.from(carousel.querySelectorAll('.item'));
    const scrollLeft = carousel.scrollLeft;
    const carouselWidth = carousel.offsetWidth;

    const currentItemIndex = items.findIndex(item => {
        const itemLeft = item.offsetLeft;
        const itemRight = itemLeft + item.offsetWidth;
        return itemLeft <= (scrollLeft + carouselWidth / 2) && itemRight >= (scrollLeft + carouselWidth / 2);
    });

    if (currentItemIndex >= 0) {
        updateCarouselIndicators(carousel, currentItemIndex);
    }
}

function updateCarouselIndicators(carousel, currentIndex) {
    const controls = carousel.nextElementSibling;
    if (controls && controls.classList.contains('carousel-controls')) {
        const dots = controls.querySelectorAll('.control-dot');
        dots.forEach((dot, index) => {
            dot.classList.remove('selected-control');
            if (index === currentIndex) {
                dot.classList.add('selected-control');
            }
        });
    }
}

function scrollToItem(carousel, item, index) {
    const itemWidth = item.offsetWidth;
    const itemStart = item.offsetLeft;
    const carouselWidth = carousel.offsetWidth;
    const scrollPosition = itemStart + itemWidth / 2 - carouselWidth / 2;

    carousel.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
    });

    updateCarouselIndicators(carousel, index);
}