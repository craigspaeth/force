import App from 'desktop/apps/today/components/App'
import {
  renderReactLayout
} from 'desktop/components/react/utils/renderReactLayout'
import metaphysics from 'lib/metaphysics.coffee'
import request from 'superagent'
import { data as sd } from 'sharify'

export async function index (req, res, next) {
  try {
    // TODO: Move cities JSON to Metaphysics
    const { body: cities } = await request.get(
      `${sd.GEODATA_URL}/partner-cities/cities.json`
    )
    const currentCity = cities.filter(
      city => city.slug === (req.params.citySlug || 'new-york-ny-usa')
    )[0]
    const [
      { partner_shows: partnerShows },
      { body: featuredCities }
    ] = await Promise.all([
      metaphysics({ query: ShowQuery(currentCity) }),
      request.get(`${sd.GEODATA_URL}/partner-cities/featured-cities.json`)
    ])
    const layout = renderReactLayout({
      basePath: req.app.get('views'),
      blocks: {
        head: 'meta.jade',
        body: App
      },
      locals: {
        ...res.locals,
        assetPackage: 'partners'
      },
      data: {
        partnerShows,
        cities,
        featuredCities,
        currentCity
      }
    })

    res.send(layout)
  } catch (error) {
    next(error)
  }
}

function ShowQuery (city) {
  return `{
    partner_shows(
      near: {
        lat: ${city.coords[0]}
        lng: ${city.coords[1]}
        max_distance: 50
      }
      status: CURRENT
      size: 20,
      sort: END_AT_ASC
    ) {
      id
      name
      href
      start_at(format: "MMM DD")
      end_at(format: "MMM DD")
      partner {
        type
        name
      }
      images(size: 1) {
        thumb: cropped(width: 300, height: 250) {
          url
        }
      }
      events {
        start_at(format: "dddd, MMMM Do, h:mm a")
        title
        description
        event_type
      }
    }
  }`
}
