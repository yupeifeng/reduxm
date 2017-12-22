let fs = require('fs');
let path = require('path');
let ejs = require('ejs');

/**
 * 静态资源管理webpack插件
 */
module.exports = function assetsPlugin(opts) {
	console.log('from Dir------>', path.join(__dirname, opts.from), '\nto Dir-------->', path.join(__dirname, opts.to));

	return function() {
		let output = this.options.output;
		let outputPath = output.path;
		let publicPath = output.publicPath;

		deleteAllOldFiles(outputPath);

		this.plugin('done', function(stats) {
			let json = stats.toJson();
			let assetsByChunkName = json.assetsByChunkName;

			let assetsChunkFilter = {};
			for (let entry in assetsByChunkName) {
				if (assetsByChunkName.hasOwnProperty(entry)) {
					assetsChunkFilter[entry] = publicPath + chunkName(assetsByChunkName[entry]);
				}
			}

			let gloabalConfig = opts.gloabal || {};
			for (let key in gloabalConfig) {
				if (gloabalConfig.hasOwnProperty(key)) {
					assetsChunkFilter[key] = gloabalConfig[key];
				}
			}

			console.log('assetsChunkFilter===========>', assetsChunkFilter);

			let fromDir = opts.from;
			let toDir = opts.to;

			if (!fromDir) {
				return console.log('请配置模板路径');
			}

			if (!toDir) {
				return console.log('请配置生成文件的目标路径');
			}

			let tplFiles = fs.readdirSync(fromDir);
			tplFiles.forEach(function(v) {
				let content = fs.readFileSync(path.join(__dirname, fromDir, v));
				let dFileName = path.basename(v, '.ejs');
				console.log('写入模板:) =========>', path.join(__dirname, toDir, dFileName + '.html'));
				console.log('js 开始打包时间-->>' + new Date());
				ejs.delimiter = '$';
				fs.writeFileSync(
					path.join(__dirname, toDir, dFileName + '.html'),
					ejs.render(content.toString(), assetsChunkFilter)
				);
			});
		});
	};
};

/**
 * 删除上一次打包好的所有文件
 *
 * @param publicPath 生产环境打包路径
 */
function deleteAllOldFiles(publicPath) {
	try {
		let res = fs.readdirSync(publicPath);

		res.forEach(function(file) {
			if (/\.js$/.test(file)) {
				let filePath = path.join(publicPath, file);
				console.log('正在删除', filePath);
				fs.unlinkSync(filePath);
			}
		});
	} catch (err) {
		console.log('没有', publicPath, '目录');
	}
}

/**
 * 获取chunkname
 *
 * @param chunkName
 * @returns {*}
 */
function chunkName(chunkName) {
	return Array.isArray(chunkName) ? chunkName[0] : chunkName;
}
