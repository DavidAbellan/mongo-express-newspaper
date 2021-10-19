var moment = require('moment');
moment.locale('es');
function format(date){
    return moment(date,'YYYYMMDD').fromNow();
}
module.exports= {
    format
}