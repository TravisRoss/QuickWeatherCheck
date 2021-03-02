import {gql} from '@apollo/client';

//for every query created, create a variable and export it
export const getWeatherQuery = gql`
    query getCityByName($name: String!) {
        getCityByName(name: $name) {
        id
        name
        country
        coord {
            lon
            lat
        }
        weather {
            summary {
                title
                description
                icon
            }
        temperature {
            actual
            feelsLike
            min
            max
        }
        wind {
            speed
            deg
        }
        clouds {
            all
            visibility
            humidity
        }
        timestamp
        }
    }
    }
`;