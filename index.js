(function () {
    'use strict';

    Lampa.Listener.follow('app', function (e) {
        if (e.type !== 'ready') return;

        var BASE = 'https://sinemaizle.org';

        function searchFilm(object, callback) {
            var title = object.original_title || object.title;

            // Чтобы Lampa точно показал источник — нужно вернуть объект с этими полями
            var item = {
                title: title,
                url: BASE + '/?s=' + encodeURIComponent(title),
                type: 'movie',
                // WebView флаг — открывается во внешнем окне
                external: true,
                // нужно обязательно, иначе источник не появится
                quality: 'WEB'
            };

            callback([item]);
        }

        function detail(item, callback) {
            // Возвращаем **тот же объект**, чтобы Lampa открыл его
            callback([{
                title: item.title,
                url: item.url,
                type: 'movie',
                external: true,
                quality: 'WEB'
            }]);
        }

        Lampa.Source.Online.add({
            id: 'sinemaizle',
            name: 'Sinemaizle WebView',
            type: 'movie',
            search: searchFilm,
            detail: detail
        });

        Lampa.Plugin.add({
            name: 'Sinemaizle WebView',
            version: '1.0',
            author: 'qazim'
        });
    });
})();
