import uniqid from 'uniqid'

export  default class List {
	constructor() {
		this.items = [];
	}

	addItem ( el ){
		const item = {
			id : uniqid(),
			artist : el[0].track.artist_name,
			title : el[0].track.track_name
		}
		this.items.push(item);
		return item;
	}

	deleteItem(id) {
		const index = this.items.findIndex(items => items.id === id);
		this.items.splice(index,1);
	}
}