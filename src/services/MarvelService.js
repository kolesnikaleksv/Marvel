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
    
    getAllCaracters = () => {
        return this.getResurce(`${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`)
    }
    getCaracter = (id) => {
        return this.getResurce(`${this._apiBase}characters/${id}?${this._apiKey}`)
    }
}

export default MarvelService;