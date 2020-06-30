class Accessories{
    static formatDate(date){
        var tmp = new Date(date)
        return tmp.getDay()+'/'+(tmp.getMonth()+1)+'/'+tmp.getFullYear()+' '+tmp.getHours()+':'+tmp.getMinutes()+':'+tmp.getSeconds();
    }
}

export default Accessories;