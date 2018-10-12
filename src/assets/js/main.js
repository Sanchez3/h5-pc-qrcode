/**
 * Created by sanchez 
 */
'use strict';


import css from '../css/css.css';
var QRCode = require('qrcodejs2');
// import QRCode from 'qrcodejs2';
window.h5 = {
    isPc: function() {
        var userAgentInfo = navigator.userAgent;
        var Agents = new Array('Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod');
        var flag = true;
        for (var v = 0; v < Agents.length; v++) {
            if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = false; break; }
        }
        return flag;
    },
    initQRCode: function() {
        // bg W:1920px H:1080px
        var bgWidth = 1920;
        var bgHeight = 1080;

        var wWidth = (window.screen.width > 0) ? (window.innerWidth >= window.screen.width || window.innerWidth == 0) ? screen.width :
            window.innerWidth : window.innerWidth;
        var wHeight = (window.screen.height > 0) ? (window.innerHeight >= window.screen.height || window.innerHeight == 0) ?
            window.screen.height : window.innerHeight : window.innerHeight;
        var scale = (bgWidth / wWidth > bgHeight / wHeight) ? bgWidth / wWidth : bgHeight / wHeight;

        // qrcode X:990px Y:334px W:200px H:200px
        var qrWidth = 200 / scale;
        var qrHeight = 200 / scale;
        var qrUrl=
        var qrcodeElement = document.getElementById('qrcode');
        var qrcode = new QRCode(qrcodeElement, {
            text: "QRCode",
            width: qrWidth,
            height: qrHeight,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        });
        qrcodeElement.style.top = (wHeight - bgHeight / scale) / 2 + 334 / scale + 'px';
        qrcodeElement.style.left = (wWidth - bgWidth / scale) / 2 + 990 / scale + 'px';
        window.addEventListener('resize', function() {
            var wWidth = (window.screen.width > 0) ? (window.innerWidth >= window.screen.width || window.innerWidth == 0) ? screen.width :
                window.innerWidth : window.innerWidth;
            var wHeight = (window.screen.height > 0) ? (window.innerHeight >= window.screen.height || window.innerHeight == 0) ?
                window.screen.height : window.innerHeight : window.innerHeight;
            var _scale = (bgWidth / wWidth > bgHeight / wHeight) ? bgWidth / wWidth : bgHeight / wHeight;
            qrcodeElement.style.transform = `scale(${scale/_scale})`;
            qrcodeElement.style.top = (wHeight - bgHeight / _scale) / 2 + 334 / _scale + 'px';
            qrcodeElement.style.left = (wWidth - bgWidth / _scale) / 2 + 990 / _scale + 'px';
        })





    },
    rootResize: function() {
        //orientation portrait width=750px height=1334px / WeChat width=750px height=1206px 
        var wFsize;

        var wWidth = (window.screen.width > 0) ? (window.innerWidth >= window.screen.width || window.innerWidth == 0) ? screen.width :
            window.innerWidth : window.innerWidth;
        var wHeight = (window.screen.height > 0) ? (window.innerHeight >= window.screen.height || window.innerHeight == 0) ?
            window.screen.height : window.innerHeight : window.innerHeight;
        // var wWidth = window.innerWidth;
        // var wHeight = window.innerHeight;
        if (wWidth > wHeight) {
            wFsize = wHeight / 750 * 100;
        } else {
            wFsize = wWidth / 750 * 100;
        }
        document.getElementsByTagName('html')[0].style.fontSize = wFsize + 'px';
    },
    eventInit: function() {
        var that = this;
        document.addEventListener('touchstart', function(e) {}, { passive: false });
        document.addEventListener('touchmove', function(e) {
            e.preventDefault();
        }, { passive: false });
        return that;
    },
    cssInit: function() {
        var that = this;
        var noChangeCountToEnd = 100,
            noEndTimeout = 1000;
        that.rootResize();
        window.addEventListener('onorientationchange' in window ? 'orientationchange' : 'resize', function() {
            var interval,
                timeout,
                end,
                lastInnerWidth,
                lastInnerHeight,
                noChangeCount;
            end = function() {
                // "orientationchangeend"
                clearInterval(interval);
                clearTimeout(timeout);
                interval = null;
                timeout = null;
                that.rootResize();
            };
            interval = setInterval(function() {
                if (window.innerWidth === lastInnerWidth && window.innerHeight === lastInnerHeight) {
                    noChangeCount++;
                    if (noChangeCount === noChangeCountToEnd) {
                        // The interval resolved the issue first.
                        end();
                    }
                } else {
                    lastInnerWidth = window.innerWidth;
                    lastInnerHeight = window.innerHeight;
                    noChangeCount = 0;
                }
            });
            timeout = setTimeout(function() {
                // The timeout happened first.
                end();
            }, noEndTimeout);
        });

        return that;
    },
    init: function() {
        var that = this;
        that.cssInit().eventInit();
        if (that.isPc()) {
            that.initQRCode();
        }

    }
};
window.onload = function() {
    window.h5.init();
};