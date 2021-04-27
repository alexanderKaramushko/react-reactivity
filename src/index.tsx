/* eslint-disable @typescript-eslint/camelcase */

import React from 'react';

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import { unstable_createRoot } from 'react-dom';

import Posts from './Posts/Posts';

unstable_createRoot(document.getElementById('app')).render(<Posts />);
