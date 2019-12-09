import axios from 'axios';
import { proxy, key } from '../config';

export default class Gets {
	constructor (id) {
		this.id = id;
	}

	async getLyrics () {
		try {
			const res = await axios
				.get(`${proxy}http://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${this.id}&q_lyrics&apikey=${key}`)
			this.lyrics = res.data.message.body.lyrics.lyrics_body;
			this.img = res.data.message.body.lyrics.pixel_tracking_url;
			//console.log(res)
		} catch (error) {
			alert('Something went wrong:(');
		}
	}
}