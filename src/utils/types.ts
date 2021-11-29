export interface IWatcher {
  login: string
}

export interface IRepoDetail {
  description: string;
  url: string;
  nameWithOwner: string;
  primaryLanguage: {
    name: string;
  };
  watchers: {
    nodes: IWatcher[];
  };
}

export interface IRepo {
  cursor: string | null;
  node: IRepoDetail;
}
