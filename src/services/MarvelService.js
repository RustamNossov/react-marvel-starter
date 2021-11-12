import { useHttp } from "../hooks/http.hook";

const useMarvelService = () => {

    const {loading, request, error, btnDisabled, clearError} = useHttp();
    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = '7b1be4b185398d6e5ae82b6f8b1c01bf';

    

    const getAllCharacters = async (limit=20, offset=1360) => {
        const res = await request(`${_apiBase}characters?limit=${limit}&offset=${offset}&apikey=${_apiKey}`)
        return res.data.results.map(_transformCharacter)
    }
    

    const getCharacter = async(id) => {
        const res = await request(`${_apiBase}characters/${id}?apikey=${_apiKey}`)
        return _transformCharacter(res.data.results[0])
    }

    const getRundomCharacter =  () => {
        const rndId =  Math.floor(Math.random() * (1011400-1011000) + 1011000);
        return getCharacter(rndId)
        
    }

    const _transformCharacter = (character) => {
        const descr = character.description;
        
        const newDescr = descr === '' ? "Unfortunatelly, we don't have any description for this character" : descr;

        
        const isTherePicture =  character.thumbnail.path.search('image_not_available') === -1 && character.thumbnail.path.search('4c002e0305708') === -1 ? true : false; 
       
        return {
            comics: character.comics.items,
            id: character.id,
            name: character.name,
            description: newDescr,
            thumbnail: character.thumbnail.path + '.'+character.thumbnail.extension,
            homepage: character.urls[0].url,
            wiki:  character.urls[1].url,
            isTherePicture: isTherePicture
        }
    }


    //------------------COMICS-------------------//

    const getAllComics = async (offset=1000, limit=8) => {
        const res = await request(`${_apiBase}comics?limit=${limit}&offset=${offset}&apikey=${_apiKey}`)
        console.log(res.data.results)
        return res.data.results.map(_transformComics)
    }

    const _transformComics = (comics) => {
        return {
            id: comics.id,
            title: comics.title,
            price: comics.prices[0].price,
            thumbnail: comics.thumbnail.path + '.'+ comics.thumbnail.extension,
            pageCount: comics.pageCount,
            description: comics.description,
            language: comics.language,
        }
    }

    return {loading, error, btnDisabled, getAllCharacters, getCharacter, getRundomCharacter, clearError, getAllComics}
}
export default useMarvelService;