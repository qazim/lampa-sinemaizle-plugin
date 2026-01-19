(function () {
    'use strict';

    Lampa.Listener.follow('app', function (e) {
        if (e.type !== 'ready') return;

        var BASE = 'https://sinemaizle.org';

        function parse(html) {
            return Lampa.Utils.parseHtml(html);
        }

        function searchFilm(object, callback) {
            var title = object.original_title || object.title;

            if (!title) {
                callback([]);
                return;
            }

            Lampa.Network.get(
                BASE + '/?s=' + encodeURIComponent(title),
                function (html) {
                    var doc = parse(html);
                    var item = doc.find('article a').get(0);

                    if (!item) {
                        callback([]);
                        return;
                    }

                    callback([{
                        title: title,
                        url: item.href
                    }]);
                },
                function () {
                    callback([]);
                }
            );
        }

        function getPlayer(url, callback) {
            Lampa.Network.get(url, function (html) {
                var doc = parse(html);

                // берём ПЕРВЫЙ iframe (рекламный + потом фильм)
                var iframe = doc.find('iframe').get(0);

                if (!iframe || !iframe.src) {
                    callback([]);
                    return;
                }

                callback([{
                    title: 'Sinemaizle',
                    url: iframe.src,
                    quality: 'WEB'
                }]);
            }, function () {
                callback([]);
            });
        }

        Lampa.Source.Online.add({
            id: 'sinemaizle',
            name: 'Sinemaizle',
            type: 'movie',

            search: function (object, callback) {
                searchFilm(object, callback);
            },

            detail: function (item, callback) {
                getPlayer(item.url, callback);
            }
        });

        Lampa.Plugin.add({
            name: 'Sinemaizle',
            version: '1.0',
            author: 'qazim'
        });
    });
})();
