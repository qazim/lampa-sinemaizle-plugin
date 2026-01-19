(function () {
    'use strict';

    if (typeof Lampa == 'undefined') return;

    var BASE_URL = 'https://sinemaizle.org';

    function parse(html) {
        return Lampa.Utils.parseHtml(html);
    }

    function request(url, success, error) {
        Lampa.Network.get(url, success, error);
    }

    Lampa.Source.Online.add({
        id: 'sinemaizle',
        name: 'Sinemaizle',
        type: 'movie',

        search: function (query, callback) {
            request(BASE_URL + '/?s=' + encodeURIComponent(query), function (html) {
                var doc = parse(html);
                var items = [];

                doc.find('article a').each(function () {
                    var a = this;
                    var img = a.querySelector('img');
                    if (!img) return;

                    items.push({
                        title: img.alt || a.title || 'Sinemaizle',
                        poster: img.src,
                        url: a.href,
                        type: 'movie'
                    });
                });

                callback(items);
            }, function () {
                callback([]);
            });
        },

        detail: function (url, callback) {
            request(url, function (html) {
                var doc = parse(html);
                var iframe = doc.find('iframe').get(0);

                if (!iframe) {
                    callback([]);
                    return;
                }

                callback([{
                    title: 'Sinemaizle',
                    url: iframe.src,
                    quality: 'HD'
                }]);
            }, function () {
                callback([]);
            });
        }
    });

    Lampa.Plugin.add({
        name: 'Sinemaizle',
        author: 'qazim',
        version: '1.0'
    });

})();
