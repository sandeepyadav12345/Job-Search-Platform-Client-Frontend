// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { IconUserCheck, IconBasket, IconMessages, IconLayoutKanban, IconMail, IconCalendar, IconNfc } from '@tabler/icons';

// constant
const icons = {
    IconUserCheck,
    IconBasket,
    IconMessages,
    IconLayoutKanban,
    IconMail,
    IconCalendar,
    IconNfc
};

// ==============================|| APPLICATION MENU ITEMS ||============================== //

const application = {
    id: 'application',
    title: <FormattedMessage id="application" />,
    type: 'group',
    children: [
        {
            id: 'users',
            title: <FormattedMessage id="users" />,
            type: 'collapse',
            icon: icons.IconUserCheck,
            children: [
   
                {
                    id: 'user-list',
                    title: 'Users List',
                    type: 'collapse',
                    children: [
                        {
                            id: 'card1',
                            title: (
                                <>
                                 Users
                                </>
                            ),
                            type: 'item',
                            url: '/user/card/card1'
                        },
                 
                    ]
                },
   
            ]
        },

        {
            id: 'jobs',
            title: <FormattedMessage id="jobs" />,
            type: 'collapse',
            icon: icons.IconUserCheck,
            children: [
   
                {
                    id: 'job-create',
                    title: 'Create Jobs',
                    type: 'collapse',
                    children: [
                        {
                            id: 'jobcreate',
                            title: (
                                <>
                                 Create New Job
                                </>
                            ),
                            type: 'item',
                            url: 'forms/layouts/sticky-action-bar'
                        },
                 
                    ]
                },
                {
                    id: 'job-list',
                    title: 'Job Listings',
                    type: 'collapse',
                    children: [
                        {
                            id: 'joblistings',
                            title: (
                                <>
                                 List of Jobs
                                </>
                            ),
                            type: 'item',
                            url: '/user/card/card4'
                        },
                        
              
                 
                    ]
                },

   
            ]
        },
       
    ]
};

export default application;
