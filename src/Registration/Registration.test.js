import React from 'react';
import Registration from './Registration'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })

describe('Registration Page', () => {
    it('renders the complete page', () => {
    const wrapper = shallow(<Registration />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})