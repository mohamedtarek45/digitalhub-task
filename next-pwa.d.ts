// types/next-pwa.d.ts
declare module 'next-pwa' {
  import { NextConfig } from 'next';
  
  function withPWA(config: {
    dest: string;
    register?: boolean;
    skipWaiting?: boolean;
    disable?: boolean;
    cacheOnFrontEndNav?: boolean;
    reloadOnOnline?: boolean;
    swcMinify?: boolean;
    workboxOptions?: any;
    fallbacks?: any;
    runtimeCaching?: any[];
    buildExcludes?: any[];
    publicExcludes?: string[];
    dynamicStartUrl?: boolean;
    dynamicStartUrlRedirect?: string;
  }): (nextConfig: NextConfig) => NextConfig;
  
  export default withPWA;
}