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

		// === New filters for Sub Account, From Account, To Account ===
		{
			fieldname: "sub_account",
			label: __("Sub Account"),
			fieldtype: "Select",
			options: "Admin fee\nAdministration fee\nBroker fee\nBrokerage fee\nBrokerage fee 1\nBrokerage fee 2\nCash\nCommitment fee\nCommitmnet fee\nExtension amount\nExtension fee\nExtension proceeds\nFeb 1 payment\nFeb payment\nFirst mortgage payout\nFirst mtg payment\nFrancesca Bruno TFSA\nFudns sent to lawyer\nFunds advacned to lawyer\nFunds advanced to lawyer\nFunds disbursed to client\nFunds received\nFunds received back\nFunds received from Olympia\nFunds sent to borrower\nFunds sent to lawyer\nFunds to lawyer\nFunds to payout first mortgage\nFunds transferred to 1077932\nGeneroso Bruno TFSA\nGianpiero Pisciotta TFSA\nGiovina Di Matteo TFSA\nGiulia Dippolippo TFSA\nHelio Veiga RRSP\nIan Shoub RRSP\nIan Shoub TFSA\nInsurance\nInvestment account 1\nInvestment account 2\nIuliu Szabo TFSA\nJan payment\nJanety Santeramo TFSA\nJanice Genova TFSA\nJill Hernandez RRSP\nJohn Simmen (RRSP)\nJordan Applebaum RRSP\nKarin Schuster TFSA\nKim Pak (Non-registered)\nKrysia Mussakowski TFSA\nKsenia Kotova part 1\nKsenia Kotova part 2\nLegal fee\nLena Bellissimo RRIF\nLinda Simmen (Non-registered)\nLIRA\nLorenzo Bellissimo RRIF\nLucia Di Matteo RRSP\nLuigi Dippolippo TFSA\nMariya Iqbal TFSA\nMark Dominichiello\nMatthew Genova RRSP\nMatthew Gneova TFSA\nMaya Dominelli\nMelissa Rubinoff TFSA\nMoraven Consulting Inc.\nNeelam Sharma RRSP\nNita Jobanputra LIRA\nNita Jobanputra RRSP\nOriginaiton fee\nOrigination fee\nOther\nOutstanding payments on first\nPart 1\nPart 2\nPart 3\nPart 4\nPer diem\nPeter Guido RRSP\nPrepaid interest\nPrepaid interest on first\nPrepaid interest on second\nPrincipal\nPrincipal for 225 Milestone\nPrincipal for 45 Wellington\nPrincipal funds received\nPrincipal paydown\nPrincipal paydown received\nProceeds advanced to lawyer\nProceeds disbrused to lawyer\nProfessional Fees\nPurushottam Sharma RRSP\nPurushottam Sharma TFSA\nRachel Rubinoff TFSA\nRenewal fee\nRetainer disbursed\nRetainer received\nRetainer recevied\nRetainer sent\nRetainer sent to lawyer\nRetiner received\nRevenue\nRobert Kerzner TFSA\nRRSP\nSamantha Kerzner FHSA\nSamantha Kerzner TFSA\nSanjay Jobanputra RRSP\nSean O'Leary TFSA\nShauna Merkur TFSA\nShrimati Naipaul TFSA\nSita Naipaul (non registered)\nSita Naipaul (personal)\nSita Naipaul TFSA\nSteven Bellissimo TFSA\nSydney kerzner TFSA\nTeresa Luchetta (personal)\nThird party insurance\nTotal extension amount\nTotal funds sent to lawyer\nTracy Coutu RRSP\nTransferred to 1077932\nVeronica Astone TFSA\nVictor Biderman (RRIF)\nViggolupo\nViggolupo (Anna Maria)\nVince Genova TFSA\nVivian Di Matteo TFSA",
			default: "",
			width: "200px"
		},
		{
			fieldname: "from_account",
			label: __("From Account"),
			fieldtype: "Data",
			width: "150px"
		},
		{
			fieldname: "to_account",
			label: __("To Account"),
			fieldtype: "Data",
			width: "150px"
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





