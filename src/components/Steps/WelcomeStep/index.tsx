import { Button, Space, Timeline } from 'antd';
import Title from 'antd/lib/typography/Title';
import React from 'react';

const WelcomeStep = () => {
  return (
    <>
      <Title level={3}>Instructions</Title>
      <Timeline>
        <Timeline.Item>Connect your XRP wallet.</Timeline.Item>
        <Timeline.Item>Prepare and upload your data as xlsx.</Timeline.Item>
        <Timeline.Item>Choose time available, settings, and run ML.</Timeline.Item>
        <Timeline.Item>See the predictive performance.</Timeline.Item>
        <Timeline.Item>
          Decide whether the purchase the full analysis report.
        </Timeline.Item>
        <Timeline.Item>Pay in XRP and download your report.</Timeline.Item>
        <Timeline.Item>
          Your reports are stored secure. Only you can download your reports. Your data is
          deleted automatically after 15 minutes.
        </Timeline.Item>
      </Timeline>
      <Space align="center">
        <Button type="primary">Cool, let&rsquo;s connect my wallet </Button>
      </Space>
    </>
  );
};

export default WelcomeStep;
