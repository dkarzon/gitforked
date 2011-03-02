$(function () {

    var repositoryUrl = $("#repository-url");
    var output = $("#output");
    var buttonHtmlContainer = $("#button-html");
    var buttonContainer = $("#button");

    $("#create-button").click(function (e) {
        e.preventDefault();
        var url = repositoryUrl.val();
        createButton(url);
    });

    function createButton(url) {
        var buttonHtml = '<a href="' + url + '" class="gitforked-button">Fork</a>';
        buttonContainer.html(buttonHtml);
        GitForked.createButton(buttonContainer.children()[0]);
        buttonHtmlContainer.text(buttonHtml);
        output.slideDown();
    }

});