import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Navbar, Nav, NavItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

class Header extends Component {
  render() {
    const { categories } = this.props
    return (
      <div className='app'>
        <Navbar inverse collapseOnSelect={true}>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to='/'>Readable</Link>
            </Navbar.Brand>
            {categories && <Navbar.Toggle />}
          </Navbar.Header>
          {categories && (
            <Navbar.Collapse>
              <Nav pullRight>
                {categories.map(c => (
                  <LinkContainer exact key={c.path} to={`/${c.path}`}>
                    <NavItem>{c.name}</NavItem>
                  </LinkContainer>
                ))}
              </Nav>
            </Navbar.Collapse>
          )}
        </Navbar>
      </div>
    )
  }
}

export default Header