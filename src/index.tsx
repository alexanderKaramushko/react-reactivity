// @ts-nocheck

import React from 'react';
// eslint-disable-next-line @typescript-eslint/camelcase
import { unstable_createRoot } from 'react-dom';

import Posts from './Posts/Posts';

unstable_createRoot(document.getElementById('app')).render(<Posts />);
