// FIXME: https://github.com/testing-library/jest-dom/issues/427

import React from 'react'

import Component from '../src/Component'
import { fireEvent, render } from './test-utils'

describe('Component', () => {
  it('should render', () => {
    const { getByText } = render(<Component />)
    expect(getByText('Count is 0')).toBeInTheDocument()
  })

  it('should increment', async () => {
    const { getByText } = render(<Component />)

    await fireEvent.click(getByText('Increment'))

    expect(getByText('Count is 1')).toBeInTheDocument()
  })

  it('should decrement', async () => {
    const { getByText } = render(<Component />)

    await fireEvent.click(getByText('Decrement'))

    expect(getByText('Count is -1')).toBeInTheDocument()
  })

  it('should reset', async () => {
    const { getByText } = render(<Component />)

    await fireEvent.click(getByText('Decrement'))
    expect(getByText('Count is -1')).toBeInTheDocument()

    await fireEvent.click(getByText('Reset'))
    expect(getByText('Count is 0')).toBeInTheDocument()
  })
})
