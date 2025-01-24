console.log('IT’S ALIVE!');

function $$(selector, context = document) {
  return Array.from(context.querySelectorAll(selector));
}

let pages = [
    { url: '/portfolio/', title: 'Home' },
    { url: '/portfolio/projects/', title: 'Projects' },
    { url: '/portfolio/cv-resume/', title: 'CV/Resume'},
    { url: '/portfolio/contact/', title:'Contact'},
    { url: 'https://github.com/katelyn-zhao', title:'Github'}
  ];

let nav = document.createElement('nav');
document.body.prepend(nav);

for (let p of pages) {
    let url = p.url;
    let title = p.title;
    let a = document.createElement('a');
    a.href = url;
    a.textContent = title;
    nav.append(a);
  }

const ARE_WE_HOME = document.documentElement.classList.contains('home');

if (!ARE_WE_HOME && !url.startsWith('http')) {
    url = !ARE_WE_HOME && !url.startsWith('http') ? '../' + url : url;
  }

if (a.host === location.host && a.pathname === location.pathname) {
    a.classList.add('current');
  }

if (a.host !== location.host) {
    a.target = "_blank";
  }