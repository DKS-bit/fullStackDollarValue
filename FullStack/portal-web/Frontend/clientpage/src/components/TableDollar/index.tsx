import React, { useState, useEffect } from 'react'
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { SearchHeader, Image } from './tabledollar.style';
import searchIcon from "../../images/search-3-512.png"
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import moment from 'moment'

interface dollar {
    id: string,
    timestamp: Date,
    value: number

}
interface props {
    dollarValues: Array<dollar>
    paginationOffset: number
    elementsPerPage: number

}

export const TableDollar = (props: props) => {
    const [searchDate, setSearchDate] = useState("")
    const [searchTime, setSearchTime] = useState("")

    function matchDate() {
        let array = []
        if (searchTime === "") {
            props.dollarValues.flatMap((dollar, i) => {
                console.log(searchDate)
                var matches = moment(dollar.timestamp).isSame(searchDate, 'day') ? true : false;

                if (matches) {
                    array.push(dollar)
                }
            })
            if (array.length == 0) {
                return props.dollarValues;
            }
        }
        else {
            props.dollarValues.flatMap((dollar, i) => {
                console.log(searchDate + "T" + searchTime)
                var matches = moment(searchDate + "T" + searchTime).isSame(dollar.timestamp, 'hour') ? true : false;

                if (matches) {
                    array.push(dollar)
                }
            })
            if (array.length == 0) {
                return props.dollarValues;
            }
        }

        return array;
    }



    return (
        <Table responsive striped bordered hover variant="dark">
            <thead>
                <tr>
                    <SearchHeader colSpan={4}>
                        <label className="busca">
                            <InputGroup>
                                <InputGroup.Text>
                                    <Image src={searchIcon} />
                                </InputGroup.Text>
                                <Form.Control
                                    type="date" name="date" placeholder="Buscar" onChange={(e) => setSearchDate(e.target.value)} value={searchDate}
                                />
                                <Form.Control
                                    type="time" name="time" placeholder="Buscar" onChange={(e) => setSearchTime(e.target.value)} value={searchTime}
                                />
                            </InputGroup>
                        </label>
                    </SearchHeader>
                </tr>
                <tr>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Value</th>
                </tr>
            </thead>
            <tbody>
                {matchDate().flatMap((dollar, i) => {
                    if (i >= props.paginationOffset && i < props.paginationOffset + props.elementsPerPage)
                        return (
                            <tr key={i}>
                                <td>{dollar.id}</td>
                                <td>{moment(dollar.timestamp).format("MMMM Do YYYY, h:mm a")}</td>
                                <td>{dollar.value}</td>
                            </tr>
                        )
                })
                }


            </tbody>

        </Table>
    )
}
