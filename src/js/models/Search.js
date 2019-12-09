import axios from 'axios';
import { proxy, key } from '../config';

export default class Search{
	constructor(query) {
		this.query = query;
	}

async getResults () {
	try{
		const res = await axios
			.get(`${proxy}http://api.musixmatch.com/ws/1.1/track.search?q_artist=${this.query}&page_size=50&f_has_lyrics&page=1&s_track_rating=desc&apikey=${key}`)
			this.result = res.data.message.body.track_list;
		//console.log(this.artist);
	} catch(error){
		alert(error);
	}
}
}