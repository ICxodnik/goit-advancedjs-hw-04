import{a as p,S as y,i as c}from"./assets/vendor-527658dd.js";(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function t(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(e){if(e.ep)return;e.ep=!0;const o=t(e);fetch(e.href,o)}})();const g=40,h=p.create({baseURL:"https://pixabay.com/api/",params:{key:"42411336-47edecd0595d1c6e33b2e7e0d",safesearch:!0,orientation:"horizontal",image_type:"photo",per_page:g}});async function b(s,a=1){const t=await h.get("/",{params:{q:s,page:a}});return{data:t.data.hits.map(e=>({previewImageUrl:e.webformatURL,largeImageUrl:e.largeImageURL,altTags:e.tags,likeCount:e.likes,viewCount:e.views,commentsCount:e.comments,downloadCount:e.downloads})),total:t.data.total,hasNextPage:t.data.total-a*g>0}}const l=document.getElementById("search-form"),u=document.getElementById("gallery"),d=document.getElementById("load-more"),w=new y(".gallery a",{captions:!0,captionDelay:250,captionType:"attr",captionsData:"alt"});let n=1;l.addEventListener("submit",async function(a){a.preventDefault(),n=1,f(l.elements.searchQuery.value,n)});d.addEventListener("click",async function(a){n++,f(l.elements.searchQuery.value,n)});function m(){u.innerHTML=""}function v(s){const a=s.map(t=>`<div class="photo-card">
            <a class="gallery__link" href="${t.largeImageUrl}">
                <img
                    src="${t.previewImageUrl}"
                    alt="${t.altTags}"
                    data-source="${t.largeImageUrl}"
                    loading="lazy"
                    class="gallery__image"
                />
            </a>
            <div class="info">
                <p class="info-item">
                    <b>Likes</b>
                    <span>${t.likeCount}</span>
                </p>
                <p class="info-item">
                    <b>Views</b>
                    <span>${t.viewCount}</span>
                </p>
                <p class="info-item">
                    <b>Comments</b>
                    <span>${t.commentsCount}</span>
                </p>
                <p class="info-item">
                    <b>Downloads</b>
                    <span>${t.downloadCount}</span>
                </p>
            </div>
        </div>`).join("");u.insertAdjacentHTML("beforeend",a)}const L="Sorry, there are no images matching your search query.Please try again.",I="We're sorry, but you've reached the end of search results.";async function f(s,a){try{d.classList.add("hidden");const t=await b(s,a),r=a===1,e=!t.hasNextPage;if(!t.data.length){m(),c.warning({title:"Caution",message:r?L:I});return}r&&(m(),c.success({title:"OK",message:`Hooray! We found ${t.total} images.`}),P()),v(t.data),w.refresh(),r||C(),e||d.classList.remove("hidden")}catch(t){c.error({title:"Error",message:t.message}),console.log(t)}}function C(){const{height:s}=u.firstElementChild.getBoundingClientRect();window.scrollBy({top:s*2,behavior:"smooth"})}function P(){window.scrollBy({top:0,behavior:"smooth"})}
//# sourceMappingURL=commonHelpers.js.map
