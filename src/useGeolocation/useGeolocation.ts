import { useEffect, useState } from 'react'
import { useIsMounted } from '../useIsMounted'
import { UseGeolocationReturnType } from '../types/types'

type UseGeolocationOptions = PositionOptions & {
  when?: boolean
}

function getGeoLocation (
  options: UseGeolocationOptions
): Promise<UseGeolocationReturnType> {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          const { coords } = position
          const { latitude, longitude } = coords
          resolve({
            isError: false,
            lat: latitude,
            lng: longitude,
            message: ''
          })
        },
        (error) => {
          reject({
            isError: true,
            message: error.message
          })
        },
        options
      )
    } else {
      reject({
        isError: true,
        message: 'Geolocation is not supported for this Browser/OS.'
      })
    }
  })
}

const defaultGeoLocationOptions: UseGeolocationOptions = {
  enableHighAccuracy: false,
  maximumAge: 0,
  timeout: Number.POSITIVE_INFINITY,
  when: true
}

const useGeolocation = (
  geoLocationOptions: UseGeolocationOptions = defaultGeoLocationOptions
): UseGeolocationReturnType | null => {
  const [geoObject, setGeoObject] = useState<UseGeolocationReturnType | null>(
    null
  )

  const { when, enableHighAccuracy, timeout, maximumAge } = geoLocationOptions
  const isMounted = useIsMounted()

  useEffect(() => {
    async function getGeoCode () {
      try {
        const value = await getGeoLocation({
          enableHighAccuracy,
          maximumAge,
          timeout,
          when
        })
        if (isMounted()) {
          setGeoObject(value)
        }
      } catch (error) {
        if (isMounted()) {
          setGeoObject(error as UseGeolocationReturnType)
        }
      }
    }
    if (when) {
      void getGeoCode()
    }
  }, [when, enableHighAccuracy, timeout, maximumAge, isMounted])

  return geoObject
}

export default useGeolocation
