window.Picker = class Picker {
    constructor(options = {}) {
        this.elm = options.elm || document.querySelector('body');
        this.mode = options.mode || 'target';
        this.excludeElmName = options.excludeElmName || [];
        this.switch = typeof options.switch === 'boolean' ? options.switch : true;

        this.events = options.events || [];
        this.onInit = options.onInit;
        this.onClick = options.onClick ? options.onClick.bind(this) : null;
        this.onHover = options.onHover ? options.onHover.bind(this) : null;


        // Internal handler
        this.fn_bind_clickHandle = null;
        this.fn_bind_hoverHandle = null;
        this.fn_bind_contextmenuHandle = null;
        this._init();
    }
    on() {
        this.switch = true;
    }
    off() {
        this.switch = false;
        this._removeTargetShowPos();
        this._removeCoverShowPos();
    }
    changeMode(mode) {
        let modeArr = ['cover', 'target'];
        if (modeArr.includes(mode)) {
            this.mode = mode;
            this._removeTargetShowPos();
            this._removeCoverShowPos();
        } else {
            console.error(`Mode error, only includes [ ${modeArr.join(" | ")} ]`);
        }
    }
    destroy() {
        this.events.forEach((eo) => {
            eo.fn_bind = eo.fn.bind(this);
            this.elm.removeEventListener(eo.key, this[`_${eo.key}_Handle`], false);
        });

        this.elm.removeEventListener('mouseover', this.fn_bind_hoverHandle, false);
        this.elm.removeEventListener('click', this.fn_bind_clickHandle, false);

        this._removeTargetShowPos();
        document.querySelector("#_picker_cover_wrap_box").remove();
    }
    _init() {
        let wrapDom = document.createElement('div');
        wrapDom.setAttribute("id", "_picker_cover_wrap_box");
        wrapDom.innerHTML = '<svg></svg>';
        document.body.appendChild(wrapDom);
        this._initEvent();
        this.onInit && this.onInit();
    }
    _initEvent() {
        this.events.forEach((eo) => {
            this[`_${eo.key}_Handle`] = (event) => {
                if (this._triggerEvent(event) === false) return;
                eo.fn && eo.fn(event);
            };
            eo.fn_bind = this[`_${eo.key}_Handle`].bind(this);
            this.elm.addEventListener(eo.key, this[`_${eo.key}_Handle`], false);
        });

        this.fn_bind_hoverHandle = this._hoverHandle.bind(this);
        this.fn_bind_clickHandle = this._clickHandle.bind(this);

        this.elm.addEventListener('mouseover', this.fn_bind_hoverHandle, false);
        this.elm.addEventListener('click', this.fn_bind_clickHandle, false);

    }
    _triggerEvent(event) {
        let tipsDom = document.querySelector("#_pick_tips_content");
        if (
            this.switch &&
            !this.excludeElmName.includes(event.target.localName.toLocaleLowerCase()) &&
            !(tipsDom ? tipsDom.contains(event.target) : 0)
        ) {
            event.stopPropagation();
            event.preventDefault();
            return true;
        } else {
            return false;
        }
    }
    _hoverHandle(event) {
        if (this._triggerEvent(event) === false) return;
        switch (this.mode) {
            case 'cover':
                this._coverShowPos(event);
                break;
            case 'target':
                this._targetShowPos(event);
                break;
        }
        this.onHover && this.onHover(event);
    }
    _clickHandle(event) {
        if (this._triggerEvent(event) === false) return;
        this.onClick && this.onClick(event);
    }
    _targetShowPos(event) {
        this._removeTargetShowPos();
        if (event.target.localName === 'body') return;
        event.target.classList.add("_picker_target_elm");
    }
    _removeTargetShowPos() {
        document.querySelectorAll("._picker_target_elm").forEach((elm) => {
            elm.classList.remove("_picker_target_elm");
        });
    }
    _coverShowPos(event) {
        let elm = event.target;
        let W_W = window.screen.availWidth;
        let W_H = window.screen.availHeight;
        let pos = elm.getBoundingClientRect();
        let p = {
            tX: pos.left > 0 ? pos.left : 0,
            tY: pos.top > 0 ? pos.top : 0,
            w: pos.right - pos.left,
            h: pos.bottom - pos.top,
        };
        let path_W = `M 0 0 h ${W_W} v ${W_H} h -${W_W} Z`;
        let path_box = `M ${p.tX} ${p.tY} h ${p.w} v ${p.h} h -${p.w} Z`;
        let elm_path1 = `<path d="${path_W} ${path_box}"></path>`;
        let elm_path2 = `<path d="${path_box}"></path>`;
        document.querySelector("#_picker_cover_wrap_box svg").innerHTML = elm_path1 + elm_path2;
    }
    _removeCoverShowPos() {
        document.querySelector("#_picker_cover_wrap_box svg").innerHTML = '';
    }
};