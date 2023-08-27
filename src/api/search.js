import axios from 'axios';

const BaseUrl = 'https://pixabay.com/api/';
const KEY = '38006870-c016c2a85f82fa326eab38f53';

export const fetchData = async (searchValue, page ) => {
    try {
        const response = await axios.get(`${BaseUrl}?q=${searchValue}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`);
        const recievedData = await response.data;
        return recievedData;
    } catch (error) {
        console.log('Something goes wrong')
    }
}