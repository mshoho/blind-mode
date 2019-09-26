// Will be replaced with the value by utils/babel-plugin-nyan.js.
declare function getNyanGifBase64(): string;

interface WindowWithBlindMode extends Window {
    __blindMode?: BlindMode;
}

class BlindMode {
    private _window: Window;
    private _nyanGif = `url(data:image/gif;base64,${ getNyanGifBase64() })`;
    private _overlay: HTMLDivElement | undefined;

    constructor(w: Window) {
        this._window = w;
        this._init();
    }

    private _init() {
        this._window.addEventListener('keypress', this._onKeyPress);
    }

    dispose() {
        this._removeOverlay();
        this._window.removeEventListener('keypress', this._onKeyPress);
    }

    private _removeOverlay() {
        if (this._overlay) {
            if (this._overlay.parentNode) {
                this._overlay.parentNode.removeChild(this._overlay);
            }

            this._overlay = undefined;
        }
    }

    private _onKeyPress = (e: KeyboardEvent) => {
        // Ctrl+Shift+V seems to work with the screen readers enabled too.
        if (e.ctrlKey && e.shiftKey && (e.keyCode === 22)) {
            if (this._overlay) {
                this._removeOverlay();
            } else {
                this._overlay = document.createElement('div');
                this._overlay.setAttribute('aria-hidden', 'true');

                const style = this._overlay.style;

                style.backgroundColor = '#010445';
                style.backgroundImage = this._nyanGif;
                style.position = 'fixed';
                style.left = '0';
                style.top = '0';
                style.width = '100%';
                style.height = '100%';
                style.backgroundSize = 'cover';
                style.backgroundPosition = '55%';
                style.zIndex = '2147483647';

                const dismiss = document.createElement('div');

                dismiss.innerText = 'Dismiss the blind mode';

                const dismissStyle = dismiss.style;

                dismissStyle.position = 'absolute';
                dismissStyle.bottom = '0';
                dismissStyle.right = '0';
                dismissStyle.padding = '10px';
                dismissStyle.backgroundColor = '#fafafa';
                dismissStyle.borderTopLeftRadius = '5px';
                dismissStyle.opacity = '0.7';
                dismissStyle.color = '#000';
                dismissStyle.fontFamily = 'Arial, Helvetica, sans-serif';
                dismissStyle.fontSize = '14px';
                dismissStyle.cursor = 'pointer';

                dismiss.addEventListener('click', () => {
                    this._removeOverlay();
                });

                this._overlay.appendChild(dismiss);

                this._window.document.body.appendChild(this._overlay);
            }
        }
    }
}

export function initBlindMode(win?: Window): void {
    const w: WindowWithBlindMode | undefined = win || (typeof window !== 'undefined' ? window : undefined);

    if (!w || w.__blindMode) {
        return;
    }

    w.__blindMode = new BlindMode(w);
}

export function disposeBlindMode(win?: Window): void {
    const w: WindowWithBlindMode | undefined = win || (typeof window !== 'undefined' ? window : undefined);

    if (w && w.__blindMode) {
        w.__blindMode.dispose();

        delete w.__blindMode;
    }
}
