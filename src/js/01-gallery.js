import { galleryItems } from "./gallery-items";

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const gallery = document.querySelector(".gallery");

gallery.addEventListener("click", preventDefaultAction);

initializationOfGalleryMarkup(createGalleryMarkup(galleryItems));

function createElementOfMarkup(Item) {
  const { preview, original, description } = Item;

  return `<a class="gallery__item" href="${original}">
                <img
                    class="gallery__image"
                    src="${preview}"
                    alt="${description}"
                />
           </a>`;
}

function createGalleryMarkup(galleryMarkupItems) {
  const galleryMarkup = galleryMarkupItems
    .map((galleryItem) => createElementOfMarkup(galleryItem))
    .join("");

  return galleryMarkup;
}

function initializationOfGalleryMarkup(markup) {
  gallery.insertAdjacentHTML("beforeend", markup);

  initializationSimpleLightbox();
}

function preventDefaultAction(Event) {
  Event.preventDefault();
}

function initializationSimpleLightbox() {
  let lightbox = new SimpleLightbox(".gallery .gallery__item", {
    scrollZoom: false,
    captionType: "attr",
    captionsData: "alt",
    captionPosition: "bottom",
    captionDelay: 250,
  });
}
