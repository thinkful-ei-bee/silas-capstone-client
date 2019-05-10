import React from 'react';
import EntryPage from './EntryPage'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })

describe('Entry Page', () => {
    it('renders the complete page', () => {
    const wrapper = shallow(<EntryPage />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})