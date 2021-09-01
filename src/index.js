class Tabs {
    constructor({
        rootSelector,
        activeControlClass = 'active',
        activePaneClass = 'active',
        activeTab = 1,
    }) {
        this._refs = this._getRefs(rootSelector);
        this._activeControlClass = activeControlClass;
        this._activePaneClass = activePaneClass;
        this._activeTabIdx = activeTab - 1;

        this._setActiveTab();
        this._bindEvents();
    }

    _getRefs(root) {
        const refs = {};

        refs.controls = document.querySelector(`${root} [data-controls]`);
        refs.panes = document.querySelector(`${root} [data-panes]`);

        return refs;
    }

    _bindEvents() {
        this._refs.controls.addEventListener(
            'click',
            this._onControlsClick.bind(this),
        );
    }

    _onControlsClick(e) {
        e.preventDefault();

        if (e.target.nodeName !== 'A') {
            return;
        }
        this._removeActiveTab();

        const controlItem = e.target;
        controlItem.classList.add(this._activeControlClass);

        const paneId = this._getPaneId(controlItem);

        this._setActivePane(paneId);
    }

    _setActiveTab() {
        const controlItems = this._refs.controls.querySelectorAll('a');
        const control = controlItems[this._activeTabIdx];

        control.classList.add(this._activeControlClass);

        const paneId = this._getPaneId(control);
        this._setActivePane(paneId);
    }

    _removeActiveTab() {
        const currenActiveControlItem = this._refs.controls.querySelector(
            `.${this._activeControlClass}`,
        );

        if (!currenActiveControlItem) {
            return;
        }

        currenActiveControlItem.classList.remove(this._activeControlClass);
        const paneId = this._getPaneId(currenActiveControlItem);
        this._removeActivePane(paneId);
    }

    _setActivePane(paneId) {
        const pane = this._getPaneById(paneId);
        pane.classList.add(this._activePaneClass);
    }

    _removeActivePane(paneId) {
        const pane = this._getPaneById(paneId);
        pane.classList.remove(this._activePaneClass);
    }

    _getPaneId(control) {
        return control.getAttribute('href').slice(1);
    }

    _getPaneById(id) {
        return this._refs.panes.querySelector(`#${id}`);
    }
}

const tabs1 = new Tabs({
    rootSelector: '#tabs-1',
    activeControlClass: 'controls__item--active',
    activePaneClass: 'pane--active',
    activeTab: 1,
});
