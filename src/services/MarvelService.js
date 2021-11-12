class MarvelService {
    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey = 'apikey=23bb8c00adabeadbcd1cec40fc170f8c';
    getResurce = async (url) => {
        let res = await fetch(url);
        
        if(!res) {
            throw new Error(`Could not fetch ${url}, status ${res.status}`);
        }
        return await res.json();
    }
    
    getAllCaracters = async () => {
        const res = await this.getResurce(`${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`)
        return res.data.results.map(this._transformCharacter);
    }
    getCharacter = async (id) => {
        const res = await this.getResurce(`${this._apiBase}characters/${id}?${this._apiKey}`)
        return this._transformCharacter(res.data.results[0]);
    }
    _transformCharacter = (char) => {
        return {
            id: char.id,
            //name: (char.name.length > 22) ? `${char.name.slice(0, 22)}...` :
            name: char.name,
            description: char.description ? `${char.description.slice(0, 210)}...` : 'There is no description for this character',
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }
    }
    // _transformCharacter = (res) => {
    //     console.log()
    //     return {
    //         name: res.data.results[0].name,
    //         description: res.data.results[0].description,
    //         thumbnail: res.data.results[0].thumbnail.path + '.' + res.data.results[0].thumbnail.extension,
    //         homepage: res.data.results[0].urls[0].url,
    //         wiki: res.data.results[0].urls[1].url
    //     }
    // }
}

export default MarvelService;