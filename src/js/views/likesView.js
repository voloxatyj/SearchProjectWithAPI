import { elements } from './base';

export const toggleLikeBtn = isLiked => {
	const iconString = isLiked ? 'icon-heart' : 'icon-heart-outlined';
	document.querySelector('.recipe__love use').toggleAttribute('href', `img/icons.svg#${iconString}`);
}

export const toggleLikeMenu = numLikes => {
	elements.likesMenu.style.visibility = numLikes > 0 ? 'visible' : 'hidden';
}

export const renderLike = (like,index) => {
	const markup =`
	<li>
    <a class="likes__link" href="#${like.id}">
			<div class="likes__data">
				<h4 class="likes__name">${like.artist}</h4>
					<p class="likes__author">${like.title}</p>
			</div>
    </a>
	</li>`;
	elements.likesList.insertAdjacentHTML('beforeend',markup);
}

export const deleteLike = id => {
	const el = document.querySelector(`.likes__link[href*="${id}"]`).parentElement;
	if(el)el.parentElement.removeChild(el);
}