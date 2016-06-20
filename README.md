### 初始化
在项目根目录下面执行命令
	
	npm install

### 开发环境启动命令
在根目录下面执行
	npm run dev

### 正式环境（使用forever）启动
在根目录下面执行
	npm run server 

### 正式环境（使用pm2）启动
在根目录下面执行
	npm run pm2-server 

	
### 目录结构

	|--- II-and-dog-egg
	|
	|--- bin
	|   |__ www.js
	|
	|--- dist 资源输出目录
	|
	|--- node_modules nodejs模块文件
	|
	|--- routes 里面所放的 全部都是 II-and-dog-egg 后台运行的js文件、包括REST接口调用、URL请求路径处理
	|
	|--- src
	|    |__ img 图片目录
	|    |
	|    |__ js  前台业务相关的js文件
	|    |
	|    |__ plugins 所使用的插件目录（已经集成了 amazeui 2.6.2 、jquery）
	|    |
	|    |__ scss 页面业务相关的scss文件
	|        |
	|        |__ components 自定的的SASS模块文件
	|        |
	|        |__ helper 公共SASS函数 （@function）
	|        |
	|        |__ mixins 混合(mixin)
	|        |
	|        |__ service views里面的页面对应的css，一般跟页面一一对应
	|        |
	|        |__ vendor 
	|        |
	|        |__ variables.scss 一些 sass 定义的变量、基础数据
	|        |
	|        |__ cat.scss 入口
	|
	|--- views 静态页面目录
	|
	|--- .gitignore
	|
	|--- app.js II-and-dog-egg 入口文件、里面有项目的初始化配置项
	|
	|--- gulpfile.babel.js  gulp工作流配置文件
	|
	|--- LICENSE
	|
	|--- package.json 
	|
	|--- README.md
	|
	|--- app-pm2.json pm2启动配置文件