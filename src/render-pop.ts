const POP = 'UP_POP';

var popup: Window | null = null;
let previousUrl: string | null = null;

function popupWindow(url: string, windowName: string, win: Window) {
  const w = 462;
  const h = 810;
  const top = (win.screen.availHeight - 30 - h) * 0.5;
  const left = (win.screen.availWidth - 10 - w) * 0.8;
  const config = `innerWidth=${w},width=${w},innerHeight=${h},height=${h},top=${top},left=${left},toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,`;
  return win.open(url, windowName, config);
}

export function renderPop(src: string) {
  if (popup == null || popup?.closed) {
    popup = popupWindow(src, POP, window);
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
