"use client"

import React from 'react';
import { DefaultSeo } from 'next-seo';

const DefaultSeoComponent: React.FC = () => {
  return (
    <DefaultSeo
      title="Lol"
      description="Your default description"
      openGraph={{
        type: 'website',
        url: 'https://example.com',
        site_name: 'Your Site Name',
        images: [{ url: '/logo/LogoJama.png', alt: 'Your image alt text' }],
      }}
    />
  );
};

export default DefaultSeoComponent;
