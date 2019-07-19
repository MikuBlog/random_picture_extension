/**
 * @description 设置样式
 * @param {DOM Object} el 
 * @param {String} ruleName 
 * @param {String} value 
 */
function setStyle(el, ruleName, value) {
	el.style[ruleName] = value
}

/**
 * @description 获取图片
 */
function getPicture() {
    const 
        ele = new Image(),
        box = document.querySelector('.box'),
        body = document.body,
        loading = document.querySelector('.loading')
    // 非阻塞操作
    setTimeout(() => {
        ele.crossOrigin = "anonymous"
        ele.src = "http://myinterface.xuanzai.top/getPicture"
        ele.addEventListener('load', function() {
            this.width >= 1920 
            ? (setStyle(body, 'width', `${this.width / 4}px`),
                setStyle(body, 'height', `${this.height / 4}px`))
            : (setStyle(body, 'width', `${this.width / 2}px`),
                setStyle(body, 'height', `${this.height / 2}px`))
            setStyle(box, 'background-image', `url(${getBase64Image(ele)})`)
            setStyle(loading, 'display', "none")
            createButton(this)
        })
    })
}

/**
 * @description 生成按钮
 * @param {DOM Object} ele 父容器
 */
function createButton(ele) {
    const 
        open = document.createElement('span'),
        box = document.querySelector('.box')
    open.className = "button"
    open.innerText = "Open"
    box.appendChild(open)
    open.addEventListener('click', () => {
        openPictureBase64(getBase64Image(ele))
    })
}

/**
 * @description 生成图片的base64
 * @param {Image} image 图片元素 
 * @returns {String} 图片的base64
 */
function getBase64Image(image) {
    const 
        canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        width = image.width,
        height = image.height
    canvas.width = width
    canvas.height = height
    ctx.drawImage(image, 0, 0, width, height)
    return canvas.toDataURL(`image/${image.src.toLowerCase()}`)
}

/**
 * @description 从新的标签页打开新的图片
 * @param {String} base64 图片的base64
 */
function openPictureBase64(base64) {
    const 
        image = new Image(),
        newTag = window.open('', '_blank')
    image.src = base64
    newTag.document.body.appendChild(image)
	setStyle(newTag.document.body, 'text-align', 'center')
}

getPicture()