function searchCards() {
    let input = document.querySelector('.searchInp').value.toLowerCase();
    let cards = document.querySelectorAll('.card');
    let cardTitles = document.querySelectorAll('.card-title');

    cards.forEach((card, index) => {
        let title = cardTitles[index].textContent.toLowerCase();
        if (title.includes(input)) {
            card.style.display = '';
        } else {
            card.style.display = 'none';
        }
    });
}

//pagination
document.addEventListener("DOMContentLoaded", function() {
    const itemsPerPage = 12; // Adjust this to match the number of cards you want per page
    const cardsContainer = document.getElementById('cards');
    const cards = Array.from(cardsContainer.children);
    const totalPages = Math.ceil(cards.length / itemsPerPage);
    const paginationContainer = document.querySelector('.pagination');
    
    function showPage(page) {
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;

        cards.forEach((card, index) => {
            if (index >= start && index < end) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });
    }

    function updatePagination() {
        paginationContainer.innerHTML = `
            <li class="page-item">
                <a class="page-link" href="#" aria-label="Previous" data-page="previous">
                    <span aria-hidden="true">&laquo;</span>
                </a>
            </li>
        `;

        for (let i = 1; i <= totalPages; i++) {
            paginationContainer.innerHTML += `
                <li class="page-item"><a class="page-link" href="#" data-page="${i}">${i}</a></li>
            `;
        }

        paginationContainer.innerHTML += `
            <li class="page-item">
                <a class="page-link" href="#" aria-label="Next" data-page="next">
                    <span aria-hidden="true">&raquo;</span>
                </a>
            </li>
        `;

        const links = paginationContainer.querySelectorAll('.page-link');
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const page = this.getAttribute('data-page');

                if (page === 'previous') {
                    const currentPage = paginationContainer.querySelector('.page-item.active .page-link').getAttribute('data-page');
                    const newPage = Math.max(1, parseInt(currentPage) - 1);
                    showPage(newPage);
                } else if (page === 'next') {
                    const currentPage = paginationContainer.querySelector('.page-item.active .page-link').getAttribute('data-page');
                    const newPage = Math.min(totalPages, parseInt(currentPage) + 1);
                    showPage(newPage);
                } else {
                    showPage(parseInt(page));
                }

                paginationContainer.querySelectorAll('.page-item').forEach(item => item.classList.remove('active'));
                paginationContainer.querySelector(`.page-link[data-page="${page}"]`).parentElement.classList.add('active');
            });
        });
    }

    showPage(1);
    updatePagination();
});

