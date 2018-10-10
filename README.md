# h5-pc-qrcode

项目中，PC端通常展示含二维码的页面。

当二维码不唯一，且根据不同环境改变网址时生成时。

利用 [qrcode.js](https://github.com/davidshimjs/qrcodejs/) 生成二维码。

## Installation

1. Install Node.js First

2. Get [qrcodejs2](https://www.npmjs.com/package/qrcodejs2) via [npm](https://www.npmjs.com/)
> Note: 从npm上安装了 [qrcodejs2](https://www.npmjs.com/package/qrcodejs2) 支持`import`或`require`引用。但是 安装 [qrcodejs](https://www.npmjs.com/package/qrcodejs)， 在webpack中 `import`或`require`引用时，出错（`QRCode is not defined` / `s.a is not a constructor`）

   ```Sh
   npm install qrcodejs2 —save
   ```


## Usage

### import / require 

with webpack / with requirejs/AMD

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






