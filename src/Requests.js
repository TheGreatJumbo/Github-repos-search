

export default class Requests {

    static async FetchAPI(URL) {
        const response = await fetch(`https://api.github.com/${URL}`
            //, {
            //headers: {
            //    'Authorization': `token _input_authorization_token_here_`
            //}}
        );
        if (response.ok === true) {
            return await response.json();
        }

    }

    static async Search(q, p) {
        return await this.FetchAPI(`search/repositories?q=${q}&sort=stars&page=${p}&per_page=10`);
    }

    static async GetRepo(name) {
        return await this.FetchAPI(`repos/${name}`);
    }

    static async GetLastCommit(URL) {
        URL = URL.replace("{/sha}", "");
        URL = URL.replace("https://api.github.com/", "");
        return await this.FetchAPI(URL);
    }

    static async GetContributors(URL) {
        URL = URL.replace("https://api.github.com/", "");
        return await this.FetchAPI(URL);
    }
}


