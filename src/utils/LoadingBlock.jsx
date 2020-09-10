import React from "react"
import ContentLoader from "react-content-loader"

const LoadingBlock = (props) => (
    <ContentLoader
        speed={2}
        width={700}
        height={160}
        viewBox="0 0 700 160"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        {...props}
    >
        <rect x="-47" y="18" rx="0" ry="0" width="660" height="110" />
    </ContentLoader>
);

export default LoadingBlock;