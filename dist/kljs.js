var Kl;
(function (Kl) {
    var KlObject = (function () {
        function KlObject(object, inputData) {
            this.object = object;
            this.inputData = inputData;
            if (this.inputData) {
                if (typeof this.inputData === 'string') {
                    if (window[this.inputData]) {
                        this.attrs = window[this.inputData];
                    }
                }
                else if (typeof this.inputData === 'object') {
                    this.attrs = this.inputData;
                }
            }
            if (object && object.attributes && object.attributes['data-kl-bind'] && object.attributes['data-kl-bind'].value) {
                this.attrs = JSON.parse(object.attributes['data-kl-bind'].value);
            }
        }
        KlObject.prototype.attachToHtmlElement = function (elm, attrs) {
            if (attrs.content) {
                elm.innerHTML = attrs.content;
            }
            if (attrs.href) {
                elm.href = attrs.href;
            }
            if (attrs.src) {
                elm.src = attrs.src;
            }
            if (attrs.style) {
                Object.keys(attrs.style).forEach(function (styleProp) {
                    elm.style[styleProp] = attrs.style[styleProp];
                });
            }
        };
        KlObject.prototype.apply = function () {
            var me = this;
            var attrs = this.attrs;
            var object = this.object;
            me.attachToHtmlElement(this.object, this.attrs);
            Object.keys(attrs).forEach(function (key) {
                var objects = object.querySelectorAll(key);
                if (objects.length) {
                    [].forEach.call(objects, (function (elm) {
                        me.attachToHtmlElement(elm, attrs[key]);
                    }));
                }
            });
        };
        KlObject.prototype.continousApply = function () {
            var me = this;
            if (this.inputData && window[this.inputData]) {
                setInterval(function () {
                    me.attrs = window[me.inputData];
                    me.apply();
                }, 300);
            }
        };
        return KlObject;
    }());
    var AutoBinding = (function () {
        function AutoBinding() {
            var me = this;
            this.objects = document.querySelectorAll('*[data-kl-bind]');
            [].forEach.call(this.objects, (function (object) {
                var klobject = new KlObject(object);
                klobject.apply();
            }));
        }
        return AutoBinding;
    }());
    var Bind = (function () {
        function Bind(selector, inputData) {
            var me = this;
            var objects = document.querySelectorAll(selector);
            if (objects.length) {
                [].forEach.call(objects, (function (object) {
                    var klobject = new KlObject(object, inputData);
                    if (typeof inputData === 'string') {
                        klobject.continousApply();
                    }
                    else if (typeof inputData === 'object') {
                        klobject.apply();
                    }
                }));
            }
            else {
                console.error('[KlJS]Trying to bind over undefined element');
            }
        }
        return Bind;
    }());
    Kl.Bind = Bind;
    var Duplicate = (function () {
        function Duplicate(elementSelector, numberOf) {
            var element = document.querySelector(elementSelector);
            var insertAfter = function (newNode, referenceNode) {
                var cln = referenceNode.cloneNode(true);
                newNode.parentElement.appendChild(cln);
            };
            for (var i = 0; i < numberOf; i++) {
                insertAfter(element, element);
            }
        }
        return Duplicate;
    }());
    Kl.Duplicate = Duplicate;
    var LoopBind = (function () {
        function LoopBind(elementSelector, data, mapping) {
            var _loop_1 = function (i) {
                if (mapping && typeof mapping === 'function') {
                    var map_1 = mapping(data[i]);
                    if (map_1 && typeof map_1 === 'object') {
                        if (!document.querySelectorAll(elementSelector + ':nth-child(' + (i + 1) + ')').length) {
                            new Duplicate('.rc_lego.s01.playlist_item_alpha', data.length - 1);
                        }
                        setTimeout(function () {
                            new Bind(elementSelector + ':nth-child(' + (i + 1) + ')', map_1);
                        }, 0);
                    }
                }
            };
            for (var i = 0; i < data.length; i++) {
                _loop_1(i);
            }
        }
        return LoopBind;
    }());
    Kl.LoopBind = LoopBind;
    var Ajax = (function () {
        function Ajax(method, url, data, callback, headers) {
            var me = this;
            var req = new XMLHttpRequest(), res;
            req.open(method, url, true);
            if (headers && headers.length) {
                for (var i = 0; i < headers.length; i++) {
                    req.setRequestHeader(headers[i].name, headers[i].value);
                }
            }
            req.onreadystatechange = function () {
                if (req.readyState == 4) {
                    if (req.status == 200) {
                        res = JSON.parse(req.responseText);
                        callback(res);
                    }
                }
            };
            req.send();
        }
        return Ajax;
    }());
    Kl.Ajax = Ajax;
    new AutoBinding();
})(Kl || (Kl = {}));
