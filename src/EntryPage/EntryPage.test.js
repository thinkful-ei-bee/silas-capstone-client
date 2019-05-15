import React from 'react';
import EntryPage from './EntryPage'
import { shallow, mount } from 'enzyme'
import toJson from 'enzyme-to-json'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })

describe('Entry Page', () => {

  it('renders the complete page', () => {
    const wrapper = shallow(<EntryPage />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it('initially renders no quotes', () => {
    const wrapper = mount(<EntryPage />)

    wrapper.setProps({ name: 'Moe' })

    expect(wrapper.props('name')).toEqual({ name: 'Moe' })
    expect(wrapper.containsMatchingElement(
      <button type='submit' id='save-button'>Save</button>
    )).toBeTruthy()
    expect(wrapper.find('#save-button').text()).toEqual('Save')
    expect(wrapper.find('.quote-paragraph').text()).toEqual('')
    expect(wrapper.find('.quote-author').text()).toEqual('')
  })
})