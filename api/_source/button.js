window.GitForked = (function () {
    var apiBaseUrl  = findApiBaseUrl();
    var constants = {
        buttonCssClass : "gitforked-button",
        containerCssClass : "gitforked-button-container",
        forkCountCssClass: "gitforked-count",
        cssUrl: apiBaseUrl + "button.css",
        githubRepoQuery: "http://github.com/api/v2/json/repos/show/"
    };

    init();
    return {
        createButton: createButton
    };

    function init() {
        addStylesheet();
        var links = findForkLinks();
        var i = links.length;
        while (i--) {
            createButton(links[i]);
        }
    }
    
    function findApiBaseUrl() {
        var scripts = document.getElementsByTagName("script");
        var i = scripts.length;
        while (i--) {
            var src = scripts[i].getAttribute("src");
            var match = /^(.*gitforked.*\/api\/.*\/)button\.js/.exec(src);
            if (match) {
                return match[1];
            }
        }
        return null;
    }

    function addStylesheet() {
        var link = document.createElement("link");
        link.setAttribute("href", constants.cssUrl);
        link.setAttribute("type", "text/css");
        link.setAttribute("rel", "stylesheet");
        var heads = document.getElementsByTagName("head");
        if (heads.length > 0) {
            heads[0].appendChild(link);
        }
        // No <head>? No service!
    }

    function findForkLinks() {
        var forkLinks = [];
        var buttonClassRegex = (new RegExp("\\b" + constants.buttonCssClass + "\\b"));
        var links = document.getElementsByTagName("a");
        var i = links.length;
        while (i--) {
            var link = links[i];
            if (!link.getAttribute("href")) continue;
            var cssClass = link.getAttribute("class");
            if (buttonClassRegex.test(cssClass)) {
                forkLinks.push(link);
            }
        }
        return forkLinks;
    }

    function createButton(link) {
        var container = wrapInContainer(link);
        var repoUrl = link.getAttribute("href");
        var title = link.getAttribute("title");
        if (title) {
            link.setAttribute("title", title + " - Button by gitforked.com");
        } else {
            link.setAttribute("title", "Button by gitforked.com");
        }
        getRepoInfo(repoUrl, function(repository) {
            if (repository.forks > 1) {
                var networkLink = createNetworkLink(repoUrl, repository.forks.toString());
                container.appendChild(networkLink);
            }
        });

        function createNetworkLink(repoUrl, text) {
            var networkLink = document.createElement("a");
            networkLink.setAttribute("href", repoUrl + "/network");
            networkLink.setAttribute("class", constants.forkCountCssClass);
            networkLink.setAttribute("title", "View the network");
            var networkSpan = document.createElement("span");
            networkSpan.appendChild(document.createTextNode(text));
            networkLink.appendChild(networkSpan);
            return networkLink;
        }

        function wrapInContainer(link) {
            var container = document.createElement("span");
            container.setAttribute("class", constants.containerCssClass);
            link.parentNode.insertBefore(container, link);
            container.appendChild(link);
            return container;
        }
    }

    function getRepoInfo(repoUrl, callback) {
        var path = repoUrl.match(/[^/]+\/[^/]+$/)[0];
        getRepoInfo.nextId = (getRepoInfo.nextId || 0) + 1;
        var callbackName = "forkButtonCallback" + getRepoInfo.nextId;
        var url = constants.githubRepoQuery + path + "?callback=" + callbackName;

        var script = document.createElement("script");
        script.setAttribute("src", url);
        document.body.appendChild(script);

        window[callbackName] = function (data) {
            callback(data.repository);
            
            try {
                delete window[callbackName];
            } catch (epicIEFail) {
                window[callbackName] = null;
            }
            script.parentNode.removeChild(script);
        };
    }

})();