import React from "react";

const EmbedUrl = ({ url, title, width = "100%", height = "600px" }) => {
    if (!url) {
        console.warn("EmbedUrl component requires a valid URL");
        return null;
    }

    const isSecureUrl = url.startsWith("https://");

    if (!isSecureUrl) {
        console.warn("EmbedUrl only supports secure (HTTPS) URLs");
        return null;
    }

    return (
        <iframe
            src={url}
            width={width}
            height={height}
            title={title}
            sandbox="allow-scripts allow-same-origin allow-popups"
            loading="lazy"
            referrerPolicy="no-referrer"
        />
    );
};

export default EmbedUrl;
