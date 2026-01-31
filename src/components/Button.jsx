import React from 'react'
import styles from "./Button.module.css"
function Button({children , onClick , type , style}) {
  
  return (
    <button onClick={onClick} className={`${styles.btn} ${styles[type]}`} style={style}>{children}</button>
  )
}

export default Button