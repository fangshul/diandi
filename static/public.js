
//转星期
function week (week) {
	switch (week) {
		case 1: 
			return 'Monday' 
		case 2:
			return 'Tuesday'
		case 3:
			return 'Wednesday'
		case 4:
			return 'Thursday'
		case 5: 
			return 'Friday'
		case 6:
			return 'Saturday'
		case 0:
			return 'Sunday'
	}
}
//转换月份
function month (month) {
	switch (month) {
		case '01':
		case 1:
			return 'January'
		case '02':
		case 2:
			return 'February'
		case '03':
		case 3:
			return 'March'
		case '04':
		case 4:
			return 'April'
		case '05':
		case 5:
			return 'May'
		case '06':
		case 6:
			return 'June'
		case '07':
		case 7:
			return 'July'
		case '08':
		case 8:
			return 'August'
		case '09':
		case 9:
			return 'September'
		case '10':
		case 10:
			return 'October'
		case '11':
		case 11:
			return 'November'
		case '12':
		case 12:
			return 'December'
		
	}
}
// get day
function getDay (time) {
	let date
	let data = {}
	date = time.split('T')[0]
	
	data.day = date.split('-')[2]
	data.year = date.split('-')[0]
	data.mon = month(date.split('-')[1])
	
	return data
}
//修改时间格式
function timeModel (num) {
	 let data = num.toString()
	 if (data.length === 1 ) {
		 data = '0' + data 
	 }
	 return data
 }
// note
function note (msg,that,time) {
	
	let maxTime
	if (time === undefined) {
		maxTime = 1500
	} else {
		maxTime = time
	}
	
	 that.ifNote = true
	 that.noteData = msg
	 setTimeout(() => {
		that.ifNote = false
	 },maxTime)
}

module.exports = {
	week: week,
	month: month,
	getDay: getDay,
	timeModel: timeModel,
	note: note
	// upload: upload
}