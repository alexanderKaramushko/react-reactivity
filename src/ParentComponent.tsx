import React, { createElement, FC, ReactElement, useEffect, useState } from 'react';

interface Props {
  incomingProp: string;
}

const ChildComponent: FC<Props> = ({ incomingProp }): ReactElement => {
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log('mounted');

    return (): void => {
      // eslint-disable-next-line no-console
      console.log('unmounted');
    };
  }, []);

  return <div>{incomingProp}</div>;
};

const ParentComponent: FC = (): ReactElement => {
  const [componentType, setComponentType] = useState('div');
  const [componentProp, setComponentProp] = useState('Alex');

  function changeType(): void {
    setComponentType('span');
  }

  function changeProp(): void {
    setComponentProp('John');
  }

  return (
    <>
      <button type="button" onClick={changeType}>Change type</button>
      <button type="button" onClick={changeProp}>Change prop</button>

      {createElement(componentType, null, <ChildComponent incomingProp={componentProp} />)}
    </>
  );
};

export default ParentComponent;
