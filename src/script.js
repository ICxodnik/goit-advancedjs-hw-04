import * as serviceApi from "./serviceApi"

const formRef = document.getElementById("search-form");
const galleryRef = document.getElementById("gallery");
const loadMoreRef = document.getElementById("load-more");


formRef.addEventListener("submit", async function onSubmit(e) {
    e.preventDefault();
    const data = await serviceApi.getItems(e.target.elements.searchQuery.value);

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
});

loadMoreRef.addEventListener("click", function onLoadMore(e) {

});



