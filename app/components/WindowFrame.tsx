import React from 'react';
import { omit } from 'lodash';

type Props = {
  [prop: string]: unknown;
};

interface WindowFrameProps extends Props {
  title: string;
}

const frameContainerStyle = {
  overflow: 'hidden',
  border: '1px solid black',
};

const titleBarStyle = {
  height: 18,
  backgroundColor: '#ccc',
  borderBottom: '1px solid black',
};

const insertContainerStyles = (otherPropsIncludingStyle: Props): Props => {
  const otherProps = omit(otherPropsIncludingStyle, ['style']);
  if (
    'style' in otherPropsIncludingStyle &&
    typeof otherPropsIncludingStyle.style === 'object'
  ) {
    otherProps.style = {
      ...otherPropsIncludingStyle.style,
      ...frameContainerStyle,
    };
  } else {
    otherProps.style = frameContainerStyle;
  }
  return otherProps;
};

const WindowFrame: React.FC<WindowFrameProps> = ({
  title = 'Default Window Title',
  children,
  ...otherProps
}) => {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <div {...insertContainerStyles(otherProps)}>
      <div className="dragHandle" style={titleBarStyle}>
        {title}
      </div>
      <div>{children}</div>
    </div>
  );
};

export default WindowFrame;
