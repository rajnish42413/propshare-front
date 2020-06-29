import React, { Component } from 'react';

import { Spin } from 'antd';

export default class Loader extends Component {
  render() {
    return (
      <>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '50vh'
          }}
        >
          <Spin size="large" tip="Loading..." />
        </div>
      </>
    );
  }
}
