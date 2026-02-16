import React from 'react'

// --- Should PASS (no violations) ---

export function AccessibleForm() {
  return (
    <form>
      <label htmlFor="email">Email</label>
      <input id="email" type="email" />
      <button type="submit">Send</button>
    </form>
  )
}

export function AccessibleImage() {
  return <img src="photo.jpg" alt="A sunset over the ocean" />
}

// --- Should FAIL (intentional violations) ---

export function MissingImageAlt() {
  return <img src="photo.jpg" />
}

export function EmptyButton() {
  return <button></button>
}

export function MissingFormLabel() {
  return <input type="text" />
}
