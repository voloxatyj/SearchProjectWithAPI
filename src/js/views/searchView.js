import { elements } from './base';

export const getInput = () => elements.searchInput.value;

export const clearInput = () => 
elements.searchInput.value='';

export const clearRender = () => {
elements.renderListItem.innerHTML='';
elements.searchResPages.innerHTML='';}


const limitTitle = (title, limit=17) => {
	console.log(title)
	const newTitle = [];
	if(title.length>=17){
		Array.from(title).join('').split(' ').reduce((acc,cur)=>{
			if (acc + cur.length <= limit){
				newTitle.push(cur);
			}
			return acc+cur.length;
		},0)
		return `${newTitle.join(' ')} ...`; 
	}
	return title;
}

const getRenderArtist = (artist,index) => {
	const render = `
	<li>
	<a class="likes__link" href="#${artist.track.track_id}">
	<figure class="likes__fig">
	<img src="img/img-${index}.jpg" alt="${artist.track.track_id}">
	</figure>
	<div class="likes__data">
	<h4 class="likes__author">${limitTitle(artist.track.artist_name)}</h4>
	<p class="likes__name">${limitTitle(artist.track.track_name)}</p>
      </div>
    </a>
		</li>`
		elements.renderListItem.insertAdjacentHTML('beforeend', render);	
	}

	const createBtn = (page,type) => 
		`<button class="btn-inline results__btn--${type}" 			data-togo=${type === 'prev' ? page-1 : page+1}>
		<span>Page ${type === 'prev' ? page-1 : page+1}</span>
			<svg class="search__icon">
					<use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
				</svg>
			</button>`;
	
	const renderBtn = (page, numResults, renderPageList) => {
		const pages = Math.ceil(numResults/renderPageList);
		let button;
		if(page === 1 && pages > 1){
			button = createBtn(page,'next')
		} else if (page < pages){
			button = `
			${createBtn(page,'prev')}
			${createBtn(page,'next')}`;
		} else if (page === pages && pages > 1){
			button = createBtn(page, 'prev');
		}
		elements.searchResPages.insertAdjacentHTML('afterbegin',button);
	}
	
	export const getArtist = ( artists, page=1, renderPageList=10) => {
	const start = (page-1)*renderPageList;
	const end = page*renderPageList;
	
	artists.slice(start,end).forEach(getRenderArtist);
	renderBtn(page, artists.length, renderPageList);
}