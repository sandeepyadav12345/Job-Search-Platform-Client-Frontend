import React from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Button, Grid, InputAdornment, Menu, MenuItem, OutlinedInput, Pagination, Typography } from '@mui/material';
import { useQuery, gql} from '@apollo/client';
// project imports
import UserDetailsCard from 'ui-component/cards/JobDetailsCard2';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import { useDispatch } from 'store';
import { getDetailCards, filterDetailCards } from 'store/slices/user';

// assets
import { IconSearch } from '@tabler/icons';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';

// ==============================|| USER CARD STYLE 1 ||============================== //

const Header = () => {

    const JOBS = gql`
    query{
        getAllJobs{
        _id
          title
          position
          description
          placeName
          industry
          companyName
          companyEmail
          createdAt
          updatedAt
        }
      }`

    const theme = useTheme();
    const dispatch = useDispatch();
   const [users, setUsers] = React.useState([]);
   // eslint-disable-next-line no-undef
  // const { detailCards } = useSelector((state) => state.user);

    // React.useEffect(() => {
    //     setUsers(detailCards);
    // }, [detailCards]);

    React.useEffect(() => {
        dispatch(getDetailCards());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const [search, setSearch] = React.useState('');
    const handleSearch = async (event) => {
        const newString = event?.target.value;
        setSearch(newString);
        if (newString) {
            console.log(newString);
            dispatch(filterDetailCards(newString));
        } else {
            dispatch(getDetailCards());
        }
    };
    const { data, loading, error } = useQuery(JOBS);
    if (loading) return 'Loading...';
    console.log(data);
    if (error) return <pre>{error.message}</pre>

    let usersResult = <></>;
    if (data) {
        usersResult = data.getAllJobs.map((jobs) => (
            <Grid key={jobs.createdAt} item xs={12} sm={6} lg={4} xl={3}>
                <UserDetailsCard {...jobs} />
            </Grid>
        ));
    }

    return (
        <MainCard style={{paddingTop: '60px', paddingLeft:'180px', paddingRight:'180px'}}
            title={
                <Grid container alignItems="center" justifyContent="space-between" spacing={gridSpacing}>
                    <Grid item>
                        <Typography variant="h3">Jobs</Typography>
                    </Grid>
                    <Grid item>
                        <OutlinedInput
                            id="input-search-card-style1"
                            placeholder="Search"
                            value={search}
                            onChange={handleSearch}
                            startAdornment={
                                <InputAdornment position="start">
                                    <IconSearch stroke={1.5} size="16px" />
                                </InputAdornment>
                            }
                            size="small"
                        />
                    </Grid>
                </Grid>
            }
        >
            <Grid container direction="row" spacing={gridSpacing}>
                {usersResult}
                <Grid item xs={12}>
                    <Grid container justifyContent="space-between" spacing={gridSpacing}>
                        <Grid item>
                            <Pagination count={10} color="primary" />
                        </Grid>
                        <Grid item>
                            <Button
                                variant="text"
                                size="large"
                                sx={{ color: theme.palette.grey[900] }}
                                color="inherit"
                                endIcon={<ExpandMoreRoundedIcon />}
                                onClick={handleClick}
                            >
                                10 Rows
                            </Button>
                            <Menu
                                id="menu-user-card-style1"
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                                variant="selectedMenu"
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right'
                                }}
                                transformOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right'
                                }}
                            >
                                <MenuItem onClick={handleClose}> 10 Rows</MenuItem>
                                <MenuItem onClick={handleClose}> 20 Rows</MenuItem>
                                <MenuItem onClick={handleClose}> 30 Rows </MenuItem>
                            </Menu>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default Header;
