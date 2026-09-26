console.log("Background carregado.");

const tabs = new Map();

function getDomain(url) {
    try {
        const hostname = new URL(url).hostname;

        return (
            browser.publicSuffix.getDomain(hostname, {
                allowIPAddress: true,
                allowUnknownSuffix: true
            }) ?? hostname
        );
    } catch {
        return null;
    }
}

browser.webRequest.onBeforeRequest.addListener(
    (request) => {
        if (request.tabId < 0) {
            return;
        }

        const requestDomain = getDomain(request.url);

        if (!requestDomain) {
            return;
        }

        if (request.type === "main_frame") {
            tabs.set(request.tabId, {
                pageDomain: requestDomain,
                thirdPartyDomain: new Set()
            });

            console.log("Página principal:", requestDomain);
            return;
        }

        const tabData = tabs.get(request.tabId);

        if (!tabData) {
            return;
        }

        if (requestDomain !== tabData.pageDomain) {
            tabData.thirdPartyDomain.add(requestDomain);

            console.log("Conexão de terceira parte detectada:", {
                pagina: tabData.pageDomain,
                terceiro: requestDomain,
                url: request.url,
                tipo: request.type
            });
        }
    },
    {
        urls: ["<all_urls>"]
    }
);
