import './styles/style.css'
import Requests from "./Requests";
import Create from "./Create";

let isCreated = false;
let from = 0;
let to = 9;
let PagesNum = 1;
let CurPage = 1;
let Timeout;
let PagStart;
let PagEnd;
let PagCreated = false;


const PopularList = () => {
    if (isCreated) {
        onClear()
    }
    document.getElementById("indicator").innerText = `10 most popular`;
    window.sessionStorage.removeItem("Search");

    document.getElementById('r-list').appendChild(Create.Ul("list"));
    const Popular = [
        "kubernetes/kubernetes",
        "apache/spark",
        "Microsoft/vscode",
        "NixOS/nixpkgs",
        "rust-lang/rust",
        "firehol/blocklist-ipsets",
        "openshift/origin",
        "ansible/ansible",
        "Automattic/wp-calypso",
        "dotnet/corefx",
    ];
    Popular.map((P) => {
        Requests.GetRepo(P).then((r) => {
            CreateListItem(P, `github.com/${P}`, r.stargazers_count, r.commits_url);
            }).catch(() => {Wrong()});
    });
    isCreated = true;
}

const CreateListItem = (repo_name, url, stars, commit) => {
    const LI = Create.Li("", "card");
    const SPAN = Create.Span("");

    SPAN.appendChild(
        Create.A(`${repo_name}`,`./card.html?${repo_name}`,"crd")
    );

    SPAN.appendChild(
        Create.Span( `★${stars}`)
    );

    let SPANcommit = document.createElement("span");
    Requests.GetLastCommit(commit).then((c) => {
        SPANcommit.innerText = `Last commit: ${c[0].commit.committer.date.split("T")[0]}`;
    }).catch(() => {
        SPANcommit.innerText = `Last commit: Unknown`;
    });
    SPAN.appendChild(SPANcommit);

    SPAN.appendChild(
        Create.A(`Github link`,`${url}`)
    );

    LI.appendChild(SPAN);
    document.getElementById("list").append(LI);
}

const onSearch = (q) => {
    if (isCreated) {
        onClear()
    }
    if (q === '') {PopularList()}
    document.getElementById('r-list').appendChild(Create.Ul("list"));
    if (q !== '') {
        Requests.Search(q, window.sessionStorage.getItem("Page")).then((repos) => {
            for (let i = 0; i <= 9; i++) {
                CreateListItem(repos.items[i].full_name, repos.items[i].html_url, repos.items[i].stargazers_count, repos.items[i].commits_url)
            }
            from = (CurPage - 1) * 10;
            to = from + 9;
            PagesNum = Math.ceil(repos.total_count / 10) - 1;
            if (PagCreated === false) {
                CreatePages()
            }
        }).catch(() => {Wrong()});
        isCreated = true;
        document.getElementById("indicator").innerText = `Results for "${q}". Page ${CurPage} (${from + 1}-${to + 1} items)`;
    }
}

const CreatePages = () => {
    let UL = Create.Ul("p-list", "pagination");
    if (window.sessionStorage.getItem("Page") == 1) {
        PagStart = 1;
    }
    else if (window.sessionStorage.getItem("Page") == 2) {
        PagStart = 1;
    }
    else if (window.sessionStorage.getItem("Page") == 3) {
        PagStart = 1;
    }
    else {
        PagStart = window.sessionStorage.getItem("Page") - 2;
    }
    PagEnd = PagStart + 4;
    if (PagStart + 4 === PagesNum) {
        PagEnd = PagStart + 4;
    }
    if (PagStart + 3 === PagesNum) {
        PagEnd = PagStart + 3;
    }
    if (PagStart + 2 === PagesNum) {
        PagEnd = PagStart + 2;
    }
    if (PagStart + 1 === PagesNum) {
        PagEnd = PagStart + 1;
    }
    if (PagStart === PagesNum) {
        PagEnd = PagStart;
    }
    for (let i; PagStart <= PagEnd; PagStart++) {
        i = PagStart;
        let Page = Create.Li("", "page-item");
        let PageL = Create.A(`${PagStart}`,"","page-link");
        if (PagStart == window.sessionStorage.getItem("Page")) {
            PageL.classList.add("selected")
        }
        PageL.onclick = () => {
            SetPage(i);
            onSearch(window.sessionStorage.getItem("Search"));
            return false
        };
        Page.appendChild(PageL);
        UL.appendChild(Page);
    }
    document.getElementById("pag").appendChild(UL);
    PagCreated = true;
}

const SetPage = (page) => {
    CurPage = page;
    window.sessionStorage.setItem("Page", `${page}`);
    from = (CurPage - 1) * 10;
    to = from + 9;
}

const onClear = () => {
    document.getElementById("list").remove();
    if (PagCreated === true) {
        document.getElementById("p-list").remove();
        PagCreated = false;
    }
    isCreated = false;
}


const Wrong = () => {
    document.getElementById('r-list').appendChild(Create.Ul("list"));
    document.getElementById('list').appendChild(
        Create.Span("Something gone wrong","card")
    );
    if (PagCreated === true) {
        document.getElementById("p-list").remove();
        PagCreated = false;
    }
    document.getElementById("indicator").innerText = ``;
        isCreated = true;
}


const Listener = () => {
    clearTimeout(Timeout);
    SetPage(1);
    if ((Input.value === "") && (window.sessionStorage.getItem("Search") == null)) {
        PopularList();
    } else {
        window.sessionStorage.setItem("Search", `${Input.value}`);
        Timeout = setTimeout(onSearch, 2500, window.sessionStorage.getItem("Search"));
    }
}

const Input = document.getElementById('search');
Input.addEventListener('keyup', Listener);
if (window.sessionStorage.getItem("Page") === null)
{
    SetPage(1);
}
else {
    SetPage(window.sessionStorage.getItem("Page"));
}

if (window.sessionStorage.getItem("Search") === null) {
    window.sessionStorage.setItem("Search", "");
}

Input.value = window.sessionStorage.getItem("Search");

if ((Input.value === "") && (window.sessionStorage.getItem("Search") === "")) {
    PopularList()
}
else {
    Timeout = setTimeout(onSearch, 2500, window.sessionStorage.getItem("Search"));
}
