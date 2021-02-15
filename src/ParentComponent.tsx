import React, { FC, ReactElement, useEffect, useState } from 'react';

interface ChildComponentProps {
  name: string;
}

const ChildComponent: FC<ChildComponentProps> = ({ name }): ReactElement => {
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log(`mounted ${name}`);

    return (): void => {
      // eslint-disable-next-line no-console
      console.log(`unmounted ${name}`);
    };
  }, [name]);

  return (
    <li>
      {name}
    </li>
  );
};

const ParentComponent = (): ReactElement => {
  const [names, setName] = useState(['first', 'second']);

  function appendNewName(): void {
    setName((prevNames) => ['new', ...prevNames]);
  }

  function renderChildComponentsWithoutKeys(): ReactElement[] {
    return names.map((name) => <ChildComponent name={name} />);
  }

  function renderChildComponentsWithKeys(): ReactElement[] {
    return names.map((name) => <ChildComponent key={name} name={name} />);
  }

  return (
    <>
      <button type="button" onClick={appendNewName}>Добавить новое имя</button>
      <ul>
        {renderChildComponentsWithoutKeys()}
        {/* {renderChildComponentsWithKeys()} */}
      </ul>
    </>
  );
};

export default ParentComponent;
