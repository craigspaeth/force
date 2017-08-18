import styled from 'styled-components'
import * as React from 'react'
import { get } from 'lodash'
import sizes from 'desktop/components/stylus_lib/type_sizes.json'
import colors from 'desktop/components/stylus_lib/colors.json'
import fonts from 'desktop/components/stylus_lib/fonts.json'

const smallMargin = '20px'

const padEveryFourth = props =>
  (props.i !== 0 && (props.i + 1) % 4 === 0
    ? 'padding-right: 0'
    : `padding-right: ${smallMargin}`)

const ShowItem = styled.li`
  display: inline-block;
  vertical-align: top;
  width: 25%;
  ${padEveryFourth};
`

const Link = styled.a`
  text-decoration: none;
`

const Img = styled.div`
  display: block;
  width: 100%;
  background-image: url(${props => props.src});
  background-size: cover;
  height: 250px;
`

const DateRange = styled.p`
  color: ${colors['gray-darker-color']}
`

const PartnerName = styled.p`
  font-family: ${fonts['sans-font-stack']};
  ${sizes['avant-garde']['body']};
  text-transform: uppercase;
  letter-spacing: 1px;
`

export default (show, i) => {
  const showImage = get(show, 'images.0.thumb.url', '/images/missing_image.png')
  return (
    <ShowItem i={i}>
      <Link href={show.href}>
        <Img src={showImage} /><br />
        <PartnerName>{show.partner.name}</PartnerName>
        {show.name}<br />
        <DateRange>{show.start_at} - {show.end_at}</DateRange><br />
      </Link>
    </ShowItem>
  )
}
