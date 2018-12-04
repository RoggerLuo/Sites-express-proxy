const request = require('request')
const jsdom = require("jsdom")
const { JSDOM } = jsdom
const csv = require('csv')
const fs = require('fs')

let globalCounter = 0 

const tableParser = ($) => {
    /* 解析table title */
    var arr = []
    let titleArray = arr.map.call($('.table_bg001')[0].children[0].children[0].children, (el, index) => {
        // console.log(el.innerHTML)
        return el.innerHTML
    })
    // console.log(titleArray)

    /* 解析table body */
    const flag = $('.table_bg001')[0] && $('.table_bg001')[0].children[1] && $('.table_bg001')[0].children[1].children || false
    if(!flag){
        return []
    }
    let contentArray = arr.map.call($('.table_bg001')[0].children[1].children, (el, index) => {
        return arr.map.call(el.children, (el2, index2) => {
            /* 每个属性是一个对象，把title名作为key */
            let keyName = titleArray[index2]
            let obj = {}

            if (el2.children[0]) {
                obj.text = keyName
                obj.value = el2.children[0].innerHTML
            } else {
                obj.text = keyName
                obj.value = el2.innerHTML
            }
            return obj
        })
    })
    // console.log(contentArray)
    return contentArray
}


let content = 'date,endPrice,priceChange,changeRate,moneyIn,moneyOut,netIn,mainPowerIn,mainPowerOut,mainPowerNetIn\n'

const saveToCSV = (content)=>{
    const buffer = new Buffer(content);
    //需要转换字符集
    const iconv = require('iconv-lite');
    const str = iconv.encode(buffer, 'gb2312');
    fs.writeFileSync('./output.csv',str);
}

const loopPageData = (content,pageIndex) =>{
    request('http://quotes.money.163.com/trade/lszjlx_600030,'+pageIndex+'.html', function(error, response, body) {        
        if (!error && response.statusCode == 200) {} else {
            console.log('connect fail, code !== 200')
            return;
        }
        
        let html = body
        const { window } = new JSDOM(body)
        const $ = require('jquery')(window)

        /* get bodyData */
        const data = tableParser($)

        /* convert to CSV */
        // let content = 'date,endPrice,priceChange,changeRate,moneyIn,moneyOut,netIn,mainPowerIn,mainPowerOut,mainPowerNetIn\n'
        data.forEach((el,index,arr)=>{
            el.forEach((el2,index2)=>{

                /* 如果是yyyy-mm-dd，转换成时间戳 */
                const re = new RegExp(/^\d{4}(\-|\/|\.)\d{1,2}\1\d{1,2}$/)
                if(re.test(el2.value)){
                    content += Date.parse(new Date(el2.value))/100000
                }else{
                    content +=  el2.value.replace(/,/g,"").replace("%","") || ' '
                }
                if(index2+1 < el.length){
                    content += ','
                }
            })
            content += '\n'
            globalCounter += 1
        })
        if(data.length > 0){ //就是说这一次有数据
            console.log('the '+(pageIndex+1)+' time fetching... ')
            loopPageData(content,pageIndex+1)
        }else{
            console.log('------end-----')
            console.log('Now save to CSV')
            console.log('Totally '+ globalCounter + ' entries(entry) has created')
            saveToCSV(content)
        }
    })
}

loopPageData(content,0)

