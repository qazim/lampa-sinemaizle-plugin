(function () {
    'use strict';

    /**
     * Турецкий Online Mod для Lampa
     * WebView + iframe-совместимые сайты
     */

    function sinemaizle(component, object) {
        this.search = function (_object) {
            var title = _object.search || (_object.movie && _object.movie.title);
            if (!title) return component.empty();

            component.reset();

            component.append({
                title: 'Sinemaizle.org',
                quality: 'WEB',
                info: 'TR',
                stream: 'https://sinemaizle.org/?s=' + encodeURIComponent(title),
                external: true
            });

            component.start(true);
        };

        this.destroy = function () {};
    }

    function dizibox(component, object) {
        this.search = function (_object) {
            var title = _object.search || (_object.movie && _object.movie.title);
            if (!title) return component.empty();

            Lampa.Network.get(
                'https://dizibox.pw/ara/' + encodeURIComponent(title),
                function (html) {
                    var doc = $('<div>' + html + '</div>');
                    var link = doc.find('.film-list a').attr('href');
                    if (!link) return component.empty();

                    Lampa.Network.get(link, function (html2) {
                        var doc2 = $('<div>' + html2 + '</div>');
                        var iframe = doc2.find('iframe').attr('src');
                        if (!iframe) return component.empty();

                        component.reset();
                        component.append({
                            title: 'Dizibox',
                            quality: 'HD',
                            info: 'TR',
                            stream: iframe
                        });
                        component.start(true);
                    });
                }
            );
        };

        this.destroy = function () {};
    }

    /**
     * Регистрация online_mod
     */
    Lampa.Listener.follow('app', function (e) {
        if (e.type !== 'ready') return;

        Lampa.Source.Online.add({
            id: 'turkish_online',
            name: 'Turkish Online',
            type: 'movie',
            sources: {
                sinemaizle: sinemaizle,
                dizibox: dizibox
            }
        });
    });

})();
