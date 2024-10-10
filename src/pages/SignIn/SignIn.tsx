import React, { useState } from "react";
import { Button, TextField, Link, Grid2 as Grid, Box, Container } from "@mui/material";
import { useAuth } from "../../hooks/AuthProvider";
import primaryLogo from '../../assets/whisperwave_primary.svg';
import './SignIn.css';

export default function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const auth = useAuth();

    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        auth.login({ email, password })
    };

    return (
        <div>
            <div className="header justify-center">
                <h3>
                    Sign In
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
                        onSubmit={handleSubmit}
                        noValidate
                        sx={{ mt: 1 }}
                    >
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            size="small"
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            size="small"
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Grid container className="link-container">
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Grid container justifyContent="flex-end" className="link-container">
                            <Link href="/signup" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </div>
    );
}
