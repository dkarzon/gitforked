window.GitForked=function(){var g=d(),a={buttonCssClass:"gitforked-button",containerCssClass:"gitforked-button-container",forkCountCssClass:"gitforked-count",cssUrl:g+"button.css",githubRepoQuery:"http://github.com/api/v2/json/repos/show/"};h();return{createButton:c};function h(){e();var a=f(),b=a.length;while(b--)c(a[b])}function d(){var a=document.getElementsByTagName("script"),c=a.length;while(c--){var d=a[c].getAttribute("src"),b=/^(.*gitforked.*\/api\/.*\/)button\.js/.exec(d);if(b)return b[1]}return null}function e(){var b=document.createElement("link");b.setAttribute("href",a.cssUrl);b.setAttribute("type","text/css");b.setAttribute("rel","stylesheet");var c=document.getElementsByTagName("head");c.length>0&&c[0].appendChild(b)}function f(){var c=[],f=new RegExp("\\b"+a.buttonCssClass+"\\b"),d=document.getElementsByTagName("a"),e=d.length;while(e--){var b=d[e];if(!b.getAttribute("href"))continue;var g=b.getAttribute("class");f.test(g)&&c.push(b)}return c}function c(d){var g=f(d),c=d.getAttribute("href");b(c,function(a){if(a.forks>1){var b=e(c,a.forks.toString());g.appendChild(b)}});function e(d,e){var b=document.createElement("a");b.setAttribute("href",d+"/network");b.setAttribute("class",a.forkCountCssClass);b.setAttribute("title","View the network");var c=document.createElement("span");c.appendChild(document.createTextNode(e));b.appendChild(c);return b}function f(c){var b=document.createElement("span");b.setAttribute("class",a.containerCssClass);c.parentNode.insertBefore(b,c);b.appendChild(c);return b}}function b(f,e){var g=f.match(/[^/]+\/[^/]+$/)[0];b.nextId=(b.nextId||0)+1;var c="forkButtonCallback"+b.nextId,h=a.githubRepoQuery+g+"?callback="+c,d=document.createElement("script");d.setAttribute("src",h);document.body.appendChild(d);window[c]=function(a){e(a.repository);try{delete window[c]}catch(b){window[c]=null}d.parentNode.removeChild(d)}}}()