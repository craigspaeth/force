import styled from 'styled-components'
import * as React from 'react'
import sizes from 'desktop/components/stylus_lib/type_sizes.json'
import ShowItem from './ShowItem.js'
import EventItem from './EventItem.js'
import Nav from './Nav.js'

const smallMargin = '20px'

const Header = styled.h2`
  ${sizes['garamond']['l-headline']};
  margin-bottom: ${smallMargin};
`

export default props => {
  const partnerShowsList = props.partnerShows
    .filter(show => show.images.length > 0)
    .map(ShowItem)
  const eventsList = props.partnerShows
    .filter(show => show.events.length > 0)
    .map(show => <EventItem event={show.events[0]} show={show} />)
  return (
    <div id='today-page' className='main-layout-container'>
      <br />
      <Header>Artsy Today</Header>
      <Nav featuredCities={props.featuredCities} cities={props.cities} />
      <Header>Shows</Header>
      <ul>{partnerShowsList}</ul>
      <Header>Events</Header>
      <ul>{eventsList}</ul>
    </div>
  )
}
