import frappe
from erpnext.accounts.report.general_ledger.general_ledger import execute as original_gl_execute
from frappe import _
from frappe.utils import getdate, today


def execute(filters=None):
    if not filters:
        filters = frappe._dict()

    # Define ONLY the 7 columns you want
    columns = [
        {
            "label": _("Voucher No"),
            "fieldname": "voucher_no",
            "fieldtype": "Link",
            "options": "GL Entry",
            "width": 180
        },
        {
            "label": _("Posting Date"),
            "fieldname": "posting_date",
            "fieldtype": "Date",
            "width": 100
        },
        {
            "label": _("Account"),
            "fieldname": "account",
            "fieldtype": "Link",
            "options": "Account",
            "width": 200
        },
        {
            "label": _("Sub Account"),
            "fieldname": "sub_account",
            "fieldtype": "Data",
            "width": 200
        },
        {
            "label": _("From Account"),
            "fieldname": "from_account",
            "fieldtype": "Data",
            "width": 150
        },
        {
            "label": _("To Account"),
            "fieldname": "to_account",
            "fieldtype": "Data",
            "width": 150
        },
        {
            "label": _("Against Account"),
            "fieldname": "against",
            "fieldtype": "Link",
            "options": "Account",
            "width": 200
        },
        {
            "label": _("Debit"),
            "fieldname": "debit",
            "fieldtype": "Currency",
            "options": "account_currency",
            "width": 130
        },
        {
            "label": _("Credit"),
            "fieldname": "credit",
            "fieldtype": "Currency",
            "options": "account_currency",
            "width": 130
        },
        {
            "label": _("Balance"),
            "fieldname": "balance",
            "fieldtype": "Currency",
            "options": "account_currency",
            "width": 150
        }
    ]

    # === SAFELY call the original General Ledger report ===
    result = original_gl_execute(filters)

    if isinstance(result, tuple) and len(result) >= 2:
        original_columns, data = result[0], result[1]
    else:
        # In case only data is returned (rare but happens on empty/no access)
        data = result if isinstance(result, list) else []

    # If no data, return empty
    if not data:
        return columns, []

    # Keep only the fields we want to display
    wanted_fields = {col["fieldname"] for col in columns}
    filtered_data = [
        {k: v for k, v in row.items() if k in wanted_fields}
        for row in data
    ]

    return columns, filtered_data