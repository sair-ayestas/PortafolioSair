import Translator from "./translator.js";

// Forma de simplificar los selectores para no escribirlos cada vez que se necesiten
function $(selector) {
	return document.querySelector(selector);
}
function $$(selector) {
	return document.querySelectorAll(selector);
}
// ################# //

// --- Menú --- //
const header = $('.header');
const menuButton = $('.menu-button');
const lineMenuButton1 = $('.line-1');
const lineMenuButton2 = $('.line-2');
const lineMenuButton3 = $('.line-3');
const ulLinksList = $('.ul-links-list');

// Función para desplegar el menú
function menuDisplay() {
	ulLinksList.classList.toggle('active');
	lineMenuButton1.classList.toggle('active');
	lineMenuButton2.classList.toggle('active');
	lineMenuButton3.classList.toggle('active');
}

menuButton.addEventListener('click', () => {
	menuDisplay();
});

// Para que si se presiona por fuera de la lista de navegación , se salga la lista //
window.addEventListener('click', (e) => {
	if (
		ulLinksList.classList.contains('active') &&
		e.target !== header &&
		e.target !== menuButton &&
		e.target !== lineMenuButton1 &&
		e.target !== lineMenuButton2 &&
		e.target !== lineMenuButton3
	) {
		menuDisplay();
	}
});

// Para que el header cambie cuando se scrollea y para que aparezca la descripción de los projectos en mobile //
// Ubicación de la página al principio de todo
let pageUbication = window.pageYOffset;
window.onscroll = function () {
	let actualUbication = window.pageYOffset;
	if (pageUbication < actualUbication) {
		$('.header').style.boxShadow = '2px 4.5px 4.5px -2px var(--primary-color)'; // #868686
		// $('.header').style.borderBottom = '2px solid var(--little-grey)';
	} else {
		$('.header').style.boxShadow = 'none';
		// $('.header').style.borderBottom = 'none';
	}
	projectsDescription(actualUbication);
	paintedLink(actualUbication);
};

const listLinks = $$('.list-link');
const scrollDownSection = $('.scroll-down-container');
// Tuve que poner secciones más especificas porque no me tomaba bien el cambio
const softSkillsSymbol = $('.soft-skills-container .final-symbol');
const flexKnowledgeContainer = $('.flex-knowdlege-container');
const projectParagraphImproving = $('.project-span-improving');
const appreciationSection = $('.appreciation-section');

// Para que los links del nav se vayan pintando dependiendo de la sección en la que se encuentre el usuario
function paintedLink(actualUbication) {
	const home = actualUbication <= scrollDownSection.offsetTop;
	const aboutMe = actualUbication >= scrollDownSection.offsetTop && actualUbication < softSkillsSymbol.offsetTop;
	const knowledges = actualUbication >= softSkillsSymbol.offsetTop && actualUbication < flexKnowledgeContainer.offsetTop;
	const projects =
		actualUbication > flexKnowledgeContainer.offsetTop && actualUbication < projectParagraphImproving.offsetTop;
	const contact = actualUbication >= projectParagraphImproving.offsetTop && actualUbication < appreciationSection.offsetTop;

	const arrayLinks = [home, aboutMe, knowledges, projects, contact];
	for (let l = 0; l < arrayLinks.length; l++) {
		arrayLinks[l] ? listLinks[l].classList.add('active') : listLinks[l].classList.remove('active');
	}
}
// ------------- //

// --- Translator --- //
let translator = new Translator({
	langSelected: '',
});

const spanishButton = $('button.language.spanish');
const spanishButtonImg = $('button.language.spanish img');
const englishButton = $('button.language.english');
const englishButtonImg = $('button.language.english img');

spanishButton.addEventListener('click', () => {
	translator.langSelected = 'es';
    translator.changeLanguage(translator.langSelected);
	if (!spanishButtonImg.classList.contains('active')) {
		spanishButtonImg.classList.add('active');
		englishButtonImg.classList.remove('active');
	}
});
englishButton.addEventListener('click', () => {
	translator.langSelected = 'en';
    translator.changeLanguage(translator.langSelected);
	if (!englishButtonImg.classList.contains('active')) {
		englishButtonImg.classList.add('active');
		spanishButtonImg.classList.remove('active');
	}
});
// ------------- //

// --- Soft skills --- //
const skill = $$('.skill');
const skillsHeaderArrow = $$('.skill-header i');
const skillsDescription = $$('.skill-description');

// Para que las soft skills se desplieguen
for (let i = 0; i < skill.length; i++) {
	skill[i].addEventListener('click', () => {
		skillsDescription[i].classList.toggle('active');
		skillsHeaderArrow[i].classList.toggle('bxs-chevron-down');
		skillsHeaderArrow[i].classList.toggle('bxs-chevron-up');
		skillsHeaderArrow[i].classList.toggle('active');
	});
}
// ------------- //

