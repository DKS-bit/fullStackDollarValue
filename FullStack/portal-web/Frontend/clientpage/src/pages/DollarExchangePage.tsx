import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { TableLog } from "../components/TableLog";
import { CardComponentContainer, Container } from '../PageContainer/DollarExchangePage.style';
import Header from '../components/Header/Header';
import Pagination from '../components/Paginate/Paginate';
import CardComponent from '../components/Card/Card';
import { TableDollar } from '../components/TableDollar';
import { api } from '../services/axios';
import moment from 'moment'


interface dollar {
    id: string,
    timestamp: Date,
    value: number

}

export const DollarExchangePage = () => {
    const [DollarValueArray, setDollarValueArray] = useState<Array<dollar>>([])
    const [average, setAverage] = useState(0);
    const [min, setMin] = useState(1000);
    const [max, setMax] = useState(0);
    const [offset, setOffset] = useState(0);

    function calculateDailyAverage(arrayOfDollars: Array<dollar>) {
        let now = moment()
        let finalLength = 1;
        arrayOfDollars.forEach(dollar => {
            if (now.isSame(dollar.timestamp, 'minute')) {
                setAverage(prevAverage => prevAverage + dollar.value)
                finalLength++;
            }
        });
        setAverage(prevAverage => prevAverage / finalLength)
    }

    function calculateDailyMin(arrayOfDollars: Array<dollar>) {
        let now = moment()

        arrayOfDollars.forEach(dollar => {
            let minimum = 1000;
            if (minimum > dollar.value && now.isSame(dollar.timestamp, 'day')) {
                minimum = dollar.value;
            }
            setMin(minimum);
        });

    }

    function calculateDailyMax(arrayOfDollars: Array<dollar>) {
        let now = moment()

        let maximum = 0;
        arrayOfDollars.forEach(dollar => {

            if (maximum < dollar.value && now.isSame(dollar.timestamp, 'day')) {

                maximum = dollar.value;
            }
            setMax(maximum);
        });

    }

    useEffect(() => {
        api.get('/api/User/rotaDeGetDollar', {
            headers: {
                bearer: localStorage.getItem("jwt")
            }
        })
            .then((res: { data: Array<dollar> }) => {
                setDollarValueArray(res.data)
                calculateDailyAverage(res.data)
                calculateDailyMin(res.data)
                calculateDailyMax(res.data)

            }).catch((err: any) => {
                console.log(err)
            })
    }, []);
    return (
        <Container>
            <h1>{min}</h1>
            <h1>{max}</h1>
            <Header location='/dollar'></Header>
            <CardComponentContainer>
                <CardComponent value={average} information='Daily average'></CardComponent>
                <CardComponent value={min} information='Daily min'></CardComponent>
                <CardComponent value={max} information='Daily max'></CardComponent>
            </CardComponentContainer>
            <TableDollar dollarValues={DollarValueArray} paginationOffset={offset} elementsPerPage={7}></TableDollar>
            <Pagination count={DollarValueArray.length} setOffset={setOffset} elementsPerPage={7}></Pagination>
        </Container>
    )
}
