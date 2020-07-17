import React from 'react';
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import '../styles/modalLoading.scss';

const LoadingComponent = (delay, ...restProps) => {
    const loadingIcon = <LoadingOutlined className="spinnerStyle" spin />;
    return(
        <div className="pseudoModalStyle">
          <Spin indicator={loadingIcon} className="containerStyle" delay={delay} />
        </div>
    )
}

export default LoadingComponent;