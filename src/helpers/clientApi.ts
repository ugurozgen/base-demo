export type ClientAPIHelper = ReturnType<typeof makeClientAPI>;

// Functions provided by frame
declare const RiotClient: {
  deepLink: (s: string) => void;
  externalUrl: (s: string) => void;
  closeModal: () => void;
};

export function makeClientAPI() {
  const self = {
    deepLink,
    openURL,
    closeModal,
  };

  function deepLink(str: string) {
    tryToCall(() => RiotClient.deepLink(str), `deepLink error when called with '${str}'`);
  }

  function openURL(str: string) {
    tryToCall(
      () => RiotClient.externalUrl(str),
      `externalUrl error when called with '${str}'`,
      () => (window.location.href = str),
    );
  }

  function closeModal() {
    tryToCall(() => RiotClient.closeModal(), `error invoking close()`);
  }

  function tryToCall(f: CallableFunction, errorMessage: string, fallback?: CallableFunction) {
    try {
      f();
    } catch (e) {
      console.warn(errorMessage);
      if (fallback) {
        fallback(e);
      }
    }
  }

  return Object.freeze(self);
}
