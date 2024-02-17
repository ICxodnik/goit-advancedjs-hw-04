import{a as p,S as y,i as l}from"./assets/vendor-527658dd.js";(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const c of s.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&r(c)}).observe(document,{childList:!0,subtree:!0});function t(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(e){if(e.ep)return;e.ep=!0;const s=t(e);fetch(e.href,s)}})();const g=40,h=p.create({baseURL:"https://pixabay.com/api/",params:{key:"42411336-47edecd0595d1c6e33b2e7e0d",safesearch:!0,orientation:"horizontal",image_type:"photo",per_page:g}});async function b(o,a=1){const t=await h.get("/",{params:{q:o,page:a}});return{data:t.data.hits.map(e=>({previewImageUrl:e.webformatURL,largeImageUrl:e.largeImageURL,altTags:e.tags,likeCount:e.likes,viewCount:e.views,commentsCount:e.comments,downloadCount:e.downloads})),total:t.data.total,hasNextPage:t.data.total-a*g>0}}const d=document.getElementById("search-form"),u=document.getElementById("gallery"),n=document.getElementById("load-more"),L=new y(".gallery a",{captions:!0,captionDelay:250,captionType:"attr",captionsData:"alt"});let i=1;d.addEventListener("submit",async function(a){a.preventDefault(),i=1,f(d.elements.searchQuery.value,i)});n.addEventListener("click",async function(a){i++,f(d.elements.searchQuery.value,i)});function m(){u.innerHTML=""}function v(o){const a=o.map(t=>`<div class="photo-card">
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
        </div>`).join("");u.insertAdjacentHTML("beforeend",a)}const w="Sorry, there are no images matching your search query.Please try again.",I="We're sorry, but you've reached the end of search results.";async function f(o,a){try{n.classList.add("hidden");const t=await b(o,a),r=a===1,e=!t.hasNextPage;if(!t.data.length){m(),l.warning({title:"Caution",message:r?w:I});return}if(r&&(m(),l.success({title:"OK",message:`Hooray! We found ${t.total} images.`})),v(t.data),L.refresh(),r||C(),e){n.classList.add("hidden");return}n.classList.remove("hidden")}catch(t){l.error({title:"Error",message:t.message}),console.log(t)}}function C(){const{height:o}=u.firstElementChild.getBoundingClientRect();window.scrollBy({top:o*2,behavior:"smooth"})}
//# sourceMappingURL=commonHelpers.js.map
