import React, { useState, useEffect } from 'react'
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { SearchHeader, Image } from './tableclients.style';
import searchIcon from "../../images/search-3-512.png"
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useModal } from '../Modal/useModal';
import { Modal } from '../Modal';
import { Button } from 'react-bootstrap';
import { api } from '../../services/axios';



interface userClient {
    id: string,
    timeRegistered: Date,
    username: string,
    email: string;
    rg: string;
    dtOfBirth: string;
}
interface props {
    clientsInfo: Array<userClient>
    paginationOffset: number
    elementsPerPage: number

}



export const TableClients = (props: props) => {
    const [searchName, setSearchName] = useState("")
    const [clientName, setClientName] = useState("")
    const [clientRg, setClientRg] = useState("")
    const [base64Image, setBase64Image] = useState("")
    const [clientDtOfBirth, setClientDtOfBirth] = useState("")
    const { isShown, toggle } = useModal();

    function matchName() {
        let array = []
        props.clientsInfo.flatMap((client, i) => {
            var matches = client.username.indexOf(searchName) >= 0 ? true : false;

            if (matches) {
                array.push(client)
            }
        })
        return array;
    }
    function requestImage(id: string) {
        api.get('/api/User/getImage', {
            headers: {
                id
            }
        })
            .then((res) => {
                setBase64Image(res.data);

            }).catch((err: any) => {
                console.log(err)
            })

    }
    function clickModal(username: string, rg: string, dtOfBirth: string, id: string) {
        toggle();
        setClientName(username);
        setClientRg(rg);
        setClientDtOfBirth(dtOfBirth);
        requestImage(id);

    }
    return (

        <Table responsive striped bordered hover variant="dark">
            <Modal isShown={isShown} hide={toggle} headerText={'Cliente'} clientName={clientName} clientRg={clientRg} clientDtOfBirth={clientDtOfBirth} base64Image={base64Image} />
            <thead>
                <tr>
                    <SearchHeader colSpan={4}>
                        <label className="busca">
                            <InputGroup>
                                <InputGroup.Text>
                                    <Image src={searchIcon} />
                                </InputGroup.Text>
                                <Form.Control
                                    type="text" name="username" placeholder="Buscar" onChange={(e) => setSearchName(e.target.value)} value={searchName}
                                />
                            </InputGroup>
                        </label>
                    </SearchHeader>
                </tr>
                <tr>
                    <th>Name</th>
                    <th>Client</th>
                    <th>Email</th>
                    <th>Profile</th>
                </tr>
            </thead>
            <tbody>
                {matchName().flatMap((client, i) => {
                    var matches = client.username.indexOf(searchName) >= 0 ? true : false;
                    if (matches) {
                        if (i >= props.paginationOffset && i < props.paginationOffset + props.elementsPerPage)


                            return (
                                <tr key={i}>
                                    <td>{client.username}</td>
                                    <td>{client.rg}</td>
                                    <td>{client.email}</td>
                                    <td >  <Button onClick={() => clickModal(client.username, client.rg, client.dtOfBirth, client.id)} >Open modal</Button></td>

                                </tr>
                            )
                    }
                })
                }

            </tbody>

        </Table >
    )
}
