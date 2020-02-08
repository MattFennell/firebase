
import React from 'react';
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { noop } from 'lodash';
import UnauthenticatedRoute, { UnauthenticatedRouteUnconnected } from './UnauthenticatedRoute';
import { initState } from '../reducer';

configure({ adapter: new Adapter() });

const mockfirebaseStore = {
    auth: {
        email: 'email',
        uid: 'uid'
    }
};

describe('Unauthenticated Route', () => {
    it('The Unauthenticated Route component renders without crashing', () => {
        const wrapper = shallow(<UnauthenticatedRouteUnconnected
            component={noop}
        />);
        expect(() => wrapper).not.toThrow();
    });
});

describe('Unauthenticated Route connected', () => {
    const mockStore = configureMockStore([]);
    const mockStoreInitialized = mockStore({
        auth: initState,
        firebase: mockfirebaseStore
    });

    const wrapper = mount(
        <Provider store={mockStoreInitialized}>
            <Router>
                <UnauthenticatedRoute component={() => <div />} />
            </Router>
        </Provider>
    );

    expect(() => wrapper).not.toThrow();
});
