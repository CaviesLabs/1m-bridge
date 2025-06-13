export function getCookie(cookieName: string) {
  if (typeof window === "undefined") return "";
  const name = cookieName + "=";
  const decodedCookie = decodeURIComponent(window.document.cookie);
  const ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

export function setCookie(
  cookieName: string,
  cookieValue: string,
  expireDay = 365
) {
  if (typeof window === "undefined") return;
  const d = new Date();
  d.setTime(d.getTime() + expireDay * 24 * 60 * 60 * 1000);
  const expires = "expires=" + d.toUTCString();
  window.document.cookie =
    cookieName + "=" + cookieValue + ";" + expires + ";path=/";
}

export function smoothScroll(
  value: HTMLElement | string | null | undefined,
  offset = 0
) {
  const elem =
    typeof value === "string" ? document.getElementById(value) : value;
  if (!elem) return;
  const rect = elem.getBoundingClientRect();

  const targetPosition = Math.floor(rect.top + self.pageYOffset + offset);
  window.scrollTo({
    top: targetPosition,
    behavior: "smooth",
  });

  return new Promise<void>((resolve, reject) => {
    const failed = setTimeout(() => {
      reject();
    }, 2000);

    const scrollHandler = () => {
      if (self.pageYOffset === targetPosition) {
        window.removeEventListener("scroll", scrollHandler);
        clearTimeout(failed);
        resolve();
      }
    };
    if (self.pageYOffset === targetPosition) {
      clearTimeout(failed);
      resolve();
    } else {
      window.addEventListener("scroll", scrollHandler);
      elem.getBoundingClientRect();
    }
  });
}

export function hideKeyboard() {
  (document.activeElement as any)?.blur?.();
}

export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function shortTailAddress(address: string, truncationLength = 12) {
  const tailLength = truncationLength ?? 12;
  if (address.length > tailLength) {
    const half = Math.floor(tailLength / 2);
    return address.slice(0, half) + "..." + address.slice(-half + 1);
  }
  return address;
}
