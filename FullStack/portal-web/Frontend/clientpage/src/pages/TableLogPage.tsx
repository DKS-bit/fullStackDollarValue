import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import { TableLog } from "../components/TableLog";
import { Container } from '../PageContainer/TableLogPage.style';
import Header from '../components/Header/Header';
import Pagination from '../components/Paginate/Paginate';
import { api } from '../services/axios';



export const TableLogPage = (props) => {
    interface Log {
        timestamp: Date,
        clientName: string,
        userName: string
    }
    const [offset, setOffset] = useState(0);
    const [logArray, setLogArray] = useState<Array<Log>>([])
    useEffect(() => {
        api.get('/api/User/GetLog', {
            headers: {
                bearer: localStorage.getItem("jwt")
            }
        })
            .then((res: { data: Array<Log> }) => {
                setLogArray(res.data)


            }).catch((err: any) => {
                console.log(err)
            })
    }, []);
    return (
        <Container>
            <Header location='/table'></Header>
            <TableLog elementsPerPage={7} logArray={logArray} paginationOffset={offset}></TableLog>
            <Pagination count={logArray.length} setOffset={setOffset} elementsPerPage={7}></Pagination>
        </Container>
    );
}

