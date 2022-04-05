import { resolve, sep } from 'path';

export default {
  '*.{js,ts,jsx,tsx}': 'eslint --cache --fix',
  '{*.ts,*.tsx,tsconfig.json}': () => ['yarn tsc'],
};
