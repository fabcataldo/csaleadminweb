class Accessories{
    static formatDate(date){
        var tmp = new Date(date)
        return tmp.getDate()+'/'+(tmp.getMonth().toString().length < 2 ? '0' 
            + tmp.getMonth() : (tmp.getMonth() + 1) ) +
            '/'+tmp.getFullYear()+' '+tmp.getHours()+':'+
            (tmp.getMinutes().toString().length < 2 ? '0' 
            + tmp.getMinutes() : (tmp.getMinutes() + 1) ) 
                +':'+tmp.getSeconds();
    }
}

export default Accessories;