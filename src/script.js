import * as serviceApi from "./serviceApi";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const formRef = document.getElementById("search-form");
const galleryRef = document.getElementById("gallery");
const loadMoreRef = document.getElementById("load-more");
let page = 1;


formRef.addEventListener("submit", async function onSubmit(e) {
    e.preventDefault();
    clearGallary();
    try {
        const result = await serviceApi.getItems(formRef.elements.searchQuery.value);
        if (!result.data.length) {
            iziToast.warning({
                title: 'Caution',
                message: 'Sorry, there are no images matching your search query. Please try again.',
            });
            return;
        }
        iziToast.success({
            title: 'OK',
            message: `Hooray! We found ${result.totalHits} images.`,
        });
        addGallary(result.data);
    }
    catch (e) {
        iziToast.error({
            title: 'Error',
            message: e,
        });
        console.log(e);
    }
});

function clearGallary() {
    galleryRef.innerHTML = "";
}

function addGallary(data) {
    // const fragment = document.createDocumentFragment();
    // largeImageUrl
    const result = data.map(el => {
        return `<div class="photo-card">
            <img src="${el.previewImageUrl}" alt="${el.altTags}" loading="lazy" />
            <div class="info">
                <p class="info-item">
                    <b>Likes</b>
                    <span>${el.likeCount}</span>
                </p>
                <p class="info-item">
                    <b>Views</b>
                    <span>${el.viewCount}</span>
                </p>
                <p class="info-item">
                    <b>Comments</b>
                    <span>${el.commentsCount}</span>
                </p>
                <p class="info-item">
                    <b>Downloads</b>
                    <span>${el.downloadCount}</span>
                </p>
            </div>
        </div>`
    })
        .join("");
    galleryRef.insertAdjacentHTML("beforeend", result);
}

loadMoreRef.addEventListener("click", async function onLoadMore(e) {
    try {
        const result = await serviceApi.getItems(formRef.elements.searchQuery.value, ++page);
        if (!result.data.length) {
            iziToast.warning({
                title: "Caution",
                message: "We're sorry, but you've reached the end of search results.",
            });
            return;
        }
        addGallary(result.data);
    }
    catch (e) {
        iziToast.error({
            title: 'Error',
            message: e.message,
        });
        console.log(e);
    }
});



