import * as serviceApi from "./serviceApi";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const formRef = document.getElementById("search-form");
const galleryRef = document.getElementById("gallery");
const loadMoreRef = document.getElementById("load-more");


formRef.addEventListener("submit", async function onSubmit(e) {
    e.preventDefault();
    try {
        const result = await serviceApi.getItems(e.target.elements.searchQuery.value);
        if (!result.data.length) {
            iziToast.error({
                title: 'Caution',
                message: 'Sorry, there are no images matching your search query. Please try again.',
            });
            clearGallary();
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
                    <b>Likes ${el.likeCount}</b>
                </p>
                    <p class="info-item">
                <b>Views ${el.viewCount}</b>
                </p>
                <p class="info-item">
                    <b>Comments ${el.commentsCount}</b>
                </p>
                <p class="info-item">
                    <b>Downloads ${el.downloadCount}</b>
                </p>
            </div>
        </div>`
    })
        .join("");
    galleryRef.innerHTML = result;
}

loadMoreRef.addEventListener("click", function onLoadMore(e) {

});



