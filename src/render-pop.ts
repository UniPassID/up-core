const POP = '_blank';

var popup: Window | null = null;
let previousUrl: string | null = null;

function popupWindow(
  url: string,
  windowName: string,
  win: Window,
  config: string
) {
  return win.open(url, windowName, config);
}

export function renderPop(src: string, config: string) {
  if (popup == null || popup?.closed) {
    popup = popupWindow(src, POP, window, config);
  } else if (previousUrl !== src) {
    popup.location.replace(src);
    popup.focus();
  } else {
    popup.focus();
  }

  previousUrl = src;

  var timer = setInterval(function() {
    if (popup && popup.closed) {
      clearInterval(timer);
      popup = null;
    }
  }, 1000);

  const unmount = () => {
    if (popup && !popup.closed) {
      popup.close();
      popup = null;
    }
  };

  return { popup, unmount };
}
