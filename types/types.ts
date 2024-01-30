export interface TrafficData {
  count: number
  uniques: number
  views: Array<{ timestamp: string; count: number; uniques: number }>
}

export interface GithubRepositoryDTO {
  fork: boolean
  name: string
  private: boolean
  id: number
}

export interface RepositoryViewModel {
  name: string
  isFork: boolean
  isPrivate: boolean
  id: number
  trafficData: TrafficData
}
