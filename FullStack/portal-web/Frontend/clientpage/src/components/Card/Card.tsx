import Card from 'react-bootstrap/Card';
import { Container } from './Card.styled';

interface dollarInfo {
    value: number
    information: string
}

function CardComponent(props: dollarInfo) {
    return (
        <Container>
            <h2>{props.information}</h2>
            <h1>R${props.value.toFixed(2)}</h1>

        </Container>
    );
}

export default CardComponent;