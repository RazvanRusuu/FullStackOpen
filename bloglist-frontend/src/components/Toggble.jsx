import { useState, forwardRef, useImperativeHandle, cloneElement } from 'react'
import PorpTypes from 'prop-types'

const Togglable = (props) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {cloneElement(props.children, {
          onToggleVisibility: toggleVisibility,
        })}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )
}

export default Togglable

Togglable.displayName = 'Toggable'

Togglable.propTypes = {
  buttonLabel: PorpTypes.string.isRequired,
}
