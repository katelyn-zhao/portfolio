console.log('IT’S ALIVE!');

function $$(selector, context = document) {
  return Array.from(context.querySelectorAll(selector));
}

let pages = [
    { url: '/', title: 'Home' },
    { url: 'projects/', title: 'Projects' },
    { url: 'cv-resume/', title: 'CV/Resume'},
    { url: 'contact/', title:'Contact'},
    { url: 'https://github.com/katelyn-zhao', title:'Github'}
  ];

let nav = document.createElement('nav');
document.body.prepend(nav);

for (let p of pages) {
    let url = p.url;
    let title = p.title;
    nav.insertAdjacentHTML('beforeend', `<a href="${url}">${title}</a>`);
  }

const ARE_WE_HOME = document.documentElement.classList.contains('home');
