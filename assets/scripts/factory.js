$(function () {

    var repositoryUrl = $("#repository-url");
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

    function go() {
        var url = repositoryUrl.val();
        if (url) {
            url = $.trim(url);
            if (validRepositoryUrl(url)) {
                createButton(url);
            } else {
                alert("Invalid GitHub repository URL.\r\nTry something like: https://github.com/<username>/<repository>");
                repositoryUrl.focus();
            }
        }
    }

    function createButton(url) {
        var buttonHtml = '<a href="' + url + '" class="gitforked-button">Fork</a>';
        buttonContainer.html(buttonHtml);
        GitForked.createButton(buttonContainer.children()[0]);
        buttonHtmlContainer.text(buttonHtml);
        output.slideDown();
    }

    function validRepositoryUrl(url) {
        return url.match(/^https?:\/\/github.com\/.*\/.*/);
    }
});