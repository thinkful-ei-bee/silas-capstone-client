import React from 'react';
import Nav from './Nav'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })

describe('Nav', () => {
    it('renders the complete page', () => {
    const wrapper = shallow(<Nav />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})