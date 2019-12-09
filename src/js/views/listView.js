import { elements } from './base';

export const renderItem = item => {
  const markup = `
  <li class="shopping__item" data-itemid=${item.id}>
    <div class="shopping__count">
      <h1>${item.artist}</h1>
      <p class="shopping__description">${item.title}</p>
    </div>
        <button class="shopping__delete btn-tiny">
          <svg>
            <use href="img/icons.svg#icon-circle-with-cross"></use>
         </svg>
        </button>
  </li>`;
		elements.song.insertAdjacentHTML('beforeend', markup);
};

export const deleteItem = id => {
	const item = document.querySelector(`[data-itemid="${id}"]`);
	item.parentElement.removeChild(item);
};