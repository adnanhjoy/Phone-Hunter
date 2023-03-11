const phoneLoad = async (search) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${search}`)
    const data = await res.json()
    displayPhone(data.data)
};

const displayPhone = phones => {
    const phonesContainer = document.getElementById('phones-container');
    phonesContainer.innerHTML = '';
    // phones.phones.slice(0.3);
    const h1 = document.getElementById('error-message');
    if (phones.length === 0) {
        h1.classList.remove('d-none')
    } else {
        h1.classList.add('d-none')
    }
    phones.forEach(phone => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card">
            <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <p class="card-text">${phone.slug}</p>
            </div>
        </div>
        `;
        phonesContainer.appendChild(div)
        console.log(phone)
    })
        ;
}

document.getElementById('search-button').addEventListener('click', function () {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    searchField.value = '';
    phoneLoad(searchText);
})

phoneLoad('')