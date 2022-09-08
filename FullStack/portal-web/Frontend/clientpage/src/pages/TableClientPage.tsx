import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { TableLog } from "../components/TableLog";
import { Container } from '../PageContainer/TableLogPage.style';
import Header from '../components/Header/Header';
import Pagination from '../components/Paginate/Paginate';
import { TableClients } from '../components/TableClients';
import { api } from '../services/axios';
import { useNavigate } from 'react-router-dom';

interface userClient {
    id: string,
    timeRegistered: Date,
    username: string,
    email: string;
    rg: string;
    dtOfBirth: string;
}

export const TableClientPage = () => {
    const navigate = useNavigate()
    const [userClientArray, setUserClientArray] = useState<Array<userClient>>([])
    const [offset, setOffset] = useState(0);
    useEffect(() => {
        api.get('/api/User/rotaDeGetUserClient', {
            headers: {
                bearer: localStorage.getItem("jwt")
            }
        })
            .then((res: { data: Array<userClient> }) => {

                setUserClientArray(res.data)
            }).catch((err: any) => {
                console.log(err)
            })
    }, []);
    return (
        <Container>

            <Header location='/clients'></Header>
            <TableClients paginationOffset={offset} clientsInfo={userClientArray} elementsPerPage={7} ></TableClients>
            <Pagination count={userClientArray.length} setOffset={setOffset} elementsPerPage={7} ></Pagination>
        </Container>
    );
}

