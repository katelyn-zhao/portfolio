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

function updateColorScheme(scheme) {
    if (scheme === 'auto') {
      document.documentElement.style.removeProperty('color-scheme');
      document.documentElement.removeAttribute('data-theme');
    } 
    else {
      document.documentElement.style.setProperty('color-scheme', scheme);
      document.documentElement.setAttribute('data-theme', scheme);
    }
  }

const savedScheme = localStorage.getItem('colorScheme') || 'auto'; 
select.value = savedScheme; 
updateColorScheme(savedScheme); 

select.addEventListener('input', (event) => {
  const selectedScheme = event.target.value;
  localStorage.setItem('colorScheme', selectedScheme);
  updateColorScheme(selectedScheme);
});

export async function fetchJSON(url) {
  try {
      // Fetch the JSON file from the given URL
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch projects: ${response.statusText}`);
    }
    const data = await response.json();
    return data; 


  } catch (error) {
      console.error('Error fetching or parsing JSON data:', error);
  }
}

export function renderProjects(project, containerElement) {
  // Your code will go here
  containerElement.innerHTML = '';
  project.forEach(project => {
    const article = document.createElement('article');
    article.innerHTML = `
    <h3>${project.title}</h3>
    <img src="${project.image}" alt="${project.title}">
    <p>${project.description}</p>
`;
  containerElement.appendChild(article);
  });
}