// --- Project Cards --- //
const descriptionProject = $$('.description-project');
const gridProject = $$('.grid-project');
const contactSection = $('.my-contact');

// Para que de las cards de los proyectos se despliegue automaticamente a cierta altura de la página la info sobre ellos,  en dispositivos moviles
function projectsDescription(actualUbication) {
	const firstCard = gridProject[0].offsetTop >= actualUbication && gridProject[0].offsetTop <= gridProject[1].offsetTop;
	const secondCard = gridProject[1].offsetTop >= actualUbication && gridProject[1].offsetTop <= gridProject[2].offsetTop;
	const thirdCard = gridProject[2].offsetTop >= actualUbication && gridProject[2].offsetTop <= gridProject[3].offsetTop;
	const fourthCard = gridProject[3].offsetTop >= actualUbication && gridProject[3].offsetTop <= gridProject[4].offsetTop;
	const fifthCard = gridProject[4].offsetTop >= actualUbication && gridProject[4].offsetTop <= gridProject[5].offsetTop;
	const sixthCard = gridProject[5].offsetTop >= actualUbication && gridProject[5].offsetTop <= contactSection.offsetTop;

	const arrayCards = [firstCard, secondCard, thirdCard, fourthCard, fifthCard, sixthCard];
	for (let n = 0; n < arrayCards.length; n++) {
		arrayCards[n]
			? descriptionProject[n].classList.add('view-description-mobile')
			: descriptionProject[n].classList.remove('view-description-mobile');
	}
}
// ------------- //

// --- Bot chat --- //
const botIconContainer = $('.bot-icon-container');
const botChatContainer = $('.bot-chat');
const closeBotChat = $('.exit-bot-container');
const mediaqueryList = window.matchMedia('(min-width: 768px)');
const botMessagesContainer = $('.bot-messages-container');
const botMessages = $$('.bot-message');
const possibleAnswers = $$('.possible-answer');

// $$$ Hello answer $$$ //
const botHelloSection = $('.hello-bot-section');
const userHelloAnswer = $('.user-hello-answer');
const botHelloAnswer = $$('.bot-hello-answer');
// $$$$$$$$$$$$$$$ //

// $$$ Contact answer $$$ //
const botContactSection = $('.contact-bot-section');
const userContactAnswer = $('.user-contact-answer');
const botContactAnswer = $$('.bot-contact-answer');
const botContactAnswerLink = $('.bot-contact-answer a.link-contact-bot');
// $$$$$$$$$$$$$$$ //

// $$$ Hire answer $$$ //
// $$$$$$$$$$$$$$$ //

// Función para abrir el chat del bot
botIconContainer.addEventListener('click', () => {
	if (!mediaqueryList.matches) {
		botChatContainer.style.width = '100%';
		botChatContainer.style.height = '100%';
	} else {
		botChatContainer.style.width = '25%';
		botChatContainer.style.height = '75%';
	}
	for (let b = 0; b < botMessages.length; b++) {
		timeOutBotFunction(botMessages, b);
	}
	for (let a = 0; a < possibleAnswers.length; a++) {
		timeOutBotFunction(possibleAnswers, a, "Chat with Lucho's Bot started");
	}
});

// Función para que el bot despliegue de a poco los mensajes
function timeOutBotFunction(element, param, string) {
	element[param].style.display = 'none';
	// Para que se desplieguen los mensajes del bot de a poco
	if (element === botMessages || element === botHelloAnswer || element === botContactAnswer) {
		setTimeout(() => {
			element[param].style.display = 'block';
			botMessagesContainer.scrollTo(0, $('.bot-chat').scrollHeight);
		}, (param + 1) * 1500);
		// Para que se despliegue las opcion de respuesta 0 que puede elegir el usuario para que le responda el bot luego de que termine de responderle sobre el contacto
	} else if (element[param] === possibleAnswers[0] && string === undefined) {
		setTimeout(() => {
			element[param].style.display = 'block';
			botMessagesContainer.scrollTo(0, $('.bot-chat').scrollHeight);
		}, (botContactAnswer.length + 1) * 1500);
		// Para que se despliegue las opcion de respuesta 1 que puede elegir el usuario para que le responda el bot luego de que termine de responderle sobre el saludo "Hello"
	} else if (element[param] === possibleAnswers[1] && string === undefined) {
		setTimeout(() => {
			element[param].style.display = 'block';
			botMessagesContainer.scrollTo(0, $('.bot-chat').scrollHeight);
		}, (botHelloAnswer.length + 1) * 1500);
		// Para que se desplieguen las opciones de respuesta que puede elegir el usuario para que le responda el bot luego de que se "haya introducido" el bot
	} else if (string !== undefined) {
		setTimeout(() => {
			element[param].style.display = 'block';
			botMessagesContainer.scrollTo(0, $('.bot-chat').scrollHeight);
		}, (botMessages.length + 1) * 1500);
	}
}

