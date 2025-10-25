import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import fetchImages from './js/pixabay-api';
import renderImages from './js/render-functions';

const refs = {
  form: document.querySelector('.gallery-form'),
  formInput: document.querySelector('.gallery-form-input'),
  gallery: document.querySelector('.gallery-list'),
  loader: document.querySelector('.loader'),
};

let simpleLightbox = new SimpleLightbox('.gallery-item-link', {
  captionsData: 'alt',
  captionDelay: 250,
});

refs.form.addEventListener('submit', e => {
  e.preventDefault();

  const inputValue = refs.formInput.value.trim();

  if (inputValue === '') {
    iziToast.error({
      message: 'Please enter a search term.',
      position: 'topRight',
      closeOnClick: true,
    });
    return;
  }

  refs.gallery.innerHTML = '';
  refs.gallery.classList.add('hidden');
  refs.loader.classList.remove('hidden');

  fetchImages(inputValue)
    .then(data => {
      refs.formInput.value = '';
      if (data.hits.length === 0) {
        iziToast.error({
          message: 'No images found. Please try a different search term.',
          position: 'topRight',
          closeOnClick: true,
        });
        refs.loader.classList.add('hidden');
        refs.gallery.classList.remove('hidden');
        return;
      }

      const loadGallery = renderImages(data.hits);
      refs.gallery.innerHTML = loadGallery;
      simpleLightbox.refresh();
    })
    .catch(error => {
      iziToast.error({
        message: `Error: ${error.message}`,
        position: 'topRight',
        closeOnClick: true,
      });
    })
    .finally(() => {
      refs.loader.classList.add('hidden');
      refs.gallery.classList.remove('hidden');
    });
});
