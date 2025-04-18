// Service worker setup (PWA functionality)
// Issue?: I don't see self.addEventListener('install'... to precache initial resources

/**
 * Determines if the current hostname corresponds to a localhost environment.
 *
 * This function checks if the hostname is one of the following:
 * - 'localhost'
 * - '[::1]' (IPv6 loopback address)
 * - An IPv4 address in the 127.x.x.x range (IPv4 loopback addresses)
 *
 * @constant {boolean} isLocalhost - True if the current hostname is a localhost address, false otherwise.
 */
const isLocalhost = Boolean(
  window.location.hostname === "localhost" ||
    window.location.hostname === "[::1]" ||
    window.location.hostname.match(
      /^127\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
      // /^127(?:\.(0|[1-9][0-9]{0,2})){3}$/ # This regex was wrong, it accepted for example 127.999.999.999 as valid. Modified it through vsCode Copilot
    )
);

/**
 * Registers a service worker to enable Progressive Web App (PWA) features.
 * This function checks if the environment is production and if the browser supports service workers.
 * It then registers the service worker to enable offline capabilities and cache-first behavior.
 *
 * @param {Object} config - Optional configuration object for the service worker.
 * @returns {void}
 */
export function register(config) {
  if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) {
    const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
    if (publicUrl.origin !== window.location.origin) {
      return;
    }

    window.addEventListener("load", () => {
      const swUrl = `${process.env.PUBLIC_URL}/serviceWorker.js`;

      if (isLocalhost) {
        checkValidServiceWorker(swUrl, config);
        navigator.serviceWorker.ready.then(() => {
          console.log(
            "This web app is being served cache-first by a service " +
              "worker. To learn more, visit https://cra.link/PWA"
          );
        });
      } else {
        registerValidSW(swUrl, config);
      }
    });
  }
}

/**
 * Registers a service worker at the given URL and handles updates and installation events.
 * @param {string} swUrl - The URL of the service worker.
 * @param {Object} config - An object containing optional callbacks for onUpdate and onSuccess.
 * @param {Function} config.onUpdate - A callback function to be called when a new service worker is available. It receives the service worker registration object as an argument.
 * @param {Function} config.onSuccess - A callback function to be called when the service worker is successfully installed. It receives the service worker registration object as an argument.
 */
function registerValidSW(swUrl, config) {
  navigator.serviceWorker
    .register(swUrl)
    .then((registration) => {
      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        if (installingWorker == null) {
          return;
        }
        installingWorker.onstatechange = () => {
          if (installingWorker.state === "installed") {
            if (navigator.serviceWorker.controller) {
              console.log(
                "New content is available and will be used when all " +
                  "tabs for this page are closed. See https://cra.link/PWA."
              );

              if (config && config.onUpdate) {
                config.onUpdate(registration);
              }
            } else {
              console.log("Content is cached for offline use.");

              if (config && config.onSuccess) {
                config.onSuccess(registration);
              }
            }
          }
        };
      };
    })
    .catch((error) => {
      console.error("Error during service worker registration:", error);
    });
}

/**
 * @function checkValidServiceWorker
 * @description Checks if the service worker at the given URL is valid and registers it if it is.
 * If the service worker is not valid, it unregisters any existing service workers.
 * @param {string} swUrl - The URL of the service worker.
 * @param {object} config - Configuration options.
 */
function checkValidServiceWorker(swUrl, config) {
  fetch(swUrl, {
    headers: { "Service-Worker": "script" },
  })
    .then((response) => {
      const contentType = response.headers.get("content-type");

      if (!contentType || !contentType.includes("javascript")) {
        console.warn(
          "A service worker is expected to be found at " +
            `${swUrl}. Please check that this is the correct URL.`
        );
        unregister();
        return;
      }
      navigator.serviceWorker.ready.then(() => {
        console.log(
          "This web app is being served cache-first by a service " +
            "worker. To learn more, visit https://cra.link/PWA"
        );
      });
    })
    .catch(() => {
      console.log(
        "No internet connection found. App is running in offline mode."
      );
    });
}
export function unregister() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.ready.then((registration) => {
      if (registration.unregister) {
        registration
          .unregister()
          .then(() => {
            console.log("Service worker unregistered.");
          })
          .catch((error) => {
            console.error("Error unregistering service worker:", error);
          });
      }
    });
  }
}
