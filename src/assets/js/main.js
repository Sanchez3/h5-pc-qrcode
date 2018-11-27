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
    initQrCode: function() {
        var qrWidth = 200;
        var qrHeight = 200;
        var qrUrl = window.location.href;
        var qrcodeElement = document.getElementById('qrcode');
        var qrcode = new QRCode(qrcodeElement, {
            text: qrUrl,
            width: qrWidth,
            height: qrHeight,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        });

    },
    setElementPosition: function(el, x, y, w, h, bgWidth, bgHeight) {
        var wWidth = document.documentElement.clientWidth || window.innerWidth;
        var wHeight = document.documentElement.clientHeight || window.innerHeight;

        var scale = (bgWidth / wWidth > bgHeight / wHeight) ? bgWidth / wWidth : bgHeight / wHeight;
        el.style.left = (wWidth - bgWidth / scale) / 2 + x / scale + 'px';
        el.style.top = (wHeight - bgHeight / scale) / 2 + y / scale + 'px';



        el.style.transform = `scale(${1/scale})`;



    },
    rootResize: function() {
        var that = this;
        //orientation portrait width=750px height=1334px / WeChat width=750px height=1206px 
        var wFsize;

        var wWidth = document.documentElement.clientWidth || window.innerWidth;
        var wHeight = document.documentElement.clientHeight || window.innerHeight;

        if (wWidth > wHeight) {
            wFsize = wHeight / 750 * 100;
        } else {
            wFsize = wWidth / 750 * 100;
        }
        document.getElementsByTagName('html')[0].style.fontSize = wFsize + 'px';

        //when background-size:contain object-fit:contain, how to locate the element
        //eg. bg W:1920px H:1080px   
        //element: qrcode X:990px Y:334px W:200px H:200px
        that.setElementPosition(document.getElementById('qrcode'), 990, 334, 200, 200, 1920, 1080);
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
        that.initQrCode();
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

    }
};
window.onload = function() {
    window.h5.init();
};