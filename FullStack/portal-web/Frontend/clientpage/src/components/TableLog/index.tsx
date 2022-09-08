import React, { useState, useEffect } from 'react'
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { SearchHeader, Image } from './tablelog.style';
import searchIcon from "../../images/search-3-512.png"
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import moment from 'moment';

interface Log {
    timestamp: Date,
    clientName: string,
    userName: string
}

interface props {
    logArray: Array<Log>
    paginationOffset: number
    elementsPerPage: number

}

export const TableLog = (props: props) => {
    const [searchName, setSearchName] = useState("")


    function matchName() {
        let array = []
        props.logArray.flatMap((log, i) => {
            var matches = log.userName.indexOf(searchName) >= 0 ? true : false;
            var matches2 = log.clientName.indexOf(searchName) >= 0 ? true : false;

            if (matches || matches2) {
                array.push(log)
            }
        })
        return array;
    }



    return (
        <Table className='w-100' responsive striped bordered hover variant="dark">
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

                    <th>Client</th>
                    <th>User</th>
                    <th>Time</th>
                </tr>
            </thead>
            <tbody>
                {matchName().flatMap((log, i) => {
                    if (i >= props.paginationOffset && i < props.paginationOffset + props.elementsPerPage)
                        return (
                            <tr key={i}>
                                <td>{log.clientName}</td>
                                <td>{log.userName}</td>
                                <td>{moment(log.timestamp).format("MMMM Do YYYY, h:mm a")}</td>
                            </tr>
                        )
                })
                }
            </tbody>

        </Table>
    )
}
