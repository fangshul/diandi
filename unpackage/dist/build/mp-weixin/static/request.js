var base = 'https://wy.lujiahaoo.cn/dddx/api'

function getRequest (url,data,success,fail,type,contentType) {
	console.log('type',type)
	var token = wx.getStorageSync('token')

	let contType
	
	if (contentType != undefined) {
		contType = contentType
	} else {
		
		contType = 'application/json'
	}

	wx.request({
		url: base + url,
		method: type,
		data: data,
		header: {
			'content-type': contType,
			'Authorization' : 'Bearer ' + token
		},
		success: res => {
			if (res.data.code) {
				console.log('success')
			} else {
				console.log(res.data.msg)
			}
			success(res)
		},
		fail: error => {
			
			fail(error)
		}
	})
}

// module.exports.getRequest = getRequest
module.exports = {
	getRequest: getRequest,
	
}