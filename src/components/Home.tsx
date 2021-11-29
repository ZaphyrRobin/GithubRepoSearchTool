import React, { useState } from "react";
import axios from "axios";
import Repo from './Repo';
import { Box, Button, Flex, Heading, SearchField, Spinner } from 'gestalt';
import { getRepoByKeyword } from '../utils/utilities';
import { IRepo } from '../utils/types';
import { GITHUB_GRAPHQL_URL, GITHUB_ACCESS_TOKEN } from '../utils/constants';

const Home = () => {
  const [searchVal, setSearchVal] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [results, setResults] = useState<IRepo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const searchRepos = async (keyword:string, repo_cursor:string | null, isLoadingMore:boolean = false) => {
    setIsLoading(true);
    setErrorMessage("");
    await axios.post(
      GITHUB_GRAPHQL_URL,
      {
        query: getRepoByKeyword(keyword, repo_cursor)
      },
      {
        headers:{
          'Content-Type': 'application/json',
          'Authorization':`bearer ${GITHUB_ACCESS_TOKEN}`
        }
      }
    )
    .then((response) => {
      const newResults = response?.data?.data?.search?.edges || [];
      const latestResults = isLoadingMore ? [...results, ...newResults] : newResults;
      setResults(latestResults);
      setIsLoading(false);

      if (latestResults.length === 0) {
        setErrorMessage("No searching results. Please change the search value.");
      } else {
        setErrorMessage("");
      }
    })
    .catch(() => {
      setIsLoading(false);
      setErrorMessage("Something went wrong, please try again later.");
    })
  };

  const onSearchValueChanged = (value:string) => {
    setSearchVal(value);
    if (value.length > 3) {
      searchRepos(value, null);
    } else {
      setResults([]);
      setIsLoading(false);
      setErrorMessage('Please enter at least three characters.');
    }
  }

  const onLoadingMoreButtonClick = () => {
    const repoLastCursor = results[results.length - 1].cursor;
    searchRepos(searchVal, repoLastCursor, true);
  }

  return (
    <Box margin={12}>
      <Box paddingY={2}>
        <Heading size="lg" overflow="breakWord">
          Github Repository Query Tool
        </Heading>
      </Box>
      <Box paddingY={4}>
        <Flex flex="grow">
          <Flex.Item flex="grow">
            <SearchField
              accessibilityLabel=""
              accessibilityClearButtonLabel="Clear search field"
              id="searchMessagesError"
              onChange={({value}) => onSearchValueChanged(value)}
              placeholder="Please enter repository name"
              value={searchVal}
              errorMessage={errorMessage}
            />
          </Flex.Item>
        </Flex>
      </Box>
      <Flex direction="column" gap={3}>
        {results.map((result: IRepo, index: number) => (
          <Repo data={result} key={`repo-key-{index}`} />
        ))}
      </Flex>
      <Box paddingY={4}>
        <Spinner show={isLoading} accessibilityLabel="loading spinner" />
      </Box>
      {results.length > 0 &&
        <Box paddingY={4}>
          <Button
            color="red"
            accessibilityLabel='the pagination button'
            size="lg"
            fullWidth
            text="Loading more"
            onClick={() => onLoadingMoreButtonClick()}
          />
        </Box>
      }
    </Box>
  )
}

export default Home;
