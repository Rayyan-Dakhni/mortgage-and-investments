// Copyright (c) 2025, Frappe Technologies Pvt. Ltd. and contributors

frappe.query_reports["General Ledger wh"] = {
	filters: [
		// === VISIBLE & ESSENTIAL FILTERS ONLY ===
		{
			fieldname: "from_date",
			label: __("From Date"),
			fieldtype: "Date",
			default: frappe.datetime.add_months(frappe.datetime.get_today(), -1),
			reqd: 1,
			width: "80px"
		},
		{
			fieldname: "to_date",
			label: __("To Date"),
			fieldtype: "Date",
			default: frappe.datetime.get_today(),
			reqd: 1,
			width: "80px"
		},
		{
			fieldname: "account",
			label: __("Account"),
			fieldtype: "MultiSelectList",
			options: "Account",
			get_data: function(txt) {
				return frappe.db.get_link_options("Account", txt, {
					company: frappe.defaults.get_user_default("Company") || frappe.query_report.get_filter_value("company")
				});
			}
		},
		{
			fieldname: "voucher_no",
			label: __("Voucher No"),
			fieldtype: "Data"
		},
		{
			fieldname: "party_type",
			label: __("Party Type"),
			fieldtype: "Autocomplete",
			options: Object.keys(frappe.boot.party_account_types),
			on_change: () => frappe.query_report.set_filter_value("party", [])
		},
		{
			fieldname: "party",
			label: __("Party"),
			fieldtype: "MultiSelectList",
			only_select: 1,
			hidden: 1,
			get_data: function(txt) {
				const party_type = frappe.query_report.get_filter_value("party_type");
				if (!party_type) return [];
				return frappe.db.get_link_options(party_type, txt);
				
			}
		},

		// === HIDDEN FILTERS (still work behind the scenes) ===
		{
			fieldname: "company",
			label: __("Company"),
			fieldtype: "Link",
			options: "Company",
			default: frappe.defaults.get_user_default("Company"),
			reqd: 1,
			hidden: 1   // Hidden but still applied
		},
		{
			fieldname: "categorize_by",
			fieldtype: "Select",
			options: ["", "Categorize by Voucher (Consolidated)"],
			default: "Categorize by Voucher (Consolidated)",
			hidden: 1
		},
		{
			fieldname: "finance_book",
			fieldtype: "Link",
			options: "Finance Book",
			hidden: 1
		},
		{
			fieldname: "against_voucher_no",
			fieldtype: "Data",
			hidden: 1
		},
		{
			fieldname: "presentation_currency",
			fieldtype: "Select",
			hidden: 1
		},
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

		// All checkbox filters hidden (but defaults preserved)
		{ fieldname: "include_dimensions", fieldtype: "Check", default: 1, hidden: 1 },
		{ fieldname: "show_opening_entries", fieldtype: "Check", default: 0, hidden: 1 },
		{ fieldname: "include_default_book_entries", fieldtype: "Check", default: 1, hidden: 1 },
		{ fieldname: "show_cancelled_entries", fieldtype: "Check", default: 0, hidden: 1 },
		{ fieldname: "show_net_values_in_party_account", fieldtype: "Check", default: 0, hidden: 1 },
		{ fieldname: "show_amount_in_company_currency", fieldtype: "Check", default: 0, hidden: 1 },
		{ fieldname: "add_values_in_transaction_currency", fieldtype: "Check", default: 0, hidden: 1 },
		{ fieldname: "show_remarks", fieldtype: "Check", default: 0, hidden: 1 },
		{ fieldname: "ignore_err", fieldtype: "Check", default: 0, hidden: 1 },
		{ fieldname: "ignore_cr_dr_notes", fieldtype: "Check", default: 0, hidden: 1 },
	],

	// Optional: Collapse filters by default for cleaner look
	collapsible_filters: 1,
	initial_depth: 0
};