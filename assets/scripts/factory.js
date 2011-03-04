$(function () {

    var repositoryUrl = $("#repository-url");
    var showForksCheckbox = $("#show-forks");
    var showWatchersCheckbox = $("#show-watchers");
    var output = $("#output");
    var buttonHtmlContainer = $("#button-html");
    var buttonContainer = $("#button");

    $("#create-button").click(function (e) {
        e.preventDefault();
        go();
    });
    repositoryUrl.keydown(function (e) {
        if (e.keyCode == 13) {
            e.preventDefault();
            go();
        }
    });
    showForksCheckbox.click(function () {
        if (output.is(":visible")) {
            go();
        }
    });
    showWatchersCheckbox.click(function () {
        if (output.is(":visible")) {
            go();
        }
    });

    function go() {
        var url = repositoryUrl.val();
        var showForks = showForksCheckbox.is(":checked");
        var showWatchers = showWatchersCheckbox.is(":checked");
        if (url) {
            url = $.trim(url);
            if (validRepositoryUrl(url)) {
                createButton(url, showForks, showWatchers);
            } else {
                alert("Invalid GitHub repository URL.\r\nTry something like: https://github.com/<username>/<repository>");
                repositoryUrl.focus();
            }
        }
    }

    function createButton(url, showForks, showWatchers) {
        var classNames = ["gitforked-button"];
        if (showForks) classNames.push("gitforked-forks");
        if (showWatchers) classNames.push("gitforked-watchers");
        var buttonHtml = '<a href="' + url + '"\r\n   class="' + classNames.join(" ") + '">Fork</a>';
        buttonContainer.html(buttonHtml);
        GitForked.createButton(buttonContainer.children()[0]);
        buttonHtmlContainer.text(buttonHtml);
        output.slideDown();
    }

    function validRepositoryUrl(url) {
        return url.match(/^https?:\/\/github.com\/.*\/.*/);
    }
});