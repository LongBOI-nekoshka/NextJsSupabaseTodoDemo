export const dynamic = 'force-dynamic';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import Theme from "./components/Theme";
import { Box } from '@mui/material';


export default async function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <body>
      <AppRouterCacheProvider>
          <Theme>
            <Box sx={{ width: '100%' }}>
              {children}
            </Box>
          </Theme>
      </AppRouterCacheProvider>
      </body>
    </html>
  );
}