import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import { DatePicker } from 'antd';
import moment from 'moment'
const { RangePicker } = DatePicker;

const ConfigChart = ({
    visible,
    onChange,
    ...restProps
}) => {
    const [showRangePicker, setShowRangePicker] = useState(false);


    const onChangeDate = (e)=>{
        console.log(e);
        onChange(e)
        setShowRangePicker(false);
    }

    const setCustomDate = ()=>{
        setShowRangePicker(!showRangePicker ? true : false);
    }

    const setThisWeekDate = ()=>{
        var today = new Date;
        var firstDate = new Date(today.setDate(today.getDate() - today.getDay()));
        var lastDate = new Date(today.setDate(today.getDate() - today.getDay() +6));

        let firstDay = firstDate.getDate() 

        console.log(typeof(firstDay))

        let lastDay = lastDate.getDate() < 10 ? '0'+lastDate.getDate() : lastDate.getDate(); 
        let thisMonthFirstDay = firstDate.getMonth() > 10 ? firstDate.getMonth()+1 : ('0'+(firstDate.getMonth()+1))
        let thisMonthLastDay = lastDate.getMonth() > 10 ? lastDate.getMonth()+1 : ('0'+(lastDate.getMonth()+1))
        let thisYearFirstDay = firstDate.getFullYear();
        let thisYearLastDay = lastDate.getFullYear();
        
        let thisWeekDateFrom = new Date(thisMonthFirstDay+"-"+firstDay+"-"+thisYearFirstDay).toISOString();
        let thisWeekDateTo = new Date(thisMonthLastDay+"-"+lastDay+"-"+thisYearLastDay).toISOString();

        let thisWeekDate = [thisWeekDateFrom, thisWeekDateTo];

        onChangeDate(thisWeekDate)
    }

    const setThisMonthDate = ()=>{
        var thisMonth = parseInt(new Date().getMonth()+1)
        let firstDay = '01';
        var lastDay = (new Date((parseInt(new Date().getFullYear())), thisMonth + 1, 0).getDate())  < 10 ? '0'+(new Date((parseInt(new Date().getFullYear())), thisMonth + 1, 0).getDate()) : (new Date((parseInt(new Date().getFullYear())), thisMonth + 1, 0).getDate());
        
        let thisYear = new Date().getFullYear().toString();
        
        let thisMonthFormatted = thisMonth > 10 ? ''+thisMonth : ('0'+(thisMonth))
        
        let thisMonthDateFrom = new Date(thisMonthFormatted+"-"+firstDay+"-"+thisYear).toISOString();
        let thisMonthDateTo = new Date(thisMonthFormatted+"-"+lastDay.toString()+"-"+thisYear).toISOString();
        let thisMonthDate = [thisMonthDateFrom, thisMonthDateTo];
               
        onChangeDate(thisMonthDate)
    }

    const setThisYearDate = ()=>{
        let firstDay = '01';
        let lastDay = '31';
        let firstMonth = '01';
        let lastMonth = '12';
        let thisYear = new Date().getFullYear();
        
        let thisYearDateFrom = new Date(firstDay+"-"+firstMonth+"-"+thisYear, "MM-DD-YYYY").toISOString();
        let thisYearDateTo = new Date(lastDay+"-"+lastMonth+"-"+thisYear, "MM-DD-YYYY").toISOString();

        let thisYearDate = [thisYearDateFrom, thisYearDateTo];

        onChangeDate(thisYearDate)
    }

    return (
        <div>
                <Button
                onClick={setThisWeekDate}
                type="primary"

                >Esta semana</Button>

                <Button
                onClick={setThisMonthDate}
                type="primary"

                >Este mes</Button>

                <Button
                    onClick={setThisYearDate}
                    type="primary"

                >Este año</Button>

                <Button
                    onClick={setCustomDate}
                    type="primary"

                >Personalizar fecha</Button>

                {
                    showRangePicker && 
                    <RangePicker onChange={(e)=>{ 
                        let rangeDate = [new Date(e[0]._d).toISOString(), new Date(e[1]._d).toISOString()]
                        onChangeDate(rangeDate)
                    }}/>
                }
        </div>
    );
}

export default ConfigChart;