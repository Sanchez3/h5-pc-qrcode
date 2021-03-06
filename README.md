# h5-pc-qrcode

项目中，PC端通常展示含二维码的页面。

当二维码不唯一，且根据不同环境改变网址时生成时。

利用 [qrcode.js](https://github.com/davidshimjs/qrcodejs/) 生成二维码。

**同理适用于 父元素背景图片保留固有比例，最大的包含背景区（ `background-size: contain;background-position: center` 或 `object-size:contain;object-position: center`）， 而子元素位置及尺寸的改变。**

关键点：[获取屏幕宽高width(),outerWidth,innerWidth,clientWidth的区别](https://segmentfault.com/a/1190000010746091)、[document.documentElement.clientWidth vs window.innerWidth](https://github.com/ten1seven/jRespond/issues/1#issuecomment-11074991)

## Installation

1. Install Node.js First

2. Get [qrcodejs2](https://www.npmjs.com/package/qrcodejs2) via [npm](https://www.npmjs.com/)
> Note: 从npm上安装了 [qrcodejs2](https://www.npmjs.com/package/qrcodejs2) 支持`import`或`require`引用。但是 安装 [qrcodejs](https://www.npmjs.com/package/qrcodejs)， 在webpack中 `import`或`require`引用时，出错（`QRCode is not defined` / `s.a is not a constructor`）

   ```Sh
   npm install qrcodejs2 —save
   ```


## Usage

### import or require 

with webpack or with requirejs/AMD

```html
<div id="qrcode"></div>
<script type="text/javascript">
	import QRCode from 'qrcodejs2';
	// var QRCode = require('qrcodejs2');
	var qrcode = new QRCode(document.getElementById("qrcode"), {
		text: "QRCode",
		width: 128,
		height: 128,
		colorDark : "#000000",
		colorLight : "#ffffff",
		correctLevel : QRCode.CorrectLevel.H
	});
</script>
```



## Refenerce

- [H5游戏开发：横屏适配](https://aotu.io/notes/2017/10/18/landscape_mode_in_html5_game/index.html)

- [css3 background 新添属性让你的背景图不再拉伸而是随窗口变化而变化](http://yijiebuyi.com/blog/260c099f3462623f6c1e4425e3bd8664.html)


