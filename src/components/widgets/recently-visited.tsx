import {
  Text,
  TextContent,
  TextVariants,
} from '@patternfly/react-core/dist/dynamic/components/Text';

import { Gallery } from '@patternfly/react-core/dist/dynamic/layouts/Gallery';

import React, { Fragment } from 'react';
import { useLastVisited } from '@ausuliv/chrome';
import useChrome from '@ausuliv/frontend-components/useChrome';
import { Link } from 'react-router-dom';
import './recently-visited.scss';

const LinkWrapper = ({
  pathname,
  title,
}: {
  pathname: string;
  title: string;
}) => {
  const { updateDocumentTitle } = useChrome();
  return (
    <Link onClick={() => updateDocumentTitle(title)} to={pathname}>
      {title}
    </Link>
  );
};

const RecentlyVisited = () => {
  const lastVisited = useLastVisited();
  const lastVisitedData = lastVisited.slice(0, 10);
  return (
    <Gallery hasGutter className="widget-recently-visited pf-v6-u-m-md">
      {lastVisitedData.map(({ bundle, pathname, title }, index) => (
        <Fragment key={index}>
          <TextContent>
            <LinkWrapper title={title} pathname={pathname} />
            <Text component={TextVariants.small}>{bundle}</Text>
          </TextContent>
        </Fragment>
      ))}
    </Gallery>
  );
};

export default RecentlyVisited;
