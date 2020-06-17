import React, { useState } from 'react';
import { Button, Row, Col } from 'antd';
import { DatePicker } from 'antd';
const { RangePicker } = DatePicker;

const ConfigChart = ({
    visible,
    onChange,
    ...restProps
}) => {
    const [loading, setLoading] = useState(false);

    const onChangeDate = (e) => {
        onChange(e)
    }

    const setThisWeekDate = () => {
        var today = new Date;
        var firstDate = new Date(today.setDate(today.getDate() - today.getDay()));
        var lastDate = new Date(today.setDate(today.getDate() - today.getDay() + 6));

        let firstDay = firstDate.getDate()

        console.log(typeof (firstDay))

        let lastDay = lastDate.getDate() < 10 ? '0' + lastDate.getDate() : lastDate.getDate();
        let thisMonthFirstDay = firstDate.getMonth() > 10 ? firstDate.getMonth() + 1 : ('0' + (firstDate.getMonth() + 1))
        let thisMonthLastDay = lastDate.getMonth() > 10 ? lastDate.getMonth() + 1 : ('0' + (lastDate.getMonth() + 1))
        let thisYearFirstDay = firstDate.getFullYear();
        let thisYearLastDay = lastDate.getFullYear();

        let thisWeekDateFrom = new Date(thisMonthFirstDay + "-" + firstDay + "-" + thisYearFirstDay).toISOString();
        let thisWeekDateTo = new Date(thisMonthLastDay + "-" + lastDay + "-" + thisYearLastDay).toISOString();

        let thisWeekDate = [thisWeekDateFrom, thisWeekDateTo];
        
        setLoading(!loading)
        setTimeout(()=>{
            onChangeDate(thisWeekDate)
            setLoading(!loading)
        },100)
    }

    const setThisMonthDate = () => {
        var thisMonth = parseInt(new Date().getMonth() + 1)
        let firstDay = '01';
        var lastDay = (new Date((parseInt(new Date().getFullYear())), thisMonth + 1, 0).getDate()) < 10 ? '0' + (new Date((parseInt(new Date().getFullYear())), thisMonth + 1, 0).getDate()) : (new Date((parseInt(new Date().getFullYear())), thisMonth + 1, 0).getDate());

        let thisYear = new Date().getFullYear().toString();

        let thisMonthFormatted = thisMonth > 10 ? '' + thisMonth : ('0' + (thisMonth))

        let thisMonthDateFrom = new Date(thisMonthFormatted + "-" + firstDay + "-" + thisYear).toISOString();
        let thisMonthDateTo = new Date(thisMonthFormatted + "-" + lastDay.toString() + "-" + thisYear).toISOString();
        let thisMonthDate = [thisMonthDateFrom, thisMonthDateTo];

        setLoading(!loading)
        setTimeout(()=>{
            onChangeDate(thisMonthDate)
            setLoading(!loading)
        }, 1500)
    }

    const setThisYearDate = () => {
        let firstDay = '01';
        let lastDay = '31';
        let firstMonth = '01';
        let lastMonth = '12';
        let thisYear = new Date().getFullYear();

        let thisYearDateFrom = new Date(Date.parse(firstMonth + "-" + firstDay + "-" + thisYear)).toISOString();
        
        let thisYearDateTo = new Date(Date.parse(lastMonth + "-" + lastDay + "-" + thisYear)).toISOString();

        let thisYearDate = [thisYearDateFrom, thisYearDateTo];

        setLoading(!loading)
        setTimeout(()=>{
            onChangeDate(thisYearDate)
            setLoading(!loading)
        }, 1500)
    }

    const locale = {
        rangePlaceholder: [
            "Inicio", "Fin"
        ]
    }
    return (
        <div style={{ textAlign: 'center !important' }}>
            <Row>
                <Col span={7} push={2}>
                    <Button
                        onClick={setThisWeekDate}
                        type="default"
                    >Esta semana</Button>
                </Col>
                <Col span={7} push={3}>
                    <Button
                        onClick={setThisMonthDate}
                        type="default"
                    >Este mes</Button>
                </Col>
                <Col span={7} push={4}>
                    <Button
                        onClick={setThisYearDate}
                        type="default"
                    >Este año</Button>
                </Col>
            </Row>
            <br></br>
            <Row>
                <Col span={24} style={{ textAlign: "center" }}>
                    Ó
                </Col>
            </Row>
            <br></br>
            <Row>
                <Col span={12} style={{ textAlign: "center" }}>
                    Fecha personalizada:
                </Col>
                <Col span={12} pull={2}>
                    <RangePicker
                        locale={locale}
                        onChange={(e) => {
                            let rangeDate = [new Date(e[0]._d).toISOString(), new Date(e[1]._d).toISOString()]
                            setLoading(true)
                            setTimeout(()=>{
                                onChangeDate(rangeDate)
                                setLoading(false)
                            }, 1500)

                        }} 
                    />
                </Col>
            </Row>
        </div>
    );
}

export default ConfigChart;