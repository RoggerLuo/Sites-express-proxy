
const para2 = ['5','10','15','30']
const para1 = ['moneyOut','netIn','mainPowerIn','mainPowerOut','mainPowerNetIn']

let makeCode = (para1,para2)=>para1 +para2+" = []\n\
for index, row in testData.iterrows():\n\
    if index >="+para2+" :\n\
        prevIndex = index-"+para2+"\n\
    else :\n\
        prevIndex = 0\n\
    "+ para1 + para2+".append(testData[prevIndex:index]['"+ para1 +"'].sum())\n\
testData['"+ para1 +para2+"']= "+para1+para2+"\n\n"

let content =''
para1.forEach((el)=>{
    para2.forEach((el2)=>{
        content += makeCode(el,el2)
    })
})
console.log(content)


