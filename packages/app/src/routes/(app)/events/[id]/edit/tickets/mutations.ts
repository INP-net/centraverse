import { graphql } from '$houdini';

export const SetEventShowRemainingPlaces = graphql(`
  mutation SetEventShowRemainingPlaces($id: LocalID!, $showRemainingPlaces: Boolean!) {
    updateEvent(id: $id, showPlacesLeft: $showRemainingPlaces) {
      ... on MutationUpdateEventSuccess {
        data {
          showPlacesLeft
        }
      }
      ...MutationErrors
    }
  }
`);

export const ChangeCapacity = graphql(`
  mutation ChangeEventGlobalCapacity($id: LocalID!, $capacity: Capacity!) {
    updateEvent(id: $id, globalCapacity: $capacity) {
      ... on MutationUpdateEventSuccess {
        data {
          globalCapacity
        }
      }
      ...MutationErrors
    }
  }
`);

export const SetEventBeneficiary = graphql(`
  mutation SetEventBeneficiary($id: LocalID!, $beneficiary: LocalID!) {
    echo(message: $beneficiary)
    setEventBeneficiary(event: $id, lydiaAccount: $beneficiary) {
      ... on MutationSetEventBeneficiarySuccess {
        data {
          beneficiary {
            id
            name
            ...PickBeneficiary
          }
        }
      }
      ...MutationErrors
    }
  }
`);

export const CreateTicket = graphql(`
  mutation CreateTicket($event: LocalID!, $shotgun: DateRangeInput!) {
    createTicket(event: $event, shotgun: $shotgun) {
      ... on MutationCreateTicketSuccess {
        data {
          id
          localID
          event {
            localID
          }
          ...List_EditEvent_Tickets_insert
        }
      }
      ...MutationErrors
    }
  }
`);

export const UnsetEventBeneficiary = graphql(`
  mutation UnsetEventBeneficiary($id: LocalID!) {
    setEventBeneficiary(event: $id, lydiaAccount: null) {
      ... on MutationSetEventBeneficiarySuccess {
        data {
          beneficiary {
            id
            name
            ...PickBeneficiary
          }
        }
      }
      ...MutationErrors
    }
  }
`);
