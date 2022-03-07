import { Button, PageHeader } from 'antd';
import Logo from 'assets/logo.png';
import { Wizard } from 'components/Wizard';
import { connectWallet, useAccountContext } from 'contexts/accountContext';
import React, { useState } from 'react';
import { formatAccount } from 'utils/common';
import { DataOverview } from 'views/Steps/DataOverview';
import { Download } from 'views/Steps/Download';
import { TargetSelection } from 'views/Steps/TargetSelection';
import UploadData from 'views/Steps/UploadData';
import WelcomeStep from 'views/Steps/WelcomeStep';

export type RowType = { [k: string]: any }[];
export type HeadersType =
  | {
      title: string;
      dataIndex: string;
      key: string;
    }[]
  | undefined;

const Main = () => {
  const [accountState, accountDispatch] = useAccountContext();
  const [data, setData] = useState<RowType>([]);
  const [headers, setHeaders] = useState<HeadersType>([]);

  const handleUpload = (parsedData: [][]) => {
    const keys = parsedData[0];
    const mappedData = parsedData.map((data) => {
      let objectMap = {};
      keys.forEach((element: string, i) => {
        objectMap = {
          ...objectMap,
          [element]: data[i],
        };
      });
      return objectMap;
    });

    const headers = mappedData.shift();
    const headersFormatted =
      headers &&
      Object.keys(headers).map((header) => ({
        title: header,
        dataIndex: header,
        key: header,
      }));
    setData(mappedData);
    setHeaders(headersFormatted);
  };

  const steps = [
    {
      title: 'Connect Wallet',
      content: <WelcomeStep />,
    },
    {
      title: 'Upload Data',
      content: <UploadData onUpload={handleUpload} />,
    },
    {
      title: 'See Data',
      content: <DataOverview data={data} headers={headers} />,
    },
    {
      title: 'Select Data Type',
      content: <TargetSelection />,
    },
    {
      title: 'Results',
      content: <Download />,
    },
    {
      title: 'Download',
      content: <Download />,
    },
  ];
  return (
    <>
      <PageHeader
        ghost={false}
        avatar={{
          src: Logo,
        }}
        title="AutoMLNow"
        subTitle="Automate your ML, get your results as NFT"
        extra={
          <Button
            loading={accountState.isLoading}
            type="primary"
            onClick={() =>
              accountState.account?.address ? undefined : connectWallet(accountDispatch)
            }>
            {formatAccount(accountState.account?.address) || 'Connect Wallet'}
          </Button>
        }></PageHeader>
      <div className="body">
        {/* TODO: add is next disabled connection */}
        <Wizard steps={steps} isNextDisabled={false} />
      </div>
    </>
  );
};

export default Main;
