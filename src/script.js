import * as serviceApi from "./serviceApi";
import iziToast from "izitoast";
import SimpleLightbox from "simplelightbox";

import "izitoast/dist/css/iziToast.min.css";
import "simplelightbox/dist/simple-lightbox.min.css";

const formRef = document.getElementById("search-form");
const galleryRef = document.getElementById("gallery");
const loadMoreRef = document.getElementById("load-more");
const lightbox = new SimpleLightbox('.gallery a', {
    captions: true,
    captionDelay: 250,
    captionType: 'attr',
    captionsData: 'alt'
});

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
    // TODO: change template instantiation to prevent XSS injection
    const result = data.map(el => {
        return `<div class="photo-card">
            <a class="gallery__link" href="${el.largeImageUrl}">
                <img
                    src="${el.previewImageUrl}"
                    alt="${el.altTags}"
                    data-source="${el.largeImageUrl}"
                    loading="lazy"
                    class="gallery__image"
                />
            </a>
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
    try {
        loadMoreRef.classList.add("hidden");

        const result = await serviceApi.getItems(search, page);

        const isFirstPage = page === 1;
        const isLastPage = !result.hasNextPage;

        if (!result.data.length) {
            clearGallary();
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

            scrollToTop();
        }

        addGallary(result.data);
        lightbox.refresh();

        if (!isFirstPage) {
            scrollForward();
        }
        if (!isLastPage) {
            loadMoreRef.classList.remove("hidden");
        }
    }
    catch (e) {
        iziToast.error({
            title: 'Error',
            message: e.message,
        });
        console.log(e);
    }
}

function scrollForward() {
    const { height: cardHeight } = galleryRef.firstElementChild.getBoundingClientRect();

    window.scrollBy({
        top: cardHeight * 2,
        behavior: "smooth",
    });
}

function scrollToTop() {
    window.scrollBy({
        top: 0,
        behavior: "smooth",
    });
}

