
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation, gql, HttpLink, ApolloClient, InMemoryCache } from '@apollo/client';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Box,
    Button,
    Checkbox,

    FormControl,
    FormControlLabel,
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Typography,

} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';
// project imports
import useScriptRef from 'hooks/useScriptRef';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { strengthColor, strengthIndicatorNumFunc } from 'utils/password-strength';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';


// ===========================|| FIREBASE - REGISTER ||=========================== //

const FirebaseRegister = () => {

     const clientUser = new ApolloClient({
        link: new HttpLink({
            uri: 'http://localhost:3000/graphql'
          }),
        cache: new InMemoryCache()
    });
    const theme = useTheme();
    const navigate = useNavigate();
    const scriptedRef = useScriptRef();
   // const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
    
    const [showPassword, setShowPassword] = React.useState(false);
    const [checked, setChecked] = React.useState(true);

    const [strength, setStrength] = React.useState(0);
    const [level, setLevel] = React.useState();

    const CREATE_USER = gql`
    mutation($firstName:String!, $lastName:String!, $email:String!, $password: String!, $dateOfBirth:String!, $mobileNumber:String!,$language:String!,$location:String!){
        userRegister(userregisterData:{
          firstName:$firstName,
          lastName:$lastName,
          email:$email,
          password:$password,
          dateOfBirth:$dateOfBirth,
          mobileNumber:$mobileNumber,
          language:$language,
          location:$location
        }){
          _id
          email
          firstName
          lastName
          dateOfBirth
          mobileNumber
          language
          location
        }
      }`
     
      const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const changePassword = (value) => {
        const temp = strengthIndicatorNumFunc(value);
        setStrength(temp);
        setLevel(strengthColor(temp));
    };

    useEffect(() => {
        changePassword('123456');
    }, []);
    const {  loading, error } = useMutation(CREATE_USER);
    if (loading) return 'Loading...';
    if (error) return <pre>{error.message}</pre>
    
    return (
        <>
            <Formik
                initialValues={{
                    firstName:'',
                    lastName:'',
                    email:'',
                    password:'',
                    dateOfBirth:'',
                    mobileNumber:'',
                    language:'',
                    location:'',
                    submit: null
                }}
                validationSchema={Yup.object().shape({
                    firstName: Yup.string().required('firstName is required'),
                    lastName: Yup.string().required('lastName is required'),
                    email: Yup.string().required('email is required'),
                    password: Yup.string().required('password is required'),
                    dateOfBirth: Yup.string().required('dateOfBirth is required'),
                    mobileNumber: Yup.string().required('mobileNumber is required'),
                    location: Yup.string().required('location is required'),
                    language: Yup.string().required('language is required'),
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    try {
                       console.log(values);
                        const firstName = values.firstName;
                        const lastName = values.lastName;
                        const email = values.email;
                        const password = values.password;
                        const dateOfBirth = values.dateOfBirth;
                        const mobileNumber = values.mobileNumber;
                        const location = values.location;
                        const language = values.language;
                        console.log(values.mobileNumber);
                        console.log(values.language);
                        await clientUser.mutate({
                            variables: { 
                         firstName,
                       lastName,
                        email,
                        password,
                         dateOfBirth,
                         mobileNumber,
                         location,
                         language
                            },
                            mutation: CREATE_USER
                        });

                        if(scriptedRef.current){
                            setStatus({ success: true });
                        
                            setSubmitting(false);
                        }

                        navigate("/pages/login/login2");
                     
                    } catch (err) {
                        console.error(err);
                        if (scriptedRef.current) {
                            setStatus({ success: false });
                            setErrors({ submit: err.message });
                            setSubmitting(false);
                        }
                    }
                }}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                    <form noValidate onSubmit={handleSubmit} >
                        <FormControl fullWidth error={Boolean(touched.firstName && errors.firstName)} sx={{ ...theme.typography.customInput }}>
                            <InputLabel htmlFor="outlined-adornment-title-register">First Name</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-firstName-register"
                                type="text"
                                value={values.firstName}
                                name="firstName"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                inputProps={{}}
                            />
                            {touched.title && errors.title && (
                                <FormHelperText error id="standard-weight-helper-text--register">
                                    {errors.firstName}
                                </FormHelperText>
                            )}
                        </FormControl>
                        <FormControl fullWidth error={Boolean(touched.lastName && errors.lastName)} sx={{ ...theme.typography.customInput }}>
                            <InputLabel htmlFor="outlined-adornment-lastName-register">Last Name</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-lastName-register"
                                type="text"
                                value={values.lastName}
                                name="lastName"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                inputProps={{}}
                            />
                            {touched.lastName && errors.lastName && (
                                <FormHelperText error id="standard-weight-helper-text--register">
                                    {errors.lastName}
                                </FormHelperText>
                            )}
                        </FormControl>
                        <FormControl fullWidth error={Boolean(touched.dateOfBirth && errors.dateOfBirth)} sx={{ ...theme.typography.customInput }}>
                            <InputLabel htmlFor="outlined-adornment-dateOfBirth-register">Date Of Birth</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-dateOfBirth-register"
                                type="text"
                                value={values.dateOfBirth}
                                name="dateOfBirth"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                inputProps={{}}
                            />
                            {touched.dateOfBirth && errors.dateOfBirth && (
                                <FormHelperText error id="standard-weight-helper-text--register">
                                    {errors.dateOfBirth}
                                </FormHelperText>
                            )}
                        </FormControl>
                        <FormControl fullWidth error={Boolean(touched.location && errors.location)} sx={{ ...theme.typography.customInput }}>
                            <InputLabel htmlFor="outlined-adornment-location-register">Your Location</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-location-register"
                                type="text"
                                value={values.location}
                                name="location"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                inputProps={{}}
                            />
                            {touched.location && errors.location && (
                                <FormHelperText error id="standard-weight-helper-text--register">
                                    {errors.location}
                                </FormHelperText>
                            )}
                        </FormControl>
                        <FormControl fullWidth error={Boolean(touched.language && errors.language)} sx={{ ...theme.typography.customInput }}>
                            <InputLabel htmlFor="outlined-adornment-language-register">Language</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-language-register"
                                type="text"
                                value={values.language}
                                name="language"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                inputProps={{}}
                            />
                            {touched.language && errors.language && (
                                <FormHelperText error id="standard-weight-helper-text--register">
                                    {errors.language}
                                </FormHelperText>
                            )}
                        </FormControl>
                        <FormControl fullWidth error={Boolean(touched.mobileNumber && errors.mobileNumber)} sx={{ ...theme.typography.customInput }}>
                            <InputLabel htmlFor="outlined-adornment-mobileNumber-register">Mobile Number</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-mobileNumber-register"
                                type="text"
                                value={values.mobileNumber}
                                name="mobileNumber"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                inputProps={{}}
                            />
                            {touched.mobileNumber && errors.mobileNumber && (
                                <FormHelperText error id="standard-weight-helper-text--register">
                                    {errors.mobileNumber}
                                </FormHelperText>
                            )}
                        </FormControl>
                        <FormControl fullWidth error={Boolean(touched.email && errors.email)} sx={{ ...theme.typography.customInput }}>
                            <InputLabel htmlFor="outlined-adornment-email-register">Email Address</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-email-register"
                                type="email"
                                value={values.email}
                                name="email"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                inputProps={{}}
                            />
                            {touched.email && errors.email && (
                                <FormHelperText error id="standard-weight-helper-text--register">
                                    {errors.email}
                                </FormHelperText>
                            )}
                        </FormControl>

                        <FormControl
                            fullWidth
                            error={Boolean(touched.password && errors.password)}
                            sx={{ ...theme.typography.customInput }}
                        >
                            <InputLabel htmlFor="outlined-adornment-password-register">Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password-register"
                                type={showPassword ? 'text' : 'password'}
                                value={values.password}
                                name="password"
                                label="Password"
                                onBlur={handleBlur}
                                onChange={(e) => {
                                    handleChange(e);
                                    changePassword(e.target.value);
                                }}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                            size="large"
                                        >
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                inputProps={{}}
                            />
                            {touched.password && errors.password && (
                                <FormHelperText error id="standard-weight-helper-text-password-register">
                                    {errors.password}
                                </FormHelperText>
                            )}
                        </FormControl>

                        {strength !== 0 && (
                            <FormControl fullWidth>
                                <Box sx={{ mb: 2 }}>
                                    <Grid container spacing={2} alignItems="center">
                                        <Grid item>
                                            <Box
                                                style={{ backgroundColor: level?.color }}
                                                sx={{ width: 85, height: 8, borderRadius: '7px' }}
                                            />
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="subtitle1" fontSize="0.75rem">
                                                {level?.label}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </FormControl>
                        )}

                        <Grid container alignItems="center" justifyContent="space-between">
                            <Grid item>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={checked}
                                            onChange={(event) => setChecked(event.target.checked)}
                                            name="checked"
                                            color="primary"
                                        />
                                    }
                                    label={
                                        <Typography variant="subtitle1">
                                            Agree with &nbsp;
                                            <Typography variant="subtitle1" component={Link} to="#">
                                                Terms & Condition.
                                            </Typography>
                                        </Typography>
                                    }
                                />
                            </Grid>
                        </Grid>
                      
                      
                        {errors.submit && (
                            <Box sx={{ mt: 3 }}>
                                <FormHelperText error>{errors.submit}</FormHelperText>
                            </Box>
                        )}

                        <Box sx={{ mt: 2 }}>
                            <AnimateButton>
                                <Button
                                    disableElevation
                                    disabled={isSubmitting}
                                    fullWidth
                                    size="large"
                                    type="submit"
                                    variant="contained"
                                    color="secondary"
                                >
                                    Register
                                </Button>
                            </AnimateButton>
                        </Box>
                    </form>
                )}
            </Formik>
        </>
    );
};

export default FirebaseRegister;
