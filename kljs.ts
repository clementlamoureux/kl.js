namespace Kl {
    class KlObject {
        public attrs;
        public object;
        private inputData;

        constructor(object, inputData?) {
            this.object = object;
            this.inputData = inputData;
            if (this.inputData) {
                if (typeof this.inputData === 'string') {
                    if (window[this.inputData]) {
                        this.attrs = window[this.inputData];
                    }
                } else if (typeof this.inputData === 'object') {
                    this.attrs = this.inputData;
                }
            }
            if (object && object.attributes && object.attributes['data-kl-bind'] && object.attributes['data-kl-bind'].value) {
                this.attrs = JSON.parse(object.attributes['data-kl-bind'].value);
            }
        }

        public attachToHtmlElement(elm, attrs) {

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
        }

        public apply() {
            let me = this;
            let attrs = this.attrs;
            let object = this.object;
            me.attachToHtmlElement(this.object, this.attrs);
            Object.keys(attrs).forEach(function (key) {
                let objects = object.querySelectorAll(key);
                if (objects.length) {
                    [].forEach.call(objects, (function (elm) {
                        me.attachToHtmlElement(elm, attrs[key]);
                    }));
                }
            });
        }

        public continousApply() {
            let me = this;
            if (this.inputData && window[this.inputData]) {
                setInterval(function () {
                    me.attrs = window[me.inputData];
                    me.apply();
                }, 300);
            }
        }
    }
    class AutoBinding {
        private objects;

        constructor() {
            let me = this;
            this.objects = document.querySelectorAll('*[data-kl-bind]');
            [].forEach.call(this.objects, (function (object) {
                let klobject = new KlObject(object);
                klobject.apply();
            }));
        }
    }
    export class Bind {
        private objects;

        constructor(selector, inputData) {
            let me = this;
            let objects = document.querySelectorAll(selector);
            if (objects.length) {
                [].forEach.call(objects, (function (object) {
                    let klobject = new KlObject(object, inputData);
                    if (typeof inputData === 'string') {
                        klobject.continousApply();
                    } else if (typeof inputData === 'object') {
                        klobject.apply();
                    }
                }));
            } else {
                console.error('[KlJS]Trying to bind over undefined element')
            }
        }
    }
    export class Duplicate {
        constructor(elementSelector, numberOf) {
            let element = document.querySelector(elementSelector);
            let insertAfter = function (newNode, referenceNode) {
                let cln = referenceNode.cloneNode(true);
                newNode.parentElement.appendChild(cln);
            };
            for (let i = 0; i < numberOf; i++) {
                insertAfter(element, element);
            }
        }
    }
    export class LoopBind {
        constructor(elementSelector, data, mapping?) {
            for (let i = 0; i < data.length; i++) {
                if (mapping && typeof mapping === 'function') {
                    let map = mapping(data[i]);
                    if (map && typeof map === 'object') {
                        if (!document.querySelectorAll(elementSelector + ':nth-child(' + (i + 1) + ')').length) {
                            new Duplicate(elementSelector, data.length - 1);
                        }
                        setTimeout(function () {
                            new Bind(elementSelector + ':nth-child(' + (i + 1) + ')', map);
                        }, 0);
                    }
                }
            }
        }
    }
    export class Ajax {

        constructor(method, url, data, callback, headers?) {
            let me = this;
            let req = new XMLHttpRequest(), res;
            req.open(method, url, true);
            if (headers && headers.length) {
                for (let i = 0; i < headers.length; i++) {
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
            req.send(JSON.stringify(data));
        }
    }

    new AutoBinding();
}