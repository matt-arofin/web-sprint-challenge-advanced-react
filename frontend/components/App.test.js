import React from 'react';
import AppFunctional from './AppFunctional'
import { render, fireEvent, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'


// Write your tests here
// test('sanity', () => {
//   expect(true).toBe(true)
// })



// Write 5 additional tests to confirm the elements being rendered and the state changes taking place in one of the two components
describe('Additional test suite', () => {
  // beforeEach(() => {
  //   render(<AppFunctional/>)
  //   const upButton = screen.getByText('UP')
  //   const downButton = screen.getByText('DOWN')
  //   const leftButton = screen.getByText('LEFT')
  //   const rightButton = screen.getByText('RIGHT')
  //   const resetButton = screen.getByText('reset')
  //   const submitButton =  screen.getByText('submit')
  // })

  test('page renders without errors', () => {
    render(<AppFunctional />)

    expect('Welcome to the GRID').toBeInTheDocument
    expect('Coordinates (2, 2)').toBeInTheDocument
    expect('You moved 0 times').toBeInTheDocument
  })
  
  test('page does not allow invalid moves', () => {
    render(<AppFunctional />)

    const upButton = screen.getByText('UP')
    // const invalidMove = screen.findByText(/you can't go up/i)
    // const moveCount = screen.findByText(/you moved one time/i)

    userEvent.click(upButton)
    userEvent.click(upButton)
    expect(/you can't go up/i).toBeInTheDocument
    expect(/you moved one time/i).toBeInTheDocument
  })

  test('invalid move message disappears on valid move', () => {
    render(<AppFunctional />)

    const upButton = screen.getByText('UP')
    const rightButton = screen.getByText('RIGHT')

    userEvent.click(upButton)
    userEvent.click(upButton)
    userEvent.click(rightButton)
    
    expect(/you can't go up/i).not.toBeInTheDocument
    expect(/you moved two times/i).toBeInTheDocument
  })

  test('submit button only clears email input state', async () => {
    render(<AppFunctional />)

    const emailField = document.getElementById('email')
    // fireEvent.change(emailField, {target: {value: 'place@holder.come'}})

    const downButton = screen.getByText('DOWN')
    const leftButton = screen.getByText('LEFT')
    const rightButton = screen.getByText('RIGHT')
    const submitButton = screen.getByTestId('submit')
    const emailInput = screen.getByPlaceholderText('type email')

    userEvent.click(rightButton)
    userEvent.click(downButton)
    userEvent.click(leftButton)
    userEvent.type(emailInput, 'place@holder.com')
    expect(emailInput).toHaveTextContent
    userEvent.click(submitButton)


    // await screen.findByText(/place win/i, {exact: false}, {timeout: 100})
    expect(/place win #76/i).toBeInTheDocument
    expect(/coordinates (2, 3)/i).toBeInTheDocument
    expect(/you have moved 3 times/i).toBeInTheDocument
    expect(emailInput).toBeFalsy
  })

  test('reset button clears all state', async () => {
    render(<AppFunctional />)

    const downButton = screen.getByText('DOWN')
    const leftButton = screen.getByText('LEFT')
    const rightButton = screen.getByText('RIGHT')
    const resetButton = screen.getByText('reset')
    const emailInput = screen.getByPlaceholderText('type email')

    userEvent.type(emailInput, 'place@holder.com')
    userEvent.click(rightButton)
    userEvent.click(downButton)
    userEvent.click(leftButton)
    userEvent.click(leftButton)
    userEvent.click(resetButton)

    // await screen.findByText(/place win #29/i, {exact: false}, {timeout: 100})
    expect(emailInput).toBeFalsy
    expect(/coordinates (2, 2)/i).toBeInTheDocument
    expect(/you moved 0 times/i).toBeInTheDocument
  })
})