console.log('IT’S ALIVE!');

function $$(selector, context = document) {
  return Array.from(context.querySelectorAll(selector));
}

let pages = [
    { url: 'https://katelyn-zhao.github.io/portfolio/', title: 'Home' },
    { url: 'https://katelyn-zhao.github.io/portfolio/projects/', title: 'Projects' },
    { url: 'https://katelyn-zhao.github.io/portfolio/cv-resume/', title: 'CV/Resume'},
    { url: 'https://katelyn-zhao.github.io/portfolio/contact/', title:'Contact'},
    { url: 'https://github.com/katelyn-zhao', title:'Github'}
  ];

let nav = document.createElement('nav');
document.body.prepend(nav);

for (let p of pages) {
    let url = p.url;
    let title = p.title;
    nav.insertAdjacentHTML('beforeend', `<a href="${url}">${title}</a>`);
  }

const navLinks = $$("nav a");

let currentLink = navLinks.find(
      (a) => a.host === location.host && a.pathname === location.pathname
    );
  
if (currentLink) {
      currentLink.classList.add('current');
    }
  