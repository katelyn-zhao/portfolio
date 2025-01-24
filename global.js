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

const ARE_WE_HOME = document.documentElement.classList.contains('home');

for (let p of pages) {
    let url = p.url;
    let title = p.title;
    // if (!ARE_WE_HOME && !url.startsWith('http')) {
    //     url = '../' + url;
    //  }    
    let a = document.createElement('a');
    a.href = url;
    a.textContent = title;
    if (a.host === location.host && a.pathname === location.pathname) {
        a.classList.add('current');
      }
    if (a.host !== location.host) {
        a.target = "_blank";
      }
    nav.append(a);
  }

document.body.insertAdjacentHTML(
    'afterbegin',
    `
      <label class="color-scheme">
        Theme:
        <select id="color-scheme-select">
          <option value="auto" selected>Automatic</option>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </label>
    `
  );

const select = document.querySelector('#color-scheme-select');

select.addEventListener('input', function (event) {
  const selectedScheme = event.target.value;

  if (selectedScheme === 'auto') {
    document.documentElement.style.removeProperty('color-scheme');
    document.documentElement.removeAttribute('data-theme');
  } 
  else {
    document.documentElement.style.setProperty('color-scheme', selectedScheme);
    document.documentElement.setAttribute('data-theme', selectedScheme);
  }
});