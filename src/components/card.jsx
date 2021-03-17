import React, { useEffect, useState } from "react";
import styled from "styled-components";
import API from "../utils/api";

const Container = styled.div`
    display: flex;
    -webkit-display: box;
    -moz-display: box;
    -ms-display: flexbox;
    -webkit-display: flex;
    flex-wrap: wrap;
    padding: 0;
    margin: 0;

    .cards {
        display: flex;
        padding: 1rem;
        margin-bottom: 2rem;
        width: 100%;

        @media (min-width: 40rem) {
            width: 50%;
        }
        @media (min-width: 56rem) {
            width: 33.3%;
        }

        .card-item {
            display: flex;
            flex-direction: column;
            background-color: #fff;
            width: 100%;
            border-radius: 6px;
            box-shadow: 0 20px 40px -14px rgba(0, 0, 0, 0.25);
            overflow: hidden;
            transition: transform 0.5s;
            -webkit-transition: transform 0.5s;
        }

        .card-info {
            display: flex;
            flex: 1 1 auto;
            flex-direction: column;
            padding: 1rem;
            line-height: 1.5em;
        }

        .card-title {
            font-size: 25px;
            line-height: 1.1em;
            color: #32325d;
            margin-bottom: 0.2em;
        }

        .card-image {
            height: 200px;
            overflow: hidden;
            background-image: url(https://source.unsplash.com/featured/?mountains);
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            border-radius: 6px 6px 0px 0px;
            opacity: 0.91;
        }
    }
`;

const Button = styled.button`
    text-decoration: none;
    padding: 14px 20px;
    width: 100%;
    max-width: 200px;
    text-align: center;
    background: ${(props) => (props.primary ? "#ff7175" : "#00ddcd")};
    color: white;
    font-weight: bold;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    font-size: 1.1rem;
`;

const Card = () => {
    const [leads, setLeads] = useState([]);
    const [score, setScore] = useState({
        id: "",
        scoreRegistry: "",
        scoreArchive: "",
        score: "",
        prospect: "",
    });
    const [message, setMessage] = useState({
        error: false,
        message: "",
    });

    const handleScore = async (id) => {
        try {
            const registry = await API.registry();
            const archive = await API.archive();

            const scoreRegistry = registry.some((item) => item.id === id);
            const scoreArchive = archive.some((item) => item.id === id);
            const score =
                !scoreArchive && scoreRegistry ? Math.random() * 100 : 0;

            const result = score > 60 && !scoreArchive && scoreRegistry;

            setScore({
                id: id,
                scoreRegistry: scoreRegistry,
                scoreArchive: scoreArchive,
                score: score,
                prospect: result,
            });
        } catch (error) {
            setMessage({
                error: true,
                message: error,
            });
        }
    };

    const deleteUser = async (id) => {
        try {
            const lead = await API.deleteLead(id);
            console.log(lead);
        } catch (error) {
            setMessage({
                error: true,
                message: error,
            });
        }
    };

    useEffect(() => {
        async function fetchMyAPI() {
            try {
                const lead = await API.leads();
                setLeads(lead);
            } catch (error) {
                setMessage({
                    error: true,
                    message: error,
                });
            }
        }

        fetchMyAPI();
    });

    if (message.error) {
        return <div>{message.message}</div>;
    }

    return (
        <>
            <Container>
                {leads &&
                    Object.keys(leads).map((key, index) => (
                        <div key={index} className="cards">
                            <div className="card-item">
                                <div className="card-image"></div>
                                <div className="card-info">
                                    <h2 className="card-title">
                                        Exploring around
                                    </h2>
                                    <ul className="card-intro">
                                        <li>id: {leads[key].id}</li>
                                        <li>name: {leads[key].firstName}</li>
                                        <li>email: {leads[key].email}</li>
                                        <li>birthday: {leads[key].birthday}</li>
                                    </ul>
                                    <div>
                                        <Button
                                            onClick={() =>
                                                handleScore(leads[key].id)
                                            }
                                            style={{ margin: "10px" }}
                                        >
                                            Validate score
                                        </Button>
                                        <Button
                                            primary
                                            onClick={() =>
                                                deleteUser(leads[key].id)
                                            }
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                </div>
                                {score.id === leads[key].id && (
                                    <div className="card-info">
                                        <p>
                                            Registry: {`${score.scoreRegistry}`}
                                        </p>
                                        <p>
                                            Archive: {`${score.scoreArchive}`}
                                        </p>
                                        <p>
                                            score is:{" "}
                                            {`${score.score.toFixed(2)}%`}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
            </Container>
        </>
    );
};

export default Card;
