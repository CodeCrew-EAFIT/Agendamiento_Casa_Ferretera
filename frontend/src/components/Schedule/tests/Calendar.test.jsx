import React from 'react'
import Calendar from '../Calendar'
import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'

describe('Calendar Component', () => {
  const formData = {
    date: '2024-04-17',
    startTime: '10:00 AM',
    endTime: '11:00 AM'
  }

  beforeEach(() => {
    render(<Calendar formData={formData} />)
  })

  it('should display the correct formatted day', () => {
    expect(screen.getByText('Miércoles 17')).toBeDefined()
  })

  it('should show the hours', () => {
    // Test the AM hours
    for (let i = 7; i < 13; i++) {
      expect(screen.getByText(i)).toBeDefined()
    }

    // Test the PM hours
    for (let i = 1; i < 7; i++) {
      expect(screen.getByText(i)).toBeDefined()
    }
  })
})
