import {Ballot, ImportExport, SaveAlt, Settings} from "@material-ui/icons";
import { formatMessage, MainMenuContribution, withModulesManager } from "@openimis/fe-core";
import React, { Component } from "react";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";
import { RIGHT_REGISTERS, RIGHT_REPORTS, RIGHT_EXTRACTS } from "../constants";

class ToolsMainMenu extends Component {
  enablers = (enablers) => {
    var e;
    for (e of enablers) {
      if (this.props.rights.includes(e)) return true;
    }
    return false;
  };

  render() {
    const { rights } = this.props;
    let entries = [];
    if (this.enablers(RIGHT_REGISTERS)) {
      entries.push({
        text: formatMessage(this.props.intl, "tools", "menu.registers"),
        icon: <ImportExport />,
        route: "/tools/registers",
      });
    }
    // Renewals are preformed automatically now.
    // if (rights.includes(RIGHT_POLICY_RENEWALS)) {
    //   entries.push(
    //     { text: formatMessage(this.props.intl, "tools", "menu.renewals"), icon: <Autorenew />, route: "/tools/policyRenewals" }
    //   )
    // }
    // SMS sending feature is normally done automatically now. We'll consider adding this back if necessary
    // if (rights.includes(RIGHT_FEEDBACK_PROMPT)) {
    //   entries.push(
    //     { text: formatMessage(this.props.intl, "tools", "menu.feedbacks"), icon: <Feedback />, route: "/tools/feedbackPrompts" },
    //   )
    // }
    // Extracts page is not implemented in the modular version yet. As it's not used as of now.
    // if (this.enablers(RIGHT_EXTRACTS)) {
    //   entries.push(
    //     { text: formatMessage(this.props.intl, "tools", "menu.extracts"), icon: <SaveAlt />, route: "/tools/extracts" },
    //   )
    // }
    if (this.enablers(RIGHT_REPORTS)) {
      entries.push({
        text: formatMessage(this.props.intl, "tools", "menu.reports"),
        icon: <Ballot />,
        route: "/tools/reports",
      });
    }
    // if (this.enablers(RIGHT_UTILITIES)) {
    //   entries.push(
    //     { text: formatMessage(this.props.intl, "tools", "menu.utilities"), icon: <Build />, route: "/tools/utilities" },
    //   )
    // }
    // if (rights.includes(RIGHT_EMAILSETTING)) {
    //   entries.push(
    //     { text: formatMessage(this.props.intl, "tools", "menu.emails"), icon: <EmailOutlined />, route: "/tools/emailSettings" }
    //   )
    // }
    if (!entries.length) return null;
    return (
      <MainMenuContribution
        {...this.props}
        header={formatMessage(this.props.intl, "tools", "mainMenu")}
        icon={<Settings />}
        entries={entries}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  rights: !!state.core && !!state.core.user && !!state.core.user.i_user ? state.core.user.i_user.rights : [],
});

export default injectIntl(withModulesManager(connect(mapStateToProps)(ToolsMainMenu)));
