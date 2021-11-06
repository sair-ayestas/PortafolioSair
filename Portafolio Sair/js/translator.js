/* A way to simplify the selectors to avoid writing them every time i need it */
function $$(selector) {
    return document.querySelectorAll(selector);
}

class Translator {
    constructor() {
        this._elements = $$('[data-i18n]');
        /* Español */
        this._spanishChanges = {
            navLinks: {
                home: 'Inicio',
                aboutMe: 'Sobre mi',
                knowledges: 'Conocimientos',
                projects: 'Proyectos',
                contact: 'Contacto',
            },
            mainContent: {
                helloWord: 'Hola',
                presentation: 'Soy',
            },
            scrollDown: {
                paragraph: 'Desplazate hacia abajo',
            },
            aboutMe: {
                title: 'Sobre <span>Mi</span>',
                descriptionSymbol: 'Descripción',
                descriptionP1: 'Actualmente me encuentro estudiando tecnologías de front end por mi cuenta. Me considero una persona responsable y preocupada por hacer las cosas de la manera correcta.',
                descriptionP2: 'Me considero una persona responsable y preocupada por hacer las cosas de la manera correcta. Me inquieta no saber como funciona algo , por lo que siempre intento buscar información y aprender',
               
            },
            knowledges: {

            },
            projects: {

            },
            contact: {

            },
            botChat: {

            },
            appreciation: {
                title: 'Gracias por visitar mi portafolio',
            },
            copyright: {

            },
        };
        /* Inglés */
        this._englishChanges = {
            navLinks: {
                home: 'Home',
                aboutMe: 'About me',
                knowledges: 'Knowledges',
                projects: 'Projects',
                contact: 'Contact',
            },
            mainContent: {
                helloWord: 'Hello',
                presentation: 'I Am',
            },
            scrollDown: {
                paragraph: 'Scroll down',
            },
            aboutMe: {

            },
            knowledges: {
                title: 'Know<span>ledges</span>',
                learningSpan: 'Learning',
            },
            projects: {

            },
            contact: {

            },
            botChat: {


            },
            appreciation: {
                title: 'Thank you for visiting my portfolio',
            },
            copyright: {

            },
        };
    }

    /* Function which it's called from "main.js" with the language selected. This language is the parameter of this function. */
    changeLanguage(lang) {
        let finalLang;
        switch (lang) {
            case 'es':
                finalLang = this._spanishChanges;
                break;
            case 'en':
                finalLang = this._englishChanges;
                break;
            default:
                console.error("Sorry , we can't translate the page");
        }
        /* Scroll through the elements to be translated, and it is replaced the previous text with the language the user want to translate it.  */
        this._elements.forEach((element) => {
            let text = element.dataset.i18n.split('.').reduce((obj, i) => obj[i], finalLang);
            if (text) {
                element.innerHTML = text;
            }
        });
    }
}

export default Translator;