/** @odoo-module */

import {ActivityMenu} from "@mail/core/web/activity_menu";
import {patch} from "@web/core/utils/patch";
import {user} from "@web/core/user";

patch(ActivityMenu.prototype, {
    setup() {
        super.setup();
        this.currentFilter = "my";
    },
    activateFilter(filterEl) {
        this.deactivateButtons();

        filterEl.classList.add("active");
        this.currentFilter = filterEl.dataset.filter;
        this.updateTeamActivitiesContext();
        this.store.fetchStoreData("systray_get_activities");
    },
    updateTeamActivitiesContext() {
        var active = false;
        if (this.currentFilter === "team") {
            active = true;
        }
        user.updateContext({team_activities: active});
    },
    onBeforeOpen() {
        user.updateContext({team_activities: false});
        super.onBeforeOpen();
    },

    deactivateButtons() {
        document
            .querySelectorAll(".o_filter_nav_item")
            .forEach((element) => element.classList.remove("active"));
    },
    onClickActivityFilter(event) {
        this.activateFilter(event.currentTarget);
    },
});
