import Dog from './Dog.js';
import dogData from './data.js';
import { getDogNum } from './utils.js';

let likedDogs = [];
let dogNum = getDogNum(dogData.length);
let dog = getNewDog();
let isWaiting = false;

function getNewDog() {
	const nextDogData = new Dog(dogData[dogNum]);
	return nextDogData;
}

function endOfDogs() {
	document.querySelector('.root').innerHTML = `
    <h1 class='no-dogs'>Sorry, no more dogs now 😔</h1>`;
}

function addDogToLiked() {
	likedDogs.push(dog);
}

function removeDogFromArr() {
	const index = dogData.indexOf(dogData[dogNum]);
	if (index > -1) {
		dogData.splice(index, 1);
	}
}

function swipe() {
	isWaiting = true;
	if (dogData.length > 0) {
		dogNum = getDogNum(dogData.length);
		render();
		setTimeout(() => {
			dog = getNewDog();
			render();
			isWaiting = false;
		}, 800);
	} else {
		render();
		setTimeout(() => {
			endOfDogs();
		}, 800);
	}
}

function like() {
	if (!isWaiting) {
		dog.setLike();
		addDogToLiked();
		removeDogFromArr();
		swipe();
	}
}

function nope() {
	if (!isWaiting) {
		dog.setNope();
		swipe();
	}
}

function openChat() {
	isWaiting = true;
	const dogs = likedDogs
		.map(dog => {
			return `<div class="liked-dog">
					<i class="fa-solid fa-user-xmark"></i>
                    <img class="liked-dog--img" src="${dog.avatar}">
                    <h2 class="liked-dog--name">${dog.name}</h2>
                </div>`;
		})
		.join('');
	document.querySelector('.root').innerHTML = `                   
            <section class="chat">
                <h1 class="chat--heading">Liked dogs</h1>
                    <div class="liked-dog-box">
                        ${dogs ? dogs : "<p>You haven't liked any dog yet...</p>"}
                    </div>
            </section>`;
			
	document.querySelectorAll('.fa-user-xmark').forEach(el =>
		el.addEventListener('click', e => {
			const deletedDogName = e.target.parentElement.childNodes[5].innerHTML;
			deleteDog(deletedDogName);
		})
	);
}
function deleteDog(dogName) {
	dogData.push(...likedDogs.filter(dog=> dog.name === dogName).map(dog=>({...dog,hasBeenSwiped: false, hasBeenLiked: false})))
	dog = getNewDog()
	likedDogs = likedDogs.filter(dog=>{
		if(dog.name !== dogName){
			return dog;
		}
	})
	openChat()
}

function closeChat() {
	isWaiting = false;
	dogData.length > 0 ? render() : endOfDogs();
}

document.querySelector('.logo-icon').addEventListener('click', closeChat);
document.querySelector('.chat-icon').addEventListener('click', openChat);
document.querySelector('.like-btn').addEventListener('click', like);
document.querySelector('.nope-btn').addEventListener('click', nope);

function render() {
	document.querySelector('.root').innerHTML = dog.getDogHtml();
}

render();
