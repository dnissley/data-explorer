import React, { ReactNode } from 'react';
import { omit } from 'lodash';

type Props = {
  [prop: string]: unknown;
};

type WindowControl = {
  name: string;
  icon: ReactNode;
  action: () => void;
};

interface WindowFrameProps extends Props {
  title: string;
  controls?: WindowControl[];
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
  controls = [],
  children,
  ...otherProps
}) => {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <div {...insertContainerStyles(otherProps)}>
      <div className="dragHandle" style={titleBarStyle}>
        {title}
        {controls.map((control) => {
          return (
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
            <div
              key={control.name}
              onClick={control.action}
              style={{
                float: 'right',
                cursor: 'pointer',
                marginRight: '0.1em',
              }}
            >
              {control.icon}
            </div>
          );
        })}
      </div>
      <div>{children}</div>
    </div>
  );
};

export default WindowFrame;
