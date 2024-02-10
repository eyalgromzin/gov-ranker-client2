import React, { useState } from 'react';
import { crawlYnet } from '../apis/articleAPi'

interface crawlerButtonProps {
  url: string
}

const CrawlerButton: React.FC<crawlerButtonProps> = ({ url }) => {
  return (
    <button onClick={() => crawlYnet()} style={{padding: '10px', backgroundColor: 'azure', border: 'solid', borderRadius: '10px'}}>
      crawl ynet!
    </button>
  );
};

export default CrawlerButton;
