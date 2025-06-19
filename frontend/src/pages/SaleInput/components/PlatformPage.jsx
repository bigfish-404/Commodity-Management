// import React, { useEffect, useState } from 'react';
// import PlatformSelector from './PlatformSelector';
// import SalesInputTable from './SalesInputTable';
// import { fetchChannelMaps } from '../../../services/salesInputService';

// export default function PlatformPage() {
//   const [platform, setPlatform] = useState('');
//   const [channelMap, setChannelMap] = useState({});
//   const [displayMap, setDisplayMap] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(false);

//   useEffect(() => {
//     const loadChannels = async () => {
//       try {
//         const { channelMap, displayMap } = await fetchChannelMaps();

//         setChannelMap(channelMap);
//         setDisplayMap(displayMap);

//         const firstPlatform = Object.keys(channelMap)[0];
//         if (firstPlatform) {
//           setPlatform(firstPlatform);
//         } else {
//           throw new Error("No platform found in channelMap");
//         }
//       } catch (e) {
//         console.error('❌ チャネル取得エラー:', e);
//         setError(true);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadChannels();
//   }, []);

//   const channelId = channelMap[platform];

//   console.log("🚀 [PlatformPage] platform:", platform);
//   console.log("🚀 [PlatformPage] channelId:", channelId);

//   if (loading) return <div>チャネル情報を読み込み中...</div>;
//   if (error || !platform || !channelId) {
//     return <div>チャネル情報の取得に失敗しました。</div>;
//   }

//   return (
//     <div>
//       <PlatformSelector
//         platform={platform}
//         setPlatform={setPlatform}
//         displayMap={displayMap}
//       />

//       <SalesInputTable
//         platform={platform}
//         channelId={channelId}
//       />
//     </div>
//   );
// }
