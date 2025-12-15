// Copyright (c) 2015, Frappe Technologies Pvt. Ltd. and Contributors
// License: GNU General Public License v3. See license.txt

frappe.query_reports["Trial Balance Wh"] = {
	filters: [
		// Company is hidden but still applied (from user default)
		{
			fieldname: "company",
			label: __("Company"),
			fieldtype: "Link",
			options: "Company",
			default: frappe.defaults.get_user_default("Company"),
			reqd: 1,
			hidden: 1
		},

		// Fiscal Year + Auto Date Fill
		{
			fieldname: "fiscal_year",
			label: __("Fiscal Year"),
			fieldtype: "Link",
			options: "Fiscal Year",
			default: erpnext.utils.get_fiscal_year(frappe.datetime.get_today()),
			reqd: 1,
			on_change: function () {
				let fy = frappe.query_report.get_filter_value("fiscal_year");
				if (!fy) return;
				frappe.model.with_doc("Fiscal Year", fy, () => {
					let fy_doc = frappe.model.get_doc("Fiscal Year", fy);
					frappe.query_report.set_filter_value({
						from_date: fy_doc.year_start_date,
						to_date: fy_doc.year_end_date
					});
				});
			}
		},

		// Date Range (auto-filled from fiscal year)
		{
			fieldname: "from_date",
			label: __("From Date"),
			fieldtype: "Date",
			default: erpnext.utils.get_fiscal_year(frappe.datetime.get_today(), true)[1],
			reqd: 1
		},
		{
			fieldname: "to_date",
			label: __("To Date"),
			fieldtype: "Date",
			default: erpnext.utils.get_fiscal_year(frappe.datetime.get_today(), true)[2],
			reqd: 1
		},

		// Hidden filters (still work, no UI clutter)
		{
			fieldname: "cost_center",
			fieldtype: "MultiSelectList",
			options: "Cost Center",
			hidden: 1
		},
		{
			fieldname: "project",
			fieldtype: "MultiSelectList",
			options: "Project",
			hidden: 1
		},
		{
			fieldname: "finance_book",
			fieldtype: "Link",
			options: "Finance Book",
			hidden: 1
		},
		{
			fieldname: "presentation_currency",
			fieldtype: "Select",
			options: erpnext.get_presentation_currency_list(),
			hidden: 1
		},

		// ALL CHECKBOXES YOU WANTED REMOVED — GONE!
		// → No more:
		//    With Period Closing Entry...
		//    Show zero values
		//    Show unclosed fiscal year's P&L
		//    Include Default FB Entries
		//    Show net values
		//    Show Group Accounts

		// Instead: We force the best/safest defaults silently
		{
			fieldname: "with_period_closing_entry_for_opening",
			fieldtype: "Check",
			default: 1,
			hidden: 1
		},
		{
			fieldname: "with_period_closing_entry_for_current_period",
			fieldtype: "Check",
			default: 1,
			hidden: 1
		},
		{
			fieldname: "show_zero_values",
			fieldtype: "Check",
			default: 0,
			hidden: 1
		},
		{
			fieldname: "show_unclosed_fy_pl_balances",
			fieldtype: "Check",
			default: 0,
			hidden: 1
		},
		{
			fieldname: "include_default_book_entries",
			fieldtype: "Check",
			default: 1,
			hidden: 1
		},
		{
			fieldname: "show_net_values",
			fieldtype: "Check",
			default: 1,
			hidden: 1
		},
		{
			fieldname: "show_group_accounts",
			fieldtype: "Check",
			default: 1,
			hidden: 1
		}
	],

	// Beautiful tree view with standard formatting
	formatter: erpnext.financial_statements.formatter,
	tree: true,
	name_field: "account",
	parent_field: "parent_account",
	initial_depth: 3,

	// Clean UI
	collapsible_filters: 1
};

// Keep dimension support (Cost Center, Project, etc.) if needed later
erpnext.utils.add_dimensions("Trial Balance Wh", 6);