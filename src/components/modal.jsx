import React, { useState } from "react";
import Modal from "react-modal";
import styled from "styled-components";
import { Formik } from "formik";
import API from "../utils/api";

const Button = styled.button`
    text-decoration: none;
    padding: 14px 20px;
    width: 100%;
    max-width: ${(props) => (props.primary ? "100%" : "200px")};
    margin-top: 20px;
    text-align: center;
    background: ${(props) => (props.primary ? "#539DDF" : "#00ddcd")};
    color: white;
    font-weight: bold;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    font-size: 1.1rem;
`;

const ContainerForm = styled.form`
    margin: 10% auto 0 auto;
    padding: 30px;
    max-width: 400px;
    height: auto;
    overflow: hidden;
    background: white;
    border-radius: 10px;
    label {
        font-size: 14px;
        color: darkgray;
        cursor: pointer;
    }
    label,
    input {
        float: left;
        clear: both;
    }
    input {
        margin: 15px 0;
        padding: 15px 10px;
        width: 100%;
        outline: none;
        border: 1px solid #bbb;
        border-radius: 20px;
        display: inline-block;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        -webkit-transition: 0.2s ease all;
        -moz-transition: 0.2s ease all;
        -ms-transition: 0.2s ease all;
        -o-transition: 0.2s ease all;
        transition: 0.2s ease all;
    }
    input[type="text"]:focus,
    input[type="password"]:focus {
        border-color: cornflowerblue;
    }

    input[type="submit"] {
        padding: 15px 50px;
        width: auto;
        background: #1abc9c;
        border: none;
        color: white;
        cursor: pointer;
        display: inline-block;
        float: right;
        clear: right;
        -webkit-transition: 0.2s ease all;
        -moz-transition: 0.2s ease all;
        -ms-transition: 0.2s ease all;
        -o-transition: 0.2s ease all;
        transition: 0.2s ease all;
    }

    input[type="submit"]:hover {
        opacity: 0.8;
    }

    input[type="submit"]:active {
        opacity: 0.4;
    }
`;

const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        width: "20%",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
    },
};

const ModalView = () => {
    const [modalIsOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState({
        error: false,
        message: "",
    });
    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    async function create(body) {
        try {
            const add = await API.createLead(body);
            console.log(add)
            closeModal(true);
        } catch (error) {
            setMessage({
                error: true,
                message: error,
            });
        }
    }

    if (message.error) {
        return <div>{message.message}</div>;
    }

    return (
        <>
            <Button onClick={openModal}>Crear usuario</Button>
            <Modal
                ariaHideApp={false}
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Crear usuario"
            >
                <h2>Crear usuario</h2>
                <Formik
                    initialValues={{
                        firstName: "",
                        birthday: "",
                        email: "",
                        identification: "",
                    }}
                    validate={(values) => {
                        const errors = {};
                        if (!values.email) {
                            errors.email = "Required";
                        } else if (
                            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                                values.email
                            )
                        ) {
                            errors.email = "Invalid email address";
                        }
                        return errors;
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                        create(values)
                        console.log(values);
                        setSubmitting(false);
                    }}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting,
                    }) => (
                        <ContainerForm onSubmit={handleSubmit}>
                            <label htmlFor="firstName">firstName</label>
                            <input
                                type="text"
                                name="firstName"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password}
                            />
                            <label htmlFor="birthday">birthday</label>
                            <input
                                type="date"
                                name="birthday"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password}
                            />
                            <label htmlFor="email">email</label>
                            <input
                                type="email"
                                name="email"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email}
                            />
                            <small>
                                {errors.email && touched.email && errors.email}
                            </small>
                            <br />
                            <label htmlFor="identification">
                                identification
                            </label>
                            <input
                                type="text"
                                name="identification"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password}
                            />
                            <Button
                                primary
                                type="submit"
                                disabled={isSubmitting}
                            >
                                crear
                            </Button>
                        </ContainerForm>
                    )}
                </Formik>
            </Modal>
        </>
    );
};

export default ModalView;
