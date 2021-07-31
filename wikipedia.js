$(document).ready(function () {
            function getArticles(userQuery) {
                var wikiApiUrl = 'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=15&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=' + userQuery + '&callback=?';
                $.getJSON(wikiApiUrl, function (articles) {
                    renderArticlesMarkup(articles);
                });
            }

            function renderArticlesMarkup(articles) {
                var articlesMarkup = '';
                if (articles.query === undefined) {
                    articlesMarkup += '<div class="error"><p class="p1">Your Keyword did not match our Database.</p> <p class="p2">Suggestions:</p><li>Make sure that all words are spelled correctly.</li><li>Try different keywords.</li><li>Try more general keywords.</li></div>';
                }
                else {
                    var pages = articles.query.pages;
                    for (var property in pages) {
                        if (pages.hasOwnProperty(property)) {
                            articlesMarkup += '<div class="article"><a href="https://en.wikipedia.org/wiki/' + pages[property].title + '" target="_blank">' + '<h2>' + pages[property].title + '</h2></a><div class="snippet">';
                            if (pages[property].thumbnail !== undefined) {
                                articlesMarkup += '<img src="' + pages[property].thumbnail.source + '">';
                            }
                            articlesMarkup += '<p>' + pages[property].extract + '</p></div></a></div>';
                        }
                    }
                    $('.wrap').css('margin-top', '0');
                    $('.Title').css('display', 'none');
                    $('.nav-bar').css('display', 'none');
                    $('.rp').css('display', 'block');
                    $('.Back').css('display', 'block');
                    // $('.Back').css('margin', 'auto');
                    $('.Back').css('width', 'fit-content');
                    $('.searchfunction').css('box-shadow', '1px 1px 10px 2px  cornflowerblue');
                    $('#search').css('text-aling', 'left');
                }
                $('.result').html(articlesMarkup);
            }

            $('#search').on('click', function () {
                getArticles($('#query').val());
            });

            $('#query').keydown(function (event) {
                if (event.which == 13) {
                    getArticles($('#query').val());
                }
            });

            $('#searh').on('click', function () {
                window.open('https://en.wikipedia.org/wiki/Special:Random', '_blank');
            });

        });
