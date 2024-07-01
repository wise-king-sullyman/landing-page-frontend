/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react';
import type { AxiosRequestConfig } from 'axios';
import { Table, Tbody, Td, Th, Thead, Tr } from '@patternfly/react-table';

type CreateAxiosRequest<T = any> = (
  service: string,
  config: AxiosRequestConfig
) => Promise<T>;

type FetchData = (createAsyncRequest: CreateAxiosRequest) => Promise<any>;

export const fetchData: FetchData = async (createAsyncRequest) => {
  const requestGenerated = createAsyncRequest('chrome-service', {
    method: 'GET',
    url: '/api/chrome-service/v1/static/beta/stage/services/services-generated.json',
  });
  const requestStatic = createAsyncRequest('chrome-service', {
    method: 'GET',
    url: '/api/chrome-service/v1/static/beta/stage/services/services.json',
  });

  const requestWithAuth = createAsyncRequest('chrome-service', {
    method: 'GET',
    url: '/api/chrome-service/v1/user',
  });

  const data = await Promise.all([
    requestGenerated,
    requestStatic,
    requestWithAuth,
  ]);
  return data;
};

type AsyncState<T = any> = {
  data: T;
};

const PdfEntry = ({
  asyncData,
}: {
  asyncData: AsyncState<{ description: string }[][]>;
}) => {
  const { data } = asyncData;

  return (
    <>
      <h1>Services</h1>
      <div className="pf-v6-u-m-xl">
        <Table>
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Description</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.slice(0, 2).map((service, i) =>
              service.map((row, h) => (
                <Tr key={`${i}-${h}`}>
                  {/* @ts-ignore */}
                  <Td>{row?.id}</Td>
                  <Td>{row.description}</Td>
                </Tr>
              ))
            )}
          </Tbody>
        </Table>
        <div>
          <h1>user data?!</h1>
          <pre>{JSON.stringify(data[2], null, 2)}</pre>
        </div>
      </div>
    </>
  );
};

export default PdfEntry;
