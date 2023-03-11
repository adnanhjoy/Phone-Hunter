const phoneLoad = async (search, dataLimit) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${search}`)
    const data = await res.json()
    displayPhone(data.data, dataLimit)
};

const displayPhone = (phones, dataLimit) => {
    const phonesContainer = document.getElementById('phones-container');
    phonesContainer.innerHTML = '';
    const showAll = document.getElementById('show-all');
    if (dataLimit && phones.length > 9) {
        phones = phones.slice(0, 9);
        showAll.classList.remove('d-none')
    } else {
        showAll.classList.add('d-none')
    }

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
            <img src="${phone.image}" class="card-img-top w-25" alt="...">
            <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <p class="card-text">${phone.slug}</p>
                <button onclick="phoneDetailLoad('${phone.slug}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailModal">Show Detail</button>
            </div>
        </div>
        `;
        phonesContainer.appendChild(div)
        // console.log(phone)
    });
    spinLoader(false)
};

const searchProcess = (dataLimit) => {
    spinLoader(true)
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // searchField.value = '';
    phoneLoad(searchText, dataLimit);
}

document.getElementById('search-button').addEventListener('click', function () {
    searchProcess(9);
});

document.getElementById('search-field').addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        searchProcess(9);
    };
})

const spinLoader = isLoading => {
    const phoneLoader = document.getElementById('loader');
    if (isLoading) {
        phoneLoader.classList.remove('d-none')
    } else {
        phoneLoader.classList.add('d-none')
    }
};

document.getElementById('btn-show-all').addEventListener('click', function () {
    searchProcess();
})

const phoneDetailLoad = async (phoneSlug) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${phoneSlug}`)
    const data = await res.json()
    phoneDetailDisplay(data.data)
};


const phoneDetailDisplay = details => {
    const exampleModalLabel = document.getElementById('exampleModalLabel');
    exampleModalLabel.innerText = details.name;

    const phonesDetail = document.getElementById('phones-detail');
    phonesDetail.innerHTML = `
        <p><b>Brand</b>: ${details.brand}</p>
        <p><b>Release Date</b>: ${details.releaseDate ? details.releaseDate : 'Relase Date not found'}</p>
        <p><b>Chipset</b>: ${details.mainFeatures ? details.mainFeatures.chipSet : 'Chipset not found'}</p>
        <p><b>Display</b>: ${details.mainFeatures ? details.mainFeatures.displaySize : 'Display not found'}</p>
        <p><b>Memory</b>: ${details.mainFeatures ? details.mainFeatures.memory : 'Memory detail not found'}</p>
        <p><b>Storage</b>: ${details.mainFeatures ? details.mainFeatures.storage : 'Storage not found'}</p>
        <p><b>Sensors</b>:
            <ol>
                <li>${details.mainFeatures.sensors[0]}</li>
                <li>${details.mainFeatures.sensors[1]}</li>
                <li>${details.mainFeatures.sensors[2]}</li>
                <li>${details.mainFeatures.sensors[3]}</li>
                <li>${details.mainFeatures.sensors[4]}</li>
                <li>${details.mainFeatures.sensors[5]}</li>
            </ol>
        </p>
        
    `;
}

phoneLoad('apple')