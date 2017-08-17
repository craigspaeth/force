import styled from 'styled-components'
import * as React from 'react'
import colors from 'desktop/components/stylus_lib/colors.json'
import margins from 'desktop/components/stylus_lib/margins.json'

const Nav = styled.nav`
  padding: ${margins.small}px 0;
  border-top: 1px solid ${colors['gray-lighter-color']};
  border-bottom: 1px solid ${colors['gray-lighter-color']};
  position: relative;
  margin-bottom: ${margins.medium}px;
`

const NavItem = styled.a`
  margin-right: ${margins.small}px;
  ${props => (props.i === 0 ? `color: ${colors['purple-color']}` : '')};
  text-decoration: none;
`

const CityLabel = styled.label`
  position: absolute !important;
  right: 0;
  top: 10px;
`

export default ({ featuredCities, cities }) => {
  return (
    <Nav>
      <div>
        {featuredCities.map((city, i) => (
          <NavItem href={`today/${city.slug}`} i={i}>{city.name}</NavItem>
        ))}
      </div>
      <CityLabel className='bordered-select'>
        <select>
          {cities.map(city => <option>{city.name}</option>)}
        </select>
      </CityLabel>
    </Nav>
  )
}
