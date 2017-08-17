import styled from 'styled-components'
import * as React from 'react'
import sizes from 'desktop/components/stylus_lib/type_sizes.json'
import colors from 'desktop/components/stylus_lib/colors.json'
import fonts from 'desktop/components/stylus_lib/fonts.json'
import margins from 'desktop/components/stylus_lib/margins.json'
import { truncate } from 'lodash'

const padEveryFourth = props =>
  (props.i !== 0 && (props.i + 1) % 4 === 0
    ? 'padding-right: 0'
    : `padding-right: ${margins.small}px`)

const EventItem = styled.li`
  display: inline-block;
  vertical-align: top;
  width: 25%;
  margin-bottom: ${margins.medium}px;
  ${padEveryFourth}
`

const DateRange = styled.p`
  color: black;
`

const EventName = styled.p`
  font-family: ${fonts['sans-font-stack']};
  ${sizes['avant-garde']['body']};
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 10px;
`

const Description = styled.p`
  color: ${colors['gray-darker-color']}
`

const Subtitle = styled.p`
  color: ${colors['gray-darker-color']}
`

export default ({ event, show }, i) => {
  return (
    <EventItem i={i}>
      <EventName>{show.partner.name}</EventName>
      <p>{show.name}</p>
      <Subtitle>{event.title || event.event_type}</Subtitle>
      <DateRange>{event.start_at}</DateRange><br />
      <Description>{truncate(event.description, { length: 120 })}</Description>
    </EventItem>
  )
}
