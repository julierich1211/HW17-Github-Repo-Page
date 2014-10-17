_.templateSettings.interpolate = /{([\s\S]+?)}/g;

function pullDetail(gusername) {
    this.username = gusername;
    this.detail();
}
pullDetail.prototype.getInfo = function() {
    return $.get('https://api.github.com/users/' + this.username).then(function(data) {
        return data;
    });
};
pullDetail.prototype.getInfoRepo = function() {
    return $.get('https://api.github.com/users/' + this.username + '/repos').then(function(data) {
        return data;
    });
    console.log(data);
};
pullDetail.prototype.loadTemplate = function(templateName) {
    return $.get('templates/' + templateName + '.html').then(function(hstring) {
        return hstring;
    });
};
pullDetail.prototype.placeDetail = function(profileHTML, profile) {
    var d = new Date(profile.created_at);
    profile.joined = ["Joined On", d.toDateString()].join("");
    document.querySelector('.left-column').innerHTML = _.template(profileHTML, profile);
};
pullDetail.prototype.placeRepoData = function(repoHTML, repos) {
    document.querySelector('.right-column').innerHTML = repos.map(function(repo){
        return _.template(repoHTML, repo);
    }).join('');
};
pullDetail.prototype.detail = function() {
    var own = this;

    $.when(
        this.getInfo(),
        this.getInfoRepo(),
        this.loadTemplate('profile'),
        this.loadTemplate('repo')
    ).then(function(profile, repos, profileHTML, repoHTML) {
        own.placeDetail(profileHTML, profile);
        own.placeRepoData(repoHTML, repos);
    });
}
window.onload = hw17;

function hw17() {
    var subject = new pullDetail('julierich1211');
}
