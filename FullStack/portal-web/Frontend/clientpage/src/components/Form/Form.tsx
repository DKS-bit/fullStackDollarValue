import { Col, FloatingLabel, Form, Row } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import {
    Container,
} from './Form.styled';
import Button from 'react-bootstrap/Button';
import { api } from '../../services/axios';
import { useState } from 'react';
import FileBase64 from 'react-file-base64';
import moment from 'moment';


function FormRegister() {
    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [RG, setRG] = useState("")
    const [dtOfBirth, setDtOfBirth] = useState("")
    const [image, setImage] = useState("")

    function handleSubmit() {
        api.post('/api/User/rotaDePostUserClient', {
            user: {
                username: fullName,
                password: RG,
                RG: RG,
                email: email,
                dtOfBirth: dtOfBirth,
                fullName: fullName,
            },
            base64: image,
            bearer: localStorage.getItem("jwt")
        })
            .then((res) => {
                console.log(res)
            }).catch((err) => {
                console.log(err)
            })
    }
    function livenessTest(file: string) {
        api.post('/api/Requisition/Liveness', {
            file
        })
            .then((res: any) => {
                setImage("data:image/jpeg;base64," + res.data.result.frontalImage)
            }).catch((err: any) => {
                console.log(err)
            })
    }
    function contentExtraction(fileBase64: string) {
        var axios = require('axios');
        var data = JSON.stringify({
            "fileBase64": fileBase64
        });

        var config = {
            method: 'post',
            url: 'https://localhost:7173/api/Requisition/ContentExtraction',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                console.log(response.data);
                console.log(response.data.result[0].fields[2].value)
                setFullName(response.data.result[0].fields[2].value) //nome
                setRG(response.data.result[0].fields[0].value) //rg
                setDtOfBirth(moment(response.data.result[5].fields[5].value).format()) //dtofbirth
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    async function formTest(e: any) {
        console.log(e);
        const file = e.target.files[0];
        let base64: any = await convertBase64(file);
        let corta = base64.split(",")

        contentExtraction(corta[1]);

    }
    async function formLiveness(e: any) {
        console.log(e);
        const file = e.target.files[0];
        let base64: any = await convertBase64(file);
        let corta = base64.split(",")

        livenessTest(corta[1]);

    }
    function convertBase64(file: any) {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
            fileReader.onerror = (error) => {
                reject(error)
            }
        })
    }
    return (

        <Container>

            <Row className="g-2 py-5">
                <Col md={12}>
                    <Form.Label >Document Photo</Form.Label>
                    <Form.Control onChange={(e) => formTest(e)} type="file" />
                </Col>
            </Row>

            <Row className="g-2">
                <Col md={8}>
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Full name"
                        className="mb-3"
                    >
                        <Form.Control onChange={(e) => setFullName(e.target.value)} value={fullName} size="sm" type="text" placeholder="name@example.com" />
                    </FloatingLabel>
                </Col>
                <Col md={4}>
                    <FloatingLabel
                        controlId="floatingInput"
                        label="RG"
                        className="mb-3"
                    >
                        <Form.Control onChange={(e) => setRG(e.target.value)} value={RG} type="text" placeholder="RG" />
                    </FloatingLabel>
                </Col>
            </Row>

            <Row className="g-2">
                <Col md={4}>
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Date of Birth"
                    >
                        <Form.Control onChange={(e) => setDtOfBirth(e.target.value)} value={dtOfBirth} type="date" placeholder="name@example.com" />

                    </FloatingLabel>
                </Col>

                <Col md={8}>
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Email address"
                    >
                        <Form.Control onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder="name@example.com" />
                    </FloatingLabel>
                </Col>
            </Row>

            <Row className="py-5">
                <Col md={12}>
                    <Form.Label>Default file input example</Form.Label>
                    <Form.Control onChange={(e) => formLiveness(e)} type="file" />
                </Col>

            </Row>

            <Row>
                <div className="d-grid gap-2">
                    <Button onClick={(e) => handleSubmit()} variant="primary">
                        Submit
                    </Button>
                </div>
            </Row>




        </Container>
    );
}

export default FormRegister;