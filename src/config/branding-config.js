const themes = {
    whisperwave: {
        palette: {
            primary: {
                main: '#08A3D6',
                contrastText: '#FFFFFF'
            },
            secondary: {
                main: '#FFFFFF',
                contrastText: '#08A3D6'
            },
        },
        components: {
            MuiTextField: {
                styleOverrides: {
                    root: {
                        "& .MuiInputLabel-outlined": {
                            fontSize: "0.90rem"
                        }
                    }
                }
            },
            MuiCheckbox:{
                styleOverrides: {
                    root: {
                        color: "#08A3D6"
                    }
                }
            },
            MuiTypography:{
                styleOverrides: {
                    root: {
                        fontSize: "0.90rem",
                        color: "#08A3D6"
                    }
                }
            },
            MuiList:{
                styleOverrides:{
                    padding : {
                        padding: 0
                    }
                }
            },
            MuiListItemText:{
                styleOverrides:{
                    primary:{
                        color: "#FFF"
                    }
                }
            }
        }
    }
}

export default themes