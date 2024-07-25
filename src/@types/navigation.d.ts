export type RootStackParamList = {
  Login: undefined
  Register: undefined
  Profile: undefined
  Appointments: undefined
  RequestedProposals: undefined
  EditServices: undefined
  EditProfile: undefined
  Tabs: undefined
  Home: undefined
  JobDetails: { id: number }
  JobList: undefined
  ServiceProviderSchedule: undefined
  ProposalsRequested: undefined
  Review: undefined
  JobContract: { id: number }
  TaskerEvaluation : { id: number }
}

export type RootTabsParamList = {
  Profile: undefined
  ProfileStack: undefined
  Home: undefined
  ReviewStack: undefined
  CreateJob: undefined
}
