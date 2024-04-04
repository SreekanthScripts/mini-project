// Form.js
import React from "react";
import axios from "axios";

const signupFunction = async (e, email, password, stateChanger) => {
    e.preventDefault();
    console.log("Email: ", email)
    console.log("Password: ", password)
    try {
        const response = await axios.post("http://localhost:3001/signup", {
            email: email,
            password: password,
        });

        console.log("Response:", response.data);
        stateChanger(true);
    } catch (error) {
        // alert("Error uploading user details");
        console.log(error)
        // alert("Failed to upload user details");
    }
};

const loginFunction = async (e, email, password, stateChanger) => {
    e.preventDefault();
    console.log("Email: ", email)
    console.log("Password: ", password)
    try {
        const response = await axios.post("http://localhost:3001/login", {
            email: email,
            password: password,
        });

        // console.log("Response:", response.data);
        stateChanger(true);
    } catch (error) {
        // console.error("Error uploading user details:", error.response.data);
        alert("Login Failed");
    }
};

function Form({ stateChanger }) {
    const [showSignup, setShowSignUp] = React.useState(true);
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const formStyles = {
        container: {
            width: "300px",
            margin: "0 auto",
            padding: "20px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            backgroundColor: "#fff",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        },
        title: {
            textAlign: "center",
            marginBottom: "20px",
            fontSize: "24px",
            fontWeight: "bold",
            color: "#333",
        },
        formGroup: {
            marginBottom: "15px",
        },
        formLabel: {
            display: "block",
            marginBottom: "5px",
            color: "#333",
        },
        formInput: {
            width: "100%",
            padding: "8px",
            border: "1px solid #ccc",
            borderRadius: "3px",
        },
        submitButton: {
            width: "100%",
            padding: "8px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "3px",
            cursor: "pointer",
        },
        authSwitch: {
            textAlign: "center",
            marginTop: "10px",
            cursor: "pointer",
            color: "#007bff",
        },
    };

    return (
        <div style={formStyles.container}>
            <h1 style={formStyles.title}>
                {showSignup ? "Create an Account" : "Log In"}
            </h1>
            <form
                onSubmit={
                    showSignup
                        ? (e) => signupFunction(e, email, password, stateChanger)
                        : (e) => loginFunction(e, email, password, stateChanger)
                }
            >
                <div style={formStyles.formGroup}>
                    <label htmlFor="email" style={formStyles.formLabel}>
                        Email:
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={formStyles.formInput}
                    />
                </div>
                <div style={formStyles.formGroup}>
                    <label htmlFor="password" style={formStyles.formLabel}>
                        Password:
                    </label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={formStyles.formInput}
                    />
                </div>
                <button type="submit" style={formStyles.submitButton}>
                    {showSignup ? "Sign Up" : "Log In"}
                </button>
                <p
                    style={formStyles.authSwitch}
                    onClick={() => setShowSignUp(!showSignup)}
                >
                    {showSignup ? "Already have an account? Log In" : "Don't have an account? Sign Up"}
                </p>
            </form>
        </div>
    );
}

export default Form;
