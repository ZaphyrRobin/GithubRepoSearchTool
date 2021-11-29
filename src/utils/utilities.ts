import { DEFAULT_REPRO_BATCH_NUMBER } from './constants';

export const getNameOwner = (nameAndOwner: string) => {
  if (nameAndOwner.length < 1) {
    return null;
  }

  const splitted = nameAndOwner.split('/');
  if (splitted.length === 2) {
    return {
      'owner': splitted[0],
      'name': splitted[1],
    }
  } else {
    return null;
  }
};

const processCursor = (cursor: string | null) => cursor == null ? `${cursor}` : `"${cursor}"`;

export const getRepoByKeyword = (queryKeyword: string, repo_cursor: string | null) => {
  return `{
    search(query: "${queryKeyword}", type: REPOSITORY, first: ${DEFAULT_REPRO_BATCH_NUMBER}, after: ${processCursor(repo_cursor)}) {
      repositoryCount
      edges {
        cursor
        node {
          ... on Repository {
            nameWithOwner
            url
            description
            primaryLanguage {name}
            watchers (first: ${DEFAULT_REPRO_BATCH_NUMBER}) {
              nodes {
                login
              }
            }
          }
        }
      }
    }
  }`
}
