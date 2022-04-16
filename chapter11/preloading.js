/**
 * @description 预加载图片
 * @param {Object[]} imgs 图片列表
 * @returns {Promise} 全部加载成功resolve()，有一张图片加载失败reject(url)
 */
const preloadingImgs = (imgs) => {
  if (!Array.isArray(imgs) || !imgs.length) {
    throw 'argument error'
  }

  /**
   * @description 加载图片
   * @param {string} url 
   * @returns 成功resolve()，失败reject(url)
   */
	const loadImg = (url) => {
		return new Promise((resolve, reject) => {
			const imgEle = new Image()

			imgEle.onload = () => {
				resolve()
			}

			imgEle.onerror = () => {
				reject(url)
			}

			imgEle.src = url
		})
	}

  return Promise.all(imgs.map((item) => loadImg(item)))
}

const imgs = [
  'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
  'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
  'htts://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
]

preloadingImgs(imgs).then((res) => {
  console.log(res)
}).catch((err) => {
  console.error(err);
})
