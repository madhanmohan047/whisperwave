import * as React from "react";
import { Button, TextField, Link, Grid2 as Grid, Box, Container } from "@mui/material";
import { useFireBase } from "../../hooks/FireBaseProvider";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import primaryLogo from '../../assets/whisperwave_primary.svg';


export default function SignUp() {
    const [firstName, setFirstName] = React.useState("");
    const [lastName, setLastName] = React.useState("");
    const [phoneNumber, setPhoneNumber] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const { auth, db } = useFireBase();

    const navigate = useNavigate();
    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();

        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

            await updateProfile(auth.currentUser, {
                displayName: `${firstName} ${lastName}`,
            });

            const user = userCredential.user;

            setDoc(doc(db, "users", user.uid), {
                userName:  `${firstName} ${lastName}`,
                firstName: firstName,
                lastName: lastName,
                phoneNumber: phoneNumber,
                email: email,
                userId: user.uid,
                timestamp: new Date()
            });

            navigate("/");
        } catch (error) {
            
        }
    };

    return (
        <div>
            <div className="header justify-center">
                <h3>
                    Sign up
                </h3>
            </div>
            <Container component="main" maxWidth="xs">
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <img className="primary-logo" alt="Whisper Wave" src={primaryLogo}></img>
                    <Box
                        component="form"
                        noValidate
                        onSubmit={handleSubmit}
                        sx={{ mt: 3 }}
                    >
                        <Grid container spacing={2}>
                            <Grid size={12}>
                                <TextField
                                    autoComplete="first-name"
                                    name="firstName"
                                    required
                                    fullWidth
                                    size="small"
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </Grid>
                            <Grid size={12}>
                                <TextField
                                    autoComplete="last-name"
                                    name="lastName"
                                    required
                                    fullWidth
                                    size="small"
                                    id="lastName"
                                    label="Last Name"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </Grid>
                            <Grid size={12}>
                                <TextField
                                    autoComplete="phone-number"
                                    name="phoneNumber"
                                    required
                                    fullWidth
                                    size="small"
                                    id="phoneNumber"
                                    label="Phone Number"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                />
                            </Grid>
                            <Grid size={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    size="small"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Grid>
                            <Grid size={12}>
                                <TextField
                                    required
                                    fullWidth
                                    size="small"
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end" className="link-container">
                                <Link href="/" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </div>
    );
}
