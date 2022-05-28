import { extendTheme } from '@chakra-ui/react';
import { typography } from '@/theme/typography';
import components from './components';

export const theme = extendTheme({
  ...typography,
  styles: {
    global: {
      html: {
        height: '100%',
      },
      body: {
        height: '100%',
      },
      main: {
        height: '100%',
      },
    },
  },
  components,
});
