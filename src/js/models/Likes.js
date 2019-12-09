export default class Likes {
	constructor() {
		this.likes = [];
	}

	addLike(id,el) {
		const like = {
			id,
			artist: el[0].track.artist_name,
			title: el[0].track.track_name
		}
		this.likes.push(like);
		this.persistData();
		return like;
	}

	deleteLike (id) {
		const index = this.likes.findIndex(items => items.id === id);
		this.likes.splice(index, 1);
		this.persistData();
	}

	isLiked(id) {
		return this.likes.findIndex(el=>el.id===id) !== -1;
	}

	getNumLikes(){
		return this.likes.length;
	}

	persistData() {
		localStorage.setItem('likes', JSON.stringify(this.likes));
	}

	readStorage() {
		const storage = JSON.parse(localStorage.getItem('likes'));
		if(storage)this.likes=storage;
	}
}