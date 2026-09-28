<details><summary>Logger output</summary>

```
+12
||youtube.com/youtubei/v1/log_event
--
www.youtube.com
1
post
xhr
https://www.youtube.com/youtubei/v1/log_event?alt=json
```
```
+12
##.ytp-suggested-action > .ytp-suggested-action-badge
www.youtube.com
get
dom
https://www.youtube.com/
```
```
+12
doubleclick_instream_ad_status.js:5
<<
www.youtube.com
3
get
script
https://static.doubleclick.net/instream/ad_status.js
```
```
+12
||doubleclick.net/instream/ad_status.js^$script,redirect-rule=doubleclick_instream_ad_status.js:5
--
www.youtube.com
3
get
script
https://static.doubleclick.net/instream/ad_status.js
```
```
+12
||doubleclick.net^
--
www.youtube.com
3
get
script
https://static.doubleclick.net/instream/ad_status.js
```
```
+12
||youtube.com/youtubei/v1/log_event
--
www.youtube.com
1
post
xhr
https://www.youtube.com/youtubei/v1/log_event?alt=json
```
```
+12
||youtube.com/youtubei/v1/log_event
--
www.youtube.com
1
post
xhr
https://www.youtube.com/youtubei/v1/log_event?alt=json
```
```
+12
###shopping-timely-shelf
www.youtube.com
post
dom
https://www.youtube.com/
```
```
+12
||youtube.com/youtubei/v1/log_event
--
www.youtube.com
1
post
xhr
https://www.youtube.com/youtubei/v1/log_event?alt=json
```
```
+12
##.ytd-two-column-browse-results-renderer > ytd-rich-grid-renderer > #masthead-ad.ytd-rich-grid-renderer
www.youtube.com
get
dom
https://www.youtube.com/
```
```
+12
/generate_204?$image
--
www.youtube.com
1
get
image
https://www.youtube.com/generate_204?V7HFVw
```
```
+11
||google.*/pagead/lvz?
--
www.youtube.com
3
get
image
https://www.google.com.br/pagead/lvz?evtid=ACd6Kty1-agUeltQ7iqurhZ5C1qS1idm2CRTUksMJyWe2HliBDoqszC38wwKxlPKLKi8fYGDp1ZLQQWz6fcpJLbIIEKBOUbi8A&req_ts=1790632043&pg=MainAppBootstrap%3AHome&az=1&sigh=AB9vU42eMVnO13d6iBIEGnYcqAwGQg0Vjw
```
```
+11
||google.*/pagead/lvz?
--
www.youtube.com
3
get
image
https://www.google.com/pagead/lvz?evtid=ACd6Kty1-agUeltQ7iqurhZ5C1qS1idm2CRTUksMJyWe2HliBDoqszC38wwKxlPKLKi8fYGDp1ZLQQWz6fcpJLbIIEKBOUbi8A&req_ts=1790632043&pg=MainAppBootstrap%3AHome&az=1&sigh=AB9vU42eMVnO13d6iBIEGnYcqAwGQg0Vjw
```
```
+11
##+js(set-constant, ytInitialPlayerResponse.playerAds, undefined)
www.youtube.com
options
scriptlet
https://www.youtube.com/
```
```
+11
##+js(set-constant, ytInitialPlayerResponse.adPlacements, undefined)
www.youtube.com
options
scriptlet
https://www.youtube.com/
```
```
+11
##+js(set-constant, ytInitialPlayerResponse.adSlots, undefined)
www.youtube.com
options
scriptlet
https://www.youtube.com/
```
```
+11
##+js(set-constant, playerResponse.adPlacements, undefined)
www.youtube.com
options
scriptlet
https://www.youtube.com/
```
```
+11
##+js(json-prune-fetch-response, reelWatchSequenceResponse.entries.[-].command.reelWatchEndpoint.adClientParams.isAd entries.[-].command.reelWatchEndpoint.adClientParams.isAd, '', propsToMatch, url:/reel_watch_sequence?)
www.youtube.com
options
scriptlet
https://www.youtube.com/
```
```
+11
##+js(json-prune, entries.[-].command.reelWatchEndpoint.adClientParams.isAd)
www.youtube.com
options
scriptlet
https://www.youtube.com/
```
```
+11
##+js(prevent-xhr, '/\/api\/stats\/atr\?.+?&rt=\d+\.\d+.+?&volume=\d+&cbr=.+?&fexp=v1%[-%0-9C]{300,}&.+?&muted=\d(&vis=3)?&docid=/ method:POST')
www.youtube.com
options
scriptlet
https://www.youtube.com/
```
```
+11
##+js(trusted-replace-node-text, script, /(\(function serverContract\(\)|^if \(window\.ytcsi)/, '(()=>{if("YOUTUBE_PREMIUM_LOGO"===window.ytInitialData?.topbar?.desktopTopbarRenderer?.logo?.topbarLogoRenderer?.iconImage?.iconType||"YOUTUBE_PREMIUM_LOGO"===document.getElementById("masthead").attributes["logo-type"].value||location.href.startsWith("https://www.youtube.com/tv#/")||location.href.startsWith("https://www.youtube.com/embed/"))return;const e=window.ytcfg.data_.INNERTUBE_CONTEXT.client.userAgent,t=["channel","lactmilli","instream","yahi"];let r=!1,o=t;const n=t=>{if(t){let r=e?.match?.(/Mozilla\/5\.0 \([^)]+/)?.[0];window.ytcfg.data_.INNERTUBE_CONTEXT.client.userAgent=r?e.replace?.(r,r+"; "+t):e}else window.ytcfg.data_.INNERTUBE_CONTEXT.client.userAgent=e},a=()=>{let e=document.getElementById("movie_player");return{player:e,response:e?.getPlayerResponse?.(),stats:e?.getStatsForNerds?.(),progress:e?.getProgressState?.(),buffer:e?.getPlayerStateObject?.()?.isBuffering}},s=(e,t,r)=>e&&"0.00 s"===t?.buffer_health_seconds&&"0x0"===t?.resolution&&r.length>0,l=()=>{let{player:e,response:t,stats:n,buffer:l}=a();e&&s(l,n,o)&&(t?.playbackTracking?.videostatsPlaybackUrl?.baseUrl?.includes?.("reloadxhr")&&(o=o.slice(1)),r=!0)};document.addEventListener("DOMContentLoaded",(function(){const e=()=>{let e,l,{player:i,response:d,stats:c,progress:p,buffer:y}=a();if(i&&window.location.href.includes("/watch?")){if(p&&p.duration>0&&(p.loaded<p.duration||p.duration-p.current>1)||d?.videoDetails?.isLive){if(!c?.debug_info?.startsWith?.("SSAP, AD")){const t=d.videoDetails?.videoId,a=d.playerConfig?.playbackStartConfig?.startSeconds??0,u=d.playabilityStatus?.errorScreen,g=JSON.stringify(u?.playerErrorMessageRenderer?.subreason?.runs||u?.playerInterstitialRenderer?.content?.interstitialViewModel?.description?.commandRuns);return void("UNPLAYABLE"===d?.playabilityStatus?.status&&!u?.playerErrorMessageRenderer?.playerCaptchaViewModel&&g?.includes?.("WEB_PAGE_TYPE_UNKNOWN")&&g?.includes?.("https://support.google.com/youtube/answer/3037019")?(o=o.slice(1),o.length>0?n(o[0]):n(""),r=!1,i.loadVideoById(t,a)):0===o.length?(r=!1,n("")):s(y,c,o)&&r?(n(o[0]),r=!1,i.loadVideoById(t,a)):!r&&p.current-a<5&&location.href.includes("&list=")&&null===i.getPlaylistId?.()&&(e=document.querySelector("yt-playlist-manager"),l=e?.getPlaylistData?.(),l&&(e.setPlaylistData?.(l),e.setPlayerPlaybackControlData?.({playlistPanelRenderer:l}))))}p.duration>0&&i.seekTo?.(p.duration)}}else o=t};e(),new MutationObserver((()=>{e()})).observe(document,{childList:!0,subtree:!0})})),window.Map.prototype.has=new Proxy(window.Map.prototype.has,{apply:(e,t,o)=>("onSnackbarMessage"!==o?.[0]||r||l(),Reflect.apply(e,t,o))}),window.Array.prototype.push=new Proxy(window.Array.prototype.push,{apply:(e,t,r)=>{let o=r?.[0];return!o||"object"!=typeof o||"Uint8Array"!==o.constructor.name||o.buffer?.byteLength!==o.length||105!==o.length&&104!==o.length||l(),Reflect.apply(e,t,r)}});const i={apply:(e,t,r)=>{const o=r[0];return"function"==typeof o&&o.toString().includes("onAbnormalityDetected")&&(r[0]=function(){}),Reflect.apply(e,t,r)}};window.Promise.prototype.then=new Proxy(window.Promise.prototype.then,i)})();$1', sedCount, 1, excludes, MutationObserver, condition, /serverContract|js_ld/)
www.youtube.com
options
scriptlet
https://www.youtube.com/
```
```
+11
##+js(trusted-json-edit-xhr-request, [?.context.client.userAgent*="channel"].context.client[?.clientName=="WEB"]+={"clientScreen":"CHANNEL"}, propsToMatch, /player?)
www.youtube.com
options
scriptlet
https://www.youtube.com/
```
```
+11
##+js(trusted-json-edit-xhr-request, [?.context.client.userAgent*="lactmilli"]+={"params":"8AUB"}, propsToMatch, /player?)
www.youtube.com
options
scriptlet
https://www.youtube.com/
```
```
+11
##+js(trusted-json-edit-xhr-request, [?.context.client.userAgent*="yahi"]+={"params":"YAHI"}, propsToMatch, /player?)
www.youtube.com
options
scriptlet
https://www.youtube.com/
```
```
+11
##+js(trusted-json-edit-xhr-request, [?.context.client.userAgent*="instream"].playbackContext[?.contentPlaybackContext]+={"adPlaybackContext":{"adType":"AD_TYPE_INSTREAM"}}, propsToMatch, /player?)
www.youtube.com
options
scriptlet
https://www.youtube.com/
```
```
+11
##+js(trusted-json-edit-xhr-request, [?.context.client.userAgent=/channel|lactmilli|instream/].playbackContext.contentPlaybackContext.lactMilliseconds="${now}", propsToMatch, /player?)
www.youtube.com
options
scriptlet
https://www.youtube.com/
```
```
+11
##+js(trusted-json-edit-xhr-request, '[?.context.client.userAgent=/adunit|channel|lactmilli|instream|inline|yahi|eafg/].playbackContext.contentPlaybackContext.referer=repl({"regex":"(?:#reloadxhr)?$","replacement":"#reloadxhr"})', propsToMatch, /player?)
www.youtube.com
options
scriptlet
https://www.youtube.com/
```
```
+11
##+js(set-constant, ytcfg.data_.EXPERIMENT_FLAGS.all_web_enable_network_machine, false)
www.youtube.com
options
scriptlet
https://www.youtube.com/
```
```
+11
##+js(set-constant, ytcfg.data_.EXPERIMENT_FLAGS.all_web_network_machine_raw_request, false)
www.youtube.com
options
scriptlet
https://www.youtube.com/
```
```
+11
##+js(trusted-replace-argument, String.prototype.split, this, repl:/all_web_enable_network_machine=true&all_web_network_machine_raw_request=true/all_web_enable_network_machine=false&all_web_network_machine_raw_request=false/, condition, H5_async_logging_delay_ms=)
www.youtube.com
options
scriptlet
https://www.youtube.com/
```
```
+11
##+js(adjust-setTimeout, [native code], 17000, 0.001)
www.youtube.com
options
scriptlet
https://www.youtube.com/
```
```
+11
##+js(json-prune-fetch-response, adPlacements adSlots playerResponse.adPlacements playerResponse.adSlots [].playerResponse.adPlacements [].playerResponse.adSlots, '', propsToMatch, /player?)
www.youtube.com
options
scriptlet
https://www.youtube.com/
```
```
+11
##+js(json-prune-fetch-response, adPlacements adSlots playerResponse.adPlacements playerResponse.adSlots, '', propsToMatch, /playlist?)
www.youtube.com
options
scriptlet
https://www.youtube.com/
```
```
+11
##+js(json-prune-xhr-response, adPlacements adSlots playerResponse.adPlacements playerResponse.adSlots [].playerResponse.adPlacements [].playerResponse.adSlots, '', propsToMatch, /\/player(?:\?.+)?$/)
www.youtube.com
options
scriptlet
https://www.youtube.com/
```
```
+11
##+js(trusted-prevent-dom-bypass, Node.prototype.appendChild, fetch)
www.youtube.com
options
scriptlet
https://www.youtube.com/
```
```
+11
##+js(trusted-prevent-dom-bypass, Node.prototype.appendChild, Request)
www.youtube.com
options
scriptlet
https://www.youtube.com/
```
```
+11
##+js(trusted-prevent-dom-bypass, Node.prototype.appendChild, JSON.parse)
www.youtube.com
options
scriptlet
https://www.youtube.com/
```
```
+11
##+js(trusted-replace-fetch-response, '"adSlots"', '"no_ads"', /get_watch?)
www.youtube.com
options
scriptlet
https://www.youtube.com/
```
```
+11
##+js(set-constant, ytInitialPlayerResponse.playerAds, undefined)
www.youtube.com
options
scriptlet
https://www.youtube.com/
```
```
+11
##+js(set-constant, ytInitialPlayerResponse.adPlacements, undefined)
www.youtube.com
options
scriptlet
https://www.youtube.com/
```
```
+11
##+js(set-constant, ytInitialPlayerResponse.adSlots, undefined)
www.youtube.com
options
scriptlet
https://www.youtube.com/
```
```
+11
##+js(set-constant, playerResponse.adPlacements, undefined)
www.youtube.com
options
scriptlet
https://www.youtube.com/
```
```
+11
##+js(json-prune-fetch-response, reelWatchSequenceResponse.entries.[-].command.reelWatchEndpoint.adClientParams.isAd entries.[-].command.reelWatchEndpoint.adClientParams.isAd, '', propsToMatch, url:/reel_watch_sequence?)
www.youtube.com
options
scriptlet
https://www.youtube.com/
```
```
+11
##+js(json-prune, entries.[-].command.reelWatchEndpoint.adClientParams.isAd)
www.youtube.com
options
scriptlet
https://www.youtube.com/
```
```
+11
##+js(prevent-xhr, '/\/api\/stats\/atr\?.+?&rt=\d+\.\d+.+?&volume=\d+&cbr=.+?&fexp=v1%[-%0-9C]{300,}&.+?&muted=\d(&vis=3)?&docid=/ method:POST')
www.youtube.com
options
scriptlet
https://www.youtube.com/
```
```
+11
##+js(trusted-replace-node-text, script, /(\(function serverContract\(\)|^if \(window\.ytcsi)/, '(()=>{if("YOUTUBE_PREMIUM_LOGO"===window.ytInitialData?.topbar?.desktopTopbarRenderer?.logo?.topbarLogoRenderer?.iconImage?.iconType||"YOUTUBE_PREMIUM_LOGO"===document.getElementById("masthead").attributes["logo-type"].value||location.href.startsWith("https://www.youtube.com/tv#/")||location.href.startsWith("https://www.youtube.com/embed/"))return;const e=window.ytcfg.data_.INNERTUBE_CONTEXT.client.userAgent,t=["channel","lactmilli","instream","yahi"];let r=!1,o=t;const n=t=>{if(t){let r=e?.match?.(/Mozilla\/5\.0 \([^)]+/)?.[0];window.ytcfg.data_.INNERTUBE_CONTEXT.client.userAgent=r?e.replace?.(r,r+"; "+t):e}else window.ytcfg.data_.INNERTUBE_CONTEXT.client.userAgent=e},a=()=>{let e=document.getElementById("movie_player");return{player:e,response:e?.getPlayerResponse?.(),stats:e?.getStatsForNerds?.(),progress:e?.getProgressState?.(),buffer:e?.getPlayerStateObject?.()?.isBuffering}},s=(e,t,r)=>e&&"0.00 s"===t?.buffer_health_seconds&&"0x0"===t?.resolution&&r.length>0,l=()=>{let{player:e,response:t,stats:n,buffer:l}=a();e&&s(l,n,o)&&(t?.playbackTracking?.videostatsPlaybackUrl?.baseUrl?.includes?.("reloadxhr")&&(o=o.slice(1)),r=!0)};document.addEventListener("DOMContentLoaded",(function(){const e=()=>{let e,l,{player:i,response:d,stats:c,progress:p,buffer:y}=a();if(i&&window.location.href.includes("/watch?")){if(p&&p.duration>0&&(p.loaded<p.duration||p.duration-p.current>1)||d?.videoDetails?.isLive){if(!c?.debug_info?.startsWith?.("SSAP, AD")){const t=d.videoDetails?.videoId,a=d.playerConfig?.playbackStartConfig?.startSeconds??0,u=d.playabilityStatus?.errorScreen,g=JSON.stringify(u?.playerErrorMessageRenderer?.subreason?.runs||u?.playerInterstitialRenderer?.content?.interstitialViewModel?.description?.commandRuns);return void("UNPLAYABLE"===d?.playabilityStatus?.status&&!u?.playerErrorMessageRenderer?.playerCaptchaViewModel&&g?.includes?.("WEB_PAGE_TYPE_UNKNOWN")&&g?.includes?.("https://support.google.com/youtube/answer/3037019")?(o=o.slice(1),o.length>0?n(o[0]):n(""),r=!1,i.loadVideoById(t,a)):0===o.length?(r=!1,n("")):s(y,c,o)&&r?(n(o[0]),r=!1,i.loadVideoById(t,a)):!r&&p.current-a<5&&location.href.includes("&list=")&&null===i.getPlaylistId?.()&&(e=document.querySelector("yt-playlist-manager"),l=e?.getPlaylistData?.(),l&&(e.setPlaylistData?.(l),e.setPlayerPlaybackControlData?.({playlistPanelRenderer:l}))))}p.duration>0&&i.seekTo?.(p.duration)}}else o=t};e(),new MutationObserver((()=>{e()})).observe(document,{childList:!0,subtree:!0})})),window.Map.prototype.has=new Proxy(window.Map.prototype.has,{apply:(e,t,o)=>("onSnackbarMessage"!==o?.[0]||r||l(),Reflect.apply(e,t,o))}),window.Array.prototype.push=new Proxy(window.Array.prototype.push,{apply:(e,t,r)=>{let o=r?.[0];return!o||"object"!=typeof o||"Uint8Array"!==o.constructor.name||o.buffer?.byteLength!==o.length||105!==o.length&&104!==o.length||l(),Reflect.apply(e,t,r)}});const i={apply:(e,t,r)=>{const o=r[0];return"function"==typeof o&&o.toString().includes("onAbnormalityDetected")&&(r[0]=function(){}),Reflect.apply(e,t,r)}};window.Promise.prototype.then=new Proxy(window.Promise.prototype.then,i)})();$1', sedCount, 1, excludes, MutationObserver, condition, /serverContract|js_ld/)
www.youtube.com
options
scriptlet
https://www.youtube.com/
```
```
+11
##+js(trusted-json-edit-xhr-request, [?.context.client.userAgent*="channel"].context.client[?.clientName=="WEB"]+={"clientScreen":"CHANNEL"}, propsToMatch, /player?)
www.youtube.com
options
scriptlet
https://www.youtube.com/
```
```
+11
##+js(trusted-json-edit-xhr-request, [?.context.client.userAgent*="lactmilli"]+={"params":"8AUB"}, propsToMatch, /player?)
www.youtube.com
options
scriptlet
https://www.youtube.com/
```
```
+11
##+js(trusted-json-edit-xhr-request, [?.context.client.userAgent*="yahi"]+={"params":"YAHI"}, propsToMatch, /player?)
www.youtube.com
options
scriptlet
https://www.youtube.com/
```
```
+11
##+js(trusted-json-edit-xhr-request, [?.context.client.userAgent*="instream"].playbackContext[?.contentPlaybackContext]+={"adPlaybackContext":{"adType":"AD_TYPE_INSTREAM"}}, propsToMatch, /player?)
www.youtube.com
options
scriptlet
https://www.youtube.com/
```
```
+11
##+js(trusted-json-edit-xhr-request, [?.context.client.userAgent=/channel|lactmilli|instream/].playbackContext.contentPlaybackContext.lactMilliseconds="${now}", propsToMatch, /player?)
www.youtube.com
options
scriptlet
https://www.youtube.com/
```
```
+11
##+js(trusted-json-edit-xhr-request, '[?.context.client.userAgent=/adunit|channel|lactmilli|instream|inline|yahi|eafg/].playbackContext.contentPlaybackContext.referer=repl({"regex":"(?:#reloadxhr)?$","replacement":"#reloadxhr"})', propsToMatch, /player?)
www.youtube.com
options
scriptlet
https://www.youtube.com/
```
```
+11
##+js(set-constant, ytcfg.data_.EXPERIMENT_FLAGS.all_web_enable_network_machine, false)
www.youtube.com
options
scriptlet
https://www.youtube.com/
```
```
+11
##+js(set-constant, ytcfg.data_.EXPERIMENT_FLAGS.all_web_network_machine_raw_request, false)
www.youtube.com
options
scriptlet
https://www.youtube.com/
```
```
+11
##+js(trusted-replace-argument, String.prototype.split, this, repl:/all_web_enable_network_machine=true&all_web_network_machine_raw_request=true/all_web_enable_network_machine=false&all_web_network_machine_raw_request=false/, condition, H5_async_logging_delay_ms=)
www.youtube.com
options
scriptlet
https://www.youtube.com/
```
```
+11
##+js(adjust-setTimeout, [native code], 17000, 0.001)
www.youtube.com
options
scriptlet
https://www.youtube.com/
```
```
+11
##+js(json-prune-fetch-response, adPlacements adSlots playerResponse.adPlacements playerResponse.adSlots [].playerResponse.adPlacements [].playerResponse.adSlots, '', propsToMatch, /player?)
www.youtube.com
options
scriptlet
https://www.youtube.com/
```
```
+11
##+js(json-prune-fetch-response, adPlacements adSlots playerResponse.adPlacements playerResponse.adSlots, '', propsToMatch, /playlist?)
www.youtube.com
options
scriptlet
https://www.youtube.com/
```
```
+11
##+js(json-prune-xhr-response, adPlacements adSlots playerResponse.adPlacements playerResponse.adSlots [].playerResponse.adPlacements [].playerResponse.adSlots, '', propsToMatch, /\/player(?:\?.+)?$/)
www.youtube.com
options
scriptlet
https://www.youtube.com/
```
```
+11
##+js(trusted-prevent-dom-bypass, Node.prototype.appendChild, fetch)
www.youtube.com
options
scriptlet
https://www.youtube.com/
```
```
+11
##+js(trusted-prevent-dom-bypass, Node.prototype.appendChild, Request)
www.youtube.com
options
scriptlet
https://www.youtube.com/
```
```
+11
##+js(trusted-prevent-dom-bypass, Node.prototype.appendChild, JSON.parse)
www.youtube.com
options
scriptlet
https://www.youtube.com/
```
```
+11
##+js(trusted-replace-fetch-response, '"adSlots"', '"no_ads"', /get_watch?)
www.youtube.com
options
scriptlet
https://www.youtube.com/
```
```
+11
noop.txt
<<
www.youtube.com
3
get
xhr
https://googleads.g.doubleclick.net/pagead/id
```
```
+11
||doubleclick.net^$xhr,redirect-rule=noop.txt
--
www.youtube.com
3
get
xhr
https://googleads.g.doubleclick.net/pagead/id
```
```
+11
||doubleclick.net^
--
www.youtube.com
3
get
xhr
https://googleads.g.doubleclick.net/pagead/id
```
```
+10
##+js(set-constant, ytInitialPlayerResponse.playerAds, undefined)
www.youtube.com
get
scriptlet
https://www.youtube.com/
```
```
+10
##+js(set-constant, ytInitialPlayerResponse.adPlacements, undefined)
www.youtube.com
get
scriptlet
https://www.youtube.com/
```
```
+10
##+js(set-constant, ytInitialPlayerResponse.adSlots, undefined)
www.youtube.com
get
scriptlet
https://www.youtube.com/
```
```
+10
##+js(set-constant, playerResponse.adPlacements, undefined)
www.youtube.com
get
scriptlet
https://www.youtube.com/
```
```
+10
##+js(json-prune-fetch-response, reelWatchSequenceResponse.entries.[-].command.reelWatchEndpoint.adClientParams.isAd entries.[-].command.reelWatchEndpoint.adClientParams.isAd, '', propsToMatch, url:/reel_watch_sequence?)
www.youtube.com
get
scriptlet
https://www.youtube.com/
```
```
+10
##+js(json-prune, entries.[-].command.reelWatchEndpoint.adClientParams.isAd)
www.youtube.com
get
scriptlet
https://www.youtube.com/
```
```
+10
##+js(prevent-xhr, '/\/api\/stats\/atr\?.+?&rt=\d+\.\d+.+?&volume=\d+&cbr=.+?&fexp=v1%[-%0-9C]{300,}&.+?&muted=\d(&vis=3)?&docid=/ method:POST')
www.youtube.com
get
scriptlet
https://www.youtube.com/
```
```
+10
##+js(trusted-replace-node-text, script, /(\(function serverContract\(\)|^if \(window\.ytcsi)/, '(()=>{if("YOUTUBE_PREMIUM_LOGO"===window.ytInitialData?.topbar?.desktopTopbarRenderer?.logo?.topbarLogoRenderer?.iconImage?.iconType||"YOUTUBE_PREMIUM_LOGO"===document.getElementById("masthead").attributes["logo-type"].value||location.href.startsWith("https://www.youtube.com/tv#/")||location.href.startsWith("https://www.youtube.com/embed/"))return;const e=window.ytcfg.data_.INNERTUBE_CONTEXT.client.userAgent,t=["channel","lactmilli","instream","yahi"];let r=!1,o=t;const n=t=>{if(t){let r=e?.match?.(/Mozilla\/5\.0 \([^)]+/)?.[0];window.ytcfg.data_.INNERTUBE_CONTEXT.client.userAgent=r?e.replace?.(r,r+"; "+t):e}else window.ytcfg.data_.INNERTUBE_CONTEXT.client.userAgent=e},a=()=>{let e=document.getElementById("movie_player");return{player:e,response:e?.getPlayerResponse?.(),stats:e?.getStatsForNerds?.(),progress:e?.getProgressState?.(),buffer:e?.getPlayerStateObject?.()?.isBuffering}},s=(e,t,r)=>e&&"0.00 s"===t?.buffer_health_seconds&&"0x0"===t?.resolution&&r.length>0,l=()=>{let{player:e,response:t,stats:n,buffer:l}=a();e&&s(l,n,o)&&(t?.playbackTracking?.videostatsPlaybackUrl?.baseUrl?.includes?.("reloadxhr")&&(o=o.slice(1)),r=!0)};document.addEventListener("DOMContentLoaded",(function(){const e=()=>{let e,l,{player:i,response:d,stats:c,progress:p,buffer:y}=a();if(i&&window.location.href.includes("/watch?")){if(p&&p.duration>0&&(p.loaded<p.duration||p.duration-p.current>1)||d?.videoDetails?.isLive){if(!c?.debug_info?.startsWith?.("SSAP, AD")){const t=d.videoDetails?.videoId,a=d.playerConfig?.playbackStartConfig?.startSeconds??0,u=d.playabilityStatus?.errorScreen,g=JSON.stringify(u?.playerErrorMessageRenderer?.subreason?.runs||u?.playerInterstitialRenderer?.content?.interstitialViewModel?.description?.commandRuns);return void("UNPLAYABLE"===d?.playabilityStatus?.status&&!u?.playerErrorMessageRenderer?.playerCaptchaViewModel&&g?.includes?.("WEB_PAGE_TYPE_UNKNOWN")&&g?.includes?.("https://support.google.com/youtube/answer/3037019")?(o=o.slice(1),o.length>0?n(o[0]):n(""),r=!1,i.loadVideoById(t,a)):0===o.length?(r=!1,n("")):s(y,c,o)&&r?(n(o[0]),r=!1,i.loadVideoById(t,a)):!r&&p.current-a<5&&location.href.includes("&list=")&&null===i.getPlaylistId?.()&&(e=document.querySelector("yt-playlist-manager"),l=e?.getPlaylistData?.(),l&&(e.setPlaylistData?.(l),e.setPlayerPlaybackControlData?.({playlistPanelRenderer:l}))))}p.duration>0&&i.seekTo?.(p.duration)}}else o=t};e(),new MutationObserver((()=>{e()})).observe(document,{childList:!0,subtree:!0})})),window.Map.prototype.has=new Proxy(window.Map.prototype.has,{apply:(e,t,o)=>("onSnackbarMessage"!==o?.[0]||r||l(),Reflect.apply(e,t,o))}),window.Array.prototype.push=new Proxy(window.Array.prototype.push,{apply:(e,t,r)=>{let o=r?.[0];return!o||"object"!=typeof o||"Uint8Array"!==o.constructor.name||o.buffer?.byteLength!==o.length||105!==o.length&&104!==o.length||l(),Reflect.apply(e,t,r)}});const i={apply:(e,t,r)=>{const o=r[0];return"function"==typeof o&&o.toString().includes("onAbnormalityDetected")&&(r[0]=function(){}),Reflect.apply(e,t,r)}};window.Promise.prototype.then=new Proxy(window.Promise.prototype.then,i)})();$1', sedCount, 1, excludes, MutationObserver, condition, /serverContract|js_ld/)
www.youtube.com
get
scriptlet
https://www.youtube.com/
```
```
+10
##+js(trusted-json-edit-xhr-request, [?.context.client.userAgent*="channel"].context.client[?.clientName=="WEB"]+={"clientScreen":"CHANNEL"}, propsToMatch, /player?)
www.youtube.com
get
scriptlet
https://www.youtube.com/
```
```
+10
##+js(trusted-json-edit-xhr-request, [?.context.client.userAgent*="lactmilli"]+={"params":"8AUB"}, propsToMatch, /player?)
www.youtube.com
get
scriptlet
https://www.youtube.com/
```
```
+10
##+js(trusted-json-edit-xhr-request, [?.context.client.userAgent*="yahi"]+={"params":"YAHI"}, propsToMatch, /player?)
www.youtube.com
get
scriptlet
https://www.youtube.com/
```
```
+10
##+js(trusted-json-edit-xhr-request, [?.context.client.userAgent*="instream"].playbackContext[?.contentPlaybackContext]+={"adPlaybackContext":{"adType":"AD_TYPE_INSTREAM"}}, propsToMatch, /player?)
www.youtube.com
get
scriptlet
https://www.youtube.com/
```
```
+10
##+js(trusted-json-edit-xhr-request, [?.context.client.userAgent=/channel|lactmilli|instream/].playbackContext.contentPlaybackContext.lactMilliseconds="${now}", propsToMatch, /player?)
www.youtube.com
get
scriptlet
https://www.youtube.com/
```
```
+10
##+js(trusted-json-edit-xhr-request, '[?.context.client.userAgent=/adunit|channel|lactmilli|instream|inline|yahi|eafg/].playbackContext.contentPlaybackContext.referer=repl({"regex":"(?:#reloadxhr)?$","replacement":"#reloadxhr"})', propsToMatch, /player?)
www.youtube.com
get
scriptlet
https://www.youtube.com/
```
```
+10
##+js(set-constant, ytcfg.data_.EXPERIMENT_FLAGS.all_web_enable_network_machine, false)
www.youtube.com
get
scriptlet
https://www.youtube.com/
```
```
+10
##+js(set-constant, ytcfg.data_.EXPERIMENT_FLAGS.all_web_network_machine_raw_request, false)
www.youtube.com
get
scriptlet
https://www.youtube.com/
```
```
+10
##+js(trusted-replace-argument, String.prototype.split, this, repl:/all_web_enable_network_machine=true&all_web_network_machine_raw_request=true/all_web_enable_network_machine=false&all_web_network_machine_raw_request=false/, condition, H5_async_logging_delay_ms=)
www.youtube.com
get
scriptlet
https://www.youtube.com/
```
```
+10
##+js(adjust-setTimeout, [native code], 17000, 0.001)
www.youtube.com
get
scriptlet
https://www.youtube.com/
```
```
+10
##+js(json-prune-fetch-response, adPlacements adSlots playerResponse.adPlacements playerResponse.adSlots [].playerResponse.adPlacements [].playerResponse.adSlots, '', propsToMatch, /player?)
www.youtube.com
get
scriptlet
https://www.youtube.com/
```
```
+10
##+js(json-prune-fetch-response, adPlacements adSlots playerResponse.adPlacements playerResponse.adSlots, '', propsToMatch, /playlist?)
www.youtube.com
get
scriptlet
https://www.youtube.com/
```
```
+10
##+js(json-prune-xhr-response, adPlacements adSlots playerResponse.adPlacements playerResponse.adSlots [].playerResponse.adPlacements [].playerResponse.adSlots, '', propsToMatch, /\/player(?:\?.+)?$/)
www.youtube.com
get
scriptlet
https://www.youtube.com/
```
```
+10
##+js(trusted-prevent-dom-bypass, Node.prototype.appendChild, fetch)
www.youtube.com
get
scriptlet
https://www.youtube.com/
```
```
+10
##+js(trusted-prevent-dom-bypass, Node.prototype.appendChild, Request)
www.youtube.com
get
scriptlet
https://www.youtube.com/
```
```
+10
##+js(trusted-prevent-dom-bypass, Node.prototype.appendChild, JSON.parse)
www.youtube.com
get
scriptlet
https://www.youtube.com/
```
```
+10
##+js(trusted-replace-fetch-response, '"adSlots"', '"no_ads"', /get_watch?)
www.youtube.com
get
scriptlet
https://www.youtube.com/
```
```
+10
||youtube.com/youtubei/v1/log_event
--
www.youtube.com
1
post
xhr
https://www.youtube.com/youtubei/v1/log_event?alt=json
```
```
+10
https://www.youtube.com/
```
```
+10
https://www.youtube.com/
```
```
+10
||youtube.com/youtubei/v1/log_event
--
www.youtube.com
1
post
xhr
https://www.youtube.com/youtubei/v1/log_event?alt=json
```
```
+0
||youtube.com/youtubei/v1/log_event
--
www.youtube.com
1
post
xhr
https://www.youtube.com/youtubei/v1/log_event?alt=json
```
</details>
