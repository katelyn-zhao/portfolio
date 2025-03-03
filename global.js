console.log("IT’S ALIVE!");

function $$(selector, context = document) {
  return Array.from(context.querySelectorAll(selector));
}

let pages = [
  { url: "/", title: "Home" },
  { url: "projects/", title: "Projects" },
  { url: "cv-resume/", title: "CV/Resume" },
  { url: "contact/", title: "Contact" },
  { url: "meta/", title: "Meta" },
  { url: "https://github.com/katelyn-zhao", title: "GitHub" },
];

let nav = document.createElement("nav");
document.body.prepend(nav);

const ARE_WE_HOME = document.documentElement.classList.contains("home");

for (let p of pages) {
  let url = p.url;
  let title = p.title;
  url = !ARE_WE_HOME && !url.startsWith("http") ? "../" + url : url;
  let a = document.createElement("a");
  a.href = url;
  a.textContent = title;
  nav.append(a);
  if (a.host == location.host && a.pathname === location.pathname) {
    a.classList.add("current");
  }
  if (a.host !== location.host) {
    a.target = "_blank";
  }
}

// let pages = [
//     { url: '/portfolio/', title: 'Home' },
//     { url: '/portfolio/projects/', title: 'Projects' },
//     { url: '/portfolio/cv-resume/', title: 'CV/Resume'},
//     { url: '/portfolio/contact/', title:'Contact'},
//     { url: '/portfolio/meta/', title:'Meta'},
//     { url: 'https://github.com/katelyn-zhao', title:'Github'}
//   ];

// let nav = document.createElement('nav');
// document.body.prepend(nav);

// const ARE_WE_HOME = document.documentElement.classList.contains('home');

// for (let p of pages) {
//     let url = p.url;
//     let title = p.title;
//     // if (!ARE_WE_HOME && !url.startsWith('http')) {
//     //     url = '../' + url;
//     //  }
//     let a = document.createElement('a');
//     a.href = url;
//     a.textContent = title;
//     if (a.host === location.host && a.pathname === location.pathname) {
//         a.classList.add('current');
//       }
//     if (a.host !== location.host) {
//         a.target = "_blank";
//       }
//     nav.append(a);
//   }

document.body.insertAdjacentHTML(
  "afterbegin",
  `
    <label class="color-scheme">
        Theme:
        <select>
            <option value="light dark">Automatic</option>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
        </select>
    </label>`,
);

const select = document.querySelector(".color-scheme select");
const savedScheme = localStorage.getItem("colorScheme");

if (savedScheme) {
  document.documentElement.style.setProperty("color-scheme", savedScheme);
  select.value = savedScheme;
}

select.addEventListener("input", function (event) {
  document.documentElement.style.setProperty(
    "color-scheme",
    event.target.value,
  );
  localStorage.colorScheme = event.target.value;
});

export async function fetchJSON(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch projects: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching or parsing JSON data: ", error);
  }
}

export function renderProjects(project, containerElement, headingLeve = "h2") {
  containerElement.innerHTML = "";

  for (const proj of project) {
    const article = document.createElement("article");
    article.innerHTML = `
            <h3>${proj.title}</h3>
            <h4>${proj.year}</h4>
            <img src="${proj.image}" alt="${proj.title}">
            <p>${proj.description}</p>
        `;
    containerElement.appendChild(article);
  }
}

export async function fetchGitHubData(username) {
  return fetchJSON(`https://api.github.com/users/${username}`);
}
