import React from 'react';
import UserEntryList from './UserEntryList'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })

describe('Login Page', () => {
    it('renders the complete page', () => {
    const wrapper = shallow(<UserEntryList />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})