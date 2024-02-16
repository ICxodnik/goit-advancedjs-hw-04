import axios from "axios";

let config = {
    baseURL: 'https://pixabay.com/api/',
    params: {
        key: "42411336-47edecd0595d1c6e33b2e7e0d",
        safesearch: true,
        orientation: "horizontal",
        image_type: "photo"
    }
}

export async function getItems(searchValue) {
    config.params.q = searchValue;

    const response = await axios.get('/', config);

    const data = response.data.hits.map(element => {
        return {
            previewImageUrl: element.webformatURL,
            largeImageUrl: element.largeImageURL,
            altTags: element.tags,
            likeCount: element.likes,
            viewCount: element.views,
            commentsCount: element.comments,
            downloadCount: element.downloads
        }
    });
    console.log(data);
    return data;
}
