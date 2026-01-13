import React from 'react'

/**
 * Common form patterns
 */

export function LoginForm() {
  return (
    <form>
      <label htmlFor="email">Email</label>
      <input id="email" type="email" required />
      
      <label htmlFor="password">Password</label>
      <input id="password" type="password" required />
      
      <button type="submit">Login</button>
    </form>
  )
}

export function ContactForm() {
  return (
    <form>
      <fieldset>
        <legend>Contact Information</legend>
        
        <label htmlFor="fullname">Full Name</label>
        <input id="fullname" type="text" />
        
        <label htmlFor="message">Message</label>
        <textarea id="message" rows={5} />
      </fieldset>
      
      <button type="submit">Send</button>
    </form>
  )
}

export function SearchForm() {
  return (
    <form role="search">
      <input type="search" aria-label="Search" placeholder="Search..." />
      <button type="submit" aria-label="Submit search">🔍</button>
    </form>
  )
}

