
import { useMutation, gql, HttpLink, ApolloClient, InMemoryCache } from '@apollo/client';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Box,
    Button,
    
    FormControl,
    
    FormHelperText,

    InputLabel,
    OutlinedInput,


} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';
// project imports
import useScriptRef from 'hooks/useScriptRef';
import AnimateButton from 'ui-component/extended/AnimateButton';


// ===========================|| FIREBASE - REGISTER ||=========================== //

const FirebaseRegister = () => {
     const client = new ApolloClient({
        link: new HttpLink({
            uri: 'http://localhost:3000/graphql'
          }),
        cache: new InMemoryCache()
    });
    const theme = useTheme();
    const scriptedRef = useScriptRef();

    const CREATE_JOB = gql`
    mutation($title:String!,$position:String!,$description:String!,$placeName:String!, $industry:String!, $companyName:String!, $companyEmail:String!){
        createJob(job:{
            title:$title,
            position:$position,
            description:$description,
            placeName:$placeName,
            industry:$industry,
            companyName:$companyName,
            companyEmail:$companyEmail
          }){
            _id
            title
            position
            description
            placeName
            createdAt
            updatedAt
            industry
            companyName
            companyEmail
          }
        }`
     
    const {  loading, error } = useMutation(CREATE_JOB);
    if (loading) return 'Loading...';
    if (error) return <pre>{error.message}</pre>
    
    return (
        <>
            <Formik
                initialValues={{
                    title:'',
                    position:'',
                    description:'',
                    placeName:'',
                    industry:'',
                    companyName:'',
                    companyEmail:'',
                    submit: null
                }}
                validationSchema={Yup.object().shape({
                    title: Yup.string().required('Job title is required'),
                    position: Yup.string().required('position is required'),
                    description: Yup.string().required('description is required'),
                    placeName: Yup.string().required('placeName is required'),
                    industry: Yup.string().required('industry is required'),
                    companyName: Yup.string().required('companyName is required'),
                    companyEmail: Yup.string().required('companyEmail is required'),
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    try {
                       console.log(values);
                        const title = values.title;
                        const position = values.position;
                        const description = values.description;
                        const placeName = values.placeName;
                        const industry = values.industry;
                        const companyName = values.companyName;
                        const companyEmail = values.companyEmail;
                        console.log(values.title);
                        console.log(values.companyName);
                        await client.mutate({
                            variables: { 
                         title,
                       position,
                        description,
                        placeName,
                         industry,
                         companyName,
                         companyEmail
                            },
                            mutation: CREATE_JOB
                        });

                        if(scriptedRef.current){
                            setStatus({ success: true });
                        
                            setSubmitting(false);
                        }
                     
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
                        <FormControl fullWidth error={Boolean(touched.title && errors.title)} sx={{ ...theme.typography.customInput }}>
                            <InputLabel htmlFor="outlined-adornment-title-register">Job Title</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-title-register"
                                type="text"
                                value={values.title}
                                name="title"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                inputProps={{}}
                            />
                            {touched.title && errors.title && (
                                <FormHelperText error id="standard-weight-helper-text--register">
                                    {errors.title}
                                </FormHelperText>
                            )}
                        </FormControl>
                        <FormControl fullWidth error={Boolean(touched.position && errors.position)} sx={{ ...theme.typography.customInput }}>
                            <InputLabel htmlFor="outlined-adornment-position-register">Job position</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-position-register"
                                type="text"
                                value={values.position}
                                name="position"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                inputProps={{}}
                            />
                            {touched.position && errors.position && (
                                <FormHelperText error id="standard-weight-helper-text--register">
                                    {errors.position}
                                </FormHelperText>
                            )}
                        </FormControl>
                        <FormControl fullWidth error={Boolean(touched.description && errors.description)} sx={{ ...theme.typography.customInput }}>
                            <InputLabel htmlFor="outlined-adornment-description-register">Job Description</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-description-register"
                                type="text"
                                value={values.description}
                                name="description"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                inputProps={{}}
                            />
                            {touched.description && errors.description && (
                                <FormHelperText error id="standard-weight-helper-text--register">
                                    {errors.description}
                                </FormHelperText>
                            )}
                        </FormControl>
                        <FormControl fullWidth error={Boolean(touched.placeName && errors.placeName)} sx={{ ...theme.typography.customInput }}>
                            <InputLabel htmlFor="outlined-adornment-placeName-register">Job Location</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-placeName-register"
                                type="text"
                                value={values.placeName}
                                name="placeName"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                inputProps={{}}
                            />
                            {touched.placeName && errors.placeName && (
                                <FormHelperText error id="standard-weight-helper-text--register">
                                    {errors.placeName}
                                </FormHelperText>
                            )}
                        </FormControl>
                        <FormControl fullWidth error={Boolean(touched.industry && errors.industry)} sx={{ ...theme.typography.customInput }}>
                            <InputLabel htmlFor="outlined-adornment-industry-register">Industry</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-industry-register"
                                type="text"
                                value={values.industry}
                                name="industry"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                inputProps={{}}
                            />
                            {touched.industry && errors.industry && (
                                <FormHelperText error id="standard-weight-helper-text--register">
                                    {errors.industry}
                                </FormHelperText>
                            )}
                        </FormControl>
                        <FormControl fullWidth error={Boolean(touched.companyName && errors.companyName)} sx={{ ...theme.typography.customInput }}>
                            <InputLabel htmlFor="outlined-adornment-companyName-register">Company Name</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-companyName-register"
                                type="text"
                                value={values.companyName}
                                name="companyName"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                inputProps={{}}
                            />
                            {touched.companyName && errors.companyName && (
                                <FormHelperText error id="standard-weight-helper-text--register">
                                    {errors.companyName}
                                </FormHelperText>
                            )}
                        </FormControl>
                        <FormControl fullWidth error={Boolean(touched.companyEmail && errors.companyEmail)} sx={{ ...theme.typography.customInput }}>
                            <InputLabel htmlFor="outlined-adornment-companyEmail-register">Company Email</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-companyEmail-register"
                                type="text"
                                value={values.companyEmail}
                                name="companyEmail"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                inputProps={{}}
                            />
                            {touched.companyEmail && errors.companyEmail && (
                                <FormHelperText error id="standard-weight-helper-text--register">
                                    {errors.companyEmail}
                                </FormHelperText>
                            )}
                        </FormControl>
                      
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
                                    Create Job
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
