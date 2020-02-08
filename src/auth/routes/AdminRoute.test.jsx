
import React from 'react';
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { noop } from 'lodash';
import AdminRoute, { AdminRouteUnconnected } from './AdminRoute';
import { initState } from '../reducer';

configure({ adapter: new Adapter() });

const mockfirebaseStore = {
    auth: {
        email: 'email',
        uid: 'uid'
    }
};

describe('Admin Route', () => {
    it('The Admin Route component renders without crashing', () => {
        const wrapper = shallow(<AdminRouteUnconnected component={noop} />);
        expect(() => wrapper).not.toThrow();
    });
});


describe('Admin Route connected', () => {
    const mockStore = configureMockStore([]);
    const mockStoreInitialized = mockStore({
        auth: initState,
        firebase: mockfirebaseStore
    });

    const wrapper = mount(
        <Provider store={mockStoreInitialized}>
            <Router>
                <AdminRoute component={noop} />
            </Router>
        </Provider>
    );

    expect(() => wrapper).not.toThrow();
});
