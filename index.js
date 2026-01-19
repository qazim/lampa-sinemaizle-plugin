(function () {
    'use strict';

    Lampa.Listener.follow('app', function (e) {
        if (e.type !== 'ready') return;

        var BASE_URL = 'https://sinemaizle.org';

        /**
         * Поиск фильма по названию из карточки Lampa
         */
        function searchFilm(object, callback) {
            var title = object.original_title || object.title;

            if (!title) return callback([]);

            // Возвращаем объект с URL поиска на sinemaizle
            var item = {
                title: title,
                url: BASE_URL + '/?s=' + encodeURIComponent(title),
                type: 'movie',
                quality: 'WEB',
                external: true  // Открываем во встроенном WebView
            };

            callback([item]);
        }

        /**
         * Открытие страницы фильма в WebView
         */
        function detail(item, callback) {
            callback([{
                title: item.title,
                url: item.url,
                type: 'movie',
                quality: 'WEB',
                external: true  // WebView
            }]);
        }

        /**
         * Регистрация источника в Lampa
         */
        Lampa.Source.Online.add({
            id: 'sinemaizle_webview',
            name: 'Sinemaizle (WebView)',
            type: 'movie',
            search: searchFilm,
            detail: detail
        });

        /**
         * Регистрируем плагин
         */
        Lampa.Plugin.add({
            name: 'Sinemaizle WebView',
            version: '1.0',
            author: 'qazim'
        });
    });
})();
