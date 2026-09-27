const form = document.querySelector("#search-form");
const usernameInput = document.querySelector("#username");
const validationMessage = document.querySelector("#validation-message");
const statusMessage = document.querySelector("#status");
const repositoryGrid = document.querySelector("#repository-grid");
const controls = document.querySelector("#controls");
const languageFilter = document.querySelector("#language-filter");
const sortOrder = document.querySelector("#sort-order");

let repositories = [];

usernameInput.value = localStorage.getItem("lastGithubUsername") || "";

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const username = usernameInput.value.trim();
  validationMessage.textContent = "";

  if (!username) {
    validationMessage.textContent = "Please enter a GitHub username.";
    usernameInput.focus();
    return;
  }

  await loadRepositories(username);
});

languageFilter.addEventListener("change", renderRepositories);
sortOrder.addEventListener("change", renderRepositories);

async function loadRepositories(username) {
  setLoading(true);
  localStorage.setItem("lastGithubUsername", username);

  try {
    const response = await fetch(
      `https://api.github.com/users/${encodeURIComponent(username)}/repos?per_page=100`
    );

    if (response.status === 404) {
      throw new Error("User not found.");
    }

    if (!response.ok) {
      throw new Error("Could not load repositories. Please try again later.");
    }

    repositories = await response.json();

    if (repositories.length === 0) {
      showError("No public repositories found.");
      return;
    }

    updateLanguageOptions();
    controls.hidden = false;
    renderRepositories();
  } catch (error) {
    showError(error.message || "Something went wrong.");
  } finally {
    setLoading(false);
  }
}

function renderRepositories() {
  const selectedLanguage = languageFilter.value;
  const selectedSort = sortOrder.value;

  const visibleRepositories = repositories
    .filter((repository) => {
      const language = repository.language || "Other";
      return selectedLanguage === "all" || language === selectedLanguage;
    })
    .sort((first, second) => {
      if (selectedSort === "stars") {
        return second.stargazers_count - first.stargazers_count;
      }

      return first.name.localeCompare(second.name);
    });

  repositoryGrid.replaceChildren();
  statusMessage.textContent = visibleRepositories.length
    ? `${visibleRepositories.length} repositories found`
    : "No repositories match this filter.";

  visibleRepositories.forEach((repository) => {
    repositoryGrid.append(createRepositoryCard(repository));
  });
}

function createRepositoryCard(repository) {
  const article = document.createElement("article");
  article.className = "repository-card";

  const title = document.createElement("h3");
  const link = document.createElement("a");
  link.href = repository.html_url;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.textContent = repository.name;
  title.append(link);

  const description = document.createElement("p");
  description.textContent = repository.description || "No description provided.";

  const meta = document.createElement("div");
  meta.className = "repository-meta";

  const language = document.createElement("span");
  language.textContent = repository.language || "Other";

  const stars = document.createElement("span");
  stars.textContent = `★ ${repository.stargazers_count}`;

  meta.append(language, stars);
  article.append(title, description, meta);

  return article;
}

function updateLanguageOptions() {
  const languages = [...new Set(repositories.map((repository) => repository.language || "Other"))]
    .sort((first, second) => first.localeCompare(second));

  languageFilter.replaceChildren(new Option("All", "all"));
  languages.forEach((language) => {
    languageFilter.add(new Option(language, language));
  });
}

function setLoading(isLoading) {
  if (isLoading) {
    repositories = [];
    controls.hidden = true;
    repositoryGrid.replaceChildren();
    statusMessage.textContent = "Loading repositories...";
  }
}

function showError(message) {
  repositories = [];
  controls.hidden = true;
  repositoryGrid.replaceChildren();
  statusMessage.textContent = message;
}
