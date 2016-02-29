module.exports = """
  fragment artwork on Artwork {
    id
    _id
    href
    title
    date
    images {
      id
      image_url: url(version: ["tall"])
      image_versions: versions
      placeholder: resized(width: 30, height: 30, version: "tall") {
        image_url: url
      }
    }
    artists {
      id
      name
      href
      public
    }
    cultural_maker
    medium
    dimensions {
      in
      cm
    }
    image_rights
    sale_message
    is_for_sale
    is_contactable
    partner {
      name
      href
      locations {
        city
        phone
      }
    }
    edition_of
    edition_sets {
      edition_of
      price
      dimensions {
        in
        cm
      }
    }
  }
"""
