import React, { useState } from "react";
import { Link, Flex, Module, TapArea, Text } from 'gestalt';
import { getNameOwner } from '../utils/utilities';
import { IRepo, IWatcher } from '../utils/types';

interface IRepoProps {
  data: IRepo;
}

const Repo = ({ data }: IRepoProps) => {
  const [showDetail, setShowDetail] = useState<boolean>(false);

  const repoInfo = data.node;
  const watchers = repoInfo.watchers?.nodes || [];

  // Parsing name and owner
  const nameOwnerParsingResult = getNameOwner(repoInfo.nameWithOwner || '');
  let owner = "";
  let name = "";
  if (nameOwnerParsingResult) {
    owner = nameOwnerParsingResult['owner'];
    name = nameOwnerParsingResult['name'];
  }

  const onClickShowDetail = () => {
    setShowDetail(!showDetail);
  }

  const renderSubSection = (title:string, value:string) => (
    <Flex direction="row" gap={1}>
      <Text size="md" weight="bold">{title}:</Text>
      <Text size="md" overflow="breakWord">{value}</Text>
    </Flex>
  );

  if (!Boolean(name)) {
    return null;
  }

  return (
    <TapArea
      rounding={2}
      onTap={() => onClickShowDetail()}
    >
      {showDetail ?
        <Module title={name} id={data.cursor || name}>
          <Flex direction="column" gap={1}>
            <Link
              target="blank"
              accessibilityLabel="visit the repository link"
              href={repoInfo.url}
              onClick={({ event }) => {
                // Prevent the click event messes up with show detail toggling.
                event.stopPropagation();
              }}
            >
              <Text color="blue">
                {repoInfo.url}
              </Text>
            </Link>
            {renderSubSection("Owner", owner)}
            {renderSubSection("Language", repoInfo.primaryLanguage?.name || "")}
            {renderSubSection("Description", repoInfo.description)}
            <Text size="md" weight="bold">Watchers:</Text>
            {watchers.map((watcher: IWatcher, index: number) =>
              <Text size="md" key={`watcher-key-{index}`}>{watcher.login}</Text>
            )}
          </Flex>
        </Module> :
        <Module title={name} id={data.cursor || name}>
          {renderSubSection("Owner", owner)}
        </Module>
      }
    </TapArea>
  );
}

export default Repo;
