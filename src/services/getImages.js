
const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '38827644-52da52720fd8c4c61744e2024';


 
export function getImages(searchText, page) {
  return fetch(
    `${BASE_URL}/?key=${API_KEY}&q=${searchText}&image_type=photo&orientation=horizontal&per_page=12&page=${page}`
  );
} 