import { gql } from 'apollo-angular';

export const GET_CHARACTERS = gql`
  query Characters($filter: FilterCharacter, $page: Int) {
    characters(filter: $filter, page: $page) {
      results {
        id
        name
        image
        gender
        status
      }
    }
  }
`;

export const GET_CHARACTER = gql`
  query Character($characterId: ID!) {
    character(id: $characterId) {
      id
      name
      image
      gender
      species
      status
      episode {
        id
        name
        episode
      }
    }
  }
`;
