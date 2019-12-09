import Gets from './models/Gets';
import List from './models/List';
import Search from './models/Search';
import Likes from './models/Likes';
import * as getsView from './views/getsView';
import * as listView from './views/listView';
import * as searchView from './views/searchView';
import * as likesView from './views/likesView';
import { elements, renderLoader, clearLoader } from './views/base';


const state={};
window.state = state;

/* Search Controller */

const controlSearch = async () => {
	const query = searchView.getInput();
	//console.log(query)
	if(query){
		state.search = new Search(query);
		searchView.clearInput();
		searchView.clearRender();
		renderLoader(elements.searchLoader);
		try {
			await state.search.getResults();
			clearLoader();
			searchView.getArtist(state.search.result);
		} catch (err) {
			alert('Something wrong with search....')
			clearLoader();
		}
	}
}

elements.searchForm.addEventListener('submit',(e) => {
	e.preventDefault();
	controlSearch();
})

elements.searchResPages.addEventListener('click', e=> {
	const btn = e.target.closest('.btn-inline');
	if(btn){
		const goToPage = parseInt(btn.dataset.togo,10);
		searchView.clearRender();
		searchView.getArtist(state.search.result, goToPage);
	}
}) 

/* Gets Controller */

const controlGets = async () => {
 const id = window.location.hash.replace('#','');
 //console.log(id)
 if(id){
	getsView.ClearLyrics();
	renderLoader(elements.lyrics);
	state.gets = new Gets(id);
	try{
		await state.gets.getLyrics();
		clearLoader();
		getsView.renderLyrics( state.gets, state.search );
	} catch (err) {
		alert('Error processing gets!')
	}
 }
}

['hashchange','load'].forEach(event=>window.addEventListener(event, controlGets));

/* List Controller */
const controlList = () => {
	if(!state.list) state.list = new List();
	const id = window.location.hash.replace('#', '');
	const el = state.search.result.filter(item => item.track.track_id == id);
	const item = state.list.addItem(el);
	listView.renderItem(item);
}

elements.shopping.addEventListener('click',e=>{
	const id = e.target.closest('.shopping__item').dataset.itemid;
	//console.log(id)
	if (e.target.matches('.shopping__delete, .shopping__delete *')) {
		state.list.deleteItem(id);
		listView.deleteItem(id);
	}
})

/* Likes Controller */
const controlLike = () => {
	if(!state.likes) state.likes = new Likes();
	const currentID = state.gets.id;
	const el = state.search.result.filter(item => item.track.track_id == currentID);
	if(!state.likes.isLiked(currentID)){
		const newLike = state.likes.addLike(currentID,el)
		likesView.toggleLikeBtn(true);
		likesView.renderLike(newLike);
	} else {
		state.likes.deleteLike(currentID);
		likesView.toggleLikeBtn(false);
		likesView.deleteLike(currentID);
	}
	likesView.toggleLikeMenu(state.likes.getNumLikes());
}

window.addEventListener('load', ()=>{
	state.likes = new Likes();
	state.likes.readStorage();
	likesView.toggleLikeMenu(state.likes.getNumLikes());
	state.likes.likes.forEach(like=>likesView.renderLike(like))
})

elements.lyrics.addEventListener('click',e => {
	if (e.target.closest('.recipe__love')){
		controlList();
		controlLike();
	}
})

