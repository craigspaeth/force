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
    const [
      { partner_shows: partnerShows },
      { body: cities },
      { body: featuredCities }
    ] = await Promise.all([
      metaphysics({ query: ShowQuery() }),
      request.get(`${sd.GEODATA_URL}/partner-cities/cities.json`),
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
        featuredCities
      }
    })

    res.send(layout)
  } catch (error) {
    next(error)
  }
}

function ShowQuery () {
  return `{
    partner_shows(
      near: {
        lat: 40.73
        lng: -73.9
        max_distance: 50
      }
      status: CURRENT
      size: 20,
      sort: END_AT_ASC
    ) {
      id
      name
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
