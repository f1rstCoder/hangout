import React, { useState, useRef, useEffect } from 'react'
import '../../assets/styles/Navbar.css'
import IconDiv from './IconDiv'
import '../../assets/styles/SecondaryMenu.css'
import { setLightMode, setDarkMode } from '../../utils/Functions'

const Navbar = ({ id }) => {
  const array = [0, 1, 2, 3, 4, 5]
  const [active, setActive] = useState(null)
  const [displayDropDown, setDisplayDropDown] = useState(false)
  const newRef = useRef(null);


  const handleOutsideClick = e => {
    if (newRef.current && !newRef.current.contains(e.target))
      setDisplayDropDown(false)
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [displayDropDown]);

  const handleLogout = () => {
    localStorage.removeItem('id')
    window.location.reload()
  }

  const toggleTheme = () => {
    if (localStorage.getItem('theme') == "dark") {
      setLightMode()
    }
    else {
      setDarkMode()
    }
  }

  return (
    <div className='navbar'>
      <div className="logoDiv">
        <h1 className='hangoutName'>hangout</h1>
      </div>
      {array.map(index => {
        return (
          <>
            {index !== 4 ?
              <div
                className={`iconDiv ${active == index ? 'active' : ''}`}
                onClick={() => setActive(index)}
              >
                <IconDiv index={index} id={id} />
              </div>
              :
              <div
                className={`iconDiv dropdown ${active == index ? 'active' : ''}`}
                data-dropdown
                onClick={() => setDisplayDropDown(!displayDropDown)}
              >
                <div className="link navbarBtn" data-dropdown-button>
                  <IconDiv index={index} />
                </div>
                {displayDropDown &&
                  <div className="dropdown-menu" ref={newRef}>
                    <ul className="dropdownMenuList">
                      <li className="dropdownMenuContent" onClick={toggleTheme}>
                        Switch Theme
                      </li>
                      <li className="dropdownMenuContent" onClick={toggleTheme}>
                        Logout
                      </li>
                    </ul>
                  </div>
                }
              </div>
            }
          </>
        )
      })}
    </div>
  )
}

export default Navbar
