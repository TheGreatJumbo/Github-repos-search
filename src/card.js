import Requests from "./Requests";
import Create from "./Create";
import './styles/card.css'

let name = location.search.substring();
name = name.replace("?", "");
document.getElementById("name").innerText = `Name: ${name}`;

Requests.GetRepo(name).then((r) => {
    document.getElementById("stars").innerText = `★${r.stargazers_count}`;
    document.getElementById("owner").innerText = ` ${r.owner.login}`;
    document.getElementById("owner").href =`${r.owner.html_url}`;

    Requests.GetLastCommit(r.commits_url).then((c) => {
        document.getElementById("commit").innerText = `Last commit: ${c[0].commit.committer.date.split("T")[0]}`;
    }).catch(() => {
        document.getElementById("commit").innerText = `Last commit: Unknown`;
    })

    const IMG = document.createElement("img");
    IMG.src = `${r.owner.avatar_url}`;
    IMG.height = 100;
    IMG.width = 100;
    document.getElementById("photo").appendChild(IMG);
    document.getElementById("lang").innerText = `Language: ${r.language}`;
    document.getElementById("desc").innerText = `Description: ${r.description}`;
    Requests.GetContributors(r.contributors_url).then((c) => {
        for (let i = 0; i < 10; i++) {
            const NewContrib = document.createElement("span");
            NewContrib.innerText = `${c[i].login}`
            document.getElementById("contrib").appendChild(NewContrib);
        }
    });
}).catch(() => {Wrong()});

const Wrong = () => {
    console.log("Something gone wrong");
    document.getElementById("c-list").remove();
    document.getElementById("c-root").append(
        Create.Li("Something gone wrong", "card").appendChild(
            Create.Span("Something gone wrong")
        )
    );
}