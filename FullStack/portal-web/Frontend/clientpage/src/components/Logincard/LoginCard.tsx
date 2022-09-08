import { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import { api } from '../../services/axios';
import {
    LoginContainer,
    LoginCard,
    LeftLogin,
    TextLogIn,
    Label,
    Input,
    Button,
    RightLogin,
    SwithBtn
} from './Login.styled';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
    const navigate = useNavigate()
    const [isLogin, setIsLogin] = useState(true);

    function handleDisplay() {

        setIsLogin(!isLogin);
    }

    function tryLogin() {

        api.post('/api/User/rotaDeLogin', {
            username,
            password

        })
            .then((res: { data: string }) => {
                if (res.data === "Falha") {
                    toast.error(' Login invalido!', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
                else {
                    localStorage.setItem("jwt", res.data)
                    navigate('/clients');
                }
            }).catch((err: any) => {
                console.log(err)
            })
    }
    function tryRegister() {

        api.post('/api/User/rotaDePost', {
            username: usernameRegister,
            password: passwordRegister,
            email: email

        })
            .then((res: { data: string }) => {
                if (res.data === "Falha Email") {
                    toast.error(' Email ja existe !', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
                if (res.data === "Falha Username") {
                    toast.error(' Username ja existe !', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
            }).catch((err: any) => {
                console.log(err)
            })
    }
    const [username, setUsername] = useState("");
    const [usernameRegister, setUsernameRegister] = useState("");
    const [password, setPassword] = useState("");
    const [passwordRegister, setPasswordRegister] = useState("");
    const [email, setEmail] = useState("");


    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <LoginContainer>

                <LoginCard>

                    <LeftLogin style={{ display: isLogin ? 'flex' : 'none' }}>
                        <TextLogIn>
                            Log in
                        </TextLogIn>
                        <Label>
                            Username
                            <Input type="text" onChange={(e) => setUsername(e.target.value)} value={username}></Input>
                        </Label>
                        <Label>
                            Password
                            <Input type="password" onChange={(e) => setPassword(e.target.value)} value={password} ></Input>
                        </Label>
                        <Button onClick={(e) => tryLogin()}>Entrar</Button>
                        <SwithBtn onClick={(e: any) => handleDisplay()}>No account? Make one!!</SwithBtn>
                    </LeftLogin>
                    <RightLogin style={{ display: !isLogin ? 'flex' : 'none' }}>
                        <TextLogIn>
                            New Account
                        </TextLogIn>
                        <Label>
                            Username
                            <Input type="text" onChange={(e) => setUsernameRegister(e.target.value)} value={usernameRegister} ></Input>
                        </Label>
                        <Label>
                            Email
                            <Input type="text" onChange={(e) => setEmail(e.target.value)} value={email}></Input>
                        </Label>
                        <Label>
                            Password
                            <Input type="text" onChange={(e) => setPasswordRegister(e.target.value)} value={passwordRegister}></Input>
                        </Label>
                        <Button onClick={(e) => tryRegister()}>Register</Button>
                        <SwithBtn onClick={(e: any) => handleDisplay()}>Already registered? Log in!</SwithBtn>
                    </RightLogin>
                </LoginCard>
            </LoginContainer>
        </>
    )
}