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
        .then(response => response.json())
        .then(getResult);

    fetch(API_REPO)
        .then(response => response.json())
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

    // document.getElementById('avatar').src = `${data.avatar_url}`;
    // document.getElementById('github-name').innerText = `${data.name}`;
    // document.querySelector('.number-followers').innerText = `${data.followers}`;
    // document.querySelector('.number-following').innerText = `${data.following}`;
}
function getRepos(data) {
    console.log(data);

    const githubRepos = document.createElement('div');
    githubRepos.className = 'github-repos';
    githubRepos.innerHTML = '<h2 class="label-repo">Some Repos</h2>';

    const reposWrapper = document.createElement('div');
    reposWrapper.className = 'repos-wrapper';

    let number = data.length > 6 ? 6 : data.length;
    for(let i = 0; i < number; i++) {
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

    githubRepos.appendChild(reposWrapper);
    githubCard.appendChild(githubRepos);
}

form.insertAdjacentElement('afterend', githubCard);




// const form = document.getElementById('form');
// const input = document.getElementById('search-input');


// form.addEventListener('submit', (e) => {
//     e.preventDefault();
//     const API = `https://api.github.com/users/${input.value}`;
//     const API_REPO = API + '/repos?sort=created';
//     document.querySelector('.github').classList.remove('hidden');

//     fetch(API)
//         .then(response => response.json())
//         .then(getResult);

//     fetch(API_REPO)
//         .then(response => response.json())
//         .then(getRepos);
// });

// function getResult(data) {
//     // const github = document.createElement('div');
//     // github.className = 'github';
//     // github.innerHTML = `
//     //     <div class="github-img">
//     //         <img id="avatar" src=${data.avatar_url} alt="LOGO">
//     //     </div>
//     //     <div class="github-data">
//     //         <h2 class="name">${data.name}</h2>
//     //         <p class="bio">${data.bio}</p>
//     //         <div class="numbers">
//     //             <label class="followers">
//     //                 <span id="number-followers">${data.followers}</span> Followers
//     //             </label>
//     //             <label class="following">
//     //                 <span id="number-following">${data.following}</span> Following
//     //             </label>
//     //             <label class="repos">
//     //                 <span id="number-repos">${data.length}</span> Repos
//     //             </label>
//     //         </div>
//     //         <div class="repos"></div>
//     //     </div>
//     // `;

//     document.getElementById('avatar').src = `${data.avatar_url}`;
//     document.querySelector('.name').innerText = `${data.name}`;
//     document.querySelector('.bio').innerText = `${data.bio}`;
//     document.getElementById('number-followers').innerText = `${data.followers}`;
//     document.getElementById('number-following').innerText = `${data.following}`;
// }

// function getRepos(data) {
//     console.log(data);
//     for(let i = 0; i < 5; i++) {
//         const a = document.createElement('a');
//         a.href = `${data[i].html_url}`;
//         a.innerHTML = `${data[i].name}`;
//         document.querySelector('.repos').appendChild(a);
//     }
// }