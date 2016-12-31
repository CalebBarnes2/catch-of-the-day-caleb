import React from 'react';


const Header = (props) => {
  return (
    <header className="top">
      <a className="headerHref" href="/">
        <h1>Store Name</h1>
      <h3 className="tagline"><span>{props.tagline}</span></h3>
      </a>
    </header>
  )
}




export default Header;
