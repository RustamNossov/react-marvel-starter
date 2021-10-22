

class MarvelService {
    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey = '7b1be4b185398d6e5ae82b6f8b1c01bf';

    getResource = async (url) => {
        let res = await fetch(url);

        // if (!res.ok) {
        //     throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        // }

        return await res.json();
    }

    getAllCharacters = async (limit=20, offset=1360) => {
        const res = await this.getResource(`${this._apiBase}characters?limit=${limit}&offset=${offset}&apikey=${this._apiKey}`)
        return res.data.results.map(this._transformCharacter)
    }

    getCharacter = async(id) => {
        const res = await this.getResource(`${this._apiBase}characters/${id}?apikey=${this._apiKey}`)
        return this._transformCharacter(res.data.results[0])
    }

    getRundomCharacter =  () => {
        const rndId =  Math.floor(Math.random() * (1011400-1011000) + 1011000);
        return this.getCharacter(rndId)
        
    }

    _transformCharacter = (character) => {
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
}
export default MarvelService;