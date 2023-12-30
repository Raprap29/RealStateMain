import dynamic from "next/dynamic";

const MapJamaRealty = dynamic(() => import('./Map'), {
  ssr: false
});

export default MapJamaRealty

