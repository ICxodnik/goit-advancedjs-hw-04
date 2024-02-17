import * as serviceApi from "./serviceApi";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const formRef = document.getElementById("search-form");
const galleryRef = document.getElementById("gallery");
const loadMoreRef = document.getElementById("load-more");
let page = 1;


formRef.addEventListener("submit", async function onSubmit(e) {
    e.preventDefault();
    page = 1;
    loadImages(formRef.elements.searchQuery.value, page);
});

loadMoreRef.addEventListener("click", async function onLoadMore(e) {
    page++;
    loadImages(formRef.elements.searchQuery.value, page);
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

const NoImageFirstPage = "Sorry, there are no images matching your search query.Please try again.";
const NoImageLaterPages = "We're sorry, but you've reached the end of search results.";

async function loadImages(search, page) {
    /**
     * We do additional logic only when the first page is loaded
     */
    const isFirstPage = page === 1;
    try {
        const result = await serviceApi.getItems(search, page);

        if (!result.data.length) {
            iziToast.warning({
                title: "Caution",
                message: isFirstPage ? NoImageFirstPage : NoImageLaterPages,
            });
            return;
        }

        if (isFirstPage) {
            clearGallary();
            iziToast.success({
                title: 'OK',
                message: `Hooray! We found ${result.total} images.`,
            });
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
}


