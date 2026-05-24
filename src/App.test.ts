import { render } from '@testing-library/react';
import React from 'react';
import App from './App';

test('renders app without crashing', () => {
  const { container } = render(React.createElement(App));
  expect(container).toBeTruthy();
});
