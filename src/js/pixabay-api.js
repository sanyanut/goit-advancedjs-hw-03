const KEY = '52917262-bfaf5bd23aa54a80b60e2fad9';
const BASE_URL = 'https://pixabay.com/api/';

export default function fetchImages(value) {
  const params = new URLSearchParams({
    key: KEY,
    q: value,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  });
  return fetch(`${BASE_URL}?${params}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}
