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
  ${props => (props.highlighted ? `color: ${colors['purple-color']}` : '')};
  text-decoration: none;
`

const CityLabel = styled.label`
  position: absolute !important;
  right: 0;
  top: 10px;
`

export default class App extends React.Component {
  changeCity (event) {
    const slug = event.target.value
    const selectedCity = this.props.cities.filter(city => city.slug === slug)[0]
    window.location.assign(`/today/${selectedCity.slug}`)
  }
  render () {
    const { featuredCities, cities, currentCity } = this.props
    return (
      <Nav>
        <div>
          {featuredCities.map((city, i) => (
            <NavItem
              href={`/today/${city.slug}`}
              i={i}
              highlighted={currentCity.slug === city.slug}
            >
              {city.name}
            </NavItem>
          ))}
        </div>
        <CityLabel className='bordered-select'>
          <select onChange={this.changeCity.bind(this)}>
            {cities.map(city => <option value={city.slug}>{city.name}</option>)}
          </select>
        </CityLabel>
      </Nav>
    )
  }
}
