
import React from 'react';
import { noop } from 'lodash';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { BrowserRouter as Router } from 'react-router-dom';
import { shallow, mount } from '../enzyme';
import NewNavbar, { NewNavbarUnconnected } from './NewNavbar';
import { initialState as overviewInitState } from '../overview/reducer';
import { initState as authInitState } from '../auth/reducer';

const mockHistory = {
    location: {
        pathname: 'pathname'
    },
    push: noop
};

describe('Navbar', () => {
    it('The NewNavbar component renders without crashing', () => {
        const wrapper = shallow(<NewNavbarUnconnected
            history={mockHistory}
            signOut={noop}
        />);
        expect(() => wrapper).not.toThrow();
    });
});

const mockfirebaseStore = {
    auth: {
        email: 'email',
        uid: 'uid'
    },
    profile: {}
};

describe('Navbar connected', () => {
    it('Connected navbar', () => {
        const mockStore = configureMockStore([]);
        const mockStoreInitialized = mockStore({
            auth: authInitState,
            firebase: mockfirebaseStore,
            overview: overviewInitState,
            router: mockHistory
        });

        const wrapper = mount(
            <Provider store={mockStoreInitialized}>
                <Router>
                    <NewNavbar />
                </Router>
            </Provider>
        );

        expect(() => wrapper).not.toThrow();
    });
});
