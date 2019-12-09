
export const elements = {
	searchInput : document.querySelector('.search__field'),
	searchForm : document.querySelector('.search'),
	searchLoader : document.querySelector('.results'),
	renderListItem : document.querySelector('.results__list'),
	searchResPages : document.querySelector('.results__pages'),
	lyrics : document.querySelector('.recipe'),
	song : document.querySelector('.shopping__list'),
	shopping: document.querySelector('.shopping__list'),
	likesMenu: document.querySelector('.likes__field'),
	likesList: document.querySelector('.likes__list')
}

export const elementsString = {
	loader : 'loader'
}

export const renderLoader = parent => {
	const loader = `
		<div class=${elementsString.loader}>
			<svg>
				<use href="img/icons.svg#icon-cw"></use>
			</svg>
		</div>`;
	parent.insertAdjacentHTML('afterbegin', loader);
}

export const clearLoader = () => {
	const loader = document.querySelector(`.${elementsString.loader}`)
	if(loader){
		loader.parentElement.removeChild(loader);
	}
}