// Función para cerrar el chat del bot
function closeBot() {
	botChatContainer.style.width = 0;
	botChatContainer.style.height = 0;
	botHelloSection.style.display = 'none';
	botContactSection.style.display = 'none';
	closeBotAnswers(botHelloAnswer, botContactAnswer);
}

// Función que sirve para borrar las respuestas del bot (así cuando se vuelve a abrir el chat del bot aparece todo como antes)
function closeBotAnswers(ans) {
	ans.forEach((an) => {
		an.style.display = 'none';
	});
}

// Cierre de chat de bot
closeBotChat.addEventListener('click', () => {
	closeBot();
});
botContactAnswerLink.addEventListener('click', () => {
	closeBot();
});

// Despliegue de mensajes
for (let a = 0; a < possibleAnswers.length; a++) {
	possibleAnswers[a].addEventListener('click', () => {
		closeBotAnswers(possibleAnswers);
		switch (possibleAnswers[a]) {
			case possibleAnswers[0]:
				botContactSection.style.display = 'none';
				userContactAnswer.style.display = 'none';
				botHelloSection.style.display = 'block';
				userHelloAnswer.style.display = 'flex';
				for (let b = 0; b < botHelloAnswer.length; b++) {
					timeOutBotFunction(botHelloAnswer, b);
				}
				timeOutBotFunction(possibleAnswers, 1);
				break;
			case possibleAnswers[1]:
				botHelloSection.style.display = 'none';
				userHelloAnswer.style.display = 'none';
				botContactSection.style.display = 'block';
				userContactAnswer.style.display = 'flex';
				for (let b = 0; b < botContactAnswer.length; b++) {
					timeOutBotFunction(botContactAnswer, b);
				}
				timeOutBotFunction(possibleAnswers, 0);
				break;
		}
	});
}
// ------------- //

// Probar de poner todas las botAnswer en una seccion del html y depende de la respuesta que se ponga se genera el html debajo de todo.

// ------------- //
// --- Arrow to go to the top of the page --- //
// const toUpArrow = $('.arrow-container');
// function toUpArrowDisplay(actualUbication) {
// 	actualUbication >= scrollDownSection.offsetTop ? toUpArrow.classList.add('active') : toUpArrow.classList.remove('active');
// }
// ------------- //

// --- Contact --- //
// const charactersValidation = {
// 	names: {
// 		min: 2,
// 		limit: 30,
// 		val: false,
// 	},
// 	affairs: {
// 		min: 5,
// 		limit: 35,
// 		val: false,
// 	},
// 	emails: {
// 		emailCharacters: /^([da-z_.-]+)@([da-z.-]+).([a-z.]{2,6})$/,
// 		val: false,
// 	},
// 	messages: {
// 		min: 10,
// 		limit: 250,
// 		val: false,
// 	},
// };

// const { names, affairs, emails, messages } = charactersValidation;

// const nameInput = $('#name');
// const affairInput = $('#affair');
// const messageInput = $('#message');
// const submitButton = $('.submit-button');
// const formContainer = $('.contact-form-container');

// nameInput.addEventListener('input', (e) => {
// 	let texto = e.target.value;
// 	// console.log(texto);
// 	names.val = texto.length >= names.min && texto.length <= names.limit;
// });

// affairInput.addEventListener('input', (e) => {
// 	let texto = e.target.value;
// 	// console.log(texto);
// 	affairs.val = texto.length >= affairs.min && texto.length <= affairs.limit;
// });

// messageInput.addEventListener('input', (e) => {
// 	let texto = e.target.value;
// 	// console.log(texto);
// 	messages.val = texto.length >= messages.min && texto.length <= messages.limit;
// });

// submitButton.addEventListener('click', (e) => {
// 	e.preventDefault();
// 	if (messages.val && affairs.val && names.val) {
// 		formContainer.submit();
// 	} else if (messages.val === false) {
// 		alert('The message has to be between 10 and 250 characters');
// 	} else if (affairs.val === false) {
// 		alert('The affair has to be between 5 and 35 characters');
// 	} else if (names.val === false) {
// 		// nameInput.innerHTML += `<br> <div style="color: black">La contraseña debe contener entre ${names.min} y ${names.limit} caracteres </div>`;
// 		alert('The name has to be between 2 and 30 characters');
// 	}
// });

// ------------- //
// ################# //
