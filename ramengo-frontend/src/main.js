import { fetchBroths, fetchProteins, createOrder } from './api/api.js';

function createItemElement(item, type) {
    const div = document.createElement('div');
    div.className = 'item';
    div.setAttribute('data-id', item.id);
    div.setAttribute('data-name', item.name);
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
    });
    return div;
}

async function loadItems(type, fetchFunction) {
    const container = document.getElementById(`${type}-container`);
    try {
        const items = await fetchFunction();
        console.log('Items loaded:', items);
        container.innerHTML = '';
        items.forEach(item => container.appendChild(createItemElement(item, type)));
    } catch (error) {
        console.error(`Error fetching ${type}:`, error);
        container.innerHTML = '<p>Error loading items. Check console for details.</p>';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadItems('broth', fetchBroths);
    loadItems('protein', fetchProteins);

    document.getElementById('submit-order').addEventListener('click', async () => {
        const selectedBroth = document.querySelector('#broth-container .selected');
        const selectedProtein = document.querySelector('#protein-container .selected');
        const orderResult = document.getElementById('order-result');
        if (selectedBroth && selectedProtein) {
            const brothName = selectedBroth.getAttribute('data-name');
            const proteinName = selectedProtein.getAttribute('data-name');
    
            if (!brothName || !proteinName) {
                console.error('Nome do caldo ou da proteína não encontrado.');
                orderResult.innerText = 'Erro ao obter os nomes dos itens selecionados.';
                return;
            }
    
            try {
                const response = await createOrder(selectedBroth.dataset.id, selectedProtein.dataset.id);
                if (response && response.orderId) {
                    const orderDescription = `${brothName} and ${proteinName} Ramen`;
                    localStorage.setItem('orderDescription', orderDescription);
                    window.location.href = `order-status.html?orderId=${response.orderId}`;
                } else {
                    throw new Error('Invalid order response');
                }
            } catch (error) {
                console.error('Erro ao conectar com o servidor:', error);
                orderResult.innerText = 'Erro ao conectar com o servidor. Tente novamente.';
            }
        } else {
            orderResult.innerText = 'Selecione um caldo e uma proteína para fazer o pedido.';
        }
    });
});
