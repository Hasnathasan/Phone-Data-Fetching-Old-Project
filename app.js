const mobiles = async (searchValue = 'iphone', showValue) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchValue}`;
    const res = await fetch(url);
    const data = await res.json();
    showMobile(data.data, showValue);
}
const showMobile = (mobiles, showValue) => {
    const mobileContainer = document.getElementById('mobile-container');
    mobileContainer.innerHTML = '';
    const showBtn = document.getElementById('show-more');
    if (showValue && mobiles.length > 10) {
        mobiles = mobiles.slice(0, 10);
        showBtn.classList.remove('hidden');
    }
    else {
        showBtn.classList.add('hidden');
    }

    const error = document.getElementById('false');
    if (mobiles.length == 0) {
        error.classList.remove('hidden');
    }
    else {
        error.classList.add('hidden');
    }

    mobiles.forEach(mobile => {
        console.log(mobile)
        const mobileDiv = document.createElement('div');
        mobileDiv.classList.add('card', 'w-100', 'bg-base-100', 'shadow-xl')
        mobileDiv.innerHTML = `
            <figure><img src=${mobile.image} alt="Shoes" /></figure>
            <div class="card-body">
                <h2 class="card-title">${mobile.phone_name}</h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
                <div class="card-actions justify-end">
                    <label for="my-modal-6" onclick="lodingDetails('${mobile.slug}')" class="btn">Details</label>
                    <input type="checkbox" id="my-modal-6" class="modal-toggle" />
                    <div class="modal modal-bottom sm:modal-middle">
                    <div class="modal-box">
                    <h3 id="name" class="font-bold text-lg"></h3>
                    <div id="details" class="py-4"></div>
                    <div class="modal-action">
                    <label for="my-modal-6" class="btn">Close</label>
                 </div>
                </div>
                 </div>
                </div>
                </div>
        `;
        mobileContainer.appendChild(mobileDiv);
        console.log(mobile.slug)
    });
    lodingLoad(false);
}



const replaceData = (showValue) => {
    lodingLoad(true);
    const searchValue = document.getElementById('search-input').value;
    mobiles(searchValue, showValue);
}

const lodingDetails = async (mobId) => {
    console.log(mobId)
    const url = `https://openapi.programming-hero.com/api/phone/${mobId}`;
    const res = await fetch(url);
    const data = await res.json();
    showDetailsInModal(data.data);
}

const showDetailsInModal = (data) => {
    console.log(data);
    const modalName = document.getElementById('name');
    modalName.innerText = data.name;
    const modaldetails = document.getElementById('details');
    modaldetails.innerHTML = `
        <p class="mb-5">Storage : ${data.mainFeatures.storage}</p>
        <p>ChipSet : ${data.mainFeatures.chipSet}</p>
    `;
}
const showMore = () => {
    replaceData();
}
document.getElementById('search-btn').addEventListener('click', function () {
    replaceData(10);
});
const lodingLoad = (isLoding) => {
    const loder = document.getElementById('loding');
    if (isLoding) {
        loder.classList.remove('hidden');
    }
    else {
        loder.classList.add('hidden');
    }
}
mobiles();