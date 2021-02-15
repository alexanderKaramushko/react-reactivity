import React from 'react';
import { render } from 'react-dom';

import ClickCounter from './ClickCounter';

/**
 * @description
 * React использует reference, чтобы создать новый instance компонента
 */
render(<ClickCounter />, document.getElementById('app'));
