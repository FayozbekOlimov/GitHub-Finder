const form = document.getElementById('form');
const input = document.getElementById('search-input');

const githubCard = document.createElement('div');
githubCard.className = 'github-card';

form.addEventListener('submit', (e) => {
    e.preventDefault();
    githubCard.innerHTML = '';
    
    const API = `https://api.github.com/users/${input.value}`;
    const API_REPO = API + '/repos?sort=created';

    fetch(API)
        .then(
            function response(res) {
                if (res.status != 404) {
                    return res.json();
                } else {
                    githubCard.innerHTML = 'This User Is Not Found !';
                    githubCard.style.color = 'white';
                    return;
                }
            }
        )
        .then(getResult)

    fetch(API_REPO)
        .then(
            function response(res) {
                if (res.status != 404) {
                    return res.json();
                } else {
                    return;
                }
            }
        )
        .then(getRepos);
});

function getResult(data) {
    const githubData = document.createElement('div');
    githubData.className = 'github-data';

    githubData.innerHTML = `
        <div class="github-logo">
            <img id="avatar" src=${data.avatar_url} alt="Avater">
        </div>
        <p class="label-name">Name</p>
        <h2 class="github-name" id="github-name">${data.name}</h2>
        <div class="github-numbers">
            <div class="followers">
                <p class="label-followers">Followers</p>
                <p class="number-followers">${data.followers}</p>
            </div>
            <div class="following">
                <p class="label-following">Following</p>
                <p class="number-following">${data.following}</p>
            </div>
        </div>
    `;
    githubCard.appendChild(githubData);
}

function getRepos(data) {
    const githubRepos = document.createElement('div');

    githubRepos.className = 'github-repos';
    githubRepos.innerHTML = '<h2 class="label-repo">Some Repos</h2>';

    const reposWrapper = document.createElement('div');
    reposWrapper.className = 'repos-wrapper';

    let number = data.length > 6 ? 6 : data.length;

    if (number == 0) {
        githubRepos.innerHTML = 'This user doesn\'t have any repositories yet';
    } else {
        for (let i = 0; i < number; i++) {
            const repo = document.createElement('div');
            repo.className = 'repo';
            repo.innerHTML = `
                <a href=${data[i].svn_url} target="_blank" class="repo-name">${data[i].name}</a>
                <div class="repo-features">
                    <span class="stars"><i class="fas fa-star"></i> ${data[i].stargazers_count}</span>
                    <span class="lang"><i class="fas fa-code"></i> ${data[i].language}</span>
                    <span class="size"><i class="fas fa-cloud-download-alt"></i> ${data[i].size}kb</span>
                </div>
            `;
            reposWrapper.appendChild(repo);
        }
    }

    githubRepos.appendChild(reposWrapper);
    githubCard.appendChild(githubRepos);
}

form.insertAdjacentElement('afterend', githubCard